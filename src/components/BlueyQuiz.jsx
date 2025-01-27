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
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    fetch('/Bluey-quiz.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  useEffect(() => {
    if (isAnswered || isGameOver) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnswered, isGameOver]);

  useEffect(() => {
    if (countdown === 0 && !isAnswered) {
      nextQuestion();
    }
  }, [countdown]);

  const handleAnswerClick = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answer === currentQuestion.answer;

      setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
      setResults((prevResults) => [
        ...prevResults,
        {
          question: currentQuestion.question,
          userAnswer: answer,
          correctAnswer: currentQuestion.answer,
        },
      ]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsGameOver(true)
      setShowResults(false);
    } else {
      setIsAnswered(false);
      setSelectedAnswer(null);
      setCountdown(10);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const replayQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setResults([]);
    setIsGameOver(false);
    setShowResults(false);
    setCountdown(10);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion && !isGameOver) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4">
        <div className="card-body">
          {!isGameOver ? (
            <>
              <h5 className="card-title text-center">{currentQuestion.question}</h5>
              <p className='timeText'>Tid kvar: {countdown} sekunder</p>
              <div className="list-group">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`list-group-item list-group-item-action ${
                      selectedAnswer === option
                        ? option === currentQuestion.answer
                          ? 'bg-success text-white'
                          : 'bg-danger text-white'
                        : ''
                    }`}
                    onClick={() => handleAnswerClick(option)}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {isAnswered && (
                <div className="mt-3 text-center">
                  {currentQuestionIndex === questions.length - 1 ? (
                    <>
                      <button className="btn btn-primary me-2" 
                        onClick={() => {
                        setShowResults(true);
                        setIsGameOver(true);}}
                        >Se resultat</button>
                      <button className="btn btn-secondary" onClick={replayQuiz}>Spela om</button>
                    </>
                  ) : (
                    <button className="btn btn-primary mt-3" onClick={nextQuestion}>Nästa fråga</button>
                  )}
                </div>
              )}
            </>           
         ) : showResults ? (
              <QuizPoints
                score={score}
                totalQuestions={questions.length}
                onReplay={replayQuiz}
                results={results}
              />
          ) : (
            <div className="text-center">
              <button
                className="btn btn-primary me-2"
                onClick={() => setShowResults(true)}
              >
                Se resultat
              </button>
              <button className="btn btn-secondary" onClick={replayQuiz}>
                Spela om
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlueyQuiz;
