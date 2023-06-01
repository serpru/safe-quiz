import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { QuizModel } from "../models/QuizModel";
import { useNavigate } from "react-router-dom";

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
  }, [data]);

  function getDataFromApi() {
    //  TODO Fetch do API po listę pytań

    fetch("http://localhost:8080/quizzes/" + idAccount)
      // dodać jako drugi argument (jak już będzie gotowe API {method: "POST",body: body,})
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        const obj: QuizModel = actualData;
        setData(obj);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(err);
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
        {!loading && (
          <div>
            <Button
              color="primary"
              variant="contained"
              onClick={() => openQuiz(data, idAccount)}
              disabled={error ? true : false}
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
