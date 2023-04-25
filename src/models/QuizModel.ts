import { Question } from "./Question";


export type QuizModel = {
    id: number,
    questions: Question[],
    idxNextQuestion: number
}