import {
  Alert,
  AlertColor,
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
import React, { useEffect, useState } from "react";
import { Question } from "../../models/Question";
import QuizQuestionListItem from "./QuizQuestionListItem";
import QuizNewQuestionForm from "./QuizNewQuestionForm";
import QuizEditForm from "../Deprecated/QuizEditForm";

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
    idCorrectAnswer: 2,
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
    idCorrectAnswer: 0,
  },
];

let mockListIndexes = [1, 6, 7, 13, 14];

export default function QuizQuestionList() {
  const [mockQuestionList, setMockQuestionList] = useState<Question[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectEditItem, setSelectEditItem] = useState<Question | undefined>();

  function addQuestionToList(question: Question) {
    const newQuestionList = [...mockQuestionList, question];
    setMockQuestionList(newQuestionList);
  }

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClose = () => {
    setOpenAdd(false);
  };
  const handleToggle = (item: Question | undefined) => {
    setSelectEditItem(item);
    setOpenAdd(!openAdd);
  };

  const handleSubmitQuestion = (status: number) => {
    console.log("handleSubmitQuestion");
    console.log(status);
    handleOpenSnackbar(status);
    handleClose();
  };

  useEffect(() => {
    let textPromise = new Promise(() => {
      fetch("http://localhost:8080/questions/" + 1)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((actualData) => {
          const obj: Question = actualData;
          console.log("actual data");
          //console.log(actualData);
          addQuestionToList(obj);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setMockQuestionList(mockList);
        });
    });

    let textPromise2 = new Promise(() => {
      fetch("http://localhost:8080/questions/" + 1)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((actualData) => {
          const obj: Question = actualData;
          console.log("actual data");
          //console.log(actualData);
          addQuestionToList(obj);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {});
    });

    Promise.all([textPromise, textPromise2]);
    setLoading(false);
    console.log("Mock list");
    console.log(mockQuestionList);
  }, []);

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);

  //  Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = (status: number) => {
    if (status === 200) {
      setAlertText("Pomyślnie dodano pytanie");
      setAlertTextSeverity("success");
    } else if (status === 500) {
      setAlertText("Wystąpił błąd");
      setAlertTextSeverity("error");
    }
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

  //  Toast
  const [alertText, setAlertText] = useState("Unknown alert");
  const [alertTextSeverity, setAlertTextSeverity] =
    useState<AlertColor>("warning");

  return (
    <>
      <Paper className="quiz-question-header" elevation={1}>
        {loading && <div>Ładowanie pytania</div>}
        {!loading && (
          <>
            <Typography>Lista pytań</Typography>
            <Box textAlign="center">
              {mockQuestionList.map((question, index) => (
                <div key={index}>
                  <QuizQuestionListItem
                    question={question}
                    selectEditItem={handleToggle}
                  />
                </div>
              ))}
            </Box>
            <Box textAlign="center">
              <Button
                variant="contained"
                onClick={() => handleToggle(undefined)}
              >
                Dodaj
              </Button>
              <Button
                variant="contained"
                onClick={() => handleOpenSnackbar(400)}
              >
                Toast pytanie poprawnie dodane
              </Button>
            </Box>
          </>
        )}
      </Paper>

      {/* Do przeniesienia*/}
      {openAdd && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openAdd}
        >
          <QuizNewQuestionForm
            data={selectEditItem}
            handleClose={handleClose}
            selectEditItem={setSelectEditItem}
            handleSubmit={handleSubmitQuestion}
          ></QuizNewQuestionForm>
        </Backdrop>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertTextSeverity}
          sx={{ width: "100%" }}
        >
          {alertText}
        </Alert>
      </Snackbar>
    </>
  );
}
