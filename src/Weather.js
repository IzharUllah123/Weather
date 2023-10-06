




import React, { useEffect, useState } from "react";
import './weather.css'
import Weather from "./Weather";

function WeatherApp() {
  const [city, setCity] = useState("Islamabad");
  const [tempinfo, setTempinfo] = useState({});
  const [weatherState, setWeatherState] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1d691559a39944e8eaf60e491f93f57d`;
        let response = await fetch(url);
        let data = await response.json();

        const { temp, humidity, pressure } = data.main;
        const { main } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { country, sunset } = data.sys;

        var weatherData = {
          temp,
          pressure,
          humidity,
          main,
          name,
          speed,
          country,
          sunset,
        };

        setTempinfo(weatherData);

        if (main) {
          switch (main) {
            case "Clouds":
              setWeatherState("wi-day-cloudy");
              break;
            case "Haze":
              setWeatherState("wi-fog");
              break;
            case "Clear":
              setWeatherState("wi-day-sunny");
              break;
            case "Mist":
              setWeatherState("wi-dust");
              break;
            default:
              setWeatherState("wi-day-sunny");
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [city]);

  // converting the seconds into time
  let sec = tempinfo.sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()} PM`;

  return (
    <>
      <div className="search">
        <input
          type="search"
          placeholder="searching..."
          className="searchTerm"
          id="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="searchButton">Search</button>
      </div>

      <br></br>
      <div>
        <article className="widget">
          <div className="weatherIcon">
            <i className={`wi ${weatherState}`}></i>
          </div>

          <div className="weatherInfo">
            <div className="temperature">
              <span>{tempinfo.temp}&deg;</span>
            </div>

            <div className="description">
              <div className="weatherCondition">{tempinfo.main}</div>
              <div className="place">
                {tempinfo.country}, {tempinfo.name}
              </div>
            </div>
          </div>

          <div className="date"> {new Date().toLocaleString()} </div>

          {/* our 4 column section */}
          <div className="extra-temp">
            <div className="temp-info-minmax">
              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-sunset"}></i>
                </p>
                <p className="extra-info-leftside">{timeStr} <br /> Sunset</p>
              </div>

              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-humidity"}></i>
                </p>
                <p className="extra-info-leftside">
                  {tempinfo.humidity} <br /> Humidity
                </p>
              </div>
            </div>

            <div className="weather-extra-info">
              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-rain"}></i>
                </p>
                <p className="extra-info-leftside">
                  {tempinfo.pressure} <br /> Pressure
                </p>
              </div>

              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-strong-wind"}></i>
                </p>
                <p className="extra-info-leftside">
                  {tempinfo.speed} <br /> Speed
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default WeatherApp;
