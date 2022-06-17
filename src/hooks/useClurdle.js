import { useState } from "react";

const useClurdle = (solution)=>{
    const [turn,setTurn] = useState(0); //keeps track of no. of turns
    const [currentGuess, setCurrentGuess] = useState(''); //gets updated on every letter user types in the field
    const [guesses, setGuesses] = useState([]); //each guess an array of individual letters as objects
    const [history, setHistory] = useState([]); //each guess is a string
    const [isCorrect, setIsCorrect] = useState(false); //guess is correct?

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = ()=>{

    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addGuess = ()=>{

    } 

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const keyClicked = ()=>{

    }

    return {turn, currentGuess, guesses, isCorrect, keyClicked}
}

export default useWordle