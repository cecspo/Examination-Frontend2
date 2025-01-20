import React, { useState, useEffect } from 'react';
import './BlueyQuiz.css';
import QuizPoints from './QuizPoints';

const BlueyQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    fetch('/Bluey-quiz.json')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswerClick = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      if (answer === questions[currentQuestionIndex].answer) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsGameOver(true); // Sätt spelet som slut
    } else {
      setIsAnswered(false);
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const replayQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <QuizPoints
        score={score}
        totalQuestions={questions.length}
        onReplay={replayQuiz}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4">
        <div className="card-body">
          <h5 className="card-title text-center">{currentQuestion.question}</h5>
          <div className="list-group">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`list-group-item list-group-item-action ${selectedAnswer === option ? (option === currentQuestion.answer ? 'bg-success text-white' : 'bg-danger text-white') : ''}`}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
          {isAnswered && (
            <div className="mt-3 text-center">
              <button className="btn btn-primary mt-3" onClick={nextQuestion}>
                {currentQuestionIndex === questions.length - 1 ? 'Se ditt resultat' : 'Nästa fråga'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlueyQuiz;
