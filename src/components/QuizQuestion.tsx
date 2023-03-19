import { Button, Grid, Paper, Typography } from "@mui/material";

import { useState } from "react";
import { Question } from "../data/Question";

interface Props {
  questionCounter?: number;
  questionsData: Question[];
  setStepIndex: (value: number) => void;
  setQuestionCounter: (value: number) => void;
  setQuestions: (question: Question[]) => void;
}

export default function QuizQuestion({
  questionCounter = 1,
  questionsData,
  setStepIndex,
  setQuestionCounter,
  setQuestions,
}: Props) {
  function handleClick(questionIndex: number, answerIndex: number) {
    const updatedQuestions = questionsData.map((question, i) => {
      if (questionIndex === i) {
        let x = { ...question, userAnswer: answerIndex };
        console.log("User answer" + x.userAnswer);
        return x;
      } else {
        return question;
      }
    });

    setQuestions(updatedQuestions);

    console.log("Question index " + questionIndex);
    console.log("Answer index " + answerIndex);

    if (questionCounter >= questionsData.length) {
      setStepIndex(3);
      setQuestionCounter(1);
      return;
    }
    setQuestionCounter(questionCounter + 1);
  }
  return (
    <>
      {questionsData.map((question, questionIndex) => (
        <div key={questionIndex}>
          {questionCounter - 1 === questionIndex && (
            <div key={questionIndex}>
              <Paper elevation={1}>
                <Typography>{questionCounter}</Typography>
                <Typography>Pytanie: {question.body}</Typography>
              </Paper>
              <Grid container spacing={2}>
                {question.answers.map((answer, answerIndex) => (
                  <Grid container spacing={2} key={answerIndex}>
                    <Grid item xs={6}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleClick(questionIndex, answerIndex)}
                      >
                        {answer}
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
