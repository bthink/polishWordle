import { useEffect, useState } from 'react'
import { GameState } from './types'
import { fetchWord } from './api'
import GameBoard from './components/GameBoard'
import Keyboard from './components/Keyboard'
import './App.css'

const App = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentGuess: '',
    guesses: [],
    history: [],
    gameOver: false,
    word: '',
  })

  useEffect(() => {
    const initGame = async () => {
      const word = await fetchWord()
      setGameState(prev => ({ ...prev, word }))
    }
    initGame()
  }, [])

  const handleKeyPress = (key: string) => {
    if (gameState.gameOver) return
    
    if (key === 'ENTER') {
      if (gameState.currentGuess.length !== 5) return
      
      const newHistory = [...gameState.history]
      const guessResult = Array(5).fill(false)
      
      for (let i = 0; i < 5; i++) {
        if (gameState.currentGuess[i] === gameState.word[i]) {
          guessResult[i] = true
        }
      }
      
      setGameState(prev => ({
        ...prev,
        guesses: [...prev.guesses, prev.currentGuess],
        history: [...prev.history, guessResult],
        currentGuess: '',
        gameOver: guessResult.every(x => x) || prev.guesses.length === 5
      }))
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