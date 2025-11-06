"use client";

import { useData } from "@/app/_providers/QuizProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, ChevronLeft, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
const SummerizedContent = () => {
  const {
    promptSummary,
    contentPrompt,
    titlePrompt,
    loading,
    refetchQuizGenerator,
  } = useData();
  return (
    <div>
      <div>
        <Link href={"/"}>
          <Button variant={"outline"} className="mb-6">
            <ChevronLeft />
          </Button>
        </Link>
      </div>

      <Card className="p-7">
        <CardHeader className="p-0">
          <div className="flex gap-2 items-center">
            <Sparkles />
            <CardTitle>Article Quiz Generator</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 p-0">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <BookOpen className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                Summarized content
              </p>
            </div>
            <h3 className="text-6 leading-8 font-semibold">{titlePrompt}</h3>
            <p className="text-[14px] leading-5 font-normal">{promptSummary}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <FileText className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                Article Content
              </p>
            </div>
            <p className="text-[14px] leading-5 font-normal">{contentPrompt}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start p-0">
          <Button
            type="submit"
            className="w-content"
            onClick={refetchQuizGenerator}
            disabled={loading || !contentPrompt || !titlePrompt}
          >
            {loading ? "Generating quizes..." : "Take a quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SummerizedContent;
