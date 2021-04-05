let currentWeatherApiKey = "802540f702d19dfc355b50bb670f1cc5";
let oneCallForecastApiKey = "2204e2f50737e4cd706dca2096135d4e";

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

function displayTime(date) {
  console.log(date);

  let hour = date.getHours();
  console.log(hour);
  let minute = date.getMinutes();
  console.log(minute);
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
