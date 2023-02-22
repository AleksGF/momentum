const showWeather = options => {
  const key = '92314951124358555b66152e3c71b94e';

  const cityField = document.querySelector('.city');
  const icon = document.querySelector('.weather-icon');
  const errorField = document.querySelector('.weather-error');
  const temperatureField = document.querySelector('.temperature');
  const descriptionField = document.querySelector('.weather-description');
  const windField = document.querySelector('.wind');
  const humidityField = document.querySelector('.humidity');

  let city = options.city;
  const {cityPlaceholder, setCity, language, weatherUnits, windDirections, errorMsg} = options;

  cityField.placeholder = cityPlaceholder;
  cityField.value = city;

  const getWeather = async function(city) {
    if (!city) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city
      }&lang=${
        language
      }&appid=${
        key
      }&units=metric`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      icon.className = 'weather-icon owf';
      icon.classList.add(`owf-${data.weather[0].id}`);
      temperatureField.textContent = `${data?.main?.temp}°C`;
      descriptionField.textContent = data?.weather[0]?.description;
      windField.textContent = `${
        data?.wind?.speed
      }${
        weatherUnits[0]
      } (${
        windDirections[Math.floor(data?.wind?.deg / 22.5)]
      })`;
      humidityField.textContent = `${data?.main?.humidity}${weatherUnits[1]}`;
    } catch (e) {
      errorField.textContent = `${errorMsg}: ${e.message}`;
    }
  };

  if (city) {
    getWeather(city);
  } else if (navigator.geolocation) {
    const getCity = async function({latitude, longitude}, key) {
      try {
        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${
          latitude
        }&lon=${
          longitude
        }&limit=1&appid=${
          key
        }`;

        const res = await fetch(url);
        const data = await res.json();

        if (data?.message) {
          throw new Error(data.message);
        }

        city = data[0]['local_names'][language] || data[0]?.name;
        setCity(city);
        cityField.value = city;
        getWeather(city);
      } catch (e) {
        console.log(`${errorMsg}: ${e.message}`);
      }
    };

    navigator.geolocation.getCurrentPosition((position) => getCity(position.coords, key));
  }


  const cityUpdate = e => {
    if (!e.target.value) return;
    city = e.target.value;
    setCity(city);
    getWeather(city);
  };

  cityField.addEventListener('change', cityUpdate);

};

export default showWeather;