// ✅ Base URL of your deployed backend on Render
const API_BASE_URL = "https://weather-alert-nvui.onrender.com";

// ==================== CURRENT WEATHER ====================
async function getCurrentWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = `<div class="alert alert-warning text-center">Please enter a city name.</div>`;
    return;
  }

  resultDiv.innerHTML = `<div class="text-center text-muted">Loading weather...</div>`;

  try {
    const res = await fetch(`${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`);
    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    if (!data.main) {
      resultDiv.innerHTML = `<div class="alert alert-info text-center">City not found.</div>`;
      return;
    }

    const temp = data.main.temp.toFixed(1);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    resultDiv.innerHTML = `
      <div class="card shadow-sm p-4 text-center">
        <h3 class="mb-3">${data.name}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" class="mx-auto"/>
        <h4 class="fw-bold">${temp}°C</h4>
        <p class="text-capitalize mb-2">${desc}</p>
        <p>💧 Humidity: ${humidity}% | 🌬 Wind: ${wind} m/s</p>
      </div>
    `;
  } catch (error) {
    console.error("Current weather error:", error);
    resultDiv.innerHTML = `<div class="alert alert-danger text-center">Failed to fetch current weather.</div>`;
  }
}

// ==================== FORECAST ====================
async function getForecast() {
  const city = document.getElementById("forecastCity").value.trim();
  const resultDiv = document.getElementById("forecastResult");

  if (!city) {
    resultDiv.innerHTML = `<div class="alert alert-warning text-center">Please enter a city name.</div>`;
    return;
  }

  resultDiv.innerHTML = `<div class="text-center text-muted">Loading forecast...</div>`;

  try {
    const res = await fetch(`${API_BASE_URL}/api/forecast?city=${encodeURIComponent(city)}`);
    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    if (!data.list || data.list.length === 0) {
      resultDiv.innerHTML = `<div class="alert alert-info text-center">No forecast data found.</div>`;
      return;
    }

    // Extract 3 days (24-hour intervals)
    const dailyForecasts = data.list.filter((_, idx) => idx % 8 === 0).slice(0, 3);

    resultDiv.innerHTML = dailyForecasts.map(day => {
      const date = new Date(day.dt * 1000).toDateString();
      const temp = day.main.temp.toFixed(1);
      const desc = day.weather[0].description;
      const icon = day.weather[0].icon;

      return `
        <div class="col-md-4">
          <div class="card shadow-sm text-center p-3">
            <h5>${date}</h5>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" class="mx-auto" />
            <p class="fs-5 fw-bold">${temp}°C</p>
            <p class="text-capitalize">${desc}</p>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error("Forecast error:", error);
    resultDiv.innerHTML = `<div class="alert alert-danger text-center">Failed to fetch forecast data.</div>`;
  }
}
