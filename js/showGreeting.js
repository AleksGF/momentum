const showGreeting = options => {
  const container = document.querySelector('.greeting-container');
  const welcomeMsgField = document.querySelector('.greeting');
  const userNameField = document.querySelector('.name');
  userNameField.placeholder = options.namePlaceholder;

  let userName = options.state.userName;
  const setUserName = options.setUserName;
  const partOfDay = options.state.partOfDay;

  container.style.visibility = options.state.appSettings.doShowGreeting ? 'visible' : 'hidden';

  const userNameUpdate = e => {
    userName = e.target.value;
    setUserName(userName);
  };

  userNameField.addEventListener('input', userNameUpdate);

  const getGreeting = messages => messages[partOfDay];

  const updateWelcomeMsg = () => {
    welcomeMsgField.textContent = getGreeting(options.welcomeMsgs) + ', ';
    userNameField.value = userName;
  };

  updateWelcomeMsg();
};

export default showGreeting;