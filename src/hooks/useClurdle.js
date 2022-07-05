import { useState } from "react";
import useStore from "../store/store";

const useClurdle = (solution)=>{
    const [turn,setTurn] = useState(0); //keeps track of no. of turns
    const [currentGuess, setCurrentGuess] = useState(''); //gets updated on every letter user types in the field
    const [keyCurrentGuess, setKeyCurrentGuess] = useState(''); //gets updated on every letter user types in the field for keypad
    const [guesses, setGuesses] = useState([...Array(6)]); //each guess an array of individual letters as objects
    const [keyGuesses, setKeyGuesses] = useState([...Array(6)]); //each guess an array of individual letters as objects
    const [history, setHistory] = useState([]); //each guess is a string
    const [isCorrect, setIsCorrect] = useState(false); //guess is correct?
    const [usedWord, setUsedWord] = useState({}); //{'a': "green", 'b': "grey"} tracking color 
    const state = useStore();
    const setGuess = state.setGuess;
    const guessArray = state.guessArray;
    const setGuessArray = state.setGuessArray;
    // const univGuess = state.univGuess;

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatKeyGuess = ()=>{
        let i = 0;
        let solutionArray = [...solution];
        let formattedArray = [...keyCurrentGuess].map((e)=>{
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
        console.log(guesses);

        //add the current guess(string) to history array 
        setHistory((prev)=>{
            let updatedHistory = [...prev,currentGuess];
            return updatedHistory;
        })

        console.log(history);

        setTurn((prev)=>{
            return prev+1;
        })

        console.log(turn);
        

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

    const addKeyGuess = (formatGuess)=>{

        //if the recent guess is solution then set isCorrect to True
        if (keyCurrentGuess === solution){
            setIsCorrect(true)
        }

        //add the guess object array to Guesses array
        setKeyGuesses((prevGuess)=>{
            // let oldGuesses = [...prevGuess];
            // oldGuesses[turn] = formatGuess;
            prevGuess[turn] = formatGuess;
            console.log("previous guess - ",prevGuess)
            return prevGuess;
        })
        setGuessArray(keyGuesses);
        console.log(keyGuesses);

        //add the current guess(string) to history array 
        setHistory((prev)=>{
            let updatedHistory = [...prev,keyCurrentGuess];
            return updatedHistory;
        })
        console.log(history);

        setTurn((prev)=>{
            return prev+1;
        })

        console.log(turn);
        

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

        setKeyCurrentGuess('');
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
            console.log("Enter is klicked")
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

    const keypadClicked = (key)=>{
        console.log('keypad clicked and key is', key);

        if (key === "Enter" ){
            if (turn>5){
                console.log("Excedded the number of turns");
                return
            }

            if (history.includes(keyCurrentGuess)) {
                console.log("Already used that word");
                return
            }

            if (keyCurrentGuess.length !== 5){
                console.log("Atleast 5 words");
                return
            }
            console.log("Enter is klicked")
            const formattedGuess = formatKeyGuess();
            console.log(formattedGuess);
            addKeyGuess(formattedGuess)
            
        }
        if (key === "Backspace"){
            setKeyCurrentGuess((prev)=>{
                return prev.slice(0,-1)
            })
            return
        }


        if (/^[a-z]$/.test(key)){
            if (keyCurrentGuess.length<5){
                console.log(keyCurrentGuess);
                
                setKeyCurrentGuess((prev)=>{
                    
                    return prev+key;
                })
                const newGuess = keyCurrentGuess+key;
                setGuess(newGuess);
                
            }
        }
        // setGuess(keyCurrentGuess)
    }

    return {turn, currentGuess, keyCurrentGuess, setKeyCurrentGuess, guesses, keyGuesses, isCorrect, history, usedWord, keyClicked, keypadClicked}
}

export default useClurdle