const button = document.querySelector('.start-btn');
const buttonTwo = document.querySelector('.start-btn-two');

const subjectData = [
  { subject: 'Read Book' },
  { subject: 'Write One Page' },
  { subject: 'Listen PodCast' },
  { subject: 'Watch Serie' },
  { subject: 'Generate random word and write 5 sentences' },
];

let deuWord = '';
let engWord = '';
let randomSubject = '';
let wordsApiFetch = [];

const url = '/api/v1/words/';

const getAllWords = async () => {
  try {
    const { data } = await axios.get(url);
    const { words } = data;

    words.map((word) => {
      wordsApiFetch.push(word);
      return;
    });
  } catch (error) {
    console.log(error);
  }
};

getAllWords();

const randomWordGenerator = () => {
  const random = Math.floor(Math.random() * wordsApiFetch.length);

  deuWord = wordsApiFetch[random].wort;

  engWord = wordsApiFetch[random].word;

  document.getElementById('germanWord').innerHTML = deuWord;

  document.getElementById('englishWord').innerHTML = engWord;
};

const randomSubjectGenerator = () => {
  const random = Math.floor(Math.random() * subjectData.length);

  randomSubject = subjectData[random].subject;

  document.getElementById('whatToStudy').innerHTML = randomSubject;
};

button.addEventListener('click', () => {
  randomWordGenerator();
});

buttonTwo.addEventListener('click', () => {
  randomSubjectGenerator();
});

/* setInterval(randomWordGenerator, 6000); */

/* function timer() {
  setInterval();
}

const clearAlert = () => {
  setTimeout(() => {
    dispatch({ type: CLEAR_ALERT });
  }, 3000);
};
 */
