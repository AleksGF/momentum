const userName = localStorage.getItem('userName');
const city = localStorage.getItem('city');

const getBrowserLanguage = () => {
  const supportedLanguages = ['en', 'uk', 'ru'];
  const userLanguage = window.navigator.language;
  const userLanguages = window.navigator.languages;

  if (supportedLanguages.includes(userLanguage)) return userLanguage;

  for (let i = 0; i < userLanguages.length; i++) {
    if (supportedLanguages.includes(userLanguages[i])) return userLanguages[i];
  }

  return 'en';
};

const language = getBrowserLanguage();

const getRandom = () => String(Math.floor(Math.random() * 19) + 1).padStart(2, '0');

const backgroundNumber = getRandom();

const state = {
  language,
  userName,
  city,
  partOfDay: null,
  backgroundNumber,
};

export default state;