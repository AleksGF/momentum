const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const en = {
  locale: 'en-Us',
  languageName: 'English',
  welcomeMsg: 'Welcome',
  dateOptions,
};

const uk = {
  locale: 'uk-Ua',
  languageName: 'Українська',
  welcomeMsg: 'Ласкаво просимо',
  dateOptions,
};

const ru = {
  locale: 'ru-Ru',
  languageName: 'Русский',
  welcomeMsg: 'Добро пожаловать',
  dateOptions,
};

export const languageSettings = { en, uk, ru };