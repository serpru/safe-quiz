import { Button, Grid, Typography } from "@mui/material";
import React from "react";

function test() {
  console.log("test");
}

interface Props {
  setStepIndex: (value: number) => void;
}

export default function QuizSelect({ setStepIndex }: Props) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setStepIndex(2)}
          >
            Quiz 1
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button color="primary" variant="contained" disabled>
            Quiz 2
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button color="primary" variant="contained" disabled>
            Quiz 3
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button color="primary" variant="contained" disabled>
            Quiz 4
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
