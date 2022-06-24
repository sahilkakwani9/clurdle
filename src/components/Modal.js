import React from 'react'

export default function Modal({isCorrect , turn, solution}) {
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You Won!!!</h1>
                <p className='solution'>{solution}</p>
                <p>You did it in {turn} guesses</p>
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>Better Luck Next Time</h1>
                <p className='solution'>{solution}</p>
                <p>Fail and rise again to win</p>
            </div>
        )}
    </div>
  )
}
