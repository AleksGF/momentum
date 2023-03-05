const showSettings = options => {
  const currentLanguage = options.language;
  const settingsBtn = document.querySelector('.settings-button');
  const settingsContainer = document.querySelector('.settings-container');
  const settingsInputItems = settingsContainer.querySelectorAll('.settings-item input');
  const closeBtn = document.querySelector('.close-btn');
  const headerField = document.querySelector('.settings-title');
  const languageTitleField = document.querySelector('.language-title-field');
  const languageSelectContainer = document.querySelector('.language-select');
  const languages = Object.assign({}, options.languages);
  let languageSelectOptions = [];
  const doShowPlayerField = document.querySelector('.do-show-player');
  const doShowWeatherField = document.querySelector('.do-show-weather');
  const doShowTimeField = document.querySelector('.do-show-time');
  const doShowDateField = document.querySelector('.do-show-date');
  const doShowGreetingField = document.querySelector('.do-show-greeting');
  const doShowQuoteField = document.querySelector('.do-show-quote');

  headerField.textContent = options.titles.header;
  languageTitleField.firstChild.textContent = options.titles.languageItem;

  for (let lang in languages) {
    let option = document.createElement('option');
    option.setAttribute('value', lang);
    option.textContent = languages[lang];
    if (lang === currentLanguage) {
      option.setAttribute('selected', 'true');
    }
    languageSelectOptions.push(option);
  }

  languageSelectContainer.append(...languageSelectOptions);

  doShowPlayerField.firstChild.textContent = options.titles.playerItem;
  doShowWeatherField.firstChild.textContent = options.titles.weatherItem;
  doShowTimeField.firstChild.textContent = options.titles.timeItem;
  doShowDateField.firstChild.textContent = options.titles.dateItem;
  doShowGreetingField.firstChild.textContent = options.titles.greetingItem;
  doShowQuoteField.firstChild.textContent = options.titles.quoteItem;

  const showMenu = () => {
    settingsContainer.classList.add('settings-active');
    document.addEventListener('click', hideMenu, {capture: true});
  };

  if (options.shouldShowMenu) showMenu();

  const hideMenu = e => {
    if (e.target === closeBtn || !settingsContainer.contains(e.target)) {
      settingsContainer.classList.remove('settings-active');
      document.removeEventListener('click', hideMenu);
    }
  };

  const settingsItemsHandler = e => {
    console.log(e.currentTarget.value + ' ' + e.currentTarget.checked);
  };

  settingsBtn.addEventListener('click', showMenu);

  [...settingsInputItems].forEach(item => {
    item.addEventListener('change', settingsItemsHandler);
  });
};

export default showSettings;