const userName = localStorage.getItem('userName');

const state = {
  language: 'en',
  userName,
  city: 'Kyiv',
};

export default state;