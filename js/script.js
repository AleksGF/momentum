import store from "./getStore.js";
import languageSettings from "./languageSettings.js";
import showTime from "./showTime.js";
import showGreeting from "./showGreeting.js";

showTime({
  locale: languageSettings[store.language].locale,
  dateOptions: languageSettings[store.language].dateOptions
});

showGreeting({
  welcomeMsgs: languageSettings[store.language].welcomeMsgs
});

/*console.log(languageSettings[settings.language].locale);*/
