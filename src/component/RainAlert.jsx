import axios from "axios";
import React, { useState } from "react";

function RainAlert() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isRaining, setIsRaining] = useState(false);

  const handleCityChange = (e) => setCity(e.target.value);

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
      const condition = response.data.weather[0].main.toLowerCase();
      setIsRaining(condition.includes("rain") || condition.includes("drizzle"));
    } catch (error) {
      console.log("Error fetching data:", error);
      alert("City not found!");
    }
  };

  const handleUser = () => fetchWeather(city);

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen transition-all duration-700 ${
        isRaining
          ? "bg-gradient-to-br from-gray-700 via-blue-800 to-gray-900"
          : "bg-gradient-to-br from-sky-300 via-indigo-300 to-blue-500"
      } overflow-hidden px-4`}
    >
      {/* 🌧️ Raindrop animation */}
      {isRaining && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 w-1 h-8 bg-white/50 animate-fall rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 1.5}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* 🌦️ Main Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center hover:shadow-blue-400/30 transition-all duration-500">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg tracking-wide">
          🌧️ Rain Alert
        </h1>

        {/* 🔍 Input and Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/20 rounded-2xl p-2 backdrop-blur-md border border-white/40 mb-5">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter your city..."
            className="flex-1 bg-transparent text-white placeholder-white/70 outline-none px-4 py-2 text-lg"
          />
          <button
            onClick={handleUser}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl px-5 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 w-full sm:w-auto"
          >
            Check
          </button>
        </div>

        {/* 🌤️ Weather Info */}
        {weatherData && (
          <div className="mt-5 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-inner p-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-wide">
              {weatherData.name}
            </h2>

            <p className="text-lg sm:text-xl text-white tracking-wide mb-2">
              🌡️ Temperature:{" "}
              <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-xl sm:text-2xl px-4 py-1 rounded-2xl shadow-lg shadow-cyan-500/40 border border-white/20">
                {weatherData.main.temp}°C
              </span>
            </p>

            <p className="capitalize text-base sm:text-lg mt-2">
              🌤️ Condition: {weatherData.weather[0].description}
            </p>

            {isRaining ? (
              <div className="mt-6 bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 text-white font-bold text-base sm:text-lg px-6 py-3 rounded-2xl shadow-lg shadow-red-500/30 border border-white/30 animate-pulse">
                ⚠️ Rain Alert — Don’t forget your umbrella!
              </div>
            ) : (
              <div className="mt-6 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 text-white font-semibold text-base sm:text-lg px-6 py-3 rounded-2xl shadow-md shadow-green-400/30 border border-white/20">
                ☀️ No Rain Detected — You’re Safe!
              </div>
            )}
          </div>
        )}

        
      </div>

      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-10%); opacity: 0.7; }
            100% { transform: translateY(120vh); opacity: 0; }
          }
          .animate-fall {
            animation: fall linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default RainAlert;
