const showWeather = options => {
  const key = '92314951124358555b66152e3c71b94e';

  const cityField = document.querySelector('.city');
  const icon = document.querySelector('.weather-icon');
  const errorField = document.querySelector('.weather-error');
  const temperatureField = document.querySelector('.temperature');
  const descriptionField = document.querySelector('.weather-description');
  const windField = document.querySelector('.wind');
  const humidityField = document.querySelector('.humidity');

  let city = options.cityValue;
  const {setCity, language, weatherUnits, windDirections} = options;

  cityField.value = city;

  const getWeather = async function(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${
      city
    }&lang=${
      language
    }&appid=${
      key
    }&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

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
  };

  getWeather(city);

  const cityUpdate = e => {
    city = e.target.value;
    setCity(city);
    getWeather(city);
  };

  cityField.addEventListener('change', cityUpdate);

};

export default showWeather;