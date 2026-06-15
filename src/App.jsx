import { fetchWeatherApi } from 'openmeteo';
import { useState, useEffect } from 'react';
import Header from "./components/header";
import Section from "./components/section";

function App() {
    const [location, setLocation] = useState("delhi");
    const [isImperial, setIsImperial] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        if(!location) return;

        async function fetchData() {
            setLoading(true);
            setError(false);
            setNotFound(false);

            try{
                const geoRes = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
                );
                const geoData = await geoRes.json();
                if (!geoData.results || geoData.results.length === 0) {
                    setNotFound(true);  
                    return;
                }
                const { latitude, longitude } = geoData.results[0];
                
                const params = {
                    latitude: [latitude],
                    longitude: [longitude],
                    current: 'temperature_2m,weather_code,wind_speed_10m,apparent_temperature,relative_humidity_2m,precipitation',
                    hourly: 'temperature_2m,precipitation,weather_code', 
                    daily: 'weather_code,temperature_2m_max,temperature_2m_min',

                    temperature_unit: isImperial ? 'fahrenheit' : 'celsius',
                    wind_speed_unit: isImperial ? 'mph' : 'kmh',
                    precipitation_unit: isImperial ? 'inch' : 'mm',
                };

                const url = 'https://api.open-meteo.com/v1/forecast';
                const responses = await fetchWeatherApi(url, params);
                const response = responses[0];

                const utcOffsetSeconds = response.utcOffsetSeconds();
                const current = response.current();
                const hourly = response.hourly();
                const daily = response.daily();

                const range = (start, stop, step) =>
                    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

                setWeatherData({
                    current: {
                        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                        temperature: current.variables(0).value(),
                        weatherCode: current.variables(1).value(),
                        windSpeed: current.variables(2).value(),
                        feelsLike: current.variables(3).value(),
                        humidity: current.variables(4).value(),   
                        precipitation: current.variables(5).value()
                    },
                    hourly: {
                        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                            (t) => new Date((t + utcOffsetSeconds) * 1000)
                        ),
                        temperature: hourly.variables(0).valuesArray(),
                        precipitation: hourly.variables(1).valuesArray(),
                        weatherCode: hourly.variables(2).valuesArray(),
                    },
                    daily: {
                        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                            (t) => new Date((t + utcOffsetSeconds) * 1000)
                        ),
                        weatherCode: daily.variables(0).valuesArray(),
                        temperatureMax: daily.variables(1).valuesArray(),
                        temperatureMin: daily.variables(2).valuesArray(),
                    }
                });
            }
            catch(err){
                setError(true);
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [location, isImperial]);

    return(
        <div className="bg-[#040229] min-h-screen"> 
            <Header isImperial={isImperial} setIsImperial={setIsImperial} />
            <Section weatherData={weatherData} isImperial={isImperial} setLocation={setLocation} location={location} loading={loading} error={error} notFound={notFound} onRetry={() => setLocation(location.trim() === location ? location + " " : location.trim())}/>
        </div>
    );
}


export default App