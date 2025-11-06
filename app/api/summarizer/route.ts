import { query } from "@/lib/connectDb";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const replaceApostrophes = (str: string) => {
  return str.replace(/(\w)+'+(\w+)/g, "$1 $2");
};

export const POST = async (req: NextRequest) => {
  const { contentPrompt, titlePrompt } = await req.json();

  if (!contentPrompt) {
    return NextResponse.json(
      { error: "Title and content prompt is required" },
      { status: 400 }
    );
  }

  const transformedContentPrompt = replaceApostrophes(contentPrompt);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: transformedContentPrompt,
    config: {
      systemInstruction: `You have to make a short summary of the submitted content within 5 sentences. `,
    },
  });
  const text = replaceApostrophes(response.text || "");

  console.log("Title", titlePrompt);
  console.log("content", transformedContentPrompt);
  console.log("text", text);

  const articleContent = await query(
    `INSERT INTO article(title, content,summary) VALUES('${titlePrompt}', '${transformedContentPrompt}', '${text}')`
  );

  return NextResponse.json({ text, data: articleContent });
};

export const GET = async () => {
  const articles = await query("SELECT * FROM article");
  return Response.json({ message: "success", data: articles });
};
