import React from 'react'
import { useState, useEffect } from 'react'
import db from '../data/db.json'
import useClurdle from '../hooks/useClurdle'
import useStore from '../store/store';

export default function Keypad({usedKeys,solution}) {
  const {keypadClicked,keyCurrentGuess,keyGuesses, history, turn, setKeyCurrentGuess} = useClurdle(solution)
  const[Keys,setKeys] = useState(keyCurrentGuess);
  const state = useStore();
  const setGuess = state.setGuess;
  const univGuess = state.guess;
  const [letters,setLetters] = useState(null);
    // const keypadClicked = (key)=>{
    //   console.log(key);
    // }
    
    useEffect(()=>{
        // fetch('http://localhost:3001/letters')
        // .then(res=>res.json())
        // .then(json=>{
        //     setLetters(json)
        //     console.log(json)
        // })
        setLetters(db.letters)
        setKeys(keyCurrentGuess)
        // setGuess(keyCurrentGuess)
    },[letters, keyGuesses])
  return (<>
  {/* <div className='word'><h1>{(keyCurrentGuess.length !== 0)?keyCurrentGuess:keyGuesses.length}</h1></div> */}
    <div className='keypad'>
      {
        letters && letters.map((l,i)=>{
            if (l.key==="Enter"){
              return <div key={i} className='enter' onClick={()=>{keypadClicked(l.key);}}>{l.key}</div>
            }
            return <div key={i} className={usedKeys[l.key]} onClick={()=>{keypadClicked(l.key);}}>{l.key}</div>
        })
        
    }
    </div>
    </>
  )
}
