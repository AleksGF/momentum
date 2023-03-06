import getState from "./getState.js";
import getActions from "./actions.js";
import languageSettings from "./languageSettings.js";
import showTime from "./showTime.js";
import showGreeting from "./showGreeting.js";
import changeBackground from "./changeBackground.js";
import showWeather from "./showWeather.js";
import showQuote from "./showQuote.js";
import addPlayer from "./addPlayer.js";
import showSettings from "./showSettings.js";

const state = getState();
const actions = getActions(state);

function render(state, actions, shouldShowSettings) {
  const appSettings = state.appSettings;
  const modulesOptions = {
    showGreeting : {
      welcomeMsgs: languageSettings[state.appSettings.language].welcomeMsgs,
      namePlaceholder: languageSettings[state.appSettings.language].namePlaceholder,
      setUserName: actions.userName,
      state,
    },
    changeBackground: {
      setBackgroundNumber: actions.setBackgroundNumber,
      state,
    },
    showTime: {
      locale: languageSettings[state.appSettings.language].locale,
      dateOptions: languageSettings[state.appSettings.language].dateOptions,
      actions,
      state,
    },
    showWeather: {
      cityPlaceholder: languageSettings[state.appSettings.language].cityPlaceholder,
      setCity: actions.city,
      weatherUnits: languageSettings[state.appSettings.language].weatherUnits,
      windDirections: languageSettings[state.appSettings.language].windDirections,
      errorMsg: languageSettings[state.appSettings.language].errorMsg,
      state,
    },
    showQuote: {
      anonimValue: languageSettings[state.appSettings.language].anonimValue,
      state,
    },
    addPlayer: {
      state,
    },
    showSettings: {
      titles: languageSettings[state.appSettings.language].settingsTitles,
      languages: languageSettings[state.appSettings.language].languageItems,
      shouldShowSettings,
      render,
      actions,
      state,
    },
  };

  actions.partOfDay.subscribeOnChange(() => showGreeting(modulesOptions.showGreeting));
  actions.partOfDay.subscribeOnChange(() => changeBackground(modulesOptions.changeBackground));

  showGreeting(modulesOptions.showGreeting);
  showTime(modulesOptions.showTime);
  showWeather(modulesOptions.showWeather);
  showQuote(modulesOptions.showQuote);
  addPlayer(modulesOptions.addPlayer);
  showSettings(modulesOptions.showSettings, shouldShowSettings);
}

window.render = render;

render(state, actions,false);