import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Question } from "../models/Question";
import { QuestionSummary } from "../models/QuestionSummary";

let answerData: QuestionSummary[] = [
  {
    question: {
      id: 1,
      name: "Kto stworzył system Linux?",
      noCorrectAnswer: 2,
      answers: [
        {
          id: 0,
          idQuestion: 1,
          name: "Ja",
          noAnswer: 0,
        },
        {
          id: 1,
          idQuestion: 1,
          name: "Bill Gates",
          noAnswer: 1,
        },
        {
          id: 2,
          idQuestion: 1,
          name: "Linus Torvalds",
          noAnswer: 2,
        },
        {
          id: 3,
          idQuestion: 1,
          name: "Steve Jobs",
          noAnswer: 3,
        },
      ],
    },
    isCorrectAnswer: true,
  },
  {
    question: {
      id: 2,
      name: "To jest pytanie drugie",
      noCorrectAnswer: 0,
      answers: [
        {
          id: 0,
          idQuestion: 2,
          name: "Tak",
          noAnswer: 0,
        },
        {
          id: 1,
          idQuestion: 2,
          name: "Nie",
          noAnswer: 1,
        },
        {
          id: 2,
          idQuestion: 2,
          name: "Może",
          noAnswer: 2,
        },
        {
          id: 3,
          idQuestion: 2,
          name: "Bynajmniej",
          noAnswer: 3,
        },
      ],
    },
    isCorrectAnswer: false,
  },
];

interface Props {
  questions: Question[];
}

export default function QuizScoreTable({ questions }: Props) {
  const [correctScore, setCorrectScore] = useState<number>(0);
  const [fullScore, setFullScore] = useState(0);

  const [data, setData] = useState<QuestionSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getDataFromAPI() {
    console.log("Pobieranie danych z API...");
    // quizzes/summary/id

    //  TODO Fetch do API po listę pytań
    fetch("http://localhost:8080/quizzes/summary/" + 1)
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
        const obj: QuestionSummary[] = actualData;
        console.log("actual data");
        console.log(actualData);
        setData(obj);
        setError(null);
      })
      .catch((err) => {
        //setError(err.message);
        setLoading(false);
        setData(answerData);
        setFullScore(answerData.length);
        for (var i = 0; i < answerData.length; i++) {
          // tutaj liczyć poprawne odpowiedzi
          if (answerData[i].isCorrectAnswer) {
            setCorrectScore(correctScore + 1);
          }
        }
      })
      .finally(() => {});
  }

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <>
      {loading && <div>Ładowanie wyników</div>}
      {!loading && (
        <div className="quiz quiz-score">
          <Paper className="quiz-score-body" elevation={1}>
            <Box textAlign="center">
              <Grid
                justifyContent={"space-evenly"}
                container
                rowSpacing={2}
                spacing={2}
              >
                <Grid item xs={12}>
                  <Typography variant="h4" align="center">
                    Wynik quizzu
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {answerData.map((item, index) => {
                    return (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={6}>
                          <Typography>Pytanie {index + 1}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {item.isCorrectAnswer ? (
                            <Typography>✅</Typography>
                          ) : (
                            <Typography>❌</Typography>
                          )}
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Twój wynik</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    {correctScore} / {fullScore}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <Box className="quiz-question-buttons" textAlign="center">
            <Button color="primary" variant="contained" href="/">
              Take the quiz again
            </Button>
          </Box>
        </div>
      )}
    </>
  );
}
