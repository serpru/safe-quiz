import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import { QuizModel } from "../models/QuizModel";

export default function Quiz() {
  const [questionCounter, setQuestionCounter] = useState(1);
  const [isLast, setIsLast] = useState(false);

  const location = useLocation();

  // Fetch, łączenie do API, prototyp
  const [data, setData] = useState<QuizModel | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state.quiz) {
      setLoading(false);
    }
    if (questionCounter === location.state.quiz.questions.length) {
      setIsLast(true);
    }
  }, [questionCounter]);

  useEffect(() => {
    setQuestionCounter(location.state.quiz.idxNextQuestion);
  }, []);

  return (
    <div className="quiz">
      {loading && <div>Ładowanie pytania</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {/* Pamietaj zeby dodac ponizej warunek !error && jesli korzystasz z API */}
      {!loading && (
        <QuizQuestion
          quiz={location.state.quiz}
          idAccount={location.state.idAccount}
          question={location.state.quiz.questions[questionCounter - 1]}
          questionCounter={questionCounter}
          isLast={isLast}
          setQuestionCounter={setQuestionCounter}
        />
      )}
    </div>
  );
}
