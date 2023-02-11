const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const en = {
  locale: 'en-Us',
  languageName: 'English',
  welcomeMsgs: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
  namePlaceholder: 'Enter your name',
  dateOptions,
};

const uk = {
  locale: 'uk-Ua',
  languageName: 'Українська',
  welcomeMsgs: ['Доброї ночі', 'Доброго ранку', 'Доброго дня', 'Доброго вечора'],
  namePlaceholder: "Введіть Ваше ім'я",
  dateOptions,
};

const ru = {
  locale: 'ru-Ru',
  languageName: 'Русский',
  welcomeMsgs: ['Доброй ночи', 'Доброго утра', 'Доброго дня', 'Доброго вечера'],
  namePlaceholder: "Введите Ваше имя",
  dateOptions,
};

const languageSettings = { en, uk, ru };

export default languageSettings;