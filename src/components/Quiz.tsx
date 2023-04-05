import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHref } from "react-router-dom";
import { Question } from "../models/Question";
import QuizQuestion from "./QuizQuestion";
import QuizScoreTable from "./QuizScoreTable";
import QuizSelect from "./QuizSelect";

// TODO
// <Quiz> powinien listować QuizQuestion w for loopie, nie QuizQuestion
const numOfQuestions: number = 2;

export default function Quiz() {
  const [questionID, setQuestionID] = useState<number>(7);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [isLast, setIsLast] = useState(false);

  // Fetch, łączenie do API, prototyp
  const [data, setData] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(questionCounter);
    setIsLast(questionCounter === numOfQuestions);
    fetch("http://localhost:8080/questions/" + questionID)
      // dodać jako drugi argument (jak już będzie gotowe API {method: "POST",body: body,})
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        console.log("Pobranie pytania z API");
        return response.json();
      })
      .then((actualData) => {
        const obj: Question = actualData;
        console.log("actual data");
        console.log(actualData);
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
    setQuestionID(questionID + 1);
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
          isLast={isLast}
          setQuestionCounter={setQuestionCounter}
          getNextQuestion={getNextQuestion}
        />
      )}
    </div>
  );
}
