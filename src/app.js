// src/app.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const weatherData = require("../utils/weatherdata");

const app = express();
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

const port = process.env.PORT || 3008;

app.get("/", (req, res) => res.sendFile(path.join(publicPath, "index.html")));

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) return res.status(400).json({ error: "Address is required" });

  weatherData(address, (err, data) => {
    if (err) return res.status(400).json({ error: err });
    res.json(data); // <-- always JSON
  });
});

app.use((req, res) => res.status(404).json({ error: "This route does not exist" }));

app.listen(port, () => console.log(`Server is listening on port ${port}`));
