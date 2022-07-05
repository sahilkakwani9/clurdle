import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useClurdle from '../hooks/useClurdle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
import useStore from '../store/store';

export default function Clurdle({solution}) {
  const state = useStore();
  const setGuess = state.setGuess;
  const univGuess = state.guess;
  const guessArray = state.guessArray;
  const {currentGuess, keyClicked, keypadClicked, usedWord, guesses, isCorrect, history, turn, keyGuesses, keyCurrentGuess, setKeyCurrentGuess} = useClurdle(solution);
  const[showModal,setShowModal] = useState(false);
    useEffect(()=>{
      window.addEventListener('keyup', keyClicked);
      if (isCorrect) {
        setTimeout(() => {
          setShowModal(true);
        }, 2000);
        window.removeEventListener('keyup', keyClicked)
      }

      if (turn>5){
        setShowModal(true);
        window.removeEventListener('keyup', keyClicked)
      }

      return ()=> window.removeEventListener('keyup', keyClicked)
    }, [keyClicked, keypadClicked, isCorrect, turn, keyCurrentGuess])

  return (<>
    {/* <div className='word'><h1>{(keyCurrentGuess.length === 0)?univGuess:keyGuesses.length}</h1></div> */}
    <Grid guesses={guesses} turn={turn} currentGuess={currentGuess} keyGuesses={guessArray} keyCurrentGuess={keyCurrentGuess} univGuess={univGuess}/>
    <Keypad usedKeys={usedWord} solution={solution}/>
    {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
  </>
    

  )
}
