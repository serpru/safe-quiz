import { Avatar, Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useState } from "react";
import "./App.css";
import QuizQuestion from "./components/QuizQuestion";
import QuizScoreTable from "./components/QuizScoreTable";
import QuizSelect from "./components/QuizSelect";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

import { Question } from "./data/Question";

function App() {
  let questionTestObject: Question[] = [
    {
      body: "Kto stworzył system Linux?",
      answers: ["Mark Zuckerberg", "Elderyu", "Linus Torvalds", "Savio"],
      userAnswer: -1,
      correctAnswer: 2,
    },
    {
      body: "Kto chce wymyśleć pytanie z odpowiedziami?",
      answers: [
        "Nie ja - Elderyu",
        "O co chodzi - Zakaridus",
        "*cisza* - Pandek",
        "*gra w Hadesa* - Mor",
      ],
      userAnswer: -1,
      correctAnswer: 0,
    },
  ];

  const numOfQuestions = questionTestObject.length;
  const [stepIndex, setStepIndex] = useState(1);
  const [questionCounter, setQuestionCounter] = useState(1);

  const [questions, setQuestionTest] = useState(questionTestObject);

  // TODO:
  // deserializacja (?) JSONa
  // wyświetlanie Score'a
  // user profile, nawigacja po appce

  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Container maxWidth="sm">
        <Typography align="center" variant="h1">
          SafeQuiz
        </Typography>
        {stepIndex === 1 && (
          <QuizSelect setStepIndex={setStepIndex}></QuizSelect>
        )}
        {stepIndex === 2 && (
          <QuizQuestion
            questionsData={questions}
            questionCounter={questionCounter}
            setStepIndex={setStepIndex}
            setQuestionCounter={setQuestionCounter}
            setQuestions={setQuestionTest}
          ></QuizQuestion>
        )}
        {stepIndex === 3 && (
          <QuizScoreTable
            questions={questions}
            setStepIndex={setStepIndex}
          ></QuizScoreTable>
        )}
      </Container>
    </div>
  );
}

export default App;
