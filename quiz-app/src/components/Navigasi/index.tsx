import { MdOutlineQuiz } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
const secretKey = "quizapp"

export default function Navigasi(){
    const state = JSON.parse(sessionStorage.getItem("user") || "")
    const userString = CryptoJS.AES.decrypt(state?.state?.user, secretKey).toString(CryptoJS.enc.Utf8)
    const user = JSON.parse(userString)
    const navigate = useNavigate()
    const onDashboard = () => {
        window.location.reload()
        navigate("/dashboard")
    }
    return(
        <nav className="bg-[#8CB9BD] flex justify-between px-4">
            <button className="flex items-center text-[#B67352] font-bold gap-2" onClick={onDashboard}>
                <MdOutlineQuiz className="text-5xl" />
                <p className="text-3xl">Quizz App</p>
            </button>
            <div className="flex items-center text-[#FEFBF6] gap-2">
                <BsPersonCircle className="text-5xl" />
                <p className="text-base w-fit">{ user?.name }</p>
                <button className="bg-[#B67352] h-10 w-28 rounded-full">Logout</button>
            </div>
        </nav>
    )
}