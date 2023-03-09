const addPlayer = options => {
  const container = document.querySelector('.player');
  const trackTitle = document.querySelector('.track-title');
  let clonedTitle = null;
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
  const newTrackSelect = document.querySelector('.add-track-select');
  const newTrackAddBtn = document.querySelector('.add-track-button');
  const audio = new Audio();

  const playlist =   [...options.state.defaultPlayList];
  let currentTrackNumber = options.state.currentTrackNumber;
  let currentPlayTime = options.state.currentPlayTime;
  let timerId = options.state.playerTimer;
  let timerIdForTitle = options.state.playerTittleTimer;

  const setPlaylist = options.actions.setPlayList;
  const setCurrentTrackNumber = options.actions.setCurrentTrackNumber;
  const setCurrentPlayTime = options.actions.setCurrentPlayTime;
  const setTimerId = options.actions.setPlayerTimer;
  const setTimerIdForTitle = options.actions.setPlayerTittleTimer;

  let isPlaying = false;
  let isSeekSliderChanging = false;

  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    setTimerId(timerId);
  }

  if (timerIdForTitle) {
    clearInterval(timerIdForTitle);
    timerIdForTitle = null;
    setTimerIdForTitle(timerIdForTitle);
  }

  container.style.visibility = options.state.appSettings.doShowPlayer ? 'visible' : 'hidden';

  const addPlaylistItems = () => {
    playlistContainer.innerHTML = '';
    const container = [];

    const clickItemHandler = i => {
      if (i !== currentTrackNumber) {
        currentTrackNumber = i;
        setCurrentTrackNumber(i);
        currentPlayTime = 0;
        setCurrentPlayTime(currentPlayTime);
        play();
        return;
      }

      if (isPlaying) {
        pause();
        return;
      }

      play();
    };

      playlist.forEach((el, i) => {
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
      setTimerIdForTitle(timerIdForTitle);
    }

    if (clonedTitle) {
      clonedTitle.remove();
      clonedTitle = null;
    }

    trackTitle.textContent = playlist[currentTrackNumber].title;
    const containerWidth = trackTitleWrapper.clientWidth;
    const titleWidth = trackTitle.clientWidth;
    clonedTitle = trackTitle.cloneNode();
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
    setTimerIdForTitle(timerIdForTitle);
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
    audio.src = playlist[currentTrackNumber].src;
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
        setTimerId(timerId);
      },
      (e) => {
        console.log(e.message);
      }
    );
  };

  const pause = () => {
    audio.pause();
    currentPlayTime = audio.currentTime;
    setCurrentPlayTime(currentPlayTime);
    isPlaying = false;
    playBtn.classList.remove('pause');
    addPlaylistItems();
    clearInterval(timerId);
    timerId = null;
    setTimerId(timerId);
  };

  const playNext = () => {
    currentPlayTime = 0;
    setCurrentPlayTime(currentPlayTime);
    currentTrackNumber += 1;
    if (currentTrackNumber >= playlist.length) currentTrackNumber = 0;
    setCurrentTrackNumber(currentTrackNumber);
    play();
  };

  const playPrev = () => {
    currentPlayTime = 0;
    setCurrentPlayTime(currentPlayTime);
    currentTrackNumber -= 1;
    if (currentTrackNumber < 0) currentTrackNumber = playlist.length - 1;
    setCurrentTrackNumber(currentTrackNumber);
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
    setCurrentPlayTime(currentPlayTime);
    clearInterval(timerId);
    timerId = null;
    setTimerId(timerId);
    trackTitle.textContent = '';
    playNext();
  };

  const seekSliderHandler = e => {
    if (!audio.duration) {
      seekSlider.value = 0;
      return;
    }
    currentPlayTime = audio.duration / 100 * e.target.value;
    setCurrentPlayTime(currentPlayTime);
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

  const newTrackAddHandler = e => {
    if (e.target.files.length) {
      [...e.target.files].forEach(file => {
        const title = file.name.slice(0, file.name.lastIndexOf('.'));
        const src = URL.createObjectURL(file);
        playlist.push({title, src});
      });
      setPlaylist(playlist);
      addPlaylistItems();
    }
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
  newTrackAddBtn.addEventListener('click', () => {newTrackSelect.click();});
  newTrackSelect.addEventListener('change', newTrackAddHandler);
};

export default addPlayer;