"use client";

import { useData } from "@/app/_providers/QuizProvider";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck, CircleX, Sparkles } from "lucide-react";
import QuizRestartBtn from "./QuizRestartBtn";
import QuizSaveLeave from "./QuizSaveLeave";

const QuizResultComponent = () => {
  const { quiz, showResult } = useData();
  //   const [result, setResult] = useState<number>();
  //   setResult(quiz.filter((q) => q.selectedAnswer == q.answer).length);
  return (
    <div>
      {showResult && (
        <div>
          <div className="flex gap-2 items-center mb-2">
            <Sparkles className="w-8 h-8" />
            <CardTitle className="font-semibold text-2xl leading-8">
              Quiz Completed!
            </CardTitle>
          </div>
          <CardDescription className="text-base leading-6 font-medium mb-6">
            Let’s see what you did
          </CardDescription>

          <Card className="w-full mt-5 p-7">
            <p className="text-2xl font-semibold leading-8">
              Your score:{" "}
              <span className="text-2xl leading-8 font-medium mx-2">
                {quiz.filter((q) => q.selectedAnswer == q.answer).length}
                {/* {result} */}
              </span>
              <span className="text-base leading-6 font-medium text-muted-foreground">
                / {quiz.length}
              </span>
            </p>
            <div className="flex flex-col gap-5">
              {quiz.map((q, index) => {
                const userAnswer = q.options[q.selectedAnswer ?? -1];
                const correctAnswer = q.options[q.answer];
                const isCorrect = userAnswer === correctAnswer;
                return (
                  <div key={index} className="text-left">
                    <div className="flex gap-3 mb-2">
                      {isCorrect ? (
                        <CircleCheck className="text-green-500" />
                      ) : (
                        <CircleX className="text-red-500" />
                      )}
                      <div className="font-medium text-xs leading-4 flex flex-col gap-1">
                        <h3 className="text-muted-foreground">
                          {index + 1}. {q.question}
                        </h3>
                        <p className="text-foreground">
                          <span>Your answer:</span>{" "}
                          {userAnswer ? (
                            <span>{userAnswer}</span>
                          ) : (
                            <span className="text-gray-500 italic">
                              Not answered
                            </span>
                          )}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-500">
                            <span>Correct:</span> <span>{correctAnswer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <CardFooter className="p-0 flex gap-5 justify-between">
              <QuizRestartBtn />
              <QuizSaveLeave />
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuizResultComponent;
