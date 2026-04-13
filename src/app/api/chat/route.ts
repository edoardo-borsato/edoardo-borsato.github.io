import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";

interface RetryInfo {
  "@type": string;
  retryDelay?: string;
}

function extractRetryDelay(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const details = (error as { errorDetails?: unknown }).errorDetails;
  if (!Array.isArray(details)) return null;

  const retryInfo = details.find(
    (d): d is RetryInfo =>
      typeof d === "object" &&
      d !== null &&
      (d as RetryInfo)["@type"]?.includes("RetryInfo")
  );

  return retryInfo?.retryDelay ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const client = getGeminiClient();
    const model = client.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        maxOutputTokens: 1024,
      },
    });

    const result = await model.generateContent(message);
    const reply = result.response.text() || "Sorry, I could not generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);

    const status = (error as { status?: number })?.status;
    if (status === 429) {
      const retryDelay = extractRetryDelay(error);
      return NextResponse.json(
        { error: "Rate limit exceeded", retryDelay },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
