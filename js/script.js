import state from "./getState.js";
import setState from "./setState.js";
import languageSettings from "./languageSettings.js";
import showTime from "./showTime.js";
import showGreeting from "./showGreeting.js";

showTime({
  locale: languageSettings[state.language].locale,
  dateOptions: languageSettings[state.language].dateOptions
});

showGreeting({
  welcomeMsgs: languageSettings[state.language].welcomeMsgs,
  nameValue: state.userName || languageSettings[state.language].namePlaceholder,
  setUserName: setState.userName
});

/*console.log(languageSettings[settings.language].locale);*/
