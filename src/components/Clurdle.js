import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useClurdle from '../hooks/useClurdle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Clurdle({solution}) {
  const {currentGuess, keyClicked, usedWord, guesses, isCorrect, history, turn} = useClurdle(solution);
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
    }, [keyClicked])

  return (<>
    <Grid guesses={guesses} turn={turn} currentGuess={currentGuess}/>
    <Keypad usedKeys={usedWord}/>
    {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
  </>
    

  )
}
