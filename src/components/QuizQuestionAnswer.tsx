import { Box, Button, Color, Grid } from "@mui/material";
import React, { ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
  selectedItem: number;
  answerIndex: number;
  onClick: (answerIndex: number) => void;
}

export default function QuizQuestionAnswer({
  children,
  selectedItem,
  answerIndex,
  onClick,
}: Props) {
  return (
    <Box textAlign="center">
      <Button
        fullWidth
        color={"primary"}
        variant={selectedItem === answerIndex ? "contained" : "outlined"}
        onClick={() => onClick(answerIndex)}
      >
        {children}
      </Button>
    </Box>
  );
}
