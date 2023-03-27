import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { Question } from "../models/Question";

let answerData: Question[] = [
  {
    body: "Kto stworzył system Linux?",
    answers: ["Mark Zuckerberg", "Elderyu", "Linus Torvalds", "Savio"],
    userAnswer: 2,
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

interface Props {
  questions: Question[];
}

export default function QuizScoreTable({ questions }: Props) {
  function getDataFromAPI() {
    console.log("Pobieranie danych z API...");
  }

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <>
      <Paper elevation={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Your score</Typography>
          </Grid>
          <Grid item xs={12}>
            {answerData.map((item, index) => {
              return (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6}>
                    <Typography>Pytanie {index + 1}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {item.userAnswer === item.correctAnswer ? (
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
            <Typography>Score Total</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Score ###</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Button color="primary" variant="contained" href="/">
        Take the quiz again
      </Button>
    </>
  );
}
