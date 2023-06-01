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

import { theme } from "./Theme";
import QuizQuestionList from "./components/QuestionList/QuizQuestionList";
import { QuizModel } from "./models/QuizModel";
import QuizRanking from "./components/QuizRanking";
import LoginForm from "./components/LoginForm";

function App() {
  const [route, setRoute] = useState("/");

  const [answerData, setAnswerData] = useState<Question[]>([]);

  const [quiz, setQuiz] = useState<QuizModel | null>(null);

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
                  <QuizSelect setQuiz={() => setQuiz} />
                </>
              }
            />
            <Route path="/ranking" element={<QuizRanking></QuizRanking>} />
            <Route path="/quiz" element={<Quiz />} />
            <Route
              path="/edit-question"
              element={<QuizQuestionList></QuizQuestionList>}
            />
            <Route path="/admin-panel" element={<div>Hello, world!4</div>} />
            <Route
              path="/score"
              element={<QuizScoreTable questions={answerData} />}
            />
            <Route path="/login" element={<LoginForm></LoginForm>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
