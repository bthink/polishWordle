import { useEffect, useState } from 'react'
import { GameState } from './types'
// import { fetchWord } from './api'
import GameBoard from './components/GameBoard'
import Keyboard from './components/Keyboard'
import './App.css'
import { storage } from './utils/storage'
import { getRandomWord } from './utils/words'

const App = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentGuess: '',
    guesses: [],
    history: [],
    gameOver: false,
    word: '',
  })

  useEffect(() => {
    const initializeGame = async () => {
      const lastPlayedDate = storage.getLastPlayedDate()
      const today = new Date().toDateString()
      
      if (lastPlayedDate !== today) {
        const newWord = getRandomWord()
        storage.saveDailyWord(newWord)
        storage.saveDailyGuesses([])
        setGameState(prev => ({ 
          ...prev, 
          word: newWord,
          guesses: [],
          history: []
        }))
      } else {
        const savedWord = storage.getDailyWord()
        const savedGuesses = storage.getDailyGuesses()
        
        if (savedWord) {
          const history = savedGuesses.map(guess => 
            guess.split('').map((letter, i) => letter === savedWord[i])
          )
          
          setGameState(prev => ({ 
            ...prev, 
            word: savedWord,
            guesses: savedGuesses,
            history
          }))
        } else {
          const newWord = getRandomWord()
          storage.saveDailyWord(newWord)
          setGameState(prev => ({ ...prev, word: newWord }))
        }
      }
    }

    initializeGame()
  }, [])

  const handleKeyPress = (key: string) => {
    if (gameState.gameOver) return
    
    if (key === 'ENTER') {
      if (gameState.currentGuess.length !== 5) return
      
      const guessResult = Array(5).fill(false)
      
      for (let i = 0; i < 5; i++) {
        if (gameState.currentGuess[i] === gameState.word[i]) {
          guessResult[i] = true
        }
      }
      
      const newGuesses = [...gameState.guesses, gameState.currentGuess]
      const newHistory = [...gameState.history, guessResult]
      
      setGameState(prev => ({
        ...prev,
        guesses: newGuesses,
        history: newHistory,
        currentGuess: '',
        gameOver: guessResult.every(x => x) || newGuesses.length === 5
      }))
      
      storage.saveDailyGuesses(newGuesses)
    } else if (key === 'BACKSPACE') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1)
      }))
    } else if (gameState.currentGuess.length < 5) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + key
      }))
    }
  }

  return (
    <div className="app">
      <h1>Wordly</h1>
      <h2>Ale czekamy na API od Piotra, więc na razie jest losowanko własnych słów ze słownika SJP</h2>
      <GameBoard gameState={gameState} />
      <Keyboard 
        onKeyPress={handleKeyPress}
        guesses={gameState.guesses}
        word={gameState.word}
      />
    </div>
  )
}

export default App 