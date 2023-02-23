const changeBackground = options => {
  const body = document.querySelector('body');
  const slidePrev = document.querySelector('.slide-prev');
  const slideNext = document.querySelector('.slide-next');

  let isImgLoading = false;

  const getSlideNext = () => {
    if (isImgLoading) return;
    let newNumber = parseInt(options.state.backgroundNumber, 10) + 1;
    if (newNumber > 20) newNumber = 1;
    options.setBackgroundNumber(String(newNumber).padStart(2, '0'), options.state);
  };

  const getSlidePrev = () => {
    if (isImgLoading) return;
    let newNumber = parseInt(options.state.backgroundNumber, 10) - 1;
    if (newNumber < 1) newNumber = 20;
    options.setBackgroundNumber(String(newNumber).padStart(2, '0'), options.state);
  };

  const setBackground = () => {
    isImgLoading = true;
    slideNext.style.opacity = '0.3';
    slidePrev.style.opacity = '0.3';
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${
      ['night', 'morning', 'afternoon', 'evening'][options.state.partOfDay]
    }/${
      options.state.backgroundNumber
    }.jpg`;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      body.style.backgroundImage = `url("${img.src}")`;
      isImgLoading = false;
      slideNext.style.opacity = '1';
      slidePrev.style.opacity = '1';
    };

    img.onerror = e => {
      console.log('Error when loading image');
      body.style.backgroundImage = 'url("../assets/img/bg.jpg")';
      isImgLoading = false;
      slideNext.style.opacity = '1';
      slidePrev.style.opacity = '1';
    }
  };

  slidePrev.onclick = () => {
    getSlidePrev();
    setBackground();
  };

  slideNext.onclick = () => {
    getSlideNext();
    setBackground();
  };

  setBackground();
};

export default changeBackground;
