import state from "./getState.js";
import setState from "./setState.js";
import languageSettings from "./languageSettings.js";
import showTime from "./showTime.js";
import showGreeting from "./showGreeting.js";
import changeBackground from "./changeBackground.js";

setState.partOfDay.subscribeOnChange(() => showGreeting({
  welcomeMsgs: languageSettings[state.language].welcomeMsgs,
  nameValue: state.userName || languageSettings[state.language].namePlaceholder,
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