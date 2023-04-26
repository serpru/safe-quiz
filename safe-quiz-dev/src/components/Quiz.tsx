import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHref, useLocation } from "react-router-dom";
import { Question } from "../models/Question";
import QuizQuestion from "./QuizQuestion";
import QuizScoreTable from "./QuizScoreTable";
import QuizSelect from "./QuizSelect";
import { QuestionRequest } from "../models/QuestionRequest";
import { QuizModel } from "../models/QuizModel";

// interface Props {
//   quiz: QuizModel | null;
// }

export default function Quiz() {
  //const [questionID, setQuestionID] = useState<number>(1);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [isLast, setIsLast] = useState(false);

  const location = useLocation();

  // Fetch, łączenie do API, prototyp
  const [data, setData] = useState<QuizModel | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   //  TODO Fetch do API po listę pytań
  //   fetch("http://localhost:8080/questions")
  //     // dodać jako drugi argument (jak już będzie gotowe API {method: "POST",body: body,})
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(
  //           `This is an HTTP error: The status is ${response.status}`
  //         );
  //       }
  //       console.log("Pobranie pytania z API");
  //       return response.json();
  //     })
  //     .then((actualData) => {
  //       const obj: Question[] = actualData;
  //       console.log("actual data");
  //       console.log(actualData);
  //       setData(obj);
  //       setError(null);
  //     })
  //     .catch((err) => {
  //       //setError(err.message);
  //       setData(null);
  //       setLoading(false);
  //       setData(questions);
  //     })
  //     .finally(() => {});
  // }, []);

  useEffect(() => {
    console.log("Num of q");
    console.log(location.state.quiz.questions.length);
  }, [data]);

  useEffect(() => {
    console.log("Location");
    console.log(location.state.quiz);
    if (location.state.quiz) {
      setLoading(false);
    } else {
      console.log("HAHAHAHAHAH");
    }
    if (questionCounter === location.state.quiz.questions.length) {
      setIsLast(true);
    }
  }, [questionCounter]);

  useEffect(() => {
    console.log("isLast UE");
    console.log(isLast);
  }, [isLast]);

  useEffect(() => {
    setQuestionCounter(location.state.quiz.idxNextQuestion);
  }, []);

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
          quiz={location.state.quiz}
          idAccount={location.state.idAccount}
          question={location.state.quiz.questions[questionCounter - 1]}
          questionCounter={questionCounter}
          isLast={isLast}
          setQuestionCounter={setQuestionCounter}
          getNextQuestion={getNextQuestion}
        />
      )}
    </div>
  );
}
