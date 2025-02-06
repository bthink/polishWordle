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
        gameOver: guessResult.every(x => x) || newGuesses.length === 6
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

  const handleInvalidWord = () => {
    setGameState(prev => ({
      ...prev,
      guesses: prev.guesses.slice(0, -1),
      history: prev.history.slice(0, -1) 
    }))
    storage.saveDailyGuesses(gameState.guesses.slice(0, -1))
  }

  const handleNewGame = () =>   {
    localStorage.clear()  
    setGameState({
      currentGuess: '',
      guesses: [],
      history: [],
      gameOver: false,
      word: ''
    })
    const newWord = getRandomWord()
          storage.saveDailyWord(newWord)
          setGameState(prev => ({ ...prev, word: newWord }))
  }
    


  return (
    <div className="app">
      <h1>Wordle, ale w Polsce 🇵🇱</h1>
      <h2>Głównie na bazie słownika SJP</h2>
      <button className="button" onClick={handleNewGame}>Nowa gra</button>
      <GameBoard gameState={gameState} onInvalidWord={handleInvalidWord} />
      {gameState.gameOver && (
        <div className="game-over">
          {gameState.history[gameState.history.length - 1]?.every(x => x) ? (
            <p>Gratulacje! Znalazłeś słowo: <strong>{gameState.word}</strong></p>
          ) : (
            <p>Prawidłowe słowo: <strong>{gameState.word}</strong> (nie ja to wymyśliłem)</p>
          )}
          <p><a href={`https://sjp.pl/${gameState.word}`} target="_blank" rel="noopener noreferrer">Zobacz w SJP</a></p>
        </div>
      )}
      <Keyboard 
        onKeyPress={handleKeyPress}
        guesses={gameState.guesses}
        word={gameState.word}
      />
    </div>
  )
}

export default App 