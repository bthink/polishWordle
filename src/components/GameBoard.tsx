import { GameState } from '../types'
import './GameBoard.css'

interface Props {
  gameState: GameState
}

const GameBoard = ({ gameState }: Props) => {
  const rows = Array(5).fill(null)

  return (
    <div className="game-board">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array(5).fill(null).map((_, colIndex) => {
            let letter = ''
            let status = ''
            
            if (rowIndex < gameState.guesses.length) {
              letter = gameState.guesses[rowIndex][colIndex]
              if (gameState.history && gameState.history[rowIndex]) {
                status = gameState.history[rowIndex][colIndex] ? 'correct' : 'incorrect'
              } else {
                console.warn('Game state history is not defined or rowIndex is out of bounds')
                status = 'unknown'
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