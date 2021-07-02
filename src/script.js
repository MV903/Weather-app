function convertDay(unix) {
  let date = new Date(unix * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");
let forecastHTML =`<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index < 5) {
  forecastHTML  = forecastHTML + `
  <div class="col-2">
  <div class="forecast-day">${convertDay(forecastDay.dt)}</div>
  <img class="forecast-weather-icon" src="src/images/${forecastDay.weather[0].icon}.svg" alt="">
  <div class="forecast hi-temp">${Math.round(forecastDay.temp.max)}°C</div>
  <div class="forecast lo-temp">${Math.round(forecastDay.temp.min)}°C</div>
  </div>
  `};});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  //using this API to get precipitation for current weather
  document.querySelector("#precipitation").innerHTML = response.data.hourly[0].pop * 100
}

function getCoordinations(coord) {
  let apiKey = "de31873c66b8933cfbbc1e0df416d91d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTime(response) {
  let unixCorrect = (response.data.dt + response.data.timezone) - 3600 
  let unix = unixCorrect * 1000
  let localTime = new Date(unix);
let hour = localTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = localTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
document.querySelector("#display-time").innerHTML = `${hour}:${minute}`;
getCoordinations(response.data.coord);
}

function displayCurrentWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let tempFeels = Math.round(response.data.main.feels_like)
  let description = response.data.weather[0].description;
  let weatherIcon = response.data.weather[0].icon;
  let showWeatherIcon = document.querySelector("#weather-icon-today")
  showWeatherIcon.setAttribute("src", `src/images/${weatherIcon}.svg`);
  document.querySelector("#temperature").innerHTML = temp;
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#feels-like-temp").innerHTML = tempFeels;
  document.querySelector("#display-weather-description").innerHTML = description;
  document.querySelector("#new-city").innerHTML = response.data.name;
  displayTime(response);
}

function search(city) {
  let apiKey = "de31873c66b8933cfbbc1e0df416d91d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  document.querySelector("#new-city").innerHTML = city.value;
  search(city.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function displayCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "de31873c66b8933cfbbc1e0df416d91d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayCurrentWeather);
}

function geolocation() {
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", geolocation);

search("London");
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}