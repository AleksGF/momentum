const showWeather = options => {
  const container = document.querySelector('.weather');
  const cityField = document.querySelector('.city');
  const icon = document.querySelector('.weather-icon');
  const errorField = document.querySelector('.weather-error');
  const temperatureField = document.querySelector('.temperature');
  const descriptionField = document.querySelector('.weather-description');
  const windField = document.querySelector('.wind');
  const humidityField = document.querySelector('.humidity');
  const forecastIcons = document.querySelectorAll('.forecast-icon');

  const key = options.state.weatherAPIKey;
  const cityNames = Object.assign({}, options.state.city);
  const language = options.state.appSettings.language;
  const setCity = options.actions.city;
  const setWeatherState = options.actions.setWeatherState;
  const {cityPlaceholder, weatherUnits, windDirections, errorMsg} = options;
  let weatherState = Object.assign({}, options.state.weatherState);
  let city = cityNames[language] || cityNames.name || cityNames.enteredName;

  container.style.visibility = options.state.appSettings.doShowWeather ? 'visible' : 'hidden';

  cityField.placeholder = cityPlaceholder;
  cityField.value = city;

  const fillWeatherFields = ({error, iconClass, desc, temp, wind, humidity}) => {
    icon.className = 'weather-icon owf';
    [...forecastIcons].forEach(icon => {
      icon.style.display = 'none'
    });

    if (error) {
      errorField.textContent = error;
      temperatureField.textContent = '';
      descriptionField.textContent = '';
      windField.textContent = '';
      humidityField.textContent = '';
    } else {
      if (iconClass) icon.classList.add(iconClass);
      temperatureField.textContent = temp || '';
      descriptionField.textContent = desc || '';
      windField.textContent = wind || '';
      humidityField.textContent = humidity || '';
      errorField.textContent = '';
      [...forecastIcons].forEach(icon => {
        icon.style.display = 'inline-block'
      });
    }
  };

  const getWeather = async function (city) {
    if (!city) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city
      }&lang=${
        language
      }&appid=${
        key
      }&units=metric`;

      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      const data = await resp.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      weatherState = {
        error: null,
        iconClass: `owf-${data.weather[0].id}`,
        desc: data?.weather[0]?.description,
        temp: `${Math.round(data?.main?.temp)} °C`,
        wind: `${
          Math.round(data?.wind?.speed)
        } ${
          weatherUnits[0]
        } (${
          windDirections[Math.floor(data?.wind?.deg / 22.5)]
        })`,
        humidity: `${Math.round(data?.main?.humidity)} ${weatherUnits[1]}`,
      };
    } catch (e) {
      weatherState = {
        error: `${errorMsg}: ${e.message}`,
        iconClass: null,
        desc: null,
        temp: null,
        wind: null,
        humidity: null,
      };
    }

    return weatherState;
  };

  const getCityNames = async function (city) {
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${
        city
      }&limit=1&appid=${
        key
      }`;

      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      const data = await resp.json();

      if (data?.message) {
        throw new Error(data.message);
      }

      return data[0];
    } catch (e) {
      console.log(`${errorMsg}: ${e.message}`);
    }
  };

  const cityUpdate = e => {
    if (!e.target.value) {
      city = '';
      setCity({
        enteredName: null,
        name: null,
        en: null,
        uk: null,
        ru: null,
      });
      weatherState = {
        error: null,
        iconClass: null,
        desc: null,
        temp: null,
        wind: null,
        humidity: null,
      };
      setWeatherState(weatherState);
      fillWeatherFields(weatherState);
      return;
    }

    city = e.target.value;
    getCityNames(city).then(data => {
      setCity({
        enteredName: city,
        name: data?.name || null,
        en: data?.local_names?.en || null,
        uk: data?.local_names?.uk || null,
        ru: data?.local_names?.ru || null,
      });
    });
    getWeather(city).then(weatherState => {
      setWeatherState(weatherState);
      fillWeatherFields(weatherState);
    });
  };

  const getCity = async function ({latitude, longitude}, key) {
    try {
      const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${
        latitude
      }&lon=${
        longitude
      }&limit=1&appid=${
        key
      }`;

      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      const data = await resp.json();

      if (data?.message) {
        throw new Error(data.message);
      }

      return data[0];
    } catch (e) {
      console.log(`${errorMsg}: ${e.message}`);
    }
  };

  if (!weatherState.error && weatherState.desc) {
    fillWeatherFields(weatherState);
  }

  if (!city && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        getCity(position.coords, key).then(data => {
          setCity({
            enteredName: null,
            name: data.name || null,
            en: data.local_names.en || null,
            uk: data.local_names.uk || null,
            ru: data.local_names.ru || null,
          });
          city = data.local_names[language] || data.name || '';
          cityField.value = city;
          getWeather(city).then(weatherState => {
            setWeatherState(weatherState);
            fillWeatherFields(weatherState);
          });
        });
      });
  }

  if (city && !weatherState.desc) {
    getWeather(city).then(weatherState => {
      setWeatherState(weatherState);
      fillWeatherFields(weatherState);
    });
  }

  cityField.addEventListener('change', cityUpdate);
};

export default showWeather;