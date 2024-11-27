const weatherForm = document.getElementById("weatherForm");
const weatherInput = document.getElementById("weatherInput");
const weatherDisplay = document.getElementById("weatherDisplay");
const cityDisplay = document.getElementById("cityDisplay");
const tempDisplay = document.getElementById("tempDisplay");
const humidityDisplay = document.getElementById("humidityDisplay");
const discDisplay = document.getElementById("discDisplay");
const weatherEmoji = document.getElementById("weatherEmoji");
const errorDisplay = document.getElementById("errorDisplay");
const apiKey = "31bfb2b973e985ad0c4aaa15a3aaa5d0";

window.onload = () => {
  weatherInput.value = "";
};

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = weatherInput.value;
  if (city) {
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherInfo(weatherData);
      errorDisplay.textContent = "";
      displayError("");
    } catch (error) {
      // weatherDisplay.innerHTML = errorDisplay.textContent = error
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter a Valid City!");
  }
});

async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    cityDisplay.textContent = "";
    tempDisplay.textContent = "";
    humidityDisplay.textContent = "";
    discDisplay.textContent = "";
    weatherEmoji.textContent = "";
    throw new Error("Could Not Fetch Weather Data!");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  cityDisplay.textContent = city;

  const celsius = temp - 273.15;
  tempDisplay.textContent = `${celsius.toFixed(1)}°C`;

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  discDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  weatherInput.value = "";
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "💨";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(msg) {
  errorDisplay.textContent = msg;
  weatherDisplay.style.display = "block";
}
