import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Question } from "../models/Question";
import { Summary } from "../models/Summary";

interface Props {
  questions: Question[];
}

export default function QuizScoreTable({ questions }: Props) {
  const [correctScore, setCorrectScore] = useState<number>(0);
  const [fullScore, setFullScore] = useState<number | undefined>(0);

  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getDataFromAPI() {
    //  TODO Fetch do API po listę pytań
    fetch("http://localhost:8081/quizzes/summary/" + 1)
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
        const obj: Summary = actualData;
        setData(obj);
        setFullScore(obj.questionSummary.length);
        let correct = 0;
        for (var i = 0; i < obj.questionSummary.length; i++) {
          // tutaj liczyć poprawne odpowiedzi
          if (obj.questionSummary[i].isCorrectAnswer) {
            correct += 1;
          }
        }
        setCorrectScore(correct);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
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
                  {data?.questionSummary.map((item, index) => {
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
