import state from "./getState.js";
import setState from "./setState.js";
import languageSettings from "./languageSettings.js";
import showTime from "./showTime.js";
import showGreeting from "./showGreeting.js";
import changeBackground from "./changeBackground.js";
import showWeather from "./showWeather.js";
import showQuote from "./showQuote.js";
import addPlayer from "./addPlayer.js";
import showSettings from "./showSettings.js";

setState.partOfDay.subscribeOnChange(() => showGreeting({
  welcomeMsgs: languageSettings[state.language].welcomeMsgs,
  nameValue: state.userName,
  namePlaceholder: languageSettings[state.language].namePlaceholder,
  setUserName: setState.userName,
  partOfDay: state.partOfDay,
}));

setState.partOfDay.subscribeOnChange(() => changeBackground({
  setBackgroundNumber: setState.setBackgroundNumber,
  state,
}));

showTime({
  locale: languageSettings[state.language].locale,
  dateOptions: languageSettings[state.language].dateOptions,
  state,
  setPartOfDay: setState.partOfDay.onChange.bind(setState.partOfDay),
});

showWeather({
  city: state.city,
  cityPlaceholder: languageSettings[state.language].cityPlaceholder,
  setCity: setState.city,
  language: state.language,
  weatherUnits: languageSettings[state.language].weatherUnits,
  windDirections: languageSettings[state.language].windDirections,
  errorMsg: languageSettings[state.language].errorMsg,
});

showQuote({
  language: state.language,
  anonimValue: languageSettings[state.language].anonimValue,
});

addPlayer();

showSettings({
  language: state.language,
  titles: languageSettings[state.language].settingsTitles,
  languages: languageSettings[state.language].languageItems,
  shouldShowMenu: false,
  });