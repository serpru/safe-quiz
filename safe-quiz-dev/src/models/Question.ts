import { Answer } from "./Answer";

//brakuje idCorrectAnswer
export type Question = {
    id?: number,
    name: string;
    noCorrectAnswer: number;
    answers: Answer[];
    userAnswer?: number;
  };