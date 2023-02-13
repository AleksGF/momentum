const setState = {
  userName: newName => {
    localStorage.setItem('userName', newName);
  },

  partOfDay: {
    subscribers: [],

    subscribeOnChange: function (subscriber) {
      this.subscribers.push(subscriber);
    },

    onChange: function (newPartOfDay, state) {
      state.partOfDay = newPartOfDay;
      this.subscribers.forEach(subscriber => subscriber.call(null, newPartOfDay));
    },
  },

  setBackgroundNumber: (newNumber, state) => {
    state.backgroundNumber = newNumber;
  },
}

export default setState;