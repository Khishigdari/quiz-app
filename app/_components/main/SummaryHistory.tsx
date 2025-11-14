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
import { useRouter, useSearchParams } from "next/navigation";
import { SeeContentBtn } from "./SeeContentBtn";

const SummaryHistory = () => {
  const router = useRouter();
  const { refetchQuizGenerator, articles } = useData();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { loading, findArticleHistory } = useData();

  console.log("articles", articles);

  const goToHomePage = () => {
    router.push("/");
  };

  // const findArticleHistory = articles?.articles?.find(
  //   (article) => article.id == id
  // );

  // useEffect(() => {
  //   if (findArticleHistory) {
  //     handleContent(findArticleHistory.content);
  //   }
  // }, [findArticleHistory]);

  return (
    <div>
      <div>
        {/* <Link href={"/"}> */}
        <Button variant={"outline"} className="mb-6" onClick={goToHomePage}>
          <ChevronLeft />
        </Button>
        {/* </Link> */}
      </div>
      <Card className="p-7">
        {findArticleHistory && (
          <div key={findArticleHistory.id}>
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
                <h3 className="text-6 leading-8 font-semibold">
                  {findArticleHistory.title}
                </h3>
                <p className="text-[14px] leading-5 font-normal">
                  {findArticleHistory.summary}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <FileText className="w-[11px] h-[13px]" />
                  <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                    Article Content
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-normal">
                  {findArticleHistory.content}
                </p>
              </div>
            </CardContent>
          </div>
        )}
        <CardFooter className="flex justify-between p-0">
          <SeeContentBtn />
          <Button
            type="submit"
            className="w-content"
            onClick={refetchQuizGenerator}
            disabled={loading}
          >
            {loading ? "Generating quizes..." : "Take a quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SummaryHistory;
