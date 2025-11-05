"use client";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type QuizContextType = {
  titlePrompt: string;
  contentPrompt: string;
  promptSummary: string;
  loading: boolean;
  quiz: string;
  refetchContentSummary: (e: React.FormEvent) => Promise<void>;
  refetchQuizGenerator: (e: React.FormEvent) => Promise<void>;
  handleTitle: (value: string) => void;
  handleContent: (value: string) => void;
};

//creating context
const QuizContext = createContext({} as QuizContextType);

export const QuizProvider = ({ children }: Props) => {
  const router = useRouter();

  const [titlePrompt, setTitlePrompt] = useState<string>("");
  const [contentPrompt, setContentPrompt] = useState<string>("");
  const [promptSummary, setPromptSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<string>("");

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
      router.push("/summarized");
    }
  };

  const handleTitle = (value: string) => {
    setTitlePrompt(value);
  };

  const handleContent = (value: string) => {
    setContentPrompt(value);
  };

  const quizGenerator = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // setTitlePrompt("");
    // setContentPrompt("");
    // setPromptSummary("");

    try {
      const response = await fetch("/api/quizQs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentPrompt, quiz }),
      });
      const data = await response.json();
      //   console.log(data.text, "data");
      console.log(data.question, " question ");
      //   console.log(dat)
      if (data.text) {
        setQuiz(data.text);
      } else {
        alert("Failed to generate summary");
      }
    } finally {
      setLoading(false);
      router.push("/quiz");
    }
  };

  return (
    <QuizContext.Provider
      value={{
        handleTitle,
        handleContent,
        titlePrompt,
        contentPrompt,
        promptSummary,
        loading,
        quiz,
        refetchContentSummary: contentSummary,
        refetchQuizGenerator: quizGenerator,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useData = () => {
  return useContext(QuizContext);
};
