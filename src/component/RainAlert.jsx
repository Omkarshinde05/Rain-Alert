import axios from "axios";
import React, { useState } from "react";

function RainAlert() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isRaining, setIsRaining] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setError("");
  };

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name!");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=36d089f16e834f72e4852ed37c14aaa1&units=metric`
      );
      setWeatherData(response.data);
      const condition = response.data.weather[0].main.toLowerCase();
      setIsRaining(condition.includes("rain") || condition.includes("drizzle"));
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("🔍 City not found! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUser = () => fetchWeather(city);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather(city);
  };

  const getWindDirection = (deg) => {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen transition-all duration-1000 overflow-hidden px-4 py-10 ${
        isRaining
          ? "bg-gradient-to-br from-slate-900 via-blue-950 to-gray-900"
          : "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700"
      }`}
    >
      {/* ☁️ Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
            isRaining ? "bg-blue-400 top-10 left-10" : "bg-yellow-300 top-10 left-10"
          }`}
        />
        <div
          className={`absolute w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
            isRaining ? "bg-cyan-500 bottom-10 right-10" : "bg-white bottom-10 right-10"
          }`}
          style={{ animationDelay: "1s" }}
        />
        <div
          className={`absolute w-64 h-64 rounded-full blur-2xl opacity-10 animate-pulse ${
            isRaining ? "bg-indigo-600 top-1/2 left-1/2" : "bg-sky-200 top-1/2 left-1/2"
          }`}
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* 🌧️ Raindrop animation */}
      {isRaining && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 rounded-full bg-blue-300/40 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${12 + Math.random() * 20}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${0.8 + Math.random() * 1.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ☀️ Sun rays for clear weather */}
      {!isRaining && weatherData && (
        <div className="absolute top-8 right-12 pointer-events-none">
          <div className="w-20 h-20 bg-yellow-300/60 rounded-full blur-md animate-pulse" />
          <div className="absolute inset-0 w-20 h-20 bg-yellow-200/40 rounded-full blur-xl animate-ping" />
        </div>
      )}

      {/* 🌦️ Main Card */}
      <div
        className={`relative z-10 backdrop-blur-xl border p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center transition-all duration-700 ${
          isRaining
            ? "bg-white/5 border-blue-400/30 shadow-blue-900/50"
            : "bg-white/15 border-white/40 shadow-sky-500/30"
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="text-6xl mb-3 animate-bounce">{isRaining ? "🌧️" : "⛅"}</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Rain{" "}
            <span
              className={`bg-clip-text text-transparent ${
                isRaining
                  ? "bg-gradient-to-r from-blue-300 to-cyan-300"
                  : "bg-gradient-to-r from-yellow-200 to-orange-300"
              }`}
            >
              Alert
            </span>
          </h1>
          <p className="text-white/60 text-sm mt-2 tracking-wider uppercase">
            Real-time weather checker
          </p>
        </div>

        {/* 🔍 Search Box */}
        <div
          className={`flex items-center gap-2 rounded-2xl p-1.5 border transition-all duration-300 mb-2 ${
            isRaining
              ? "bg-white/10 border-blue-400/30 focus-within:border-blue-400/70 focus-within:shadow-blue-500/20 focus-within:shadow-lg"
              : "bg-white/20 border-white/40 focus-within:border-white/80 focus-within:shadow-white/20 focus-within:shadow-lg"
          }`}
        >
          <span className="pl-3 text-white/60 text-lg">🔍</span>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for a city..."
            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none px-3 py-2.5 text-base"
          />
          <button
            onClick={handleUser}
            disabled={loading}
            className={`font-semibold rounded-xl px-5 py-2.5 text-sm transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
              isRaining
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 active:scale-95"
                : "bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-yellow-400 hover:to-orange-400 text-white hover:shadow-lg hover:shadow-yellow-400/40 active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Loading
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-300 text-sm text-center mb-4 animate-pulse">{error}</p>
        )}

        {/* 🌤️ Weather Info Card */}
        {weatherData && (
          <div className="mt-6 space-y-4 text-white animate-fade-in">

            {/* City + Country */}
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-3xl font-bold tracking-wide">
                {weatherData.name}
              </h2>
              <span className="text-white/50 text-lg">{weatherData.sys?.country}</span>
            </div>

            {/* Weather Icon + Description */}
            <div className="flex items-center justify-center gap-3">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-16 h-16 drop-shadow-lg"
              />
              <span className="capitalize text-white/80 text-lg">
                {weatherData.weather[0].description}
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {/* Temperature */}
              <div
                className={`rounded-2xl p-4 border backdrop-blur-sm ${
                  isRaining ? "bg-white/10 border-blue-400/20" : "bg-white/20 border-white/30"
                }`}
              >
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">🌡️ Temperature</p>
                <p className="text-3xl font-extrabold">
                  {Math.round(weatherData.main.temp)}
                  <span className="text-lg font-semibold text-white/70">°C</span>
                </p>
                <p className="text-white/40 text-xs mt-1">
                  Feels like {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>

              {/* Humidity */}
              <div
                className={`rounded-2xl p-4 border backdrop-blur-sm ${
                  isRaining ? "bg-white/10 border-blue-400/20" : "bg-white/20 border-white/30"
                }`}
              >
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">💧 Humidity</p>
                <p className="text-3xl font-extrabold">
                  {weatherData.main.humidity}
                  <span className="text-lg font-semibold text-white/70">%</span>
                </p>
                <div className="mt-2 h-1.5 rounded-full bg-white/20">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-700"
                    style={{ width: `${weatherData.main.humidity}%` }}
                  />
                </div>
              </div>

              {/* Wind */}
              <div
                className={`rounded-2xl p-4 border backdrop-blur-sm ${
                  isRaining ? "bg-white/10 border-blue-400/20" : "bg-white/20 border-white/30"
                }`}
              >
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">🌬️ Wind</p>
                <p className="text-3xl font-extrabold">
                  {weatherData.wind?.speed}
                  <span className="text-lg font-semibold text-white/70"> m/s</span>
                </p>
                <p className="text-white/40 text-xs mt-1">
                  Direction: {getWindDirection(weatherData.wind?.deg ?? 0)}
                </p>
              </div>

              {/* Visibility */}
              <div
                className={`rounded-2xl p-4 border backdrop-blur-sm ${
                  isRaining ? "bg-white/10 border-blue-400/20" : "bg-white/20 border-white/30"
                }`}
              >
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">👁️ Visibility</p>
                <p className="text-3xl font-extrabold">
                  {((weatherData.visibility ?? 0) / 1000).toFixed(1)}
                  <span className="text-lg font-semibold text-white/70"> km</span>
                </p>
                <p className="text-white/40 text-xs mt-1">
                  {(weatherData.visibility ?? 0) >= 8000 ? "Clear visibility" : "Reduced visibility"}
                </p>
              </div>
            </div>

            {/* Rain / No-Rain Alert Banner */}
            {isRaining ? (
              <div className="mt-2 bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 text-white font-bold text-sm sm:text-base px-6 py-4 rounded-2xl shadow-lg shadow-red-500/40 border border-white/20 animate-pulse flex items-center justify-center gap-2">
                ⚠️ Rain Alert — Grab your umbrella before heading out!
              </div>
            ) : (
              <div className="mt-2 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 text-white font-semibold text-sm sm:text-base px-6 py-4 rounded-2xl shadow-md shadow-green-400/40 border border-white/20 flex items-center justify-center gap-2">
                ☀️ Clear Skies — No rain expected. You're all good!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="relative z-10 mt-6 text-white/30 text-xs tracking-widest uppercase">
        Powered by OpenWeatherMap
      </p>

      <style>{`
        @keyframes fall {
          0%   { transform: translateY(-5%) scaleY(1); opacity: 0.6; }
          100% { transform: translateY(110vh) scaleY(1.2); opacity: 0; }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default RainAlert;
