import { useState } from "react"

function Search({setLocation}){
    const [input, setInput] = useState("");
    function handleSearch(){
        if(input.trim() === "") return;
        setLocation(input);
        setInput("");
    }
    return(
        <div className="text-white flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold my-8 p-2 font-heading" >How's the sky Looking Today</h1>
            <div className="flex flex-col justify-center items-center sm:flex-row gap-6">
                <div className="flex items-center">
                    <img className="h-4 relative left-8 " src="/icon-search.svg" alt="" />
                    <input 
                        className="bg-[#26253D] p-2 pl-14 w-80 rounded-md outline-none min-w-40 placeholder:text-[#B8B9C0]" 
                        type="text"
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Search for a place..."
                    />
                </div>
                <button onClick={handleSearch} className="hover:bg-[#2C1B9D]  bg-[#2F3B92] py-2 px-4 rounded-md w-40">Search</button>
            </div>
        </div>
    )
}

export default Search