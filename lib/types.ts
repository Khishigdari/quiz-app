export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  // articleId: ArticleType;
  selectedAnswer?: number | undefined;
  userAnswer?: string;
  showResult: boolean;
};

export type ArticleType = {
  id: number;
  title: string;
  content: string;
  summary: string;
  // userId: number;
};
