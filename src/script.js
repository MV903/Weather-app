let now = new Date();
function currentTime(response) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let showTime = document.querySelector("#display-time");
  showTime.innerHTML = `Today ${currentHour}:${currentMinute}`;
}
currentTime();

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML =`<div class="row">`;
  let days =["Mon", "Tue", "Wed", "Thu", "Fri"];
days.forEach(function(day) {
  forecastHTML = forecastHTML + `
  <div class="col-2">
          <div class="forecast-day">${day}</div>
          <img class="forecast-weather-icon" src="src/images/01d.svg" alt="">
          <div class="forecast-hi-temp">11°</div>
          <div class="forecast-lo-temp">6°</div>
        </div>
  `;});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

}
displayForecast();

function displayWeather(response) {
  console.log(response)
  let temp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let tempFeels = Math.round(response.data.main.feels_like)
  let description = response.data.weather[0].description;
  let weatherIcon = response.data.weather[0].icon;
  let showWeatherIcon = document.querySelector("#weather-icon-today");
  let showTemp = document.querySelector("#temperature");
  let showWind = document.querySelector("#wind");
  let showTempFeels = document.querySelector("#feels-like-temp")
  let showDescription = document.querySelector("#display-weather-description");
  showTemp.innerHTML = temp;
  showWind.innerHTML = `${wind} m/s`
  showTempFeels.innerHTML = tempFeels;
  showDescription.innerHTML = description;
  showWeatherIcon.setAttribute("src", `src/images/${weatherIcon}.svg`);
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
    alert("Please enter a city");
  }
  axios.get(apiUrl).then(displayWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

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
let locationButton = document.querySelector("#button-location");
locationButton.addEventListener("click", geolocation);
