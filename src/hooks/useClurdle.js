import { useState } from "react";

const useClurdle = (solution)=>{
    const [turn,setTurn] = useState(0); //keeps track of no. of turns
    const [currentGuess, setCurrentGuess] = useState(''); //gets updated on every letter user types in the field
    const [guesses, setGuesses] = useState([...Array(6)]); //each guess an array of individual letters as objects
    const [history, setHistory] = useState([]); //each guess is a string
    const [isCorrect, setIsCorrect] = useState(false); //guess is correct?
    const [usedWord, setUsedWord] = useState({}); //{'a': "green", 'b': "grey"} tracking color 

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = ()=>{
        let i = 0;
        let solutionArray = [...solution];
        let formattedArray = [...currentGuess].map((e)=>{
            return {
                key: e,
                color: "grey"
            }
        });
        
        formattedArray.forEach((l,i)=>{
            if (solution[i] === l.key){
                formattedArray[i].color = "green";
                solutionArray[i] = null;
            }
        })
        formattedArray.forEach((l,i)=>{
            if (solutionArray.includes(l.key) && l.color !== 'green'){
                formattedArray[i].color = "yellow";
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        })

        return formattedArray;
        // const letter = currentGuess.split("")
    
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addGuess = (formatGuess)=>{

        //if the recent guess is solution then set isCorrect to True
        if (currentGuess === solution){
            setIsCorrect(true)
        }

        //add the guess object array to Guesses array
        setGuesses((prevGuess)=>{
            // let oldGuesses = [...prevGuess];
            // oldGuesses[turn] = formatGuess;
            prevGuess[turn] = formatGuess;
            return prevGuess;
        })

        //add the current guess(string) to history array 
        setHistory((prev)=>{
            let updatedHistory = [...prev,currentGuess];
            return updatedHistory;
        })

        setTurn((prev)=>{
            return prev+1;
        })

        

        setUsedWord((prevUsedWords)=>{
            formatGuess.forEach((l)=>{
                const currentColor = prevUsedWords[l.key];

                if (l.color === 'green'){
                    prevUsedWords[l.key] = 'green';
                    return;
                }

                if (l.color === 'yellow' && currentColor !== 'green'){
                    prevUsedWords[l.key] = 'yellow';
                    return;
                }

                if (l.color === 'grey' && currentColor !== ('green' || 'yellow')){
                    prevUsedWords[l.key] = 'grey';
                    return;
                }
            })
            return prevUsedWords
        })

        setCurrentGuess('');
    } 

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const keyClicked = ({key})=>{

        if (key === "Enter"){
            if (turn>5){
                console.log("Excedded the number of turns");
                return
            }

            if (history.includes(currentGuess)) {
                console.log("Already used that word");
                return
            }

            if (currentGuess.length !== 5){
                console.log("Atleast 5 words");
                return
            }
            const formattedGuess = formatGuess();
            addGuess(formattedGuess)
            
        }
        if (key === "Backspace"){
            setCurrentGuess((prev)=>{
                return prev.slice(0,-1)
            })
            return
        }


        if (/^[A-Za-z]$/.test(key)){
            if (currentGuess.length<5){
                setCurrentGuess((prev)=>{
                    return prev+key;
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, history, usedWord, keyClicked}
}

export default useClurdle