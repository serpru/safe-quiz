import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { QuizModel } from "../models/QuizModel";
import { Link, useNavigate } from "react-router-dom";

let mockData: QuizModel = {
  id: 83,
  questions: [
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
    {
      id: 16,
      name: "A to jest czwarte",
      noCorrectAnswer: 0,
      answers: [
        {
          id: 98,
          idQuestion: 2,
          name: "Yay",
          noAnswer: 1,
        },
        {
          id: 113,
          idQuestion: 2,
          name: "Działa!",
          noAnswer: 2,
        },
        {
          id: 220,
          idQuestion: 2,
          name: "Jest super",
          noAnswer: 3,
        },
        {
          id: 341,
          idQuestion: 2,
          name: "Kto chce chrupka?",
          noAnswer: 4,
        },
      ],
    },
  ],
  idxNextQuestion: 0,
};



interface Props {
  setQuiz: (id: QuizModel | null) => void;
}

export default function QuizSelect({ setQuiz }: Props) {
  const [data, setData] = useState<QuizModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const idAccount = 1;
  const navigate = useNavigate();
  const openQuiz = (quiz: QuizModel | null, idAccount: number) => {
    navigate("/quiz", {
      state: { quiz, idAccount },
    });
  };

  const openEdit = (quiz: QuizModel | null, idAccount: number) => {
    navigate("/edit-question", {
      state: { quiz, idAccount },
    });
  };

  useEffect(() => {
    getDataFromApi();
    getDataFromApi();
  }, []);

  useEffect(() => {
    setQuiz(data);
    console.log("Odpala sie");
    console.log(data);
  }, [data]);

  function getDataFromApi() {
    //  TODO Fetch do API po listę pytań
    
    fetch("http://localhost:8081/quizzes/" + idAccount)
      // dodać jako drugi argument (jak już będzie gotowe API {method: "POST",body: body,})
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        console.log("Pobranie Quizu z API");
        return response.json();
      })
      .then((actualData) => {
        const obj: QuizModel = actualData;
        console.log("actual data");
        console.log(actualData);
        setData(obj);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message);
        console.log("ja4jnba90o4jh5oai");
        //setData(null);
        //setLoading(false);
        //setData(mockData);
      })
      .finally(() => {});
  }

  return (
    <Container maxWidth="sm">
      <Box textAlign="center">
        {loading && <div>Ładowanie pytania</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        {/* Pamietaj zeby dodac ponizej warunek !error && jesli korzystasz z API */}
        {!loading && (
          <div>
            {/* <Link to={"/quiz"} state={{ quiz: data }}>
              Open Quiz
            </Link> */}
            <Button
              color="primary"
              variant="contained"
              onClick={() => openQuiz(data, idAccount)}
            >
              Start quiz
            </Button>
          </div>
        )}
        <Button
          color="primary"
          variant="contained"
          href="/edit-question"
          onClick={() => openEdit(data, idAccount)}
        >
          Edycja pytań
        </Button>
      </Box>
    </Container>
  );
}
