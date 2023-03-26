import { Avatar, Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import QuizHeader from "./components/QuizHeader";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Question } from "./models/Question";
import QuizSelect from "./components/QuizSelect";
import QuizQuestion from "./components/QuizQuestion";
import QuizScoreTable from "./components/QuizScoreTable";

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
    <div>
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
            <Route
              path="/quiz"
              element={
                <Quiz answerData={answerData} setAnswerData={setAnswerData} />
              }
            />
            <Route path="/kontakt" element={<div>Hello, world!3</div>} />
            <Route path="/rejestracja" element={<div>Hello, world!4</div>} />
            <Route
              path="/score"
              element={<QuizScoreTable questions={answerData} />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
