const showGreeting = options => {
  const welcomeMsgField = document.querySelector('.greeting');
  const userNameField = document.querySelector('.name');

  let userName = options.nameValue;
  const setUserName = options.setUserName;

  const userNameUpdate = e => {
    userName = e.target.value;
    setUserName(userName);
  };

  userNameField.addEventListener('input', userNameUpdate);

  const getPartOfDay = () => Math.floor(new Date().getHours() / 6);

  const getGreeting = messages => messages[getPartOfDay()];

  const updateWelcomeMsg = () => {
    welcomeMsgField.textContent = getGreeting(options.welcomeMsgs) + ', ';
    userNameField.value = userName;
  };

  updateWelcomeMsg();

  let timerId = setInterval(updateWelcomeMsg, 60000);

  /* window.addEventListener('focus', () => {
     if (!timerId) timerId = setInterval(updateWelcomeMsg, 60000);
   });

   window.addEventListener('blur', () => {
     if (timerId) {
       clearInterval(timerId);
       timerId = null;
     }
   });*/
};

export default showGreeting;