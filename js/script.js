import store from "./getStore.js";
import {languageSettings} from "./languageSettings.js";
import showTime from "./showTime.js";

showTime({
  locale: languageSettings[store.language].locale,
  dateOptions: languageSettings[store.language].dateOptions
});

/*console.log(languageSettings[settings.language].locale);*/
