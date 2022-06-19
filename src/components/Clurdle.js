import React from 'react'
import { useEffect } from 'react'
import useClurdle from '../hooks/useClurdle'

export default function Clurdle({solution}) {
  const {currentGuess, keyClicked} = useClurdle(solution)
    useEffect(()=>{
      window.addEventListener('keyup', keyClicked);

      return ()=> window.removeEventListener('keyup', keyClicked)
    }, [keyClicked])
  return (
    <div>{currentGuess}</div>
  )
}
