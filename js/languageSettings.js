const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const en = {
  locale: 'en-Us',
  languageName: 'English',
  welcomeMsgs: ['Good Night', 'Good Morning', 'Good Afternoon', 'Good Evening'],
  namePlaceholder: 'Enter your name',
  cityPlaceholder: 'Your city',
  weatherUnits: ['m/s', 'mmHg'],
  windDirections: ['N', 'NE', 'NE', 'E', 'E', 'SE', 'SE', 'S', 'S', 'SW', 'SW', 'W', 'W', 'NW', 'NW', 'N'],
  errorMsg: 'Some error',
  anonimValue: 'Anonim',
  dateOptions,
  settingsTitles: {
    header: 'Settings',
    languageItem: 'Choose language',
    playerItem: 'Show Player?',
    weatherItem: 'Show Weather?',
    timeItem: 'Show Time?',
    dateItem: 'Show Date?',
    greetingItem: 'Show Greeting?',
    quoteItem: 'Show Quote?',
  },
  languageItems: {
    en: 'English',
    uk: 'Ukrainian',
    ru: 'Russian',
  },
};

const uk = {
  locale: 'uk-Ua',
  languageName: 'Українська',
  welcomeMsgs: ['Доброї ночі', 'Доброго ранку', 'Доброго дня', 'Доброго вечора'],
  namePlaceholder: "Введіть Ваше ім'я",
  cityPlaceholder: 'Ваше місто',
  weatherUnits: ['м/с', 'мм рт.ст.'],
  windDirections: ['Пн.', 'Пн.Сх.', 'Пн.Сх.', 'Сх.', 'Сх.', 'Пд.Сх.', 'Пд.Сх.', 'Пд.', 'Пд.', 'Пд.Зх.', 'Пд.Зх.', 'Зх.', 'Зх.', 'Пн.Зх.', 'Пн.Зх.', 'Пн.'],
  errorMsg: 'Сталася помилка',
  anonimValue: 'Анонім',
  dateOptions,
  settingsTitles: {
    header: 'Налаштування',
    languageItem: 'Оберіть мову',
    playerItem: 'Показати Аудіоплеєр?',
    weatherItem: 'Показати Погоду?',
    timeItem: 'Показати Час?',
    dateItem: 'Показати Дату?',
    greetingItem: 'Показати Привітання?',
    quoteItem: 'Показати Цитату?',
  },
  languageItems: {
    en: 'Англійська',
    uk: 'Українська',
    ru: 'Російська',
  },
};

const ru = {
  locale: 'ru-Ru',
  languageName: 'Русский',
  welcomeMsgs: ['Доброй ночи', 'Доброго утра', 'Доброго дня', 'Доброго вечера'],
  namePlaceholder: "Введите Ваше имя",
  cityPlaceholder: 'Ваш город',
  weatherUnits: ['м/с', 'мм рт.ст.'],
  windDirections: ['С', 'СВ', 'СВ', 'В', 'В', 'ЮВ', 'ЮВ', 'Ю', 'Ю', 'ЮЗ', 'ЮЗ', 'З', 'З', 'СЗ', 'СЗ', 'С'],
  errorMsg: 'Произошла ошибка',
  anonimValue: 'Аноним',
  dateOptions,
  settingsTitles: {
    header: 'Настройки',
    languageItem: 'Выберите язык',
    playerItem: 'Показать Аудиоплеер?',
    weatherItem: 'Показать Погоду?',
    timeItem: 'Показать Время?',
    dateItem: 'Показать Дату?',
    greetingItem: 'Показать Приветствие?',
    quoteItem: 'Показать Цитату?',
  },
  languageItems: {
    en: 'Английский',
    uk: 'Украинский',
    ru: 'Русский',
  },
};

const languageSettings = { en, uk, ru };

export default languageSettings;