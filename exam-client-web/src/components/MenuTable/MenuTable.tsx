export default function MenuTable(){
    return (
        <>
            <div className="flex">
                <main className="grid md:grid-cols-4 grid-cols-2 mb-8 gap-4 w-full px-4">
                    <div className="bg-[#393E46] py-8 px-4 rounded-xl">
                        <p className="text-center font-bold text-[#00ADB5] md:text-6xl text-4xl">40</p>
                        <p className="text-center text-[#EEEEEE] md:text-lg text-sm">Exam Participants</p>
                    </div>
                    <div className="bg-[#393E46] py-8 px-4 rounded-xl">
                        <p className="text-center font-bold text-[#00ADB5] md:text-6xl text-4xl">4</p>
                        <p className="text-center text-[#EEEEEE] md:text-lg text-sm">Exam field</p>
                    </div>
                    <div className="bg-[#393E46] py-8 px-4 rounded-xl">
                        <p className="text-center font-bold text-[#00ADB5] md:text-6xl text-4xl">10</p>
                        <p className="text-center text-[#EEEEEE] md:text-lg text-sm">Exam questions</p>
                    </div>
                    <div className="bg-[#393E46] py-8 px-4 rounded-xl">
                        <p className="text-center font-bold text-[#00ADB5] md:text-6xl text-4xl">60'</p>
                        <p className="text-center text-[#EEEEEE] md:text-lg text-sm">Exam duration</p>
                    </div>
                </main>
            </div>
        </>
    )
}