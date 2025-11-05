"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
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
import { useState } from "react";

const GenerateSummary = () => {
  const [titlePrompt, setTitlePrompt] = useState<string>("");
  const [contentPrompt, setContentPrompt] = useState<string>("");
  const [promptSummary, setPromptSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const contentSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // setTitlePrompt("");
    // setContentPrompt("");
    // setPromptSummary("");

    try {
      const response = await fetch("/api/summarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentPrompt, promptSummary }),
      });
      const data = await response.json();
      console.log(data.text, "data");
      if (data.text) {
        setPromptSummary(data.text);
      } else {
        alert("Failed to generate summary");
      }
    } finally {
      setLoading(false);
    }
  };

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
            <Input
              placeholder="Enter a title for your article..."
              value={titlePrompt}
              onChange={(e) => setTitlePrompt(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <FileText className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                Article Content
              </p>
            </div>
            <Textarea
              placeholder="Paste your article content here..."
              value={contentPrompt}
              onChange={(e) => setContentPrompt(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link href={"/summarized"}>
            <Button
              type="submit"
              className="w-content"
              onClick={contentSummary}
            >
              Generate Summary
            </Button>
          </Link>
        </CardFooter>
        {promptSummary}
      </Card>
    </div>
  );
};

export default GenerateSummary;
