const showTime = options => {
  const timeField = document.querySelector('.time');
  const dateField = document.querySelector('.date');
  const setPartOfDay = options.actions.partOfDay.onChange.bind(options.actions.partOfDay);
  const setTimeUpdateTimer = options.actions.setTimeUpdateTimer;
  let timeUpdateTimer = options.state.timeUpdateTimer;

  timeField.style.visibility = options.state.appSettings.doShowTime ? 'visible' : 'hidden';
  dateField.style.visibility = options.state.appSettings.doShowDate ? 'visible' : 'hidden';

  const getTime = locale => new Date().toLocaleTimeString(locale);
  const getDate = (locale, options) => new Date().toLocaleDateString(locale, options);
  const getPartOfDay = () => Math.floor(new Date().getHours() / 6);

  const updateTimeAndDateField = () => {
    const partOfDay = getPartOfDay();

    if (partOfDay !== options.state.partOfDay) {
      setPartOfDay(partOfDay);
    }

    timeField.textContent = getTime(options.locale);
    dateField.textContent = getDate(options.locale, options.dateOptions);
  };

  if (timeUpdateTimer) {
    clearInterval(timeUpdateTimer);
    setTimeUpdateTimer(null);
  }

  updateTimeAndDateField();

  setTimeUpdateTimer(setInterval(updateTimeAndDateField, 1000));
};

export default showTime;