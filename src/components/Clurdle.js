import React from 'react'
import { useEffect } from 'react'
import useWordle from '../hooks/useClurdle'

export default function Wordle({solution}) {
  const {currentGuess, keyClicked} = useWordle(solution)
    useEffect(()=>{
      window.addEventListener('keyup', keyClicked);

      return ()=> window.removeEventListener('keyup', keyClicked)
    }, [keyClicked])
  return (
    <div>{currentGuess}</div>
  )
}
