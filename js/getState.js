const getState = () => {
  const userName = localStorage.getItem('userName');
  const city = localStorage.getItem('city');
  const savedSettings = localStorage.getItem('appSettings');

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

  const appSettings = savedSettings ? JSON.parse(savedSettings) : {
    language: getBrowserLanguage(),
    doShowPlayer: true,
    doShowWeather: true,
    doShowTime: true,
    doShowDate: true,
    doShowGreeting: true,
    doShowQuote: true,
  };

  const getRandom = () => String(Math.floor(Math.random() * 19) + 1).padStart(2, '0');

  const backgroundNumber = getRandom();

  const state = {
    appSettings,
    userName,
    city,
    partOfDay: null,
    timeUpdateTimer: null,
    backgroundNumber,
  };

  return state;
}

export default getState;