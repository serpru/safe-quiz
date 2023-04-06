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

interface Props {
  question: Question;
  handleClose: () => void;
  handleAdd: () => void;
}

export default function QuizEditForm({
  question,
  handleClose,
  handleAdd,
}: Props) {
  const [questionBody, setQuestionBody] = useState(question.name);
  const [correctAnswer, setCorrectAnswer] = useState(
    question.correctAnswer?.toString()
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

  const handleSubmit = () => {
    console.log(questionBody);
    console.log(questionAnswers);
    console.log(correctAnswer);

    let question: Question = {
      id: -1,
      name: questionBody,
      answers: questionAnswers,
      userAnswer: 0,
      correctAnswer: Number(correctAnswer),
    };

    console.log(JSON.stringify(question));
  };

  useEffect(() => {
    console.log(questionAnswers);
  }, [questionAnswers]);

  function handleAddAnswer() {
    const x = { idQuestion: question.id } as Answer;
    setQuestionAnswers([...questionAnswers, x]);
  }

  function handleDeleteAnswer(item: Answer, index: number) {
    console.log(item.id);
    console.log(questionAnswers);
    let a = questionAnswers.filter((x) => x.id !== item.id);
    setQuestionAnswers(a);
    console.log("Po handleDelete");
    console.log(questionAnswers);
  }

  function handleTextFieldChange(index: number) {
    const list: Answer[] = [...questionAnswers];
    setQuestionAnswers(list);
  }

  return (
    <Paper className="quiz-question-header" elevation={1}>
      <Box textAlign={"right"}>
        <IconButton aria-label="delete">
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
                defaultValue={question.correctAnswer?.toString()}
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
          <Button variant="contained" onClick={handleSubmit}>
            Zatwierdź
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
}
