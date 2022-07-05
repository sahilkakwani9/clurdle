import React, { useState } from 'react'
import { useEffect } from 'react'
import KeypadRow from './KeypadRow';
import Row from './Row'

export default function Grid({guesses, currentGuess, turn, keyGuesses, keyCurrentGuess, univGuess}){
  // console.log(keyCurrentGuess);
  useEffect(()=>{
    
  }, [guesses, keyCurrentGuess]);

  if (univGuess.length !== 0){
    return (
    
      <div>
        {
            keyGuesses.map((g,i)=>{
                if (turn === i){
                    return <KeypadRow currentGuess={univGuess}/>
                }
                return <KeypadRow guesses={g}/>
            })
    
        }
      </div>
        
      )
  }
  else {
    return (
    
      <div>
        {
            guesses.map((g,i)=>{
                if (turn === i){
                    return <Row key={i} currentGuess={currentGuess}/>
                }
                return <Row key={i} guesses={g}/>
            })
    
        }
      </div>
        
      )
  }
  
}
