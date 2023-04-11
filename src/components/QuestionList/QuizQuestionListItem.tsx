import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Question } from "../../models/Question";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuizEditForm from "./QuizEditForm";

interface Props {
  question: Question;
}

export default function QuizQuestionListItem({ question }: Props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [editButtonText, setEditButtonText] = useState("Edytuj");

  const [openEdit, setOpenEdit] = React.useState(false);

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

  return (
    <>
      <Paper variant="outlined">
        <Box
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
          <Button
            onClick={handleToggle}
            sx={{ height: "60%" }}
            variant="contained"
          >
            Edytuj
          </Button>
          <Button sx={{ height: "60%" }} variant="contained">
            Usuń
          </Button>
        </Box>
        <Grid container>
          {question.answers.map((answer, index) => (
            <Grid item xs={6} key={index}>
              <TextField
                id="outlined-basic"
                defaultValue={answer.name}
                variant="outlined"
                disabled={isDisabled}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
      {openEdit && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={openEdit}
        >
          <QuizEditForm
            question={question}
            handleClose={handleClose}
          ></QuizEditForm>
        </Backdrop>
      )}
    </>
  );
}
