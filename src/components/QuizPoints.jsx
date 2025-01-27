import React from 'react';
import './BlueyQuiz.css';
import Image from './images/Bluey2.png';

const QuizPoints = ({ score, totalQuestions, onReplay }) => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">             
        <div className='background'><img src={Image} alt="bluey" /></div>
        <div className="card p-4">

                <div className="card-body cardPoints" > 
                    <h4 className="card-title text-center">Quizet är slut!</h4>
                    <p>Du fick {score} av {totalQuestions} rätt</p>
                    <button className="btn btn-primary me-2" onClick={onReplay}>Spela om</button>
                </div>
        </div>
    </div>
  );
};

export default QuizPoints;
