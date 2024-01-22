import quizLogo from "../assets/quiz-complete.png";

import QUESTIONS from "../questions";

const Summary = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => QUESTIONS[index].answers[0] === answer
  );

  const skippedAnswersPercentage = Math.round(
    (skippedAnswers.length / QUESTIONS.length) * 100
  );

  const correctAnswersPercentage = Math.round(
    (correctAnswers.length / QUESTIONS.length) * 100
  );

  const wrongAnswersPercentage =
    100 - skippedAnswersPercentage - correctAnswersPercentage;

  return (
    <div id="summary">
      <img src={quizLogo} alt="Trophy Icon" />
      <h2>Quiz Complete</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersPercentage}%</span>
          <span className="text">skiped</span>
        </p>
        <p>
          <span className="number">{correctAnswersPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersPercentage}%</span>
          <span className="text">answered incorectly</span>
        </p>
      </div>
      <ol id="summary-answers">
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (QUESTIONS[index].answers[0] === answer) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
