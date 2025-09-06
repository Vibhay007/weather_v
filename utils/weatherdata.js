
require("dotenv").config();
const request = require("request");

const API_KEY = process.env.WEATHER_API_KEY;

const weatherData = (address, callback) => {
  if (!API_KEY) {
    console.error("No API key found in .env!");
    return callback("Missing WEATHER_API_KEY in .env", undefined);
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    address
  )}&appid=${API_KEY}&units=metric`;

  try {
    console.log("🔑 API KEY (first 5 chars):", API_KEY.substring(0, 5));
    console.log("🌍 Request URL:", url);
  } catch (err) {
    console.error("⚠️ Could not log debug info:", err.message);
  }

  request({ url, json: true }, (error, response) => {
    if (error) {
      console.error("⚠️ Network error:", error.message);
      return callback("Unable to connect to weather service", undefined);
    }

    const body = response && response.body ? response.body : null;

    if (!body || String(body.cod) !== "200") {
      console.error(" API Error Response:", body);
      return callback(
        body && body.message ? body.message : "Weather API error",
        undefined
      );
    }


    callback(undefined, {
      city: body.name,
      country: body.sys.country,
      temp: body.main.temp,
      feels_like: body.main.feels_like,
      humidity: body.main.humidity,
      description: body.weather[0].description,
    });
  });
};

module.exports = weatherData;

