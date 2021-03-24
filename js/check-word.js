const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

export default async function checkValidWord(word) {
  word = word.join('').toLowerCase();
  const response = await fetch(URL + word);
  const data = await response.json();
  if (data.title === 'No Definitions Found') {
    return false;
  } else {
    return true;
  }
}