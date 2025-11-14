"use client";

import { useData } from "@/app/_providers/QuizProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck, CircleX, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import QuizExitBtn from "./QuizExitBtn";
import { useParams } from "next/navigation";
import axios from "axios";

const QuickTest = () => {
  const path = useParams();

  const {
    quiz,
    currentQuestionIndex,
    showResult,
    articleId,
    handleQuiz,
    handleArticleId,
    refetchQuizAnswer,
  } = useData();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const idFromPath = path.id;
    if (idFromPath) handleArticleId(Number(idFromPath));
  }, [path]);

  // console.log(quiz);

  const getQuizzes = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`/api/quizQs`);
      const data = await result.data;

      console.log("hello", data);
      handleQuiz(data.quizzes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (articleId) getQuizzes();
  }, [articleId]);

  // console.log("nuhtsul", quiz.length);
  // console.log(
  //   quiz.filter((q) => q.selectedAnswer === q.answer),
  //   "blabla"
  // );
  return (
    <div className="w-full flex flex-col gap-6">
      {!showResult ? (
        <div>
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
              <QuizExitBtn />
            </CardHeader>
          </div>
          <Card className="p-7">
            <CardContent className="flex flex-col gap-5 p-0">
              {quiz.length > 0 && quiz[currentQuestionIndex] && !showResult && (
                <div>
                  <div className="flex gap-12 justify-between mb-7">
                    <h3 className="text-xl leading-7 font-medium">
                      {quiz[currentQuestionIndex].question}
                    </h3>
                    <p className="whitespace-nowrap">
                      {currentQuestionIndex + 1} / {quiz.length}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {quiz[currentQuestionIndex].options.map((opt, i) => (
                      <div className="flex gap-4 flex-wrap " key={i}>
                        <Button
                          variant={"outline"}
                          key={i}
                          className={`text-[14px] leading-5 text-secondary-foreground font-medium flex justify-center ${
                            quiz[currentQuestionIndex].selectedAnswer === i
                              ? "bg-gray-100"
                              : ""
                          }`}
                          onClick={() => refetchQuizAnswer(i)}
                        >
                          {opt}
                        </Button>
                      </div>
                    ))}{" "}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
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
                                <span>Correct:</span>{" "}
                                <span>{correctAnswer}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickTest;
