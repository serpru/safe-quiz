import { Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/system/Box";

import { useEffect, useState } from "react";
import { Question } from "../models/Question";
import QuizQuestionAnswer from "./QuizQuestionAnswer";
import QuizQuestionAnswers from "./QuizQuestionAnswer";
import QuizQuestionHeader from "./QuizQuestionHeader";
import { QuestionRequest } from "../models/QuestionRequest";
import { QuizHistoryRequest } from "../models/QuizHistoryRequest";
import { useLocation } from "react-router-dom";
import { QuizModel } from "../models/QuizModel";

interface Props {
  idAccount: number;
  quiz: QuizModel;
  questionCounter?: number;
  question: Question | undefined;
  isLast: boolean;
  setQuestionCounter: (value: number) => void;
  getNextQuestion: () => void;
}

export default function QuizQuestion({
  idAccount,
  quiz,
  questionCounter = 1,
  question,
  isLast,
  getNextQuestion,
  setQuestionCounter,
}: Props) {
  const [nextQButtonVisible, setNextQButtonVisible] = useState(false);
  const [finishQButtonVisible, setFinishQButtonVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  async function handleClick(answerIndex: number) {
    //Post do histori api quizów
    console.log("POST odpowiedzi usera do API");
    console.log("Wybrana odpowiedz");
    console.log(selectedItem);
    console.log("Tralala");

    let request: QuizHistoryRequest = {
      idAccount: idAccount,
      idQuestion: question?.id,
      idQuiz: quiz.id,
      isCorrectAnswer: question?.noCorrectAnswer === answerIndex,
    };

    await fetch("http://localhost:8080/quiz-histories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        console.log("Wysłanie pytania do API");
        return response.json();
      })
      .catch((err) => {
        console.log(err.message);
      });

    if (isLast) {
      console.log("Przekierowanie do tablicy wyników");
    }
    nextQuestion();
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
            {question?.name}
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
                  {answer.name}
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
            }}
          >
            Next question
          </Button>
        )}
        {finishQButtonVisible && (
          <Button
            variant="contained"
            fullWidth
            href="\score"
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
