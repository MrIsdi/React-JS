import { Suspense, useEffect, useState } from "react";
import BgQuiz from "../../assets/quiz.svg"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import useLogin from "../../store/useLogin";
import useRegister from "../../store/useRegister";
import { ToastContainer } from "react-toastify";

interface Login{
    email: string
    password: string
}

export default function Login(){
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm<Login>()
    const navigate = useNavigate()
    const { handleLogin, status } = useLogin()
    const { regist } = useRegister()
    const onSubmit: SubmitHandler<Login> = (data) =>{
        setIsLoading(true)
        setTimeout(()=>{
            handleLogin(data, regist)
            reset()
            setIsLoading(false)
        }, 2000)
    }
    useEffect(()=>{
        setTimeout(()=>{
            if(status){
                navigate("/dashboard")
            }
        }, 2000)
    }, [status])
    useGSAP(()=>{
        gsap.from(".header", {y: -100})
        gsap.to(".header", {y: 0, duration: 2})
        gsap.from(".email", {x: -100})
        gsap.to(".email", {x: 0, duration: 2})
        gsap.from(".password", {x: -100})
        gsap.to(".password", {x: 0, duration: 1.5})
        gsap.from(".button", {x: -100})
        gsap.to(".button", {x: 0, duration: 1})
        gsap.from(".footer", {y: 100})
        gsap.to(".footer", {y: 0, duration: 2})
        gsap.from(".image", {scale: 0})
        gsap.to(".image", {scaleX: 1, duration: 2})
    })
    return(
        <Suspense>
            {
                isLoading && <Loading />
            }
            <section className="h-screen flex bg-[#8CB9BD]">
                <main className="basis-1/3 bg-[#FEFBF6] grid place-items-center">
                    <div className="w-3/4">
                        <header className="header">
                            <p className="text-4xl text-[#B67352] font-bold">Login</p>
                            <p className="text-[#B67352]">Please, enter your account!</p>
                        </header>
                        <form action="" className="w-full my-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="email" className="email">
                                <p className="text-[#B67352] font-bold">Email</p>
                                <input type="email" id="email" className="w-full h-10 bg-[#8CB9BD] rounded-full ps-4" {...register("email")} />
                            </label>
                            <label htmlFor="password" className="password">
                                <p className="text-[#B67352] font-bold">Password</p>
                                <input type="password" id="password" className="w-full h-10 bg-[#8CB9BD] rounded-full ps-4" {...register("password")} />
                            </label>
                            <button className="button w-full h-10 bg-[#B67352] rounded-full text-[#FEFBF6] font-bold mt-2">Login</button>
                        </form>
                        <footer className="footer">
                            <p className="text-xs text-[#B67352] text-center">Do you have'nt account? <a href="/register" className="font-bold">Register</a></p>
                        </footer>
                    </div>
                </main>
                <main className="basis-2/3 grid place-items-center">
                    <img src={BgQuiz} alt="Quiz" className="w-2/4 scale-x-[-1] image" />
                </main>
            </section>
            <ToastContainer />
        </Suspense>
    )
}