import axios from 'axios'

export const fetchWord = async (): Promise<string> => {
  try {
    const response = await axios.get('https://random-word-api.herokuapp.com/word?length=5')
    return response.data[0].toUpperCase()
  } catch (error) {
    console.error('Error fetching word:', error)
    return 'ERROR'
  }
} 