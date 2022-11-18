let now = new Date();

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
let hours = now.getHours();
let minutes = now.getMinutes();
let activeUnit = "C";

let p = document.querySelector("p");
let form = document.querySelector("#form-input");
let cityInput = document.querySelector("#city-input");
let cityPlaceHolder = document.querySelector("#city");
let temperaturePlaceHolder = document.querySelector("#main-temp");
let iconElement = document.querySelector("#icon");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let currentLocation = document.querySelector("#current-location-button");
let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

p.innerHTML = `${day} ${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;

function displayCity(city) {
  cityPlaceHolder.innerHTML = `${city}`;
}

function formSubmitHandler(event) {
  event.preventDefault();
  search(cityInput.value);
  //cityInput.value = "";
}

function search(city) {
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  displayCity(city);
  axios.get(apiUrl).then(showTemp);
}

form.addEventListener("submit", formSubmitHandler);

function showTemp(response) {
  console.log("Showing temperature on html page", response);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  displayTemperature("C");
  displayCity(response.data.name);
}

function displayTemperature(newActiveUnit) {
  activeUnit = newActiveUnit;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.remove("active");
  let temp = 0;
  if (activeUnit === "F") {
    temp = celsiusTemperature;
    celsiusLink.classList.add("active");
  } else {
    temp = (celsiusTemperature * 9) / 5 + 32;
    fahrenheitLink.classList.add("active");
  }
  temperaturePlaceHolder.innerHTML = Math.round(`${temp}`);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  axios.get(apiUrl).then(showTemp);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  displayTemperature("C");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  displayTemperature("F");
}

let celsiusTemperature = null;
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

currentLocation.addEventListener("click", getCurrentPosition);

function showCurrentCity(response) {
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  let city = (document.querySelector("#form-city").innerHTML =
    response.data.name);
  axios.get(apiUrl).then(showCurrentCity);
}

fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("San Francisco");
