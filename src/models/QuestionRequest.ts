import { AnswerRequest } from "./AnswerRequest";

//  Question type to call API
export type QuestionRequest = {
    id?: number,
    name: string;
    idCorrectAnswer: number;
    answers: AnswerRequest[];
  };