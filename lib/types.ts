export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  // articleId: ArticleType;
};

export type ArticleType = {
  id: number;
  title: string;
  content: string;
  summary: string;
};
