import Search from "./search"
import WeatherCard from "./weatherCard"
import Properties from "./properties"
import Hourly from "./hourlyForecast"
import Daily from "./dailyForecast"


function Section({weatherData, isImperial, setLocation, location, loading, error, notFound, onRetry}){
    function getWeatherIcon(code) {
        if (code === 0) return "/icon-sunny.webp";
        if (code <= 2) return "/icon-partly-cloudy.webp";
        if (code === 3) return "/icon-overcast.webp";
        if (code <= 48) return "/icon-fog.webp";
        if (code <= 55) return "/icon-drizzle.webp";
        if (code <= 65) return "/icon-rain.webp";
        if (code <= 77) return "/icon-snow.webp";
        if (code <= 82) return "/icon-rain.webp";
        if (code <= 86) return "/icon-snow.webp";
        return "/icon-storm.webp";
    }
    return(
        <>
            <Search setLocation={setLocation} />
            {/* loading */}
            {loading && (
                <div className="font-poppins flex flex-col items-center justify-center text-white gap-4 mt-20">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Fetching weather data...</p>
                </div>
            )}

            {/* notfound */}
            {!loading && notFound && (
                <div className="font-poppins flex flex-col items-center justify-center text-white gap-3 mt-20">
                    <h2 className="text-2xl font-bold">No data for this location</h2>
                    <p className="text-gray-400 text-sm">Try searching a valid city name.</p>
                </div>
            )}

            {/* error */}
            {!loading && error && (
                <div className="font-poppins flex flex-col items-center justify-center text-white gap-4 mt-20">
                    <div className="text-5xl">
                        <img src="/icon-error.svg" alt="error" />
                    </div>
                    <h2 className="text-3xl font-bold">Something went wrong</h2>
                    <p className="text-gray-400 text-sm text-center">
                        We couldn't connect to the server. Please try again.
                    </p>
                    <button
                        onClick={onRetry}
                        className="bg-[#26253D] border border-white/20 px-6 py-2 rounded-md hover:bg-[#302F47] flex gap-2">
                        <img src="/icon-retry.svg" alt="retry" />
                        Retry
                    </button>
                </div>
            )}

            {!loading && !error && !notFound && weatherData &&(
                <div className="font-poppins flex flex-col items-center lg:flex-row justify-evenly">
                    <div className="flex flex-col justify-center m-10 gap-10 p-5">
                        <WeatherCard data={weatherData.current} location={location} getWeatherIcon={getWeatherIcon} isImperial={isImperial}/>
                        <div className="w-full max-w-[800px] flex justify-evenly gap-3 flex-wrap">
                            <Properties label="Feels Like" data={Math.round(weatherData.current.feelsLike) + "°" + (isImperial ? "F" : "C")}/>
                            <Properties label="Humidity" data={Math.round(weatherData.current.humidity) + "%"}/>
                            <Properties label="Wind" data={Math.round(weatherData.current.windSpeed) + " " + ( isImperial ? "mph" : "kmph" )}/>
                            <Properties label="Precipitaion" data={weatherData.current.precipitation + " " + ( isImperial ? "in" : "mm" )}/>
                        </div>
                        <div>
                            <Daily data={weatherData.daily} getWeatherIcon={getWeatherIcon} isImperial={isImperial}/>
                        </div>
                    </div>
                    <div>
                        <Hourly data={weatherData.hourly} getWeatherIcon={getWeatherIcon} isImperial={isImperial}/>
                    </div>
                </div>
            )}
        </>
    )
}

export default Section