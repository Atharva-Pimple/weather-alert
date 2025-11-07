async function getCurrentWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const div = document.getElementById("currentWeather");

  if (!city) {
    div.innerHTML = `<div class='alert alert-warning'>Please enter a city name.</div>`;
    return;
  }

  try {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();

    if (data.cod !== 200) {
      div.innerHTML = `<div class='alert alert-danger'>City not found or invalid key.</div>`;
      return;
    }

    const temp = data.main.temp;
    const cond = data.weather[0].main;
    const wind = data.wind.speed;

    let alertMsg = "";
    let alertType = "success";

    if (temp <= 5) {
      alertMsg = "⚠️ Frost Alert! Protect your crops.";
      alertType = "warning";
    } else if (temp >= 38) {
      alertMsg = "🔥 Heatwave Alert! Ensure irrigation.";
      alertType = "danger";
    } else if (cond.includes("Storm") || wind > 40) {
      alertMsg = "🌪️ Storm Alert! Take precautions.";
      alertType = "danger";
    } else {
      alertMsg = "✅ Weather is safe for farming.";
      alertType = "success";
    }

    div.innerHTML = `
      <h4>${data.name}, ${data.sys.country}</h4>
      <p>Temperature: ${temp}°C</p>
      <p>Condition: ${cond}</p>
      <p>Wind: ${wind} km/h</p>
      <div class="alert alert-${alertType}">${alertMsg}</div>
    `;
  } catch (err) {
    div.innerHTML = `<div class='alert alert-danger'>Error fetching data.</div>`;
  }
}
