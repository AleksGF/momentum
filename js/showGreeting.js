const showGreeting = options => {
  const welcomeMsgField = document.querySelector('.greeting');
  const userNameField = document.querySelector('.name');
  userNameField.placeholder = options.namePlaceholder;

  let userName = options.nameValue;
  const setUserName = options.setUserName;
  const partOfDay = options.partOfDay;

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