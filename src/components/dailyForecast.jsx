


function Daily({data, getWeatherIcon, isImperial}){
    const style = "w-20 h-36 text-white text-sm bg-[#26253D] rounded-xl flex flex-col justify-evenly items-center";
    return(
        <>
            <div className="text-white mb-6">Daily forcast</div>
            <div className="flex justify-between flex-wrap gap-3">
                {data.time.map((day, index) => (
                    <div key={index} className={style}>
                        <div>
                            {day.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <img className="h-12" src={getWeatherIcon(data.weatherCode[index])} alt="" />
                        <div className="w-full flex justify-around text-xs">
                            <span>{Math.round(data.temperatureMax[index]) + "°" + (isImperial ? "F" : "C")}</span>
                            <span>{Math.round(data.temperatureMin[index]) + "°" + (isImperial ? "F" : "C")}</span>
                        </div>
                    </div>
                ))}
            </div>
            
        </>
    )
}
export default Daily


