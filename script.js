// =============================================
//  SKYE — Weather App Script
//  Uses OpenWeatherMap API
// =============================================

// ⚠️ PASTE YOUR API KEY FROM openweathermap.org HERE
const API_KEY = "5269a2705a9746b9568e46702c752f2b";

const BASE_URL  = "https://api.openweathermap.org/data/2.5";
const ICON_URL  = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

// ---- DOM Elements ----
const cityInput      = document.getElementById("cityInput");
const searchBtn      = document.getElementById("searchBtn");
const errorMsg       = document.getElementById("errorMsg");
const loader         = document.getElementById("loader");
const weatherCard    = document.getElementById("weatherCard");
const forecastSection= document.getElementById("forecastSection");

const cityName       = document.getElementById("cityName");
const countryDate    = document.getElementById("countryDate");
const temperature    = document.getElementById("temperature");
const weatherIcon    = document.getElementById("weatherIcon");
const condition      = document.getElementById("condition");
const feelsLike      = document.getElementById("feelsLike");
const humidity       = document.getElementById("humidity");
const windSpeed      = document.getElementById("windSpeed");
const visibility     = document.getElementById("visibility");
const pressure       = document.getElementById("pressure");
const sunrise        = document.getElementById("sunrise");
const sunset         = document.getElementById("sunset");
const forecastRow    = document.getElementById("forecastRow");

// ---- Event Listeners ----
searchBtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

// ---- Main Search Handler ----
function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }
  fetchWeather(city);
}

// ---- Fetch Current Weather ----
async function fetchWeather(city) {
  try {
    showLoader(true);
    clearError();
    hideCards();

    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("City not found. Try another name.");
      if (response.status === 401) throw new Error("Invalid API key. Check your key in script.js.");
      throw new Error("Something went wrong. Please try again.");
    }

    const data = await response.json();
    renderCurrentWeather(data);
    fetchForecast(city);

  } catch (err) {
    showError(err.message);
    showLoader(false);
  }
}

// ---- Render Current Weather ----
function renderCurrentWeather(data) {
  const { name, sys, main, weather, wind, visibility: vis, dt } = data;

  // Background theme based on weather
  applyWeatherTheme(weather[0].main);

  cityName.textContent    = `${name}, ${sys.country}`;
  countryDate.textContent = formatDate(dt, sys.timezone);
  temperature.textContent = Math.round(main.temp);
  condition.textContent   = weather[0].description;
  feelsLike.textContent   = `Feels like ${Math.round(main.feels_like)}°C`;
  humidity.textContent    = `${main.humidity}%`;
  windSpeed.textContent   = `${(wind.speed * 3.6).toFixed(1)} km/h`;
  visibility.textContent  = `${(vis / 1000).toFixed(1)} km`;
  pressure.textContent    = `${main.pressure} hPa`;
  sunrise.textContent     = formatTime(sys.sunrise, sys.timezone);
  sunset.textContent      = formatTime(sys.sunset, sys.timezone);

  weatherIcon.src = ICON_URL(weather[0].icon);
  weatherIcon.alt = weather[0].description;

  showLoader(false);
  weatherCard.classList.add("visible");
}

// ---- Fetch 5-Day Forecast ----
async function fetchForecast(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) return; // Silently fail — current weather already shown

    const data = await response.json();
    renderForecast(data.list);

  } catch {
    // Forecast failure is non-critical
  }
}

// ---- Render 5-Day Forecast ----
function renderForecast(list) {
  // Pick one entry per day at ~noon (12:00:00), skip today
  const today = new Date().toDateString();
  const seen  = new Set();
  const days  = [];

  for (const item of list) {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toDateString();
    const hour = date.getHours();

    if (dateStr === today) continue;
    if (seen.has(dateStr)) continue;
    if (hour >= 11 && hour <= 14) {
      seen.add(dateStr);
      days.push(item);
    }
  }

  // Fallback: just take first occurrence per new day if no noon entry
  if (days.length === 0) {
    for (const item of list) {
      const dateStr = new Date(item.dt * 1000).toDateString();
      if (dateStr === today) continue;
      if (!seen.has(dateStr)) {
        seen.add(dateStr);
        days.push(item);
      }
    }
  }

  forecastRow.innerHTML = "";

  days.slice(0, 5).forEach((item) => {
    const date       = new Date(item.dt * 1000);
    const dayName    = date.toLocaleDateString("en-US", { weekday: "short" });
    const iconCode   = item.weather[0].icon;
    const high       = Math.round(item.main.temp_max);
    const low        = Math.round(item.main.temp_min);
    const desc       = item.weather[0].description;

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <p class="forecast-day">${dayName}</p>
      <img class="forecast-icon" src="${ICON_URL(iconCode)}" alt="${desc}" title="${desc}" />
      <p class="forecast-temp-high">${high}°</p>
      <p class="forecast-temp-low">${low}°</p>
    `;
    forecastRow.appendChild(card);
  });

  forecastSection.classList.add("visible");
}

// ---- Apply weather theme to body ----
function applyWeatherTheme(main) {
  const themes = ["clear","clouds","rain","drizzle","thunderstorm","snow","mist","fog","haze"];
  document.body.classList.remove(...themes);
  const key = main.toLowerCase();
  if (themes.includes(key)) document.body.classList.add(key);
}

// ---- Helpers ----
function formatDate(unixTs, tzOffsetSeconds) {
  const date = new Date((unixTs + tzOffsetSeconds) * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    timeZone: "UTC"
  });
}

function formatTime(unixTs, tzOffsetSeconds) {
  const date = new Date((unixTs + tzOffsetSeconds) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC"
  });
}

function showLoader(state) {
  loader.classList.toggle("visible", state);
}

function showError(msg) {
  errorMsg.textContent = msg;
}

function clearError() {
  errorMsg.textContent = "";
}

function hideCards() {
  weatherCard.classList.remove("visible");
  forecastSection.classList.remove("visible");
}