const setState = {
  userName: newName => {localStorage.setItem('userName', newName);},
};

export default setState;