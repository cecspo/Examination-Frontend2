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
    const [countdown, setCountdown] = useState(10);

    //hämtar frågor
    useEffect(() => {
      fetch('/Bluey-quiz.json')
        .then((response) => response.json())
        .then((data) => setQuestions(data));
    }, []);

    //timer
    useEffect(() => {
      if (isAnswered || isGameOver) return;

      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }, [isAnswered, isGameOver]);

    //när tiden tar slut
    useEffect(() => {
      if (countdown === 0 && !isAnswered) {
        nextQuestion();
      }
    }, [countdown]);

    //hantera val av svar
    const handleAnswerClick = (answer) => {
      if (!isAnswered) {
        setSelectedAnswer(answer);
        setIsAnswered(true);

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = answer === currentQuestion.answer;

        setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
      }
    };

    //nästa fråga
    const nextQuestion = () => {
      if (currentQuestionIndex === questions.length - 1) {
        setIsGameOver(true)
      } else {
        setIsAnswered(false);
        setSelectedAnswer(null);
        setCountdown(10);
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    };

    //starta om quiz
    const replayQuiz = () => {
      setScore(0);
      setCurrentQuestionIndex(0);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setIsGameOver(false);
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
                <p className='timeText'>Tid kvar: <strong>{countdown} sekunder</strong></p>
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
                      <button className="btn btn-primary" onClick={() => setIsGameOver(true)}>Se resultat</button>
                    ) : (
                      <button className="btn btn-primary mt-3" onClick={nextQuestion}>Nästa fråga</button>
                    )}
                  </div>
                )}
              </>           
            ) : (
                <QuizPoints
                  score={score}
                  totalQuestions={questions.length}
                  onReplay={replayQuiz}
                />
              )}
          </div>
        </div>
      </div>
    );
  };

  export default BlueyQuiz;
