const actions = state => ({
  appSettings: appSettings => {
    state.appSettings = appSettings;
    localStorage.setItem('appSettings', JSON.stringify(appSettings));
  },

  userName: newName => {
    state.userName = newName;
    localStorage.setItem('userName', newName);
  },

  partOfDay: {
    subscribers: [],

    subscribeOnChange: function (subscriber) {
      this.subscribers.push(subscriber);
    },

    onChange: function (newPartOfDay) {
      state.partOfDay = newPartOfDay;
      this.subscribers.forEach(subscriber => subscriber.call(null, newPartOfDay));
    },
  },

  setBackgroundNumber: (newNumber) => {
    state.backgroundNumber = newNumber;
  },

  city: newCity => {
    state.city = newCity;
    localStorage.setItem('city', newCity);
  },

  setTimeUpdateTimer: timer => {
    state.timeUpdateTimer = timer;
  },
});

export default actions;