import { Suspense, useEffect, useState } from "react";
import BgQuiz from "../../assets/quiz.svg"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Loading from "../../components/Loading";
import { useForm, SubmitHandler } from "react-hook-form";
import useRegister from "../../store/useRegister";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Register{
    name: string
    email: string
    password: string
    cpassword: string
}

export default function Register(){
    const { register, handleSubmit, reset } = useForm<Register>()
    const [isLoading, setIsLoading] = useState(false)
    const {handleRegister, status} = useRegister()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<Register> = (data) =>{
        setIsLoading(true)
        setTimeout(()=>{
            handleRegister(data)
            reset()
            setIsLoading(false)
        }, 2000)
    }
    useEffect(()=>{
        setTimeout(()=>{
            if(status){
                navigate("/")
            }
        }, 2000)
    }, [status])
    useGSAP(()=>{
        gsap.from(".header", {y: -50})
        gsap.to(".header", {y: 0, duration: 2})
        gsap.from(".name", {x: 100})
        gsap.to(".name", {x: 0, duration: 2})
        gsap.from(".email", {x: 100})
        gsap.to(".email", {x: 0, duration: 1.75})
        gsap.from(".password", {x: 100})
        gsap.to(".password", {x: 0, duration: 1.5})
        gsap.from(".cpassword", {x: 100})
        gsap.to(".cpassword", {x: 0, duration: 1.25})
        gsap.from(".button", {x: 100})
        gsap.to(".button", {x: 0, duration: 1})
        gsap.from(".footer", {y: 50})
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
                <main className="basis-2/3 grid place-items-center">
                    <img src={BgQuiz} alt="Quiz" className="w-2/4 scale-x-[1] image" />
                </main>
                <main className="basis-1/3 bg-[#FEFBF6] grid place-items-center">
                    <div className="w-3/4">
                        <header className="header">
                            <p className="text-4xl text-[#B67352] font-bold">Register</p>
                            <p className="text-[#B67352]">Please, enter your detail data!</p>
                        </header>
                        <form action="" className="w-full my-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="name" className="name">
                                <p className="text-[#B67352] font-bold">Name</p>
                                <input type="text" id="name" className="w-full h-10 bg-[#8CB9BD] rounded-full ps-4" {...register("name")} />
                            </label>
                            <label htmlFor="email" className="email">
                                <p className="text-[#B67352] font-bold">Email</p>
                                <input type="email" id="email" className="w-full h-10 bg-[#8CB9BD] rounded-full ps-4" {...register("email")} />
                            </label>
                            <label htmlFor="password" className="password">
                                <p className="text-[#B67352] font-bold">Password</p>
                                <input type="password" id="password" className="w-full h-10 bg-[#8CB9BD] rounded-full ps-4" {...register("password")} />
                            </label>
                            <label htmlFor="cpassword" className="cpassword">
                                <p className="text-[#B67352] font-bold">Confirmation Password</p>
                                <input type="password" id="cpassword" className="w-full h-10 bg-[#8CB9BD] rounded-full ps-4" {...register("cpassword")} />
                            </label>
                            <button className="button w-full h-10 bg-[#B67352] rounded-full text-[#FEFBF6] font-bold mt-2">Create account</button>
                        </form>
                        <footer className="footer">
                            <p className="text-xs text-[#B67352] text-center">Already account? <a href="/" className="font-bold">Login</a></p>
                        </footer>
                    </div>
                </main>
            </section>
            <ToastContainer />
        </Suspense>
    )
}