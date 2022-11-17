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

let p = document.querySelector("p");
p.innerHTML = `${day} ${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;

let form = document.querySelector("#form-input");
let cityInput = document.querySelector("#city-input");

function search(event) {
  event.preventDefault();
  let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  city.innerHTML = `${cityInput.value}`;
  axios.get(apiUrl).then(showTemp);
}
form.addEventListener("submit", search);

function showTemp(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let temperature = Math.round(response.data.main.temp);
  let showtemper = document.querySelector("#main-temp");
  showtemper.innerHTML = `${temperature}℃`;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
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

let currentLocation = document.querySelector("#current-location-button");

function handleError(e) {
  alert(`Run into error ${e}`);
}

function getCurrentPosition(event) {
  event.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, handleError);
  } else {
    alert("Cannot identify your current location");
  }
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
