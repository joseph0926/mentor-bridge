export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type QuizCategory = {
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export type Quiz = {
  title: string;
  description: string;
  categories: QuizCategory[];
};