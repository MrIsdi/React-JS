import { Suspense } from "react";
import BgDashboard from "../../assets/dashboard.svg"
import { useNavigate } from "react-router-dom";
import Navigasi from "../../components/Navigasi";



export default function Dashboard(){
    const navigate = useNavigate()

    const onQuizz = () => {
        localStorage.setItem("soal", "[]")
        localStorage.setItem("waktu", "[]")
        navigate("/questions")
    }
    return(
        <Suspense>
            <section className="h-screen w-full bg-[#FEFBF6] grid grid-rows-7">
                <Navigasi />
                <main className="row-span-6 grid place-items-center">
                    <img src={BgDashboard} alt="Dashboard" className="w-1/3" />
                    <button className="bg-[#B67352] h-10 w-28 rounded-full text-[#FEFBF6] place-self-start mx-auto" onClick={onQuizz}>Mulai Quiz</button>
                </main>
            </section>
        </Suspense>
    )
}