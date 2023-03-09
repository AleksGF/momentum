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
    state.city = {...newCity};
    localStorage.setItem('city', JSON.stringify(newCity));
  },

  setWeatherState: weatherState => {
    state.weatherState = {...weatherState};
  },

  setTimeUpdateTimer: timer => {
    state.timeUpdateTimer = timer;
  },

  setPlayList: playlist => {
    state.defaultPlayList = [...playlist];
  },

  setCurrentTrackNumber: number => {
    state.currentTrackNumber = number;
  },

  setCurrentPlayTime: time => {
    state.currentPlayTime = time;
  },

  setPlayerTimer: timer => {
    state.playerTimer = timer;
  },

  setPlayerTittleTimer: timer => {
    state.playerTittleTimer = timer;
  },

  setCurrentQuote: quote => {
    state.currentQuote = {...quote};
  },
});

export default actions;