import React, { useEffect, useState } from "react";
import "./App.css";
import clear from "./images/clear.png";
import clouds from "./images/clouds.png";
import drizzle from "./images/drizzle.png";
import mist from "./images/mist.png";
import rain from "./images/rain.png";
import axios from "axios";

const App = () => {
  const [cityName, setcityName] = useState("lahore");
  const [data, setdata] = useState({});
  const [wind, setwind] = useState({});
  const [weather, setweather] = useState({});
  const [cardImg, setcardImg] = useState();
  useEffect(() => {
    const getApiData = () => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data.city.name);
          setdata(res.data.list[0].main);
          setwind(res.data.list[0].wind);
          setweather(res.data.list[0].weather[0]);
          if (res.data.list[0].weather[0].main == "Clear") {
            setcardImg(clear);
          } else if (res.data.list[0].weather[0].main == "Clouds") {
            setcardImg(clouds);
          } else if (res.data.list[0].weather[0].main == "Drizzle") {
            setcardImg(drizzle);
          } else if (res.data.list[0].weather[0].main == "Mist") {
            setcardImg(mist);
          } else if (res.data.list[0].weather[0].main == "Rain") {
            setcardImg(rain);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getApiData();
  }, [cityName]);

  const inputEvent = (e) => {
    setcityName(e.target.value);
  };

  return (
    <>
      <div className="main_body">
        <div className="inputBox">
          <h1>Weather in</h1>
          <input
            type="text"
            onChange={inputEvent}
            value={cityName}
            placeholder="Search city"
          />
        </div>
        <div className="box">
          {!data ? (
            <p className="error">City not fund!</p>
          ) : (
            <>
              <div className="cityTitel">
                <p>{cityName}</p>
                <div className="dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
              <div className="top">
                <div className="temp">
                  <p>
                    {Math.floor(data.temp)}
                    <sup>°</sup>C
                  </p>
                </div>
                <div className="temp_detail">
                  <p className="weather_main">{weather.description}</p>
                  <p>
                    Max: {Math.floor(data.temp_max)}
                    <sup>°</sup>
                  </p>
                  <p>
                    Min: {Math.floor(data.temp_min)}
                    <sup>°</sup>
                  </p>
                </div>
              </div>
              <div className="weather_img">
                <img src={cardImg} alt="img" />
              </div>
              <div className="buttom">
                <div className="feel">
                  <p className="temp-f">
                    {Math.floor(data.feels_like)}
                    <sup>°</sup>C
                  </p>
                  <p>Feel like</p>
                </div>
                <div className="humidity">
                  <p className="temp-f">{Math.floor(data.humidity)}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="wind">
                <p className="sped-h">
                  Wind speeed:
                  <span> {wind.speed} km/h</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
