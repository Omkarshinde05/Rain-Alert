import axios from "axios";
import React, { useState } from "react";

function RainAlert() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      alert("Please enter a city name!");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36d089f16e834f72e4852ed37c14aaa1&units=metric`
      );

      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
      alert("City not found!");
    }
  };

  const handleUser = () => {
    fetchWeather(city);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 p-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 drop-shadow-md">
          🌦️ Weather Finder
        </h1>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="border border-blue-400 focus:border-blue-600 focus:ring focus:ring-blue-300 outline-none p-2 rounded-lg flex-1 text-gray-700"
          />
          <button
            onClick={handleUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            Search
          </button>
        </div>

        {weatherData && (
          <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-5">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              {weatherData.name}
            </h2>
            <p className="text-gray-800 text-lg">
              🌡️ Temperature:{" "}
              <span className="font-semibold text-blue-600">
                {weatherData.main.temp}°C
              </span>
            </p>
            <p className="text-gray-700 capitalize">
              🌤️ Condition: {weatherData.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RainAlert;
