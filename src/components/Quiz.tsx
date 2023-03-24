import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { Question } from "../models/Question";
import QuizQuestion from "./QuizQuestion";
import QuizScoreTable from "./QuizScoreTable";
import QuizSelect from "./QuizSelect";

let questionTestObject: Question[] = [
  {
    body: "Kto stworzył system Linux?",
    answers: ["Mark Zuckerberg", "Elderyu", "Linus Torvalds", "Savio"],
    userAnswer: -1,
    correctAnswer: 2,
  },
  {
    body: "Kto chce wymyśleć pytanie z odpowiedziami?",
    answers: [
      "Nie ja - Elderyu",
      "O co chodzi - Zakaridus",
      "*cisza* - Pandek",
      "*gra w Hadesa* - Mor",
    ],
    userAnswer: -1,
    correctAnswer: 0,
  },
];
// TODO
// <Quiz> powinien listować QuizQuestion w for loopie, nie QuizQuestion
const numOfQuestions = questionTestObject.length;

export default function Quiz() {
  const [route, setRoute] = useState("/");
  const [stepIndex, setStepIndex] = useState(2);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [questions, setQuestionTest] = useState(questionTestObject);
  return (
    <div>
      {stepIndex === 2 && (
        <QuizQuestion
          questionsData={questions}
          questionCounter={questionCounter}
          setStepIndex={setStepIndex}
          setQuestionCounter={setQuestionCounter}
          setQuestions={setQuestionTest}
        />
      )}
      {stepIndex === 3 && (
        <QuizScoreTable
          questions={questions}
          setStepIndex={setStepIndex}
        ></QuizScoreTable>
      )}
    </div>
  );
}
