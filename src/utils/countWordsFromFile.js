import fs from 'fs'

const countWordsFromFile = () => {
  const words = fs.readFileSync('slowa.txt', 'utf8')
    .split('\n')
    .filter(word => word.trim())
    
  console.log(`Total words in file: ${words.length}`)
}

countWordsFromFile() 