import fs from 'fs'
import { polishWords } from './words_array.js'

const findCommonWords = () => {
  const chatGptWords = fs.readFileSync('chatgpt_combined_response.txt', 'utf8')
    .split('\n')
    .map(word => word.trim())
    .filter(word => word.length === 5) 
    .filter(Boolean) //remove empty lines

  const commonWords = polishWords.filter(word => 
    chatGptWords.includes(word.toLowerCase())
  )

  // Save common words
  fs.writeFileSync('common_words.txt', commonWords.join('\n'), 'utf8')
  
  console.log(`Found ${commonWords.length} common words`)
  console.log(`Original words: ${polishWords.length}`)
  console.log(`ChatGPT filtered words: ${chatGptWords.length}`)
}

findCommonWords() 