const userName = localStorage.getItem('userName');

const getBrowserLanguage = () => {
  const supportedLanguages = ['en', 'uk', 'ru'];
  const userLanguage = window.navigator.language;
  const userLanguages = window.navigator.languages;

  if (supportedLanguages.includes(userLanguage)) return userLanguage;

  for (let i = 0; i < userLanguages.length; i++) {
    if (supportedLanguages.includes(userLanguages[i])) return userLanguages[i];
  }

  return null;
};

const getRandom = () => String(Math.floor(Math.random() * 19) + 1).padStart(2, '0');

const state = {
  language: getBrowserLanguage() || 'en',
  userName,
  city: 'Kyiv',
  partOfDay: null,
  backgroundNumber: getRandom(),
};

export default state;