import { Suspense } from "react";
import BgLoading from "../../assets/loading.svg"

export default function Loading(){
    return(
        <Suspense>
            <section className="h-screen bg-[#8CB9BD] grid place-items-center fixed w-full top-0 bottom-0 z-10">
                <img src={BgLoading} alt="Loading" className="w-1/3 animate-bounce" />
            </section>
        </Suspense>
    )
}