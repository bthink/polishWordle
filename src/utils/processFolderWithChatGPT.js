import fs from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const processFiles = async () => {
  const files = fs.readdirSync('words')
    .filter(file => file.endsWith('.txt'))
  
  for (const file of files) {
    console.log(`Processing ${file}`)
    try {
      await execAsync(`node src/utils/sendWordsToChatGPT.js words/${file}`)
      console.log(`✓ Completed ${file}`)
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message)
    }
    //delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

processFiles() 