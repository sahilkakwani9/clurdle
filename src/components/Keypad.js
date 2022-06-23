import React from 'react'
import { useState, useEffect } from 'react'

export default function Keypad() {
    const [letters,setLetters] = useState(null)
    
    useEffect(()=>{
        fetch('http://localhost:3001/letters')
        .then(res=>res.json())
        .then(json=>{
            setLetters(json)
            console.log(json)
        })
    })
  return (
    <div className='keypad'>{
        letters && letters.map((l,i)=>{
            return <div key={i}>{l.key}</div>
        })
    }</div>
  )
}
