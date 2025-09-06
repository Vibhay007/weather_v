
document.getElementById("weatherForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("result");

  result.innerHTML = "⏳ Fetching weather...";

  try {
    const res = await fetch(`/weather?address=${encodeURIComponent(city)}`);

    let data;
    try {
      data = await res.json(); 
    } catch {
      throw new Error("Server returned non-JSON response");
    }

    if (!res.ok) throw new Error(data.error || "Request failed");

    result.innerHTML = `
      <h2>📍 ${data.city}, ${data.country}</h2>
      <p>🌡️ Temperature: ${data.temp} °C</p>
      <p>🌥️ Condition: ${data.description}</p>
      <p>🤔 Feels Like: ${data.feels_like} °C</p>
      <p>💧 Humidity: ${data.humidity}%</p>
    `;
  } catch (err) {
    result.innerHTML = `⚠️ ${err.message || "Something went wrong. Please try again."}`;
  }
});
