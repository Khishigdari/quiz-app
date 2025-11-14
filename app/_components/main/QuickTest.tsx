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
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import QuizExitBtn from "./QuizExitBtn";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import QuizResultComponent from "./QuizResultComponent";

const QuickTest = () => {
  const path = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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
          <div className="mb-6">
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
          <QuizResultComponent />
        </div>
      )}
    </div>
  );
};

export default QuickTest;
