import create from 'zustand'
import useClurdle from '../hooks/useClurdle'

const useStore = create((set) => ({
  guess: "",
  guessArray: [...Array(6)],
  setGuess: (guess) => set({guess: guess}),
  setGuessArray: (guess) => set({guessArray: guess}),
}))

export default useStore;