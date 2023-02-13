const showTime = options => {
  const timeField = document.querySelector('.time');
  const dateField = document.querySelector('.date');

  const getTime = locale => new Date().toLocaleTimeString(locale);

  const getDate = (locale, options) => new Date().toLocaleDateString(locale, options);

  const getPartOfDay = () => Math.floor(new Date().getHours() / 6);

  const updateTimeAndDateField = () => {
    const partOfDay = getPartOfDay();

    if (partOfDay !== options.state.partOfDay) {
      options.setPartOfDay(partOfDay, options.state);
    }

    timeField.textContent = getTime(options.locale);
    dateField.textContent = getDate(options.locale, options.dateOptions);

  };

  updateTimeAndDateField();

  /*let timerId = */setInterval(updateTimeAndDateField, 1000);

 /* window.addEventListener('focus', () => {
    if (!timerId) timerId = setInterval(updateTimeAndDateField, 1000);
  });

  window.addEventListener('blur', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  });*/
};

export default showTime;