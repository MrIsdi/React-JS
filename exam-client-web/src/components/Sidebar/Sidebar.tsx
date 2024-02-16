import { BiBorderAll, BiSolidUserCircle } from "react-icons/bi";
import { PiExam } from "react-icons/pi";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { useEffect } from "react";

interface props{
    hidden: boolean
}

export default function Sidebar({hidden}: props){
    
    const menu = (name: string) => {
        document.querySelectorAll(".sidebar").forEach((a)=>{
            if(a.querySelector("span")?.innerHTML === name){
                a.classList.add("bg-[#393E46]")
            }else{
                a.classList.remove("bg-[#393E46]")
            }
        })
    }

    useEffect(()=>{
        switch (window.location.pathname) {
            case "/admin":
                menu("Dashboard")
                break;
            case "/admin/add-exam":
                menu("Add Exams")
                break;
            default:
                break;
        }
    },[])
    return(
        <>
            <div className={`basis-1/5 flex flex-col md:static fixed bg-[#222831] top-0 bottom-0 duration-500 ease-in-out ${hidden? "-left-[0]":"-left-[100%]"}`}>
                <header className="flex my-8 justify-center flex-col items-center basis-1/5">
                    <BiSolidUserCircle className="text-[#EEEEEE] text-7xl bg-[#393E46] rounded-full" />
                </header>
                <main className="flex p-8 flex-col basis-3/5">
                    <a href="/admin" className="sidebar mb-3 flex text-[#EEEEEE] hover:bg-[#393E46] h-10 text-base w-full rounded-xl items-center px-3">
                        <BiBorderAll className="text-2xl mr-2" />
                        <span>Dashboard</span>
                    </a>
                    <a href="/admin/add-exam" className="sidebar mb-3 flex text-[#EEEEEE] hover:bg-[#393E46] h-10 text-base w-full rounded-xl items-center px-3">
                        <PiExam className="text-2xl mr-2" />
                        <span>Add Exams</span>
                    </a>
                    <a href="" className="sidebar mb-3 flex text-[#EEEEEE] hover:bg-[#393E46] h-10 text-base w-full rounded-xl items-center px-3">
                        <FaFileCircleQuestion className="text-2xl mr-2" />
                        <span>Add Questions</span>
                    </a>
                </main>
                <footer className="flex p-8 flex-col basis-1/5">
                    <a href="" className="sidebar mb-3 flex text-[#EEEEEE] hover:bg-[#393E46] h-10 text-base w-full rounded-xl items-center px-3">
                        <HiOutlineLogout className="text-2xl mr-2" />
                        <span>Logout</span>
                    </a>
                </footer>
            </div>
        </>
    )
}