let now = new Date();
function currentTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let showTime = document.querySelector("#display-time");
  showTime.innerHTML = `${day} ${currentHour}:${currentMinute}`;
}
currentTime();

function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.weather[0].main;
  let showTemp = document.querySelector("#temperature");
  let showHumidity = document.querySelector("#display-humidity");
  let showWind = document.querySelector("#display-wind");
  let showDescription = document.querySelector("#display-weather-description");
  showTemp.innerHTML = `${temp}°C`;
  showHumidity.innerHTML = `Humidity: ${humidity}%`;
  showWind.innerHTML = `Wind speed: ${wind}`;
  showDescription.innerHTML = weatherDescription;
  document.querySelector("#new-city").innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let showCity = document.querySelector("#new-city");
  let apiKey = "de31873c66b8933cfbbc1e0df416d91d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  if (city.value) {
    showCity.innerHTML = `${city.value}`;
  } else {
    alert("Please type a city to check the weather");
  }
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "de31873c66b8933cfbbc1e0df416d91d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function geolocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let locationButton = document.querySelector("#button-location");
locationButton.addEventListener("click", geolocation);
