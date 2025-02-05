import fs from 'fs'
import { polishWords } from './words_array.js'

const splitWordsByLetter = () => {
  const polishAlphabet = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż'
  
  // Create directory if it doesn't exist
  if (!fs.existsSync('words')) {
    fs.mkdirSync('words')
  }
  
  polishAlphabet.split('').forEach(letter => {
    const letterWords = polishWords.filter(word => 
      word.toLowerCase().startsWith(letter)
    )
    
    if (letterWords.length > 0) {
      fs.writeFileSync(
        `words/${letter}.txt`,
        letterWords.join('\n')
      )
      console.log(`Created ${letter}.txt with ${letterWords.length} words`)
    }
  })
}

splitWordsByLetter() 