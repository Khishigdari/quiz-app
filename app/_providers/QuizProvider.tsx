"use client";

import { ArticleType, QuizQuestion } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

type Props = {
  children: ReactNode;
};

type QuizContextType = {
  titlePrompt: string;
  contentPrompt: string;
  promptSummary: string;
  loading: boolean;
  quiz: QuizQuestion[];
  articles: ArticleType[];
  articleId: number | null;
  // userId: number | null;
  currentQuestionIndex: number;
  showResult: boolean;
  refetchContentSummary: (e: React.FormEvent) => Promise<void>;
  refetchQuizGenerator: (e: React.FormEvent) => Promise<void>;
  refetchArticles: (e: React.FormEvent) => Promise<void>;
  refetchQuizzes: (e: React.FormEvent) => Promise<void>;
  refetchQuizAnswer: (index: number) => void;
  handleTitle: (value: string) => void;
  handleContent: (value: string) => void;
  handleQuiz: (value: QuizQuestion[]) => void;
  handleArticleId: (value: number) => void;
  // handleUserId: (value: number) => void;
  handleCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  handleQuizRawText: (value: string) => void;
  findArticleHistory: any;
};

//creating context
const QuizContext = createContext({} as QuizContextType);

export const QuizProvider = ({ children }: Props) => {
  const { user } = useUser();
  const router = useRouter();

  const [titlePrompt, setTitlePrompt] = useState<string>("");
  const [contentPrompt, setContentPrompt] = useState<string>("");
  const [promptSummary, setPromptSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [articleId, setArticleId] = useState<number | null>(null);
  // const [userId, setUserId] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizRawText, setQuizRawText] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // const articleUserId = searchParams.get("userId");

  const contentSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
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
        // userId: user.id,
        clerkId: user.id,
        // userId: articleUserId,
      });
      // console.log(response, "responseeeee");
      const data = await response.data;
      // console.log(data.text, "dataaaaaa");
      if (data.text) {
        setPromptSummary(data.text);
      } else {
        alert("Failed to generate summary");
      }
      // console.log(data, "Looking for userId aaaaaaaaaaaaaaaa");

      if (data.data?.id) {
        setArticleId(data.data.id);
      }
    } finally {
      setLoading(false);
      // setTitlePrompt("");
      // setContentPrompt("");
      // router.push(`/summarized?userId=${articleUserId}`);
      router.push("/summarized");
    }
  };

  const quizGenerator = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!id) return "ArticleId is missing";
    setLoading(true);
    // setTitlePrompt("");
    // setContentPrompt("");
    // setPromptSummary("");
    // const articleid = articleId[id];

    try {
      const response = await axios.post("/api/quizQs", {
        contentPrompt,
        quiz,
        articleId: id,
      });
      const data = await response.data;

      if (data.text) {
        //regex for cleaning json
        let cleanedJson = data.text.replace(/```json\s*|```/g, "").trim();

        // Parse the cleaned JSON
        const quizData = JSON.parse(cleanedJson);

        console.log(quizData);
        setQuiz(quizData);
        setCurrentQuestionIndex(0);
        setShowResult(false);
      } else {
        alert("Failed to generate summary");
      }
    } finally {
      setLoading(false);

      router.push(`/quiz?id=${id}`);
    }
  };

  const getArticles = async () => {
    setLoading(true);
    const result = await axios.get("/api/summarizer");
    const data = await result.data;
    setArticles(data);
    setLoading(false);
  };

  const getQuizzes = async () => {
    setLoading(true);
    // const result = await axios.get(`/api/quizQs?id=${id}`);
    const result = await axios.get("/api/quizQs");
    const data = await result.data;
    setQuiz(data);
    setLoading(false);
  };

  const handleTitle = (value: string) => {
    setTitlePrompt(value);
  };

  const handleContent = (value: string) => {
    setContentPrompt(value);
  };

  const handleQuiz = (value: QuizQuestion[]) => {
    setQuiz(value);
  };

  const handleArticleId = (value: number | null) => {
    setArticleId(value);
  };
  // const handleUserId = (value: number | null) => {
  //   setUserId(value);
  // };

  const handleCurrentQuestionIndex: React.Dispatch<
    React.SetStateAction<number>
  > = (value) => {
    setCurrentQuestionIndex(value);
  };
  const handleQuizRawText = (value: string) => {
    setQuizRawText(value);
  };

  useEffect(() => {
    // if (!id) return;
    getArticles();
    getQuizzes();
    // }, [id]);
  }, []);

  const handleAnswer = (index: number) => {
    const newQuizData = [...quiz];
    newQuizData[currentQuestionIndex].selectedAnswer = index;
    setQuiz(newQuizData);
    console.log(newQuizData, "where's the selected answerssssssssssss");
    console.log(currentQuestionIndex, "q indexxxxxxxxxxx");

    if (currentQuestionIndex < newQuizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  // console.log(articles, "articleType articles");
  const findArticleHistory = articles?.articles?.find(
    (article) => article.id == id
  );

  useEffect(() => {
    if (findArticleHistory) {
      handleContent(findArticleHistory.content);
    }
  }, [findArticleHistory]);

  return (
    <QuizContext.Provider
      value={{
        handleTitle,
        handleContent,
        handleQuiz,
        handleArticleId,
        // handleUserId,
        handleCurrentQuestionIndex,
        handleQuizRawText,
        titlePrompt,
        contentPrompt,
        promptSummary,
        loading,
        quiz,
        articles,
        findArticleHistory,
        articleId,
        // userId,
        currentQuestionIndex,
        showResult,
        refetchContentSummary: contentSummary,
        refetchQuizGenerator: quizGenerator,
        refetchArticles: getArticles,
        refetchQuizAnswer: handleAnswer,
        refetchQuizzes: getQuizzes,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useData = () => {
  return useContext(QuizContext);
};
