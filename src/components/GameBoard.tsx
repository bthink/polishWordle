import { GameState } from '../types'
import { commonWords } from '../assets/common_words_array.ts'
import './GameBoard.css'
import { useEffect } from 'react'


interface Props {
  gameState: GameState
  onInvalidWord?: () => void
}

const GameBoard = ({ gameState, onInvalidWord }: Props) => {
  const rows = Array(6).fill(null)

  const getTileStatus = (rowIndex: number, colIndex: number): string => {
    if (rowIndex >= gameState.guesses.length) return ''
    
    const letter = gameState.guesses[rowIndex][colIndex]
    if (letter === gameState.word[colIndex]) return 'correct'
    if (gameState.word.includes(letter)) return 'present'
    return 'absent'
  }

  const isValidWord = (word: string): boolean => {
    return commonWords.includes(word)
  }

  useEffect(() => {
    if (gameState.guesses.length > 0) {
      const lastGuess = gameState.guesses[gameState.guesses.length - 1].toLowerCase()
      if (!isValidWord(lastGuess)) {
        onInvalidWord?.()
      }
    }
  }, [gameState.guesses])

  return (
    <div className="game-board">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array(5).fill(null).map((_, colIndex) => {
            let letter = ''
            let status = ''
            
            if (rowIndex < gameState.guesses.length) {
              const currentGuess = gameState.guesses[rowIndex].toLowerCase() 
              if (!isValidWord(currentGuess)) {
                letter = ''
              } else {
                letter = gameState.guesses[rowIndex][colIndex]
                status = getTileStatus(rowIndex, colIndex)
              }
            } else if (rowIndex === gameState.guesses.length) {
              letter = gameState.currentGuess[colIndex] || ''
            }
            
            return (
              <div key={colIndex} className={`tile ${status}`}>
                {letter}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default GameBoard 