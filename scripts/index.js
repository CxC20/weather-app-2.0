let oneCallForecastApiKey = "2204e2f50737e4cd706dca2096135d4e";
let currentWeatherApiKey = "802540f702d19dfc355b50bb670f1cc5";

function displayTime(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let m = "";

  if (hour === 0) {
    hour = 12;
    m = "AM";
  } else {
    if (0 < hour && hour < 12) {
      m = "AM";
    } else {
      if (hour === 12) {
        m = "PM";
      } else {
        hour = hour - 12;
        m = "PM";
      }
    }
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  let currentTime = `${hour}:${minute} ${m}`;
  let currentTimeInner = document.getElementById("current-time");
  currentTimeInner.innerHTML = currentTime;
}

function displayCurrentDay() {
  let today = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];

  let date = today.getDate();

  let currentDay = `${day}, ${month} ${date}`;

  let currentDayInner = document.getElementById("current-day");
  currentDayInner.innerHTML = currentDay;
}

function currentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(pullPosition);

  //   celsiusToFahrenheit(event);
}

function pullPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${currentWeatherApiKey}&units=imperial`;
  oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${oneCallForecastApiKey}&units=imperial`;

  axios.get(currentApiUrl).then(displayCityName);
  axios.get(oneCallApiUrl).then(displayWeather);
  axios.get(oneCallApiUrl).then(displayTime);
}

function searchCoordinates(event) {
  event.preventDefault();

  function pullCoordinates(response) {
    console.log(response);

    lat = response.data.coord.lat;
    lon = response.data.coord.lon;

    oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${oneCallForecastApiKey}&units=imperial`;

    axios.get(oneCallApiUrl).then(displayWeather);
    axios.get(oneCallApiUrl).then(displayTime);
  }

  let cityInput = document.getElementById("city-input");
  city = cityInput.value.trim().toLowerCase();

  currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${currentWeatherApiKey}&units=imperial`;

  axios.get(currentApiUrl).then(displayCityName);
  axios.get(currentApiUrl).then(pullCoordinates);
}

function displayCityName(response) {
  city = response.data.name;
  let cityDisplay = document.getElementById("city-display");
  cityDisplay.innerHTML = city;
}

function displayWeather(response) {
  console.log(response.data);

  let cityDisplayTimeZone = response.data.timezone_offset;
  let updatedUTCTime =
    response.data.hourly[0].dt + localTimeZone + cityDisplayTimeZone;
  console.log(new Date(updatedUTCTime * 1000));

  if (localTimeZone + cityDisplayTimeZone === 0) {
    displayTime(new Date());
  } else {
    displayTime(new Date(updatedUTCTime * 1000));
  }

  let weatherIconDisplay = document.getElementById("weather-icon");
  let currentTempDisplay = document.getElementById("current-temp");
  let weatherDescriptionDisplay = document.getElementById(
    "weather-description"
  );
  let precipitationDisplay = document.getElementById("precipitation");
  let humidityDisplay = document.getElementById("humidity");
  let windSpeedDisplay = document.getElementById("wind-speed");

  // fahrenheitDisplay = Math.round(response.data.main.temp);

  weatherIconDisplay.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.hourly[0].weather[0].icon}@2x.png" />`;
  // currentTempDisplay.innerHTML = fahrenheitDisplay;
  weatherDescriptionDisplay.innerHTML =
    response.data.hourly[0].weather[0].description;
  precipitationDisplay.innerHTML = `Precipitation: ${response.data.hourly[0].pop}%`;
  humidityDisplay.innerHTML = `Humidity: ${response.data.hourly[0].humidity}%`;
  windSpeedDisplay.innerHTML = `Wind Speed: ${Math.round(
    response.data.hourly[0].wind_speed
  )} mph`;
}

window.addEventListener("load", displayCurrentDay);
window.addEventListener("load", displayTime(new Date()));
window.addEventListener("load", currentLocation);

let lat = null;
let lon = null;
let city = "";
let oneCallApiUrl = "";
let currentApiUrl = "";
let localTimeZone = new Date().getTimezoneOffset() * 60;

let form = document.getElementById("form");
form.addEventListener("submit", searchCoordinates);

let currentLocationButton = document.getElementById("current-location");
currentLocationButton.addEventListener("click", currentLocation);
