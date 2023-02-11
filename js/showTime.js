const showTime = options => {
  const timeField = document.querySelector('.time');
  const dateField = document.querySelector('.date');

  const getTime = locale => new Date().toLocaleTimeString(locale);

  const getDate = (locale, options) => new Date().toLocaleDateString(locale, options);

  const update = () => {
    timeField.textContent = getTime(options.locale);
    dateField.textContent = getDate(options.locale, options.dateOptions);
  };

  update();
  let timerId = setInterval(update, 1000);

 /* window.addEventListener('focus', () => {
    if (!timerId) timerId = setInterval(update, 1000);
  });

  window.addEventListener('blur', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  });*/
};

export default showTime;