import { AnswerRequest } from "./AnswerRequest";

//  Question type to call API
export type QuestionRequest = {
    id?: number,
    name: string;
    noCorrectAnswer: number;
    answers: AnswerRequest[];
  };