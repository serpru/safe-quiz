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

interface Props {
  handleClose: () => void;
  handleAdd: () => void;
}

export default function QuizNewQuestionForm({ handleClose, handleAdd }: Props) {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");

  const [questionBody, setQuestionBody] = useState("");
  let a = [{}, {}] as Answer[];
  const [questionAnswers, setQuestionAnswers] = useState<Answer[]>(a);

  //   const [isChecked, setIsChecked] = useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectAnswer((event.target as HTMLInputElement).value);
    console.log((event.target as HTMLInputElement).value);
    //setHelperText(" ");
    //setError(false);
  };

  //   function handleCloseClick() {
  //     let b = questionAnswers.map((x) => {
  //       return { ...x, id: -1 };
  //     });
  //     setQuestionAnswers(b);
  //     setQuestionBody("");
  //     handleClose();
  //   }

  const handleSubmit = async () => {
    console.log(questionBody);
    console.log(questionAnswers);
    console.log(correctAnswer);

    /**TODO: stworzyć obiekt QuestionRequest do dodawania/edycji pytań
     * Question zostawić do manipulacji na froncie
     * */
    let question: Question = {
      name: questionBody,
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
    });
    console.log(response.json());
    /** TODO: fajnie by było wyświetlić jakiś toast massage, że udało się dodać pytanie */
    handleClose();
  };

  useEffect(() => {
    console.log(questionAnswers);
  }, [questionAnswers]);

  function handleAddAnswer() {
    const x = {} as Answer;
    setQuestionAnswers([...questionAnswers, x]);
    //console.log(questionAnswers);
  }
  return (
    <>
      <Paper className="quiz-question-header" elevation={1}>
        <Box textAlign={"right"}>
          <IconButton aria-label="delete" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography>Dodawanie nowego pytania</Typography>
        <form>
          <FormControl error={error} variant="standard">
            <Grid container justifyContent={"center"} rowGap={0}>
              <Grid item xs={12}>
                <TextField
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
                  {questionAnswers.map((item, i) => (
                    <Grid item xs={12} key={i}>
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
                        value={i}
                        control={<Radio />}
                        label=""
                      />
                      {i > 1 && (
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Grid>
                  ))}
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <IconButton onClick={handleAddAnswer}>
                  <AddCircleIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Button onClick={handleSubmit} variant="contained">
              Dodaj pytanie
            </Button>
          </FormControl>
        </form>
      </Paper>
    </>
  );
}
