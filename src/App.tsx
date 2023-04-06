import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
} from "@mui/material";
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
import QuizEditForm from "./components/QuestionList/QuizQuestionList";

import { theme } from "./Theme";
import QuizQuestionList from "./components/QuestionList/QuizQuestionList";

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
      <CssBaseline />
      <ResponsiveAppBar />
      <BrowserRouter>
        <Container maxWidth="md">
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
            <Route
              path="/edit-question"
              element={<QuizQuestionList></QuizQuestionList>}
            />
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
