import {
  Alert,
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
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useEffect, useState } from "react";
import { Answer } from "../../models/Answer";
import { Question } from "../../models/Question";
import DeleteIcon from "@mui/icons-material/Delete";
import { QuestionRequest } from "../../models/QuestionRequest";

interface Props {
  data?: Question;
  handleClose: () => void;
  handleSubmit: (status: number) => void;
  selectEditItem?: (item: Question | undefined) => void;
}

export default function QuizNewQuestionForm({
  data,
  handleClose,
  handleSubmit: handleSubmit,
  selectEditItem,
}: Props) {
  const [correctAnswer, setCorrectAnswer] = useState(
    data ? data.idCorrectAnswer : 0
  );
  const [error, setError] = useState(true);
  const [helperText, setHelperText] = useState("Choose wisely");
  const [disableButton, setDisableButton] = useState(true);

  const maxAnswers: number = 4;

  const [questionBody, setQuestionBody] = useState(data ? data.name : "");
  let a = [{ name: "" }, { name: "" }] as Answer[];
  const [questionAnswers, setQuestionAnswers] = useState<Answer[]>(
    data ? data.answers : a
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectAnswer(Number((event.target as HTMLInputElement).value));
  };

  const submitQuestion = async () => {
    console.log(questionBody);
    console.log(questionAnswers);
    console.log(correctAnswer);

    /**TODO: stworzyć obiekt QuestionRequest do dodawania/edycji pytań
     * Question zostawić do manipulacji na froncie
     * */
    var existingID = undefined;
    if (data) {
      existingID = data.id;
    }

    let question: QuestionRequest = {
      id: existingID,
      name: questionBody,
      idCorrectAnswer: correctAnswer,
      answers: questionAnswers,
    };
    /**
     * TODO: dodanie wybrania poprawnej odpowiedzi
     */
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
    if (response === undefined) {
      handleSubmit(500);
    } else {
      console.log(response.status);
      console.log(response.json());
      handleSubmit(response.status);
    }
    handleClose();
  };

  useEffect(() => {
    if (data) {
      // let emptyQuestion: Question = {
      //   name: "",
      //   answers: [],
      //   idCorrectAnswer: 0,
      // };
      selectEditItem!(data);
    }
  }, []);

  useEffect(() => {
    console.log(questionAnswers);
    console.log("Correct answer");
    console.log(correctAnswer);
    validateForm();
  }, [questionAnswers, questionBody, correctAnswer]);

  function handleAddAnswer() {
    // let indexArray: number[] = [0, 1, 2, 3];
    // let qaIndexes: number[] = [];
    // for (var i = 0; i < questionAnswers.length; i++) {
    //   qaIndexes.push(questionAnswers[i].id);
    // }
    // let freeIndex: number[] = indexArray.filter((x) => !qaIndexes.includes(x));
    const x = { name: "" } as Answer;
    setQuestionAnswers([...questionAnswers, x]);
  }

  function handleDeleteAnswer(item: Answer, index: number) {
    console.log("item id");
    console.log(item.id);
    console.log(questionAnswers);
    let b = questionAnswers.filter((x, ind) => ind !== index);
    setQuestionAnswers(b);
    console.log("Po handleDelete");
    console.log(questionAnswers);
  }

  function validateForm() {
    if (questionAnswers.length < 2) {
      setHelperText("Za mało odpowiedzi");
      setDisableButton(true);
      setError(true);
      return;
    }
    if (questionBody.length < 3) {
      setHelperText("Pytanie jest za krótkie");
      setDisableButton(true);
      setError(true);
      return;
    }
    if (correctAnswer >= questionAnswers.length) {
      setHelperText("Wybierz, która odpowiedź ma być poprawna");
      setDisableButton(true);
      setError(true);
      return;
    }
    for (var i = 0; i < questionAnswers.length; i++) {
      if (questionAnswers[i].name.length <= 0) {
        setHelperText("Jedna z odpowiedzi jest za krótka");
        setDisableButton(true);
        setError(true);
        return;
      }
    }
    setHelperText("Wszystko ok!");
    setDisableButton(false);
    setError(false);
  }
  return (
    <>
      <Paper
        sx={{ maxWidth: "50%", width: "50%" }}
        className="quiz-question-header"
        elevation={1}
      >
        <Box textAlign={"right"}>
          <IconButton aria-label="delete" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography>Dodawanie nowego pytania</Typography>
        <form>
          <FormControl error={error} variant="standard">
            <Grid container justifyContent={"center"} rowGap={5}>
              <Grid item xs={12}>
                <TextField
                  className="form-item"
                  id="outlined-basic"
                  label={"Treść pytania"}
                  variant="outlined"
                  fullWidth
                  value={questionBody}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setQuestionBody(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={correctAnswer}
                  onChange={handleRadioChange}
                >
                  <Grid container rowGap={2}>
                    {questionAnswers.map((item, i) => (
                      <Grid item xs={6} key={i}>
                        <Box sx={{ display: "flex" }} justifyContent={"left"}>
                          <TextField
                            id="outlined-basic"
                            label={"Odpowiedź"}
                            variant="outlined"
                            value={item.name ? item.name : ""}
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
                            sx={{ margin: "0% 0% 0% 2%" }}
                            value={i}
                            control={<Radio />}
                            label=""
                          />
                          <IconButton
                            onClick={() => {
                              handleDeleteAnswer(item, i);
                            }}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>

                <Box textAlign={"center"}>
                  <IconButton
                    onClick={handleAddAnswer}
                    disabled={maxAnswers <= questionAnswers.length}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormHelperText>{helperText}</FormHelperText>
              </Grid>
            </Grid>
            <Button
              onClick={submitQuestion}
              variant="contained"
              disabled={disableButton}
            >
              Dodaj pytanie
            </Button>
          </FormControl>
        </form>
      </Paper>
    </>
  );
}
