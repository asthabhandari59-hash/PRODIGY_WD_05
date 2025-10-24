const apiKey = "YOUR_API_KEY_HERE"; // 🔸 Replace with your OpenWeatherMap API Key

const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");

const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

async function getWeatherByCity(city) {
  try {
    errorMsg.classList.add("hidden");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

async function getWeatherByLocation(lat, lon) {
  try {
    errorMsg.classList.add("hidden");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Location not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  description.textContent = `Condition: ${data.weather[0].description}`;
  temperature.textContent = `🌡 Temperature: ${data.main.temp} °C`;
  humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
  wind.textContent = `🌬 Wind: ${data.wind.speed} m/s`;

  weatherInfo.classList.remove("hidden");
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
  weatherInfo.classList.add("hidden");
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeatherByCity(city);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherByLocation(position.coords.latitude, position.coords.longitude);
      },
      () => {
        showError("Unable to fetch your location");
      }
    );
  } else {
    showError("Geolocation is not supported by your browser");
  }
});