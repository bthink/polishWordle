import { GameState } from '../types'
import './GameBoard.css'

interface Props {
  gameState: GameState
}

const GameBoard = ({ gameState }: Props) => {
  const rows = Array(5).fill(null)

  const getTileStatus = (rowIndex: number, colIndex: number): string => {
    if (rowIndex >= gameState.guesses.length) return ''
    
    const letter = gameState.guesses[rowIndex][colIndex]
    if (letter === gameState.word[colIndex]) return 'correct'
    if (gameState.word.includes(letter)) return 'present'
    return 'absent'
  }

  return (
    <div className="game-board">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array(5).fill(null).map((_, colIndex) => {
            let letter = ''
            let status = ''
            
            if (rowIndex < gameState.guesses.length) {
              letter = gameState.guesses[rowIndex][colIndex]
              status = getTileStatus(rowIndex, colIndex)
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