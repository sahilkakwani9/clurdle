import React from 'react'

export default function Row({guesses, currentGuess}) {
    if (guesses){
        return (<div className="row past">
            {
                guesses.map((l,i)=>(
                    <div key={i} className={l.color}>{l.key}</div>
                ))
            }
        </div>)
        
    }

    if (currentGuess){
        let letters = currentGuess.split('')
        return (
            <div className='row current'>
                {
                    letters.map((l,i)=>(
                        <div key={i}>{l}</div>
                    ))
                }
                {
                    [...Array(5 - letters.length)].map((l,i)=>(
                        <div key={i}></div>
                    ))
                }
            </div>
        )
    }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
