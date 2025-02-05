import fs from 'fs'

const createTypeDefinition = () => {
  const commonWords = fs.readFileSync('common_words.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(word => word.trim())


  const typeContent = `export const commonWords: string[] = [
  ${commonWords.map(word => `'${word}'`).join(',\n  ')}
]`


  fs.writeFileSync('./common_words_array.ts', typeContent, 'utf8')

  const dtsContent = `export const commonWords: readonly string[]`
  fs.writeFileSync('./common_words_array.d.ts', dtsContent, 'utf8')

  console.log(`Created array with ${commonWords.length} words`)
}

createTypeDefinition() 