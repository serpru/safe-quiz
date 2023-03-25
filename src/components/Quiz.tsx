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

let questionTest: Question = {
  body: "Przykładowe pytanie, fajne?",
  answers: ["Tak", "Nie", "Może", "Bynajmniej"],
  userAnswer: -1,
  correctAnswer: 0,
};

// TODO
// <Quiz> powinien listować QuizQuestion w for loopie, nie QuizQuestion
const numOfQuestions = questionTestObject.length;

export default function Quiz() {
  const [route, setRoute] = useState("/");
  const [stepIndex, setStepIndex] = useState(2);
  const [question, setQuestion] = useState(questionTest);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [questions, setQuestionTest] = useState(questionTestObject);
  const [answerData, setAnswerData] = useState<any[]>([]);

  const answers: any[] = answerData;

  const handleChange = () => {
    const answerInput = {
      correctAnswer: question.correctAnswer,
      userAnswer: question.userAnswer,
    };
    setAnswerData([...answerData, answerInput]);
    console.log(answers);
  };

  return (
    <div>
      {stepIndex === 2 && (
        <QuizQuestion
          question={questions[0]}
          questionCounter={questionCounter}
          setStepIndex={setStepIndex}
          setQuestion={setQuestion}
          setQuestionCounter={setQuestionCounter}
          onChange={handleChange}
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
function updateAnswerLog() {
  return;
}
