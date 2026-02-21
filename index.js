const express = require("express");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const { city, lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

  if (city) {
    url += `&q=${city}`;
  } else if (lat && lon) {
    url += `&lat=${lat}&lon=${lon}`;
  } else {
    url += `&q=Lisbon`; // Default
  }

  try {
    const response = await axios.get(url);
    res.render("index", { weather: response.data, error: null });
  } catch (error) {
    res.render("index", { weather: null, error: "Location not found" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
