function Properties({label, data}){
    return(
        <div className="text-white bg-[#26253D] w-36 px-4 py-4 rounded-xl sm:w-50 overflow-hidden">
            <div className="text-sm text-[#B8B9C0]">{label}</div>
            <div className="text-xl">{data}</div>
        </div>
    )
}

export default Properties