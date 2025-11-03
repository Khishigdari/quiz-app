import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, FileText, Sparkles, X } from "lucide-react";
import Link from "next/link";

const QuickTest = () => {
  return (
    <div>
      <div>
        <CardHeader className="p-0 flex gap-16">
          <div>
            <div className="flex gap-2 items-center">
              <Sparkles />
              <CardTitle>Quick test</CardTitle>
            </div>
            <CardDescription>
              Take a quick test about your knowledge from your content{" "}
            </CardDescription>
          </div>

          <Link href={"/summerized"}>
            <Button variant={"outline"} className="mb-6">
              <X />
            </Button>
          </Link>
        </CardHeader>
      </div>

      <Card className="p-7">
        <CardContent className="flex flex-col gap-5 p-0">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <BookOpen className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                Summarized content
              </p>
            </div>
            <h3 className="text-6 leading-8 font-semibold">Title</h3>
            <p></p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <FileText className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                Article Content
              </p>
            </div>
            <p></p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start p-0">
          <Link href={"/quiz"}>
            <Button type="submit" className="w-content">
              Take a quiz
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuickTest;
