import { Button, Grid, Paper, Typography } from "@mui/material";

import { useState } from "react";
import { Question } from "../models/Question";
import QuizQuestionAnswers from "./QuizQuestionAnswer";
import QuizQuestionHeader from "./QuizQuestionHeader";

interface Props {
  questionCounter?: number;
  question: Question;
  isLast: boolean;
  onChange: () => void;
  setQuestion: (question: Question) => void;
  setQuestionCounter: (value: number) => void;
}

export default function QuizQuestion({
  questionCounter = 1,
  question,
  isLast,
  onChange,
  setQuestion,
  setQuestionCounter,
}: Props) {
  const [nextQButtonVisible, setNextQButtonVisible] = useState(false);
  const [finishQButtonVisible, setFinishQButtonVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  function handleClick(answerIndex: number) {
    //Post do histori api quizów
    setQuestion({
      ...question,
      userAnswer: answerIndex,
    });

    console.log("User answer " + question.userAnswer);
    console.log("Answer index " + answerIndex);
    if (question.userAnswer == question.correctAnswer) {
      console.log("Odpowiedz poprawna!");
    }
    if (isLast) {
      setFinishQButtonVisible(true);
    } else {
      setNextQButtonVisible(true);
    }
  }

  function nextQuestion() {
    setQuestionCounter(questionCounter + 1);
    setSelectedItem(-1);
    setNextQButtonVisible(false);
  }

  return (
    <>
      <div key={questionCounter}>
        <QuizQuestionHeader questionCounter={questionCounter}>
          {question.body}
        </QuizQuestionHeader>
        <Grid container spacing={2}>
          {question.answers.map((answer, answerIndex) => (
            <Grid item xs={6} key={answerIndex}>
              <Button
                color={selectedItem == answerIndex ? "success" : "primary"}
                variant="contained"
                onClick={() => {
                  handleClick(answerIndex);
                  setSelectedItem(answerIndex);
                }}
              >
                {answer}
              </Button>
            </Grid>
          ))}
        </Grid>
        {nextQButtonVisible && (
          <Button
            onClick={() => {
              onChange();
              nextQuestion();
            }}
          >
            Next question
          </Button>
        )}
        {finishQButtonVisible && (
          <Button
            href="\score"
            onClick={() => {
              onChange();
            }}
          >
            Finish quiz
          </Button>
        )}
      </div>
    </>
  );
}
