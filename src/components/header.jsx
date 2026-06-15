import { useState } from "react"


function Header({isImperial, setIsImperial}){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <nav className="font-poppins min-h-24 text-white flex items-center justify-between px-8 sm:px-16">
                <div className="logo">
                    <img className="h-6 sm:h-8" src="/logo.svg" alt="" />
                </div>
                <button onClick={()=>{setIsOpen(!isOpen)}}
                className="bg-[#26253D] flex items-center justify-evenly gap-2 rounded p-2 text-xs sm:text-sm">
                    <img className="h-4 sm:h-6" src="/image.png" alt="" />
                    <div className="text-[#B8B9C0]" >Units</div>
                    <img src="/icon-dropdown.svg" alt="" />
                </button>
            </nav>

                  {isOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-10 " 
                            onClick={() => setIsOpen(false)}
                        />

                        <div className="z-20 font-poppins absolute right-4 w-60 rounded-2xl border border-white/10 bg-[#26253D] text-white shadow-2xl overflow-hidden">
                            {/* toggle button */}
                            <div className="p-3 border-b border-white/10">
                                <button onClick={()=>{
                                    setIsImperial(!isImperial)
                                    setIsOpen(!isOpen)
                                }} 
                                className="w-full rounded-lg border border-white/20 px-4 py-2 text-left">Switch to {isImperial ? 'Metric' : 'Imperial'}</button>
                            </div>

                            {/* temperature */}
                            <div className="p-3">
                                <p className="mb-2 text-sm text-gray-400">Temperature</p>
                                <div className="flex w-full items-center justify-between rounded-lg px-3 py-2">
                                    <span>{isImperial ? "Fahrenheit (°F)" : "Celsius (°C)"}</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10" />

                            <div className="p-3">
                                <p className="mb-2 text-sm text-gray-400">Wind Speed</p>
                                <div className="flex w-full items-center justify-between rounded-lg px-3 py-2">
                                    <span>{isImperial ? "mph" : "km/h"}</span>
                                </div>
                                
                            </div>

                            <div className="border-t border-white/10" />

                            <div className="p-3">
                                <p className="mb-2 text-sm text-gray-400">Precipitation</p>
                                <div className="flex w-full items-center justify-between rounded-lg px-3 py-2">
                                    <span>{isImperial ? "Inches (in)" : "Millimeters (mm)"}</span>
                                </div>
                            
                            </div>
                        </div>
                    </>
                    
                )}

        </>
    )
    
}
export default Header