import {
  Alert,
  Backdrop,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Question } from "../../models/Question";
import QuizQuestionListItem from "./QuizQuestionListItem";
import QuizNewQuestionForm from "./QuizNewQuestionForm";
import QuizEditForm from "./QuizEditForm";

let mockList: Question[] = [
  {
    id: 1,
    name: "Kto stworzył system Linux?",
    answers: [
      {
        id: 0,
        idQuestion: 1,
        name: "Ja",
      },
      {
        id: 1,
        idQuestion: 1,
        name: "Bill Gates",
      },
      {
        id: 2,
        idQuestion: 1,
        name: "Linus Torvalds",
      },
      {
        id: 3,
        idQuestion: 1,
        name: "Steve Jobs",
      },
    ],
    userAnswer: -1,
    correctAnswer: 2,
  },
  {
    id: 2,
    name: "To jest pytanie drugie",
    answers: [
      {
        id: 0,
        idQuestion: 2,
        name: "Tak",
      },
      {
        id: 1,
        idQuestion: 2,
        name: "Nie",
      },
      {
        id: 2,
        idQuestion: 2,
        name: "Może",
      },
      {
        id: 3,
        idQuestion: 2,
        name: "Bynajmniej",
      },
    ],
    userAnswer: -1,
    correctAnswer: 0,
  },
];

export default function QuizQuestionList() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClose = () => {
    setOpenAdd(false);
  };
  const handleToggle = () => {
    setOpenAdd(!openAdd);
  };

  const handleAddQuestion = () => {
    console.log("POST do API");
    handleClose();
  };

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);

  //  Snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <Paper className="quiz-question-header" elevation={1}>
        <Typography>Lista pytań</Typography>
        <Box textAlign="center">
          {mockList.map((question, index) => (
            <div key={index}>
              <QuizQuestionListItem question={question} />
            </div>
          ))}
        </Box>
        <Box textAlign="center">
          <Button variant="contained" onClick={handleToggle}>
            Dodaj
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Toast pytanie poprawnie dodane
          </Button>
        </Box>
      </Paper>

      {/* Do przeniesienia*/}
      {openAdd && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openAdd}
        >
          <QuizNewQuestionForm
            handleClose={handleClose}
            handleAdd={handleAddQuestion}
          ></QuizNewQuestionForm>
        </Backdrop>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
}
