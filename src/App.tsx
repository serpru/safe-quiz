import { Avatar, Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import QuizHeader from "./components/QuizHeader";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

import { Question } from "./models/Question";

function App() {


  // TODO:
  // deserializacja (?) JSONa
  // wyświetlanie Score'a
  // user profile, nawigacja po appce

  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Container maxWidth="sm">
        <QuizHeader />
        <Quiz />
      </Container>
    </div>
  );
}

export default App;
