const STORAGE_KEYS = {
  DAILY_WORD: 'wordle_daily_word',
  DAILY_GUESSES: 'wordle_daily_guesses',
  LAST_PLAYED_DATE: 'wordle_last_played'
} as const

export const storage = {
  getDailyWord: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.DAILY_WORD)
  },

  getLastPlayedDate: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.LAST_PLAYED_DATE)
  },

  getDailyGuesses: (): string[] => {
    const guesses = localStorage.getItem(STORAGE_KEYS.DAILY_GUESSES)
    return guesses ? JSON.parse(guesses) : []
  },

  saveDailyWord: (word: string) => {
    localStorage.setItem(STORAGE_KEYS.DAILY_WORD, word)
    localStorage.setItem(STORAGE_KEYS.LAST_PLAYED_DATE, new Date().toDateString())
  },

  saveDailyGuesses: (guesses: string[]) => {
    localStorage.setItem(STORAGE_KEYS.DAILY_GUESSES, JSON.stringify(guesses))
  },

  clearDaily: () => {
    localStorage.removeItem(STORAGE_KEYS.DAILY_WORD)
    localStorage.removeItem(STORAGE_KEYS.DAILY_GUESSES)
    localStorage.removeItem(STORAGE_KEYS.LAST_PLAYED_DATE)
  }
} 