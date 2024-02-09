import { useEffect, useState } from 'react';
import './App.css';
import Description from './components/Description';
import { getFormattedWeatherData } from './WeatherService';
import hotBg from './components/hotBg.jpg';
import coldBg from './components/coldBg.webp';
import skyBg from './components/sky.gif';

function App() {
  const [city, setCity] = useState('Paris');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [background, setBackground] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);
        
        if (data) {
          if (data.temp <= 20) {
            setBackground(coldBg);
          } else if (data.temp > 20 && data.temp <= 32) {
            setBackground(skyBg);
          } else {
            setBackground(hotBg);
          }
        }
    };
    fetchWeatherData();
}, [units, city]);


  useEffect(() => {
    setBackground(background); 
  }, []); 

  function handleUnitClick(e) {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  }

  function enterKeyPressed(e) { 
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
    }
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <h1 className='app'>Weather Application</h1>

      <div className='overlay'>
        {weather && (
          <div className='container'>
            <div className='section section_inputs'>
              <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter city...' />
              <button onClick={(e) => handleUnitClick(e)} >°F</button>
            </div>

            <div className='section section_temperature'>
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt='icon' /> 
                <h3>{weather.description}</h3> 
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
            </div>

            {/* bottom  description */}

            <Description weather={weather} units={units} />

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
