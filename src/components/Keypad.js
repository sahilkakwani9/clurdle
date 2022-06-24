import React from 'react'
import { useState, useEffect } from 'react'
import db from '../data/db.json'

export default function Keypad({usedKeys}) {
    const [letters,setLetters] = useState(null)
    
    useEffect(()=>{
        // fetch('http://localhost:3001/letters')
        // .then(res=>res.json())
        // .then(json=>{
        //     setLetters(json)
        //     console.log(json)
        // })
        setLetters(db.letters)
    })
  return (
    <div className='keypad'>{
        letters && letters.map((l,i)=>{
            return <div key={i} className={usedKeys[l.key]}>{l.key}</div>
        })
    }</div>
  )
}
