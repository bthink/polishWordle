```markdown:README.md
# Wordle po Polsku 🇵🇱

A Polish version of the popular word game Wordle, using words from SJP (Słownik Języka Polskiego).

## Features

- Daily word puzzle in Polish
- Support for Polish characters (ą, ć, ę, ł, ń, ó, ś, ź, ż)
- Word validation against Polish dictionary
- Local storage for game progress
- Mobile-responsive design
- Color-coded feedback for guesses
- Link to SJP dictionary for word definitions

## Tech Stack

- React + TypeScript
- Vite
- Firebase Hosting
- Local Storage for game state
- CSS for styling

## Development

1. Install dependencies:
```bash
bun install
```

2. Run development server:
```bash
bun dev
```

3. Build for production:
```bash
bun run build
```

## Word Processing Scripts

The project includes several utility scripts for word processing:

- `countWordsFromFile.js` - Count words in text file
- `splitWordsByLetter.js` - Split words by first letter
- `sendWordsToChatGPT.js` - Process words through ChatGPT
- `findCommonWords.js` - Find common words between sources
- `createCommonWordsArray.js` - Generate TypeScript array from word list

## Deployment

The game is deployed on Firebase Hosting. To deploy:

```bash
firebase deploy
```

## License

MIT

## Credits

- Original Wordle game by Josh Wardle
- Polish word list based on SJP
```

