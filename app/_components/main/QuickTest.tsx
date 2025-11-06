"use client";

import { useData } from "@/app/_providers/QuizProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const QuickTest = () => {
  const { titlePrompt, quiz } = useData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const currentQuestion = quiz[currentQuestionIndex];
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  console.log(quiz);
  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <CardHeader className="p-0 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Sparkles />
              <CardTitle>Quick test</CardTitle>
            </div>
            <CardDescription>
              Take a quick test about your knowledge from your content{" "}
            </CardDescription>
          </div>

          <Link href={"/summarized"}>
            <Button variant={"outline"} className="mb-6">
              <X />
            </Button>
          </Link>
        </CardHeader>
      </div>

      <Card className="p-7">
        <CardContent className="flex flex-col gap-5 p-0">
          <div className="flex gap-12 justify-between">
            <h3 className="text-xl leading-7 font-medium">
              {currentQuestion.question}
            </h3>
            <p className="whitespace-nowrap">
              {currentQuestionIndex + 1} / {quiz.length}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-4 flex-wrap ">
              {currentQuestion.options.map((option, index) => (
                <Button
                  variant={"outline"}
                  key={index}
                  className="text-[14px] leading-5 text-secondary-foreground font-medium flex justify-center"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start p-0">
          {currentQuestionIndex < quiz.length - 1 && (
            <Button onClick={nextQuestion}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuickTest;
