import axios from 'axios';
import React, { useState, useEffect } from 'react';
import humidity_icon from './assets/humidity.png';
import wind_icon from './assets/wind.png';
import clear_icon from './assets/clear.png';
import cloud_icon from './assets/cloud.png';
import drizzle_icon from './assets/drizzle.png';
import rain_icon from './assets/rain.png';
import snow_icon from './assets/snow.png';

function Weather() {
  const [city, setCity] = useState('Surat');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const icons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': drizzle_icon,
    '04n': drizzle_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  };

  const fetchWeather = async (cityName) => {
    if(city === ''){
      alert('Enter city name')
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=477d1d63f960635befba403652c0ff0e`
      );
      const iconCode = response.data.weather[0].icon;
      const weatherIcon = icons[iconCode] || clear_icon;
      setWeather({ ...response.data, icon: weatherIcon });
      setError('');
      setCity('');
      console.log(response);
    } catch (error) {
      setError('City not found');
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather('Surat');
  }, []);

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      fetchWeather(city);
    }
  };

  const clickHandler = () => {
    fetchWeather(city);
  };

  return (
    <div className="w-full sm:w-[450px] mx-10 p-10 rounded-md bg-gradient-to-tl from-[#2f4680] to-[#500ae4] flex items-center flex-col text-white">
      <div className="search-fild flex w-full items-center gap-3 mb-10">
        <input
          type="text"
          placeholder="Enter City"
          className="px-5 py-2 flex-1 font-semibold border-none outline-none text-[#626262] bg-[#ebfffc] rounded-3xl h-12"
          value={city}
          onChange={changeHandler}
          onKeyPress={keyPressHandler}
        />
        <button
          onClick={clickHandler}
          className="w-12 h-12 flex items-center justify-center p-4 rounded-full bg-[#ebfffc] cursor-pointer active:scale-95">
          <i className="ri-search-line text-[24px] text-black"></i>
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weather ? (
        <>
          <img src={weather.icon} alt="Weather icon" className="w-24" />
          <p className="text-7xl mt-4 mb-4">{weather.main.temp}°c</p>
          <p className="capitalize text-4xl font-bold">{weather.name}</p>
          <div className="weather-data flex justify-between w-full mt-10 gap-10">
            <div className="col flex items-center gap-3">
              <img src={humidity_icon} alt="Humidity icon" className="w-7" />
              <div>
                <p className="text-2xl">{weather.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col flex items-center gap-3">
              <img src={wind_icon} alt="Wind icon" className="w-7" />
              <div>
                <p className="text-2xl">{weather.wind.speed} m/s</p>
                <span className="inline-block">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-xl mt-4"></p>
      )}
    </div>
  );
}

export default Weather;
