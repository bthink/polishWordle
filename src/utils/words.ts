import { commonWords } from '../assets/common_words_array'
      
export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * commonWords.length)
  return commonWords[randomIndex].toUpperCase()
} 