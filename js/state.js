import defaultPlayList from "./data/playList.js";

const state = () => {
  const userName = localStorage.getItem('userName');
  const savedCity = localStorage.getItem('city');
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

  const city = savedCity ? JSON.parse(savedCity) : {
    enteredName: null,
    name: null,
    en: null,
    uk: null,
    ru: null,
  };

  const getRandom = () => String(Math.floor(Math.random() * 19) + 1).padStart(2, '0');

  const backgroundNumber = getRandom();

  const state = {
    appSettings,
    userName,
    city,
    weatherAPIKey: '92314951124358555b66152e3c71b94e',
    weatherState: {
      error: null,
      iconClass: null,
      desc: null,
      temp: null,
      wind: null,
      humidity: null,
    },
    partOfDay: null,
    timeUpdateTimer: null,
    defaultPlayList,
    currentTrackNumber: 0,
    currentPlayTime: 0,
    playerTimer: null,
    playerTittleTimer: null,
    backgroundNumber,
    currentQuote: {
      quoteText: null,
      quoteAuthor: null,
      quoteLanguage: null,
    },
  };

  return state;
}

export default state;