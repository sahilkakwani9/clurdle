import React from 'react'
import { useEffect } from 'react'
import useClurdle from '../hooks/useClurdle'
import Grid from './Grid'

export default function Clurdle({solution}) {
  const {currentGuess, keyClicked, guesses, isCorrect, history, turn} = useClurdle(solution)
    useEffect(()=>{
      window.addEventListener('keyup', keyClicked);

      return ()=> window.removeEventListener('keyup', keyClicked)
    }, [keyClicked])

    useEffect(()=>{
      console.log(guesses);
      console.log(history);
      console.log(isCorrect);
    },[guesses, isCorrect, history])
  return (<>
    <div>{currentGuess}</div>
    <Grid guesses={guesses} turn={turn} currentGuess={currentGuess}/>
  </>
    

  )
}
