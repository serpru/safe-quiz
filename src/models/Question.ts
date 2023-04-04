import { Answer } from "./Answer";

export type Question = {
    id: number,
    name: string;
    answers: Answer[];
    userAnswer: number;
    correctAnswer: number;
  };