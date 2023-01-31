let date = new Date();
function formatDate(Todays) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satureday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[date.getDay()];
  let currentyear = date.getFullYear();
  let currentmonth = months[date.getMonth()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  return `${currentDay} ${currentHour}:${currentMinutes}, ${currentmonth} ${date.getDate()} ${currentyear}`;
}
let dateValue = document.querySelector("#date");
dateValue.innerHTML = formatDate(date);

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return weekDays[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast-temp");
  let forecastHTML = `<div class="row days">`;

forecast.forEach(function(forecastDays , index) {
  if (index < 6) {
  forecastHTML = forecastHTML + `
    <div class="col-2"><strong>${formatDay(forecastDays.dt)}</strong>
      <div class="icons">
      <img
      src="http://openweathermap.org/img/wn/${forecastDays.weather[0].icon}@2x.png"
      width = 45px;/>
      </div>
      <span class="future-max">
        <strong>${Math.round(forecastDays.temp.max)}°</strong>
      </span>
        <span class="future-min"> ${Math.round(forecastDays.temp.min)}°</span>
    </div>`;}
})

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}

function getDailyForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let weather = document.querySelector("#weather");
  weather.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  if (unit === "metric") {
    wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
    console.log(wind.innerHTML);
  } else {
    wind.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  }
  wind.innerHTML = Math.round(response.data.wind.speed);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let wIcon = document.querySelector("#weather-icon");
  wIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getDailyForecast(response.data.coord);
}

function API(cityInput) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputSearch2");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = cityInput.value;
  unit = "metric";
  API(cityInput.value);
}
function toFarenheit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name").innerHTML;
  unit = "imperial";
  API(cityName);
}

function toCelsius(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name").innerHTML;
  unit = "metric";
  API(cityName);
}

let unit = "metric";
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
let fahrenheit = document.querySelector("#far");
fahrenheit.addEventListener("click", toFarenheit);
let celsius = document.querySelector("#cel");
celsius.addEventListener("click", toCelsius);

API("Tehran");
