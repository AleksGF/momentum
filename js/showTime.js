const showTime = options => {
  const timeField = document.querySelector('.time');
  const dateField = document.querySelector('.date');

  const getTime = locale => new Date().toLocaleTimeString(locale);

  const getDate = (locale, options) => new Date().toLocaleDateString(locale, options);

  const update = () => {
    timeField.textContent = getTime(options.locale);
    dateField.textContent = getDate(options.locale, options.dateOptions);
  };

  let timerId = null;

  window.addEventListener('focus', () => {
    if (!timerId) timerId = setInterval(update, 1000);
  });

  window.addEventListener('blur', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  });

  window.focus();
};

export default showTime;