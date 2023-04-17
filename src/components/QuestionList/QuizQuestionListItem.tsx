import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Question } from "../../models/Question";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuizEditForm from "../Deprecated/QuizEditForm";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props {
  question: Question;
  selectEditItem: (item: Question | undefined) => void;
}

export default function QuizQuestionListItem({
  question,
  selectEditItem,
}: Props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [editButtonText, setEditButtonText] = useState("Edytuj");

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  function onClick() {
    setIsDisabled(!isDisabled);
    setEditButtonText(isDisabled ? "Zatwierdź" : "Edytuj");
  }

  const handleClose = () => {
    setOpenEdit(false);
  };
  const handleToggle = () => {
    setOpenEdit(!openEdit);
  };

  const handleToggleDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  async function handleDelete() {
    const response = await fetch(
      "http://localhost:8080/questions/" + question.id,
      { method: "DELETE" }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(response.status);
    handleCloseDelete();
  }

  return (
    <div>
      <Paper className="quiz-question-list-item" variant="outlined">
        <Box
          className="form-item"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            defaultValue={question.name}
            variant="outlined"
            disabled={isDisabled}
            fullWidth
          />
          <Box
            className="form-button"
            sx={{ width: "40%", justifyContent: "space-between" }}
          >
            <Button
              onClick={() => selectEditItem(question)}
              sx={{ height: "60%", margin: "2% 2% 2% 2%" }}
              variant="contained"
            >
              Edytuj
            </Button>
            <Button
              onClick={handleToggleDelete}
              sx={{ height: "60%", margin: "2% 2% 2% 2%" }}
              variant="contained"
            >
              Usuń
            </Button>
          </Box>
        </Box>
        <Grid container columnGap={0}>
          {question.answers.map((answer, index) => (
            <Grid
              item
              xs={6}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
              justifyItems={"center"}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  id="outlined-basic"
                  defaultValue={answer.name}
                  variant="outlined"
                  disabled={isDisabled}
                  color={
                    index === question.idCorrectAnswer ? "success" : "warning"
                  }
                />
                {index === question.idCorrectAnswer ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
      {openDelete && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={openDelete}
        >
          <Paper>
            <Box textAlign={"right"}>
              <IconButton onClick={handleCloseDelete} aria-label="delete">
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography>Czy napewno chcesz usunąć pytanie?</Typography>
            <Button onClick={handleDelete}>Tak</Button>
          </Paper>
        </Backdrop>
      )}
    </div>
  );
}
