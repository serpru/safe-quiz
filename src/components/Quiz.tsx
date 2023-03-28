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

  // Fetch, łączenie do API, prototyp
  const [data, setData] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let body = new FormData();
    body.append("id", questionCounter.toString());
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      // dodać jako drugi argument (jak już będzie gotowe API {method: "POST",body: body,})
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let questionFromAPI = {
          body: "To jest pytanie z API",
          answers: ["Fajnie", "Ok?", "Kłamstwo", "Modulo 7"],
          userAnswer: 0,
          correctAnswer: 0,
        };
        console.log("Pobranie pytania z API");
        return JSON.stringify(questionFromAPI);
      })
      .then((actualData) => {
        let obj: Question = JSON.parse(actualData);
        setData(obj);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [questionCounter]);
  //######################################

  function getNextQuestion() {
    // GET pytanie z API
    console.log("Kolejne pytanie");
    setQuestion(question2);
  }

  return (
    <div className="quiz">
      {loading && <div>Ładowanie pytania</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {questionCounter <= numOfQuestions && (
        <QuizQuestion
          question={data}
          questionCounter={questionCounter}
          isLast={questionCounter === numOfQuestions}
          setQuestionCounter={setQuestionCounter}
          getNextQuestion={getNextQuestion}
        />
      )}
    </div>
  );
}
