import { Box, Button, Paper, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  questionCounter: number;
}

export default function QuizQuestionHeader({
  children,
  questionCounter,
}: Props) {
  return (
    <>
      <Paper className="quiz-question-header" elevation={1}>
        <Typography></Typography>
        <Typography>
          {questionCounter}. Pytanie: {children}
        </Typography>
        <Box textAlign={"right"}>
          <Button color={"error"} size="small" variant="outlined">
            Zgłoś pytanie
          </Button>
        </Box>
      </Paper>
    </>
  );
}
