import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Question } from "../../models/Question";
import { Answer } from "../../models/Answer";
import { QuestionRequest } from "../../models/QuestionRequest";

interface Props {
  question: Question;
  handleClose: () => void;
}

export default function QuizEditForm({ question, handleClose }: Props) {
  const [questionBody, setQuestionBody] = useState(question.name);
  const [correctAnswer, setCorrectAnswer] = useState(
    question.idCorrectAnswer?.toString()
  );
  const [questionAnswers, setQuestionAnswers] = useState<Answer[]>(
    question.answers
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectAnswer((event.target as HTMLInputElement).value);
    console.log((event.target as HTMLInputElement).value);
    //setHelperText(" ");
    //setError(false);
  };

  const handleSubmitEdit = async () => {
    console.log(questionBody);
    console.log(questionAnswers);
    console.log(correctAnswer);

    let questionReq: QuestionRequest = {
      id: question.id,
      name: questionBody,
      answers: questionAnswers,
      idCorrectAnswer: Number(correctAnswer),
    };

    console.log(JSON.stringify(questionReq));

    const response = await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        console.log("Pobranie pytania z API");
        return response.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    console.log(questionAnswers);
  }, [questionAnswers]);

  function handleAddAnswer() {
    const x = { idQuestion: question.id, name: "" } as Answer;
    setQuestionAnswers([...questionAnswers, x]);
  }

  function handleDeleteAnswer(item: Answer, index: number) {
    console.log(item.id);
    console.log(questionAnswers);
    let a = questionAnswers.filter((x, ind) => ind !== index);
    setQuestionAnswers(a);
    console.log("Po handleDelete");
    console.log(questionAnswers);
  }

  return (
    <Paper className="quiz-question-header" elevation={1}>
      <Box textAlign={"right"}>
        <IconButton onClick={handleClose} aria-label="delete">
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography>Edytowanie pytania</Typography>
      <form>
        <FormControl variant="standard">
          <Grid container justifyContent={"center"} rowGap={0}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label={"Treść pytania"}
                defaultValue={questionBody}
                variant="outlined"
                fullWidth
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setQuestionBody(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={question.idCorrectAnswer?.toString()}
                name="radio-buttons-group"
                onChange={handleRadioChange}
              >
                {questionAnswers.map(
                  (item, i) => (
                    console.log("item"),
                    console.log(item.name),
                    (
                      <Grid item xs={12} key={i}>
                        <TextField
                          id="outlined-basic"
                          label={"Odpowiedź"}
                          variant="outlined"
                          value={item.name}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            let newQuestionAnswers = questionAnswers.map(
                              (questionAnswer) => {
                                if (questionAnswer === item) {
                                  return {
                                    ...questionAnswer,
                                    name: event.target.value,
                                  };
                                } else {
                                  return questionAnswer;
                                }
                              }
                            );
                            setQuestionAnswers(newQuestionAnswers);
                          }}
                        />
                        <FormControlLabel
                          value={i}
                          control={<Radio />}
                          label=""
                        />
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            handleDeleteAnswer(item, i);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    )
                  )
                )}
              </RadioGroup>
              <FormHelperText>Text</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <IconButton onClick={handleAddAnswer}>
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleSubmitEdit}>
            Zatwierdź
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
}
