import { Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/system/Box";

import { useEffect, useState } from "react";
import { Question } from "../models/Question";
import QuizQuestionAnswer from "./QuizQuestionAnswer";
import QuizQuestionAnswers from "./QuizQuestionAnswer";
import QuizQuestionHeader from "./QuizQuestionHeader";

interface Props {
  questionCounter?: number;
  question: Question | null;
  isLast: boolean;
  setQuestionCounter: (value: number) => void;
  getNextQuestion: () => void;
}

export default function QuizQuestion({
  questionCounter = 1,
  question,
  isLast,
  getNextQuestion,
  setQuestionCounter,
}: Props) {
  const [nextQButtonVisible, setNextQButtonVisible] = useState(false);
  const [finishQButtonVisible, setFinishQButtonVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  function handleClick(answerIndex: number) {
    //Post do histori api quizów
    console.log("POST odpowiedzi usera do API");
    // setQuestion({
    //   ...question,
    //   userAnswer: answerIndex,
    // });

    console.log("User answer " + question?.userAnswer);
    console.log("Answer index " + answerIndex);
    if (question?.userAnswer == question?.correctAnswer) {
      console.log("Odpowiedz poprawna!");
    }
  }

  function nextQuestion() {
    setQuestionCounter(questionCounter + 1);
    setSelectedItem(-1);
    setNextQButtonVisible(false);
    getNextQuestion();
  }

  function selectAnswer(answerIndex: number) {
    setSelectedItem(answerIndex);
    if (isLast) {
      setFinishQButtonVisible(true);
    } else {
      setNextQButtonVisible(true);
    }
  }

  return (
    <>
      <div className="quiz-question" key={questionCounter}>
        <div>
          <QuizQuestionHeader questionCounter={questionCounter}>
            {question?.body}
          </QuizQuestionHeader>
        </div>
        <Box className="quiz-question-buttons">
          <Grid
            justifyContent={"space-evenly"}
            container
            spacing={2}
            rowSpacing={2}
          >
            {question?.answers.map((answer, answerIndex) => (
              <Grid item xs={6} key={answerIndex}>
                <QuizQuestionAnswer
                  selectedItem={selectedItem}
                  answerIndex={answerIndex}
                  onClick={() => selectAnswer(answerIndex)}
                >
                  {answer}
                </QuizQuestionAnswer>
              </Grid>
            ))}
          </Grid>
        </Box>
        {nextQButtonVisible && (
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              handleClick(selectedItem);
              nextQuestion();
            }}
          >
            Next question
          </Button>
        )}
        {finishQButtonVisible && (
          <Button
            variant="contained"
            fullWidth
            //href="\score"
            onClick={() => {
              handleClick(selectedItem);
            }}
          >
            Finish quiz
          </Button>
        )}
      </div>
    </>
  );
}
