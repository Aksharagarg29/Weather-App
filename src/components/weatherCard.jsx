import Properties from "./properties"

function WeatherCard({data, location, getWeatherIcon, isImperial}) {
    

    return (
        <>
                <div className="w-[300px] relative rounded-xl overflow-hidden self-center sm:w-[600px] h-[240px]">
                    <img 
                        src="/bg-today-large.svg" 
                        alt="Weather Background" 
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                    <div className="relative z-10 h-full p-8 flex flex-col gap-5 justify-center sm:flex-row items-center gap-20">

                        <div className="text-white">
                            <h1 className="text-center text-4xl font-bold ">
                                {location.charAt(0).toUpperCase() + location.slice(1)}
                            </h1>
                            <p className="mt-3 text-lg text-white/70">
                                {data.time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>

                        <div className="flex items-center text-white">
                            <img className="h-[100px]" src={getWeatherIcon(data.weatherCode)} alt="" />
                            <h2 className="text-6xl font-bold ">
                                {Math.round(data.temperature) + "°" + (isImperial ? "F" : "C")} 
                            </h2>
                        </div>
                    </div>
                </div>
        </>  
    );
}

export default WeatherCard