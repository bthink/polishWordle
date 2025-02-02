import { useState, useEffect } from 'react'
import { KeyboardKey } from '../types'
import './Keyboard.css'

interface Props {
  onKeyPress: (key: string) => void
  guesses: string[]
  word: string
}

const Keyboard = ({ onKeyPress, guesses, word }: Props) => {
  const [keys, setKeys] = useState<KeyboardKey[]>([])
  const rows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['ENTER', ...'ZXCVBNM'.split(''), 'BACKSPACE']
  ]

  useEffect(() => {
    const newKeys: KeyboardKey[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(key => ({
      key,
      state: 'unused'
    }))
    
    guesses.forEach(guess => {
      guess.split('').forEach((letter, index) => {
        const keyIndex = newKeys.findIndex(k => k.key === letter)
        if (keyIndex === -1) return
        
        if (letter === word[index]) {
          newKeys[keyIndex].state = 'correct'
        } else if (word.includes(letter)) {
          newKeys[keyIndex].state = 'present'
        } else {
          newKeys[keyIndex].state = 'absent'
        }
      })
    })
    
    setKeys(newKeys)
  }, [guesses, word])

  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div key={i} className="row">
          {row.map(key => {
            const keyState = keys.find(k => k.key === key)?.state || 'unused'
            return (
              <button
                key={key}
                className={`key ${keyState} ${key.length > 1 ? 'wide' : ''}`}
                onClick={() => onKeyPress(key)}
              >
                {key === 'BACKSPACE' ? '←' : key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard 