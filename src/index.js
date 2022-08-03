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

function showTemp(response) {
  document.querySelector("#search-text").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML =
    Math.round(response.data.main.temp) + "&#8451;";
  let description = document.querySelector("#weatherDescription");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let form = document.querySelector(".city-form");
form.addEventListener("submit", handleSubmit);

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
