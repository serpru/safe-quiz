import {
  Alert,
  AlertColor,
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  Divider,
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
import { useLocation } from "react-router-dom";
import { ListItem } from "../../models/ListItem";
import { Pagination } from "../../models/Pagination";
import { PaginationResponse } from "../../models/PaginationResponse";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import FirstPageIcon from "@mui/icons-material/FirstPage";

let mockList: ListItem[] = [
  {
    id: 1,
    name: "Kto stworzył system Linux?",
  },
  {
    id: 2,
    name: "To jest pytanie drugie",
  },
];

let mockListIndexes = [1, 6, 7, 13, 14];

export default function QuizQuestionList() {
  const [mockQuestionList, setMockQuestionList] = useState<Question[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectEditItem, setSelectEditItem] = useState<ListItem | undefined>(
    undefined
  );

  const [data, setData] = useState<ListItem[] | null>(null);
  const [error, setError] = useState(null);

  const location = useLocation();

  function addQuestionToList(question: Question) {
    const newQuestionList = [...mockQuestionList, question];
    setMockQuestionList(newQuestionList);
  }

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const defaultPagination: Pagination = {
    pageNumber: 0,
    pageSize: 5,
    pageCount: 1,
  };

  let totalSum: number = 1;

  let editItem: ListItem | undefined = undefined;

  let testEdit: ListItem | undefined = {
    id: 6,
    name: "Test heh",
  };

  const [buttonList, setButtonList] = useState<number[]>([]);

  const [pagination, setPagination] = useState<Pagination>(defaultPagination);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageNumber = (pageNum: number) => {
    setPagination({ ...pagination, pageNumber: pageNum });
  };

  const handleChangePage = (pageNum: number) => {
    setCurrentPage(pageNum);
    setPagination({ ...pagination, pageNumber: pageNum });
  };

  const handlePageSize = (size: number) => {
    setPagination({
      pageNumber: 0,
      pageSize: size,
      pageCount: Math.ceil(totalSum / size),
    });
  };

  const handleClose = () => {
    setOpenAdd(false);
  };
  const handleToggle = (item: ListItem | undefined) => {
    setSelectEditItem(item);
    editItem = item;
    setOpenAdd(!openAdd);
  };

  const handleSubmitQuestion = (status: number) => {
    console.log("handleSubmitQuestion");
    console.log(status);
    handleOpenSnackbar(status);
    handleClose();
  };

  useEffect(() => {
    //Promise.all([textPromise, textPromise2]);
    //setLoading(false);
    getDataFromApi(defaultPagination);

    console.log("Mock list");
    console.log(mockQuestionList);
  }, []);

  function getDataFromApi(page: Pagination) {
    fetch(
      "http://localhost:8080/questions/pagination/" +
        page.pageNumber +
        "/" +
        page.pageSize
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        const obj: PaginationResponse = actualData;
        console.log("actual data");
        //console.log(actualData);
        setData(obj.selectedRows);
        totalSum = obj.totalSum;
        console.log("Page count");
        console.log(pagination.pageCount);

        let newButtonItems: number[] = [];
        for (
          var i = 0;
          i < Math.ceil(obj.totalSum / pagination.pageSize);
          i++
        ) {
          newButtonItems.push(i);
        }
        console.log(newButtonItems);
        setButtonList(newButtonItems);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setData(mockList);
      })
      .finally(() => {});
  }

  function reloadPage() {
    setLoading(true);
    getDataFromApi(pagination);
  }

  //  Reload on pagination change
  useEffect(() => {
    setLoading(true);
    console.log("Pagination totalSum check");
    console.log(pagination);
    getDataFromApi(pagination);
  }, [pagination]);

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
        <Box textAlign="center">
          <Button variant="contained" onClick={() => handleToggle(undefined)}>
            Dodaj
          </Button>
          <Button variant="contained" onClick={() => handleOpenSnackbar(400)}>
            Toast pytanie poprawnie dodane
          </Button>
        </Box>
        <Divider />
        {loading && <div>Ładowanie pytania</div>}
        {!loading && (
          <>
            <Typography>Lista pytań</Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography>Pytań na stronie</Typography>
              <Typography>Strona</Typography>
            </Box>
            <Box sx={{ display: "flex" }} justifyContent={"space-between"}>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  variant={pagination.pageSize === 5 ? "contained" : "outlined"}
                  onClick={() => handlePageSize(5)}
                >
                  5
                </Button>
                <Button
                  variant={
                    pagination.pageSize === 20 ? "contained" : "outlined"
                  }
                  onClick={() => handlePageSize(20)}
                >
                  20
                </Button>
                <Button
                  variant={
                    pagination.pageSize === 50 ? "contained" : "outlined"
                  }
                  onClick={() => handlePageSize(50)}
                >
                  50
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="text" aria-label="text button group">
                {/* {buttonList.map((button, index) => (
                  <Button
                    disabled={button === pagination.pageNumber}
                    key={index}
                    onClick={() => handlePageNumber(button)}
                  >
                    {button + 1}
                  </Button>
                ))} */}
                <Button
                  disabled={pagination.pageNumber === 0}
                  onClick={() => handlePageNumber(0)}
                >
                  <FirstPageIcon />
                </Button>
                <Button
                  disabled={pagination.pageNumber === 0}
                  onClick={() => handlePageNumber(0)}
                >
                  <NavigateBeforeIcon />
                </Button>
                <Button disabled>
                  {pagination.pageNumber} / {buttonList.length - 1}
                </Button>
                <Button
                  disabled={pagination.pageNumber === buttonList.length - 1}
                  onClick={() => handlePageNumber(pagination.pageNumber + 1)}
                >
                  <NavigateNextIcon />
                </Button>
                <Button
                  disabled={pagination.pageNumber === buttonList.length - 1}
                  onClick={() => handlePageNumber(buttonList.length - 1)}
                >
                  <LastPageIcon />
                </Button>
              </ButtonGroup>
            </Box>

            <Box textAlign="center">
              {data?.map((question, index) => (
                <div key={index}>
                  <QuizQuestionListItem
                    item={question}
                    selectEditItem={handleToggle}
                  />
                  <Divider />
                </div>
              ))}
            </Box>
          </>
        )}
      </Paper>

      {openAdd && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openAdd}
        >
          <QuizNewQuestionForm
            listItem={selectEditItem}
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
