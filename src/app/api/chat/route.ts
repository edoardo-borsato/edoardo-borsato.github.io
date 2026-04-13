import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";

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
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
