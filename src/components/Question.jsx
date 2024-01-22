import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

import QUESTIONS from "../questions";

const Question = ({ questionIndex, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer((prevState) => {
      return {
        ...prevState,
        selectedAnswer: answer,
        isCorrect: null,
      };
    });

    setTimeout(() => {
      setAnswer((prevState) => {
        return {
          ...prevState,
          isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
        };
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <>
      <div id="question">
        <QuestionTimer
          key={timer}
          timeout={timer}
          onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
          mode={answerState}
        />
        <h2>{QUESTIONS[questionIndex].text}</h2>
        <Answers
          answers={QUESTIONS[questionIndex].answers}
          selectedAnswer={answer.selectedAnswer}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
      <div>
        <p>
          Question {questionIndex + 1} of {QUESTIONS.length}
        </p>
      </div>
    </>
  );
};
export default Question;
