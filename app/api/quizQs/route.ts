import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
  const { contentPrompt, quiz, articleId } = await req.json();
  console.log(articleId, "content aaaaaaaaaa");

  if (!contentPrompt) {
    return NextResponse.json(
      { error: "Content prompt is required" },
      { status: 400 }
    );
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contentPrompt,

    config: {
      systemInstruction: `Generate 5 multiple choice questions based on this article: ${contentPrompt}. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.
      Question: ${quiz}`,
    },
  });
  const text = response.text || "[]";
  console.log(text, " json text test");

  let cleanedJson = text.replace(/```json\s*|```/g, "").trim();

  let quizArray: any[] = [];
  quizArray = JSON.parse(cleanedJson);
  console.log(quizArray, "array of quizes");

  try {
    // const articleContent = await query(
    //   `INSERT INTO articles(title, content, summary) VALUES($1, $2, $3)`,
    //   [titlePrompt, transformedContentPrompt, text]
    // );

    const quizContent = await prisma.quizzes.createMany({
      data: quizArray.map((q) => ({
        question: q.question,
        options: q.options,
        answer: q.answer.toString(),
        articleid: Number(articleId),
      })),
    });

    return NextResponse.json({ text, data: quizContent });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ text, data: "" });
  }
};

export const GET = async (req: NextRequest) => {
  const articleId = req.nextUrl.searchParams.get("id");

  const quizzes = await prisma.quizzes.findMany({
    where: { articleid: Number(articleId) },
  });
  return Response.json({ message: "success", quizzes });
};
