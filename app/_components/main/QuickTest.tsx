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
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import QuizExitBtn from "./QuizExitBtn";
import { useParams } from "next/navigation";
import axios from "axios";

const QuickTest = () => {
  // const path = useParams();

  const {
    quiz,
    currentQuestionIndex,
    showResult,
    handleQuiz,

    refetchQuizAnswer,
  } = useData();

  const [loading, setLoading] = useState<boolean>(false);

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  // const [quizRawText, setQuizRawText] = useState<string>("");
  // const [showResult, setShowResult] = useState<boolean>(false);

  // useEffect(() => {
  //   const result = localStorage.getItem("quizResult");
  //   if (result) {
  //     handleQuizRawText(result);
  //     try {
  //       const parseData = JSON.parse(result);
  //       handleQuiz(parseData.quizArray || []);
  //     } catch (e) {
  //       console.error("Failed to parse quizResult:", e);
  //     }
  //   }

  //   const idFromPath = path.id;
  //   if (idFromPath) handleArticleId(Number(idFromPath));
  // }, [path]);

  // const currentQuestion = quiz[currentQuestionIndex];
  // const nextQuestion = () => {
  //   handleCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  // };

  // console.log(quiz);

  const getQuizzes = async () => {
    setLoading(true);
    const result = await axios.get("/api/quizQs");
    const data = await result.data;

    console.log("hello", data);
    handleQuiz(data.quizzes);
    setLoading(false);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  console.log("nuhtsul", quiz.length);
  return (
    // <div className="w-full flex flex-col gap-6">
    //   <div>
    //     <CardHeader className="p-0 flex justify-between items-center">
    //       <div className="flex flex-col gap-2">
    //         <div className="flex gap-2 items-center">
    //           <Sparkles />
    //           <CardTitle>Quick test</CardTitle>
    //         </div>
    //         <CardDescription>
    //           Take a quick test about your knowledge from your content{" "}
    //         </CardDescription>
    //       </div>

    //       <QuizExitBtn />
    //     </CardHeader>
    //   </div>

    //   <Card className="p-7">
    //     <CardContent className="flex flex-col gap-5 p-0">
    //       <div className="flex gap-12 justify-between">
    //         <h3 className="text-xl leading-7 font-medium">
    //           {currentQuestion.question}
    //         </h3>
    //         <p className="whitespace-nowrap">
    //           {currentQuestionIndex + 1} / {quiz.length}
    //         </p>
    //       </div>
    //       <div className="flex flex-col gap-1">
    //         <div className="flex gap-4 flex-wrap ">
    //           {currentQuestion.options.map((option, index) => (
    //             <Button
    //               variant={"outline"}
    //               key={index}
    //               className="text-[14px] leading-5 text-secondary-foreground font-medium flex justify-center"
    //               onClick={() => refetchQuizAnswer(index)}
    //             >
    //               {option}
    //             </Button>
    //           ))}
    //         </div>
    //       </div>
    //     </CardContent>
    //     <CardFooter className="flex justify-end p-0">
    //       {currentQuestionIndex < quiz.length - 1 && (
    //         <Button onClick={nextQuestion}>Next</Button>
    //       )}
    //     </CardFooter>
    //   </Card>
    // </div>

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
                  <div className="flex gap-12 justify-between">
                    <h3 className="text-xl leading-7 font-medium">
                      {currentQuestionIndex + 1}.
                      {quiz[currentQuestionIndex].question}
                    </h3>
                    <p className="whitespace-nowrap">
                      {currentQuestionIndex + 1} / {quiz.length}
                    </p>
                  </div>
                  {quiz[currentQuestionIndex].options.map((opt, i) => (
                    <div className="flex flex-col gap-1" key={i}>
                      <div className="flex gap-4 flex-wrap  ">
                        {/* {currentQuestion.options.map((option, index) => ( */}
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
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <Card className="w-[450px] mt-5 p-4 text-center">
            {showResult && (
              <div>
                <div className="flex gap-3">
                  <img src={"/star2.png"} className="w-6 h-6 mt-1" />
                  <CardTitle className="font-semibold text-xl">
                    {" "}
                    Quiz Completed!
                  </CardTitle>
                </div>
                <CardDescription>Let’s see what you did</CardDescription>

                <p className="mt-3">
                  Your score:{" "}
                  {quiz.filter((q) => q.selectedAnswer === q.answer).length} /{" "}
                  {quiz.length}
                </p>
                <div className="flex justify-between mt-4">
                  <Button
                    className="text-black bg-white border"
                    // onClick={generateQuiz}
                  >
                    Restart quiz
                  </Button>
                  {/* <Button className="flex" onClick={saveAndLeave}>
                    Save and Leave
                  </Button> */}
                </div>
              </div>
            )}
          </Card>

          {/* {quizData.length === 0 && (
            <Button onClick={generateQuiz}>Generate Quiz (Re-fetch)</Button>
          )} */}
        </div>
      )}
      {/* <CardFooter className="flex justify-end p-0">
          {currentQuestionIndex < quiz.length - 1 && (
            <Button onClick={nextQuestion}>Next</Button>
          )}
        </CardFooter> */}
    </div>
  );
};

export default QuickTest;
