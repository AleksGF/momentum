import playList from "./data/playList.js";

const addPlayer = () => {
  const trackTitle = document.querySelector('.track-title');
  const trackTitleWrapper = document.querySelector('.track-title-wrapper');
  const currentTrackTime = document.querySelector('.current-time');
  const trackDuration = document.querySelector('.duration');
  const seekSlider = document.querySelector('.seek-slider');
  const volumeSlider = document.querySelector('.volume-slider');
  const muteButton = document.querySelector('.volume-icon');
  const playBtn = document.querySelector('.play');
  const playNextBtn = document.querySelector('.play-next');
  const playPrevBtn = document.querySelector('.play-prev');
  const playlistContainer = document.querySelector('.play-list');
  const audio = new Audio();

  let isPlaying = false;
  let currentTrackNumber = 0;
  let currentPlayTime = 0;
  let timerId = null;
  let timerIdForTitle = null;
  let isSeekSliderChanging = false;

  const addPlaylistItems = () => {
    playlistContainer.innerHTML = '';
    const container = [];

    const clickItemHandler = i => {
      if (i !== currentTrackNumber) {
        currentTrackNumber = i;
        currentPlayTime = 0;
        play();
        return;
      }

      if (isPlaying) {
        pause();
        return;
      }

      play();
    };

      playList.forEach((el, i) => {
        const li = document.createElement('li');
        li.textContent = el.title;
        li.classList.add('play-item');
        (i === currentTrackNumber) ? li.classList.add('item-active') : li.classList.remove('item-active');
        (i === currentTrackNumber && isPlaying) ? li.classList.add('item-playing') : li.classList.remove('item-playing');
        li.addEventListener('click', () => clickItemHandler(i));
        container.push(li);
      });

      playlistContainer.append(...container);
    };

  addPlaylistItems();

  const showTrackTitle = () => {
    if (timerIdForTitle) {
      clearInterval(timerIdForTitle);
      timerIdForTitle = null;
    }

    trackTitle.textContent = playList[currentTrackNumber].title;
    const containerWidth = trackTitleWrapper.clientWidth;
    const titleWidth = trackTitle.clientWidth;
    const clonedTitle = trackTitle.cloneNode();
    let titleLeft = (containerWidth - titleWidth) / 2;

    clonedTitle.style.left = (titleLeft - containerWidth) + 'px';
    clonedTitle.textContent = trackTitle.textContent;
    trackTitleWrapper.append(clonedTitle);

    const moveTrackTitle = () => {
      titleLeft += 1;
      if (titleLeft >= containerWidth) titleLeft = 0;

      trackTitle.style.left = titleLeft + 'px';
      clonedTitle.style.left = (titleLeft - containerWidth) + 'px';
    };

    moveTrackTitle();
    timerIdForTitle = setInterval(moveTrackTitle, 100);
  };

  const showPlayProgress = () => {
    currentTrackTime.textContent = `${
      String(Math.floor(audio.currentTime / 60)).padStart(2,'0')
    }:${
      String(Math.round(audio.currentTime % 60)).padStart(2, '0')
    }`;

    if (!isSeekSliderChanging) seekSlider.value = audio.currentTime / audio.duration * 100;
    seekSlider.style.setProperty('--play-duration', `${audio.currentTime / audio.duration * 100}%`);
  };

  const play = () => {
    audio.src = playList[currentTrackNumber].src;
    audio.currentTime = currentPlayTime;
    const res = audio.play();
    res.then(
      () => {
        isPlaying = true;
        playBtn.classList.add('pause');
        showTrackTitle();
        trackDuration.textContent = `${
          String(Math.floor(audio.duration / 60)).padStart(2,'0')
        }:${
          String(Math.floor(audio.duration % 60)).padStart(2, '0')
        }`;
        addPlaylistItems();
        showPlayProgress();
        timerId = setInterval(showPlayProgress, 1000);
      },
      (e) => {
        console.log(e.message);
      }
    );
  };

  const pause = () => {
    audio.pause();
    currentPlayTime = audio.currentTime;
    isPlaying = false;
    playBtn.classList.remove('pause');
    addPlaylistItems();
    clearInterval(timerId);
    timerId = null;
  };

  const playNext = () => {
    currentPlayTime = 0;
    currentTrackNumber += 1;
    if (currentTrackNumber >= playList.length) currentTrackNumber = 0;
    play();
  };

  const playPrev = () => {
    currentPlayTime = 0;
    currentTrackNumber -= 1;
    if (currentTrackNumber < 0) currentTrackNumber = playList.length - 1;
    play();
  };

  const playBtnHandler = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const audioEndHandler = () => {
    isPlaying = false;
    playBtn.classList.remove('pause');
    addPlaylistItems();
    currentPlayTime = 0;
    clearInterval(timerId);
    timerId = null;
    trackTitle.textContent = '';
    playNext();
  };

  const seekSliderHandler = e => {
    if (!audio.duration) {
      seekSlider.value = 0;
      return;
    }
    currentPlayTime = audio.duration / 100 * e.target.value;
    play();
  };

  const volumeSliderHandler = e => {
    audio.volume = e.target.value / 100;
    volumeSlider.style.setProperty('--volume-level', `${e.target.value}%`)
  };

  const muteButtonHandler = () => {
    audio.muted = !audio.muted;
    muteButton.classList.toggle('muted');
  };

  playBtn.addEventListener('click', playBtnHandler);
  playNextBtn.addEventListener('click', playNext);
  playPrevBtn.addEventListener('click', playPrev);
  audio.addEventListener('ended', audioEndHandler);
  seekSlider.addEventListener('change', seekSliderHandler);
  seekSlider.addEventListener('mousedown', () => {isSeekSliderChanging = true;});
  seekSlider.addEventListener('mouseup', () => {isSeekSliderChanging = false;});
  volumeSlider.addEventListener('input', volumeSliderHandler);
  muteButton.addEventListener('click', muteButtonHandler);
};

export default addPlayer;