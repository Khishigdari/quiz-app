"use client";

import { SeeContentBtn } from "@/app/_components/main/SeeContentBtn";
import { useData } from "@/app/_providers/QuizProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArticleType } from "@/lib/types";
import axios from "axios";
import { BookOpen, ChevronLeft, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SummaryHistory = () => {
  const { refetchQuizGenerator } = useData();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const getArticles = async () => {
    setLoading(true);
    const result = await axios.get("/api/summarizer");
    const data = await result.data;
    console.log(data.articles.rows, "data");
    setArticles(data.articles.rows);
    setLoading(false);
  };
  console.log(articles, " articles");
  useEffect(() => {
    getArticles();
  }, []);

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
        {articles.map((article) => {
          return (
            <div key={article.id}>
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
                    {article.title}
                  </h3>
                  <p className="text-[14px] leading-5 font-normal">
                    {article.summary}
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
                    {article.content}
                  </p>
                </div>
              </CardContent>
            </div>
          );
        })}

        <CardFooter className="flex justify-between p-0">
          {/* <SeeContentBtn /> */}
          <Button
            type="submit"
            className="w-content"
            onClick={refetchQuizGenerator}
            // disabled={loading || !contentPrompt || !titlePrompt}
          >
            {loading ? "Generating quizes..." : "Take a quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SummaryHistory;
