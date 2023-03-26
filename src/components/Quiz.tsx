import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHref } from "react-router-dom";
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

interface Props {
  answerData: Question[];
  setAnswerData: (questions: Question[]) => void;
}

// TODO
// <Quiz> powinien listować QuizQuestion w for loopie, nie QuizQuestion
const numOfQuestions: number = 2;

export default function Quiz({ answerData, setAnswerData }: Props) {
  const [route, setRoute] = useState("/");
  const [stepIndex, setStepIndex] = useState(2);
  const [question, setQuestion] = useState(questionTest);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [questions, setQuestionTest] = useState(questionTestObject);
  const [finishQButtonVisible, setFinishQButtonVisible] = useState(false);

  useEffect(() => {
    console.log(answerData);
  }, [answerData]);

  const handleChange = () => {
    const answerInput = {
      correctAnswer: question.correctAnswer,
      userAnswer: question.userAnswer,
    };
    console.log(question);
    setAnswerData([...answerData, question]);
  };

  return (
    <div>
      {questionCounter <= numOfQuestions && (
        <QuizQuestion
          question={questions[questionCounter - 1]}
          questionCounter={questionCounter}
          isLast={questionCounter === numOfQuestions}
          setQuestion={setQuestion}
          setQuestionCounter={setQuestionCounter}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
function updateAnswerLog() {
  return;
}
