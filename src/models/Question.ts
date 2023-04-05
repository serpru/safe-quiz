import { Answer } from "./Answer";

//brakuje idCorrectAnswer
export type Question = {
    id?: number,
    name: string;
    answers: Answer[];
    userAnswer?: number;
    correctAnswer?: number;
  };