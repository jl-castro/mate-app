export interface QuizOption {
  id: number;
  value: number | string;
  label?: string;
}

export interface QuizData {
  question: string;
  answer: number | string;
  options: QuizOption[];
}

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface FractionQuiz {
  question: string;
  correctAnswer: string;
  options: QuizOption[];
}
