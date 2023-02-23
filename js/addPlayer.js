import playList from "./data/playList.js";

const addPlayer = () => {
  const playBtn = document.querySelector('.play');
  const playNextBtn = document.querySelector('.play-next');
  const playPrevBtn = document.querySelector('.play-prev');
  const playlistContainer = document.querySelector('.play-list');
  const audio = new Audio();

  let isPlaying = false;
  let currentTrackNumber = 0;
  let currentPlayTime = 0;
  let timerId = null;

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
      const duration = audio.duration;
      const currentTime = Math.floor(audio.currentTime);
      li.textContent = (i === currentTrackNumber && isPlaying)
        ? `${el.title} - ${
          String(Math.floor(currentTime / 60)).padStart(2,'0')
        }:${
          String(currentTime % 60).padStart(2, '0')
        } (${
          String(Math.floor(currentTime / duration * 100) || 0)
        }%)`
        : el.title;
      li.classList.add('play-item');
      (i === currentTrackNumber) ? li.classList.add('item-active') : li.classList.remove('item-active');
      li.addEventListener('click', () => clickItemHandler(i));
      container.push(li);
    });

    playlistContainer.append(...container);
  };

  addPlaylistItems();

  const play = () => {
    audio.src = playList[currentTrackNumber].src;
    audio.currentTime = currentPlayTime;
    const res = audio.play();
    res.then(
      () => {
        isPlaying = true;
        playBtn.classList.add('pause');
        addPlaylistItems();
        timerId = setInterval(addPlaylistItems, 1000);
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
    currentPlayTime = 0;
    clearInterval(timerId);
    timerId = null;
    playNext();
  };

  playBtn.addEventListener('click', playBtnHandler);
  playNextBtn.addEventListener('click', playNext);
  playPrevBtn.addEventListener('click', playPrev);
  audio.addEventListener('ended', audioEndHandler);
};

export default addPlayer;