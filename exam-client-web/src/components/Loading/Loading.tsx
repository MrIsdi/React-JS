import BgLoading from "../../assets/loading.svg"

export default function Loading(){
    return(
        <>
            <section className="bg-[#222831] h-screen grid place-items-center fixed z-10 w-full">
                <img src={BgLoading} alt="Loading" className="w-1/4 animate-bounce" />
            </section>
        </>
    )
}