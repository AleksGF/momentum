const showSettings = options => {
  const settingsBtn = document.querySelector('.settings-button');
  const settingsContainer = document.querySelector('.settings-container');
  const closeBtn = document.querySelector('.close-btn');

  settingsBtn.addEventListener('click', () => {
    settingsContainer.classList.add('settings-active');
  });

  closeBtn.addEventListener('click', () => {
    settingsContainer.classList.remove('settings-active');
  })
};

export default showSettings;