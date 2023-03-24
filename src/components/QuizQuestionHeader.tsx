import { Paper, Typography } from "@mui/material";
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
      <Paper elevation={1}>
        <Typography>{questionCounter}</Typography>
        <Typography>Pytanie: {children}</Typography>
      </Paper>
    </>
  );
}
