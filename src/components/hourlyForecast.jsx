import { useState } from "react"

function Hourly({data, getWeatherIcon, isImperial}){

    const [selectedDay, setSelectedDay] = useState(0);
    const days = [...new Set(data.time.map(t => t.toLocaleDateString('en-US', { weekday: 'long' })))];
    const fileteredIndexes = data.time
        .map((t,i) => ({t,i}))
        .filter(({t})=>{
            const dayIndex = data.time[0].toLocaleDateString('en-US', { weekday: 'long' });
            return t.toLocaleDateString('en-US', { weekday: 'long' }) === days[selectedDay];
        })
        .map(({i}) => i);

    console.log(data)
    return(
        <div className="text-white bg-[#26253D] h-[600px] w-[300px] rounded-xl m-10">
            <div className="flex justify-between items-center p-4">
                <div className="text-sm font-semibold">Hourly Forecast</div>
                <select 
                    className="bg-[#3D3B5B] rounded-md text-sm p-1 outline-none text-[#B8B9C0] hover:cursor-pointer"
                    onChange={(e) => setSelectedDay(Number(e.target.value))}
                    value={selectedDay}
                >
                    {days.map((day, index) => (
                        <option key={index} value={index}>
                            {index === 0 ? "Today" : day}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col items-center h-[calc(100%-80px)] overflow-y-scroll">
                {fileteredIndexes.map((i)=>(
                    <div key={i} className="bg-[#302F47] m-2 w-[90%] p-2 px-4 rounded-md flex items-center justify-between ">
                        <div className="flex items-center">
                            <img className="h-8" src={getWeatherIcon(data.weatherCode[i])} alt="" />
                            <div>{data.time[i].toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <div>{Math.round(data.temperature[i]) + "°" + (isImperial ? "F" : "C")}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Hourly
