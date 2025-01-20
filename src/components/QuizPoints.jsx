import React from 'react';

const QuizPoints = ({ score, totalQuestions, onReplay, results }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4">
        <div className="card-body text-center">
          <h5 className="card-title">Resultat</h5>
          <p>Du fick {score} av {totalQuestions} rätt!</p>

          <h6 className="mt-4">Dina svar:</h6>
          <ul className="list-group">
            {results.map((result, index) => (
              <li key={index} className="list-group-item">
                <strong>Fråga:</strong> {result.question}
                <br />
                <strong>Ditt svar:</strong> {result.userAnswer}
                <br />
                <strong>Rätt svar:</strong> {result.correctAnswer}
              </li>
            ))}
          </ul>

          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={onReplay}>
              Spela om
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPoints;
