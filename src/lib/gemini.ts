import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";

// Ordered by rate limits (best first):
// gemini-3.1-flash-lite:  15 RPM,    500 RPD  (currently unavailable)
// gemini-2.5-flash-lite:  10 RPM,     20 RPD
// gemini-2.5-flash:        5 RPM,     20 RPD
// gemini-3-flash:           5 RPM,     20 RPD  (currently unavailable)
// gemma-3-27b-it:          30 RPM, 14,400 RPD  (lower quality, last resort)
const MODELS = [
  // "gemini-3.1-flash-lite",
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  // "gemini-3-flash",
  "gemma-3-27b-it",
];

export class GeminiModelPool {
  private client: GoogleGenerativeAI;
  private models: string[];

  constructor(apiKey: string, models: string[] = MODELS) {
    this.client = new GoogleGenerativeAI(apiKey);
    this.models = models;
  }

  async generateContent(
    message: string,
    systemInstruction: string,
    generationConfig?: GenerationConfig
  ): Promise<string> {
    let lastError: unknown;

    for (const modelName of this.models) {
      try {
        const supportsSystemInstruction = !modelName.startsWith("gemma-");
        const model = this.client.getGenerativeModel({
          model: modelName,
          ...(supportsSystemInstruction && { systemInstruction }),
          generationConfig,
        });
        const prompt = supportsSystemInstruction
          ? message
          : `${systemInstruction}\n\n${message}`;
        const result = await model.generateContent(prompt);
        return (
          result.response.text() ||
          "Sorry, I could not generate a response."
        );
      } catch (error) {
        lastError = error;
        const status = (error as { status?: number })?.status;
        if (status === 503 // Service unavailable, rate limit reached - try next model
          || status === 429 // Too many requests - try next model
          || status === 404 // Model not found for current tier or SDK - try next model
        ) {
          continue;
        }
        throw error;
      }
    }

    throw lastError;
  }
}

let pool: GeminiModelPool | null = null;

export function getGeminiPool(): GeminiModelPool {
  if (!pool) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is not configured");
    }
    pool = new GeminiModelPool(apiKey);
  }
  return pool;
}
