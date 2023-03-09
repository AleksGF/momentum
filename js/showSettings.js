const showSettings = options => {
  const settingsBtn = document.querySelector('.settings-button');
  const settingsContainer = document.querySelector('.settings-container');
  const settingsInputItems = settingsContainer.querySelectorAll('.settings-item input');
  const closeBtn = document.querySelector('.close-btn');
  const headerField = document.querySelector('.settings-title');
  const languageTitleField = document.querySelector('.language-title-field');
  const languageSelectContainer = document.querySelector('.language-select');
  const doShowPlayerField = document.querySelector('.do-show-player');
  const doShowWeatherField = document.querySelector('.do-show-weather');
  const doShowTimeField = document.querySelector('.do-show-time');
  const doShowDateField = document.querySelector('.do-show-date');
  const doShowGreetingField = document.querySelector('.do-show-greeting');
  const doShowQuoteField = document.querySelector('.do-show-quote');

  const render = options.actions.render;
  const shouldShowMenu = options.shouldShowSettings;
  const appSettings = Object.assign({}, options.state.appSettings);
  const saveSettings = options.actions.appSettings;
  const languages = Object.assign({}, options.languages);
  let languageSelectOptions = [];

  headerField.textContent = options.titles.header;
  languageTitleField.firstChild.textContent = options.titles.languageItem;

  for (let lang in languages) {
    let option = document.createElement('option');
    option.setAttribute('value', lang);
    option.textContent = languages[lang];
    if (lang === appSettings.language) {
      option.setAttribute('selected', 'true');
    }
    languageSelectOptions.push(option);
  }

  languageSelectContainer.innerHTML = '';
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

  const hideMenu = e => {
    if (e.target === closeBtn || !settingsContainer.contains(e.target)) {
      settingsContainer.classList.remove('settings-active');
      document.removeEventListener('click', hideMenu);
    }
  };

  const changeLanguageHandler = e => {
    appSettings.language = e.target.value;
    saveSettings(appSettings);
    render(options.state, options.actions);
  };

  const settingsItemsHandler = e => {
    appSettings[e.currentTarget.value] = e.currentTarget.checked;
    saveSettings(appSettings);
    render(options.state, options.actions);
  };

  settingsBtn.addEventListener('click', showMenu);

  languageSelectContainer.addEventListener('change', changeLanguageHandler);

  [...settingsInputItems].forEach(item => {
    item.checked = !!appSettings[item.value];
    item.addEventListener('change', settingsItemsHandler);
  });
};

export default showSettings;