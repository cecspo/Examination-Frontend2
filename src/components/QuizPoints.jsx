import React from 'react'

const QuizPoints = ({ score, totalQuestions, onReplay}) => {
  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
        <div className='card p-4'>
            <div className='card-body text-center'>
                <h5 className='card-title'>Resultat</h5>
                <p>Du fick {score} av {totalQuestions} rätt!</p>
                <div className='mt-3'>
                    <button className='btn btn-primary me-2' onClick={onReplay}>Spela om</button>
                    <button className='btn btn-secondary' onClick={() => 
                        window.alert('Visa detaljerade svaren här.')}>Se resultat</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuizPoints