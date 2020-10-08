import React, {useState} from 'react';
import swal from 'sweetalert';
const api = {
  key:"5b9b44f4af89e560de05a6c1fdb8a8ec",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  function fetchStatusHandler(response) {
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.statusText);
    }
  }

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(fetchStatusHandler)
      
      .then(res => res.json())
      .then(result => {;
        setWeather(result);
        setQuery('');
        console.log(result);
      })
      
      .catch((error) => {
        swal({
          title: "You entered an invalid location",
          text: "Type a valid location",
          icon: "error",
          button: "Try again",
        });
      })
      
    }
  }

const dateBuilder = d => {
 let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

 let day = days[d.getDay()];
 let date = d.getDate();
 let month = months[d.getMonth()];
 let year = d.getFullYear()

 return `${day} ${date} ${month} ${year}`
}
/*
if (typeof weather.main != "undefined"){
  // FORMULAS FOR CONVERSIONS
    let fahrenheit = Math.floor((9 / 5) * (weather.main.temp - 273) + 32);
    let celsius = Math.floor((fahrenheit - 32) * (5 / 9));
    let kelvin = Math.floor(celsius + 273);
    console.log(temperatureSection.textContent);
    // Change temperature to Celsius/Farenheit
    temperatureSection.addEventListener('click', () => {
        if(temperatureSpan.textContent === 'K'){
            temperatureSpan.textContent = 'F';
            temperatureDegree.textContent = fahrenheit;
        } else if(temperatureSpan.textContent === 'F'){
            temperatureSpan.textContent = 'C';
            temperatureDegree.textContent = celsius;
        }
        else {
            temperatureSpan.textContent = 'K';
            temperatureDegree.textContent = kelvin;
        }
    });
}
*/

  return (
    
    <div className={(typeof weather.main != "undefined") 
    ? `app icon${weather.weather[0].icon}`
    : 'app'}>
   
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Type a location and press Enter"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                <div>{Math.round(weather.main.temp)}&#176; C</div>   
              </div>
              <div className="weather">
                {weather.weather[0].description}
              </div>
            </div>
        </div>
        ) :('')}
        
      </main>
    </div>
  );
}

export default App;
