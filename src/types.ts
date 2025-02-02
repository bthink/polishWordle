export interface GameState {
  currentGuess: string
  guesses: string[]
  history: boolean[][]
  gameOver: boolean
  word: string
}

export type KeyboardKey = {
  key: string
  state: 'correct' | 'present' | 'absent' | 'unused'
} 