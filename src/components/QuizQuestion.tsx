import { Button, Grid, Paper, Typography } from "@mui/material";

import { useState } from "react";
import { Question } from "../models/Question";
import QuizQuestionAnswers from "./QuizQuestionAnswers";
import QuizQuestionHeader from "./QuizQuestionHeader";

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
  const [nextQButtonVisible, setNextQButtonVisible] = useState(false);

  function handleClick(questionIndex: number, answerIndex: number) {
    //Post do histori api quizów
    //handleClick - wyświetla przycisk na dole.
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

    setNextQButtonVisible(true);
  }

  function nextQuestion() {
    if (questionCounter >= questionsData.length) {
      setStepIndex(3);
      setQuestionCounter(1);
      return;
    }
    setQuestionCounter(questionCounter + 1);
    setNextQButtonVisible(false);
  }

  return (
    <>
      {questionsData.map((question, questionIndex) => (
        <div key={questionIndex}>
          {questionCounter - 1 === questionIndex && (
            <div key={questionIndex}>
              <QuizQuestionHeader questionCounter={questionCounter}>
                {question.body}
              </QuizQuestionHeader>
              <Grid container spacing={2}>
                {question.answers.map((answer, answerIndex) => (
                  //nowy container za kazdym razem do usuniecia
                  // <QuizQuestionAnswer onClick={handleClick}>{answer}</ QuizQuestionAnswer>
                  <Grid item xs={6}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleClick(questionIndex, answerIndex)}
                    >
                      {answer}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              {nextQButtonVisible && (
                <Button onClick={nextQuestion}>Next question</Button>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
