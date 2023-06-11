import axios from "axios";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=53fbaf275f0876b2466a0afdf4911e0f`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        // console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          type="text"
          placeholder="Enter City and Press 'Enter'"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            {/* {data.name ? <p>{data.name}</p> : null} */}
            <p>{data?.name}</p>

            {data.sys ? <p>{data.sys.country}</p> : null}
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                {((data.main.temp - 32) * (5 / 9)).toFixed()}
                <sup>&#8451;</sup>
              </h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p>
                {data.main ? (
                  <p>
                    {data.main.feels_like.toFixed()}
                    <sup>&#8457;</sup>
                  </p>
                ) : null}
              </p>
              <p className="bold">Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p className="bold">Humidity</p>
            </div>
            <div className="wind">
              <p>{data.wind ? <p>{data.wind.speed.toFixed()}</p> : null}</p>
              <p className="bold">Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
