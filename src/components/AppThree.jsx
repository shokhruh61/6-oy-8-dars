import React, { useState } from "react";

const AppThree = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "YOUR_API_KEY";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    setWeather(data);
  };

  return (
    <div className="p-4 border max-w-xl mx-auto mt-9">
      <h2 className="text-xl font-bold mb-4">Havo Ob-Havosi</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Shahar nomini kiriting"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Qidirish
        </button>
      </div>
      {weather && (
        <div className="p-4 border rounded shadow bg-blue-50">
          <h3 className="text-lg font-bold">{weather.name}</h3>
          <p>Harorat: {weather.main.temp}°C</p>
          <p>Namlik: {weather.main.humidity}%</p>
          <p>Shamol tezligi: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default AppThree;
