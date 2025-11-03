import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Sparkles } from "lucide-react";
import Link from "next/link";

const GenerateSummary = () => {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <div className="flex gap-2 items-center">
            <Sparkles />
            <CardTitle>Article Quiz Generator</CardTitle>
          </div>

          <CardDescription>
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <FileText className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                Article Title
              </p>
            </div>
            <Input placeholder="Enter a title for your article..." />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <FileText className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                Article Content
              </p>
            </div>
            <Textarea placeholder="Paste your article content here..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link href={"/summerized"}>
            <Button type="submit" className="w-content">
              Generate Summary
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GenerateSummary;
