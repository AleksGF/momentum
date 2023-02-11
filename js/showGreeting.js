const showGreeting = options => {
  const welcomeMsgField = document.querySelector('.greeting');

  const getPartOfDay = () => Math.floor(new Date().getHours() / 6);

  const getGreeting = messages => messages[getPartOfDay()];

  const updateWelcomeMsgField = () => {
    return welcomeMsgField.textContent = getGreeting(options.welcomeMsgs);
  };

  updateWelcomeMsgField();

  let timerId = setInterval(updateWelcomeMsgField, 60000);

  /* window.addEventListener('focus', () => {
     if (!timerId) timerId = setInterval(updateWelcomeMsgField, 60000);
   });

   window.addEventListener('blur', () => {
     if (timerId) {
       clearInterval(timerId);
       timerId = null;
     }
   });*/
};

export default showGreeting;