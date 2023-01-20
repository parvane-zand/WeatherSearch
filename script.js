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

function showTemp(response) {
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let weather = document.querySelector("#weather");
  weather.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
}

function API(cityInput) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputSearch2");
  unit = "metric";
  API(cityInput);
}
function toFarenheit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputSearch2");
  unit = "imperial";
  API(cityInput);
}

function toCelsius(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputSearch2");
  unit = "metric";
  API(cityInput);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
let fahrenheit = document.querySelector("#far");
fahrenheit.addEventListener("click", toFarenheit);
let celsius = document.querySelector("#cel");
celsius.addEventListener("click", toCelsius);
