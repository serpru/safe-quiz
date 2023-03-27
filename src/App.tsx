import { Avatar, Button, Grid, Paper, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import QuizHeader from "./components/QuizHeader";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Question } from "./models/Question";
import QuizSelect from "./components/QuizSelect";
import QuizScoreTable from "./components/QuizScoreTable";

import { theme } from "./Theme";

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

let questionTEST: Question = {
  body: "AHAH",
  answers: ["Tak", "Nie", "Może", "Bynajmniej"],
  userAnswer: -1,
  correctAnswer: 0,
};

function App() {
  // TODO:
  // deserializacja (?) JSONa
  // wyświetlanie Score'a
  // user profile, nawigacja po appce

  const [route, setRoute] = useState("/");

  const [stepIndex, setStepIndex] = useState(1);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [answerData, setAnswerData] = useState<Question[]>([]);

  //const answers: any[] = answerData;

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <BrowserRouter>
        <Container maxWidth="sm">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <QuizHeader />
                  <QuizSelect />
                </>
              }
            />
            <Route
              path="/oferta"
              element={<Button href="cennik">Test</Button>}
            />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/kontakt" element={<div>Hello, world!3</div>} />
            <Route path="/rejestracja" element={<div>Hello, world!4</div>} />
            <Route
              path="/score"
              element={<QuizScoreTable questions={answerData} />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
