import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHref } from "react-router-dom";
import { Question } from "../models/Question";
import QuizQuestion from "./QuizQuestion";
import QuizScoreTable from "./QuizScoreTable";
import QuizSelect from "./QuizSelect";

let question1: Question = {
  body: "Przykładowe pytanie, fajne?",
  answers: ["Tak", "Nie", "Może", "Bynajmniej"],
  userAnswer: -1,
  correctAnswer: 0,
};

let question2: Question = {
  body: "SOME",
  answers: ["BODY", "ONCE", "TOLD", "ME"],
  userAnswer: -1,
  correctAnswer: 0,
};

// TODO
// <Quiz> powinien listować QuizQuestion w for loopie, nie QuizQuestion
const numOfQuestions: number = 2;

export default function Quiz() {
  const [question, setQuestion] = useState(question1);
  const [questionCounter, setQuestionCounter] = useState(1);

  function getNextQuestion() {
    // GET pytanie z API
    console.log("Kolejne pytanie");
    setQuestion(question2);
  }

  return (
    <div className="quiz">
      {questionCounter <= numOfQuestions && (
        <QuizQuestion
          question={question}
          questionCounter={questionCounter}
          isLast={questionCounter === numOfQuestions}
          setQuestionCounter={setQuestionCounter}
          getNextQuestion={getNextQuestion}
        />
      )}
    </div>
  );
}
