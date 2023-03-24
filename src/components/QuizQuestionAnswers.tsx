import { Button, Color, Grid } from "@mui/material";
import { color } from "@mui/system";
import React, { ReactNode, useState } from "react";
import { Question } from "../models/Question";

interface Props {
  children: ReactNode;
  questionIndex: number;
  answerIndex: number;
  onClick: () => void;
}

export default function QuizQuestionAnswers({ children, questionIndex, answerIndex, onClick }: Props) {
    const [buttonColor, setButtonColor] = useState("primary")

    function handleClick(answerIndex: number) {
        if (answerIndex == questionIndex)
            setButtonColor("success")
    }

    return (
    <>
      <Grid item xs={6}>
        <Button color="primary" variant="contained" onClick={() => handleClick(answerIndex)}>
          {children}
        </Button>
      </Grid>
    </>
  );
}
