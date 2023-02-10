import {settings} from "./settigs.js";
import {languageSettings} from "./languageSettings.js";
import showTime from "./showTime.js";

showTime({
  locale: languageSettings[settings.language].locale,
  dateOptions: languageSettings[settings.language].dateOptions
});

/*console.log(languageSettings[settings.language].locale);*/
