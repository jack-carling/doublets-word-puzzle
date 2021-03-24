import words from './words.js';
import validKey from './check-key.js'
import validWord from './check-word.js'

const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const introWrapper = document.querySelector('.intro');
const gameWrapper = document.querySelector('.game');
const wonWrapper = document.querySelector('.won');

const startText = document.getElementById('start-word');
const endText = document.getElementById('end-word');
const numberText = document.getElementById('number');
const guessesText = document.getElementById('guesses');
const wonText = document.getElementById('won');

const gameBoxes = document.querySelectorAll('.game-box');

let randomWords, startWord, endWord, currentWord, targetIndex;
let waitingForKeyInput = false;
let guesses = [];
let validGuesses = 0;

window.addEventListener('keyup', async (e) => {
  if (!waitingForKeyInput) return // Only run function if a box is waiting for input
  
  const key = e.key.toUpperCase();

  if (currentWord[targetIndex] === key) return // Only run function if different letter

  if(validKey(key)) {
    const guessedWord = [...currentWord];
    guessedWord[targetIndex] = key;
    const valid = await validWord(guessedWord); // Check against dictionary API
    displayGuessedWord(valid, key, guessedWord);
    clearSelected();
    checkWin();
  }
})

startButton.addEventListener('click', () => {
  introWrapper.classList.add('hide');
  gameWrapper.classList.remove('hide');
  pickRandomWord();
  initializeGame();
});

restartButton.addEventListener('click', () => {
  guesses = [];
  validGuesses = 0;
  guessesText.innerHTML = 'Words guessed: 0';
  numberText.innerHTML = 'Number of guesses: ';
  pickRandomWord();
  initializeGame();
  wonWrapper.classList.add('hide');
});

gameBoxes.forEach(gameBox => gameBox.addEventListener('click', (e) => {
  clearSelected();
  targetIndex = e.target.getAttribute('data-box');
  waitingForKeyInput = true;
  gameBoxes[targetIndex].classList.add('selected');
}));

function pickRandomWord() {
  randomWords = words[Math.floor(Math.random() * words.length)];
  startWord = randomWords.start.toUpperCase().split('');
  endWord = randomWords.end.toUpperCase();
  currentWord = startWord;
}

function initializeGame() {
  for (let i = 0; i < gameBoxes.length; i++) {
    gameBoxes[i].innerHTML = startWord[i];
  }
  startText.innerHTML = `Start word: ${randomWords.start}`;
  endText.innerHTML = `End word: ${randomWords.end}`
}

function clearSelected() {
  for (let i = 0; i < gameBoxes.length; i++) {
    gameBoxes[i].classList.remove('selected');
  }
  waitingForKeyInput = false;
}

function displayGuessedWord(valid, key, word) {
  word = word.join('').toLowerCase();
  if (valid) {
    guesses.push(' ' + word);
    currentWord[targetIndex] = key;
    gameBoxes[targetIndex].innerHTML = key;
    validGuesses++;
  } else {
    guesses.push('<span class="wrong"> ' + word + '</span>')
  }
  guessesText.innerHTML = 'Words guessed: ' + guesses;
  numberText.innerHTML = 'Number of guesses: ' + guesses.length;
}

function checkWin() {
  const wordOne = currentWord.join('');
  const wordTwo = endWord;
  if (wordOne === wordTwo) {
    wonWrapper.classList.remove('hide');
    wonText.innerHTML = `You had a total of ${guesses.length} guesses, out of which ${validGuesses} were valid!`;
  }
}