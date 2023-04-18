import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHref } from "react-router-dom";
import { Question } from "../models/Question";
import QuizQuestion from "./QuizQuestion";
import QuizScoreTable from "./QuizScoreTable";
import QuizSelect from "./QuizSelect";
import { QuestionRequest } from "../models/QuestionRequest";

let questions: Question[] = [
  {
    id: 1,
    name: "Kto stworzył system Linux?",
    noCorrectAnswer: 2,
    answers: [
      {
        id: 23,
        idQuestion: 1,
        name: "Ja",
        noAnswer: 1,
      },
      {
        id: 11,
        idQuestion: 1,
        name: "Bill Gates",
        noAnswer: 2,
      },
      {
        id: 27,
        idQuestion: 1,
        name: "Linus Torvalds",
        noAnswer: 3,
      },
      {
        id: 33,
        idQuestion: 1,
        name: "Steve Jobs",
        noAnswer: 4,
      },
    ],
  },
  {
    id: 2,
    name: "To jest pytanie drugie",
    noCorrectAnswer: 0,
    answers: [
      {
        id: 56,
        idQuestion: 2,
        name: "Tak",
        noAnswer: 1,
      },
      {
        id: 13,
        idQuestion: 2,
        name: "Nie",
        noAnswer: 2,
      },
      {
        id: 20,
        idQuestion: 2,
        name: "Może",
        noAnswer: 3,
      },
      {
        id: 31,
        idQuestion: 2,
        name: "Bynajmniej",
        noAnswer: 4,
      },
    ],
  },
  {
    id: 16,
    name: "To jest pytanie trzecie",
    noCorrectAnswer: 0,
    answers: [
      {
        id: 98,
        idQuestion: 2,
        name: "OK",
        noAnswer: 1,
      },
      {
        id: 113,
        idQuestion: 2,
        name: "FAJNIE",
        noAnswer: 2,
      },
      {
        id: 220,
        idQuestion: 2,
        name: "NIECH TO DZIAŁA BŁAGAM",
        noAnswer: 3,
      },
      {
        id: 341,
        idQuestion: 2,
        name: "KEK",
        noAnswer: 4,
      },
    ],
  },
];

export default function Quiz() {
  //const [questionID, setQuestionID] = useState<number>(1);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [isLast, setIsLast] = useState(false);

  // Fetch, łączenie do API, prototyp
  const [data, setData] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //  TODO Fetch do API po listę pytań
    fetch("http://localhost:8080/questions")
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
        const obj: Question[] = actualData;
        console.log("actual data");
        console.log(actualData);
        setData(obj);
        setError(null);
      })
      .catch((err) => {
        //setError(err.message);
        setData(null);
        setLoading(false);
        setData(questions);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    console.log("Num of q");
    console.log(data?.length);
  }, [data]);

  useEffect(() => {
    console.log("Question counter Use Effect");
    console.log(questionCounter);
    console.log(typeof questionCounter);
    console.log("questionCounter === numOfQuestions");
    console.log(questionCounter === data?.length);
    console.log(data?.length);
    console.log(typeof data?.length);
    if (questionCounter === data?.length) {
      setIsLast(true);
    }
  }, [questionCounter]);

  useEffect(() => {
    console.log("isLast UE");
    console.log(isLast);
  }, [isLast]);

  function getNextQuestion() {
    console.log("Kolejne pytanie");
    console.log("Question counter");
    console.log(questionCounter);
  }

  return (
    <div className="quiz">
      {loading && <div>Ładowanie pytania</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {/* Pamietaj zeby dodac ponizej warunek !error && jesli korzystasz z API */}
      {!loading && (
        <QuizQuestion
          question={data![questionCounter - 1]}
          questionCounter={questionCounter}
          isLast={isLast}
          setQuestionCounter={setQuestionCounter}
          getNextQuestion={getNextQuestion}
        />
      )}
    </div>
  );
}
