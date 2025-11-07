import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.static("public"));

app.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.get("/api/forecast", async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching forecast data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
