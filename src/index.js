function search(city) {
  const API_KEY = "9b71ae985af1baa6a806c916c0a028f9";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const params = {
    q: city,
    appid: API_KEY,
    units: "metric",
  };

  axios
    .get(apiUrl, { params })
    .then(showTemp)
    .catch((err) => console.log(err));
}

function displayForecats(response) { 
  let forecastDaily = response.data.daily;
  forecastElement = document.querySelector("#card-body-forecast");
  let forecastHTML = `<div class="row">`;
  forecastDaily.forEach(function (forecastDay, index) {
  if (index < 6) {
 forecastHTML = forecastHTML + `              
 <div class="col-4">
   <div class="card">
       <h5 class="future-date-card">${formatDay(forecastDay.dt)}</h5>
       <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="30px" id="future-weather-icon">
       <p class="future-temperature-card">
       <span class="future-degree-max">
         ${Math.round(forecastDay.temp.max)}° 
       </span>
       <span class="future-degree-min">
         ${Math.round(forecastDay.temp.min)}°
       </span>
     </div>
   </div>
 `;
 };
});
 forecastHTML = forecastHTML + `</div>`
 forecastElement.innerHTML = forecastHTML;
;

};

function displayActiveCity(activeCity) {
  const el = document.querySelector("#city-now");
  el.innerText = activeCity;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;
  displayActiveCity(city);
  search(city);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  let day = days[date.getDay()];
  return day;
}

function getForecast(coordinates) {
  let apiKey = "9b71ae985af1baa6a806c916c0a028f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecats);
}

function showTemp(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#search-text").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML =
    Math.round(celsiusTemperature);
  let description = document.querySelector("#weatherDescription");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let currentDate = document.querySelector("#currentDate");
  let iconWeather = document.querySelector("#weather-icon");
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  iconWeather.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconWeather.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureFahenheit = (celsiusTemperature * 9) / 5 + 32; 
  let temperature = document.querySelector("#degrees");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(temperatureFahenheit);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#degrees");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector(".city-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Kyiv");

/*

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};
let city = prompt("Enter a city");
city = city.toLowerCase(city);
city = city.trim(city);

if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let humid = weather[city].humidity;
  let temperCel = Math.round(temperature);
  let temperFahr = Math.round(temperCel * 1.8 + 32);
  alert(
    `It is currently ${temperCel}°C (${temperFahr}°F) in ${city} with a humidity of ${humid}%.`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney.`
  );
}
let now = new Date();
let hours = now.getHours();
let minute = now.getMinutes();

let dates = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let date = dates[now.getDay()];

let showDate = document.querySelector("h2");
showDate.innerHTML = `${date}, ${hours}:${minute}`;

function searchCitsy(event) {
  event.preventDefault();
  let textInput = document.querySelector("#search-text");
  let city = document.querySelector("#city");
  city.innerHTML = `${textInput.value}`;
}

*/
