import { Button, Grid, Paper, Typography } from "@mui/material";
import { Question } from "../models/Question";

interface Props {
  questions: Question[];
}

export default function QuizScoreTable({ questions }: Props) {
  console.log(questions);
  return (
    <>
      <Paper elevation={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Your score</Typography>
          </Grid>
          <Grid item xs={12}>
            {questions.map((item, index) => {
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
