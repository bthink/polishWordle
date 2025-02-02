import { polishWords } from '../assets/words_array'
      
export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * polishWords.length)
  return polishWords[randomIndex].toUpperCase()
} 