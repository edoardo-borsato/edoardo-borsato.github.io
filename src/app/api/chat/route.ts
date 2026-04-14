import { NextRequest, NextResponse } from "next/server";
import { getGeminiPool } from "@/lib/gemini";
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

    const pool = getGeminiPool();
    const reply = await pool.generateContent(message, SYSTEM_PROMPT, {
      maxOutputTokens: 1024,
    });

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

    if (status === 503) {
      return NextResponse.json(
        { error: "Service unavailable" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
