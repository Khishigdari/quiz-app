"use client";

import { ArticleType, QuizQuestion } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

type Props = {
  children: ReactNode;
};

type QuizContextType = {
  titlePrompt: string;
  contentPrompt: string;
  promptSummary: string;
  loading: boolean;
  //   quiz: string;
  quiz: QuizQuestion[];
  articles: ArticleType[];
  refetchContentSummary: (e: React.FormEvent) => Promise<void>;
  refetchQuizGenerator: (e: React.FormEvent) => Promise<void>;
  refetchArticles: (e: React.FormEvent) => Promise<void>;
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
  //   const [quiz, setQuiz] = useState<string>("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const contentSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // setTitlePrompt("");
    // setContentPrompt("");
    // setPromptSummary("");

    try {
      // const response = await fetch("/api/summarizer", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ contentPrompt, titlePrompt }),
      // });

      const response = await axios.post("/api/summarizer", {
        contentPrompt,
        titlePrompt,
      });
      const data = await response.data;
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
      if (data.text) {
        //regex for cleaning json
        let cleanedJson = data.text.replace(/```json\s*|```/g, "").trim();

        // Parse the cleaned JSON
        const quizData = JSON.parse(cleanedJson);

        console.log(quizData);
        setQuiz(quizData);
      } else {
        alert("Failed to generate summary");
      }
    } finally {
      setLoading(false);
      router.push("/quiz");
    }
  };

  const getArticles = async () => {
    setLoading(true);
    const result = await axios.get("/api/summarizer");
    const data = await result.data;
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

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
        articles,
        refetchContentSummary: contentSummary,
        refetchQuizGenerator: quizGenerator,
        refetchArticles: getArticles,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useData = () => {
  return useContext(QuizContext);
};
