import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { polishWords } from './words_array.js';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendWordsToChatGPT = async () => {
  const responses = [];
  const chunkSize = 100;

  // Function to chunk the array
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const wordChunks = chunkArray(polishWords, chunkSize);

  console.log(`Total chunks to process: ${wordChunks.length}`);

  for (let i = 0; i < wordChunks.length; i++) {
    const chunk = wordChunks[i];
    console.log(`Processing chunk ${i + 1} of ${wordChunks.length}`); // Display current chunk number

    const prompt = `Here is a list of Polish words. 
    If you find a group of words with just another inflection, leave only the base word for each group.
    If word is plural, remove it.
    If word is a noun leave it on the list.
    If word is a verb leave it on the list.
    If word is an adjective leave it on the list.
    If you don't know if word is a noun, verb, adjective, etc., leave it on the list.
    Result words can have exactly 5 letters. Be very strict with this rule.
    Display only words from the list.
    \n\n${chunk.join('\n')}\n\n`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer sk-proj-0123456789abcdef0123456789abcdef`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful linguist. You are interested in the Polish language.' },
          { role: 'assistant', content: 'Output is only words, no other text. Words can have exactly 5 letters and must be in Polish language.'},
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      return;
    }

    const data = await response.json();
    const chatGptResponse = data.choices[0].message.content;
    responses.push(chatGptResponse);
  }

  // Combine all responses into one
  const combinedResponse = responses.join('\n');

  // Save the combined response to a single file
  fs.writeFileSync('chatgpt_combined_response.txt', combinedResponse, 'utf8');
  console.log('Combined response saved to chatgpt_combined_response.txt');
};

sendWordsToChatGPT();