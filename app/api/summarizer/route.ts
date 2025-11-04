import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  const { contentPrompt, promptSummary } = await req.json();

  if (!contentPrompt) {
    return NextResponse.json(
      { error: "Title and content prompt is required" },
      { status: 400 }
    );
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contentPrompt,

    config: {
      systemInstruction: `You have to make a short summary of the submitted content within 5 sentences. ${promptSummary}`,
    },
  });
  const text = response.text;

  return NextResponse.json({ text });
};
