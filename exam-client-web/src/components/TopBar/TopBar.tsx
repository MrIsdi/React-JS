import { BiSolidUserCircle } from "react-icons/bi";
import { RiMenu3Fill } from "react-icons/ri";
import Cookies from "js-cookie"

interface props{
    button: () => void
}

export default function TopBar({button}: props){
    const user = JSON.parse(Cookies.get("user") || "{}")
    return(
        <main className="px-4 ">
            <header className="flex mt-8 justify-between items-center bg-[#393E46] rounded-xl px-4 py-2">
                <div>
                    <p className="md:text-lg text-sm text-[#EEEEEE] font-bold">{user?.name}</p>
                    <p className="md:text-lg text-sm text-[#EEEEEE] font-light">{user?.role}</p>
                </div>
                <BiSolidUserCircle className="text-[#EEEEEE] text-5xl bg-[#393E46] rounded-full md:block hidden" />
                <RiMenu3Fill className="text-[#EEEEEE] text-5xl bg-[#393E46] rounded-full block md:hidden" onClick={button} />
            </header>
        </main>
    )
}