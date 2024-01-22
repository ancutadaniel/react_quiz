import { useState, useCallback } from "react";

import QUESTIONS from "../questions";

import Question from "./Question";
import Summary from "./Summary";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((answer) => {
    setUserAnswers((prevState) => {
      return [...prevState, answer];
    });
  }, []);

  const handleSkipQuestion = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipQuestion}
      />
    </div>
  );
};

export default Quiz;
