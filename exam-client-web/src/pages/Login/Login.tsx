import BgLogin from "../../assets/imgLogin.svg"
import { Suspense, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useForm, SubmitHandler } from "react-hook-form"
import LabelInput from "../../components/LabelInput/LabelInput";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AOS from "aos"
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.min.css';
import useLogin from "../../store/user/useLogin";
import Cookies from "js-cookie";

interface IFormRegister{
    name                    : string,
    email                   : string,
    password                : string,
    password_confirmation   : string
}
interface IFormLogin{
    email                   : string,
    password                : string,
}

export default function Login(){
    const { register, handleSubmit, reset } = useForm<IFormLogin | IFormRegister>()
    const { login, loading, user } = useLogin()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IFormLogin | IFormRegister> = async (data) => {
        await login(data)
            .then(()=>{
                const data = JSON.parse(Cookies.get("user") || "{}")
                if(data?.role == "admin"){
                    setTimeout(()=>{
                        navigate("/admin")
                    }, 1000)
                }else{
                    setTimeout(()=>{
                        navigate(`/${data?.name?.split(" ")[0]}`)
                    }, 1000)
                }
            })
        reset()
    }

    useEffect(()=>{
        AOS.init()
        if(Object.entries(user).length !== 0){
            if(user?.role == "admin"){
                setTimeout(()=>{
                    navigate("/admin")
                }, 1000)
            }else{
                setTimeout(()=>{
                    navigate(`/${user?.name?.split(" ")[0]}`)
                }, 1000)
            }
        }
    }, [user])

    return(
        <>
            {
                loading && <Loading />
            }
            <Suspense fallback={<Loading />}>
                <section className="bg-[#222831] h-screen">
                    <main className="flex">
                        <div data-aos="flip-left" className="md:basis-1/3 basis-full bg-[#393E46] h-screen grid place-items-center rounded-e-3xl">
                            <div className="p-14 w-full">
                                <h1 className="block w-full text-3xl font-bold text-[#EEEEEE]">Login</h1>
                                <h2 className="block w-full text-xs font-light text-[#EEEEEE] mb-5">Please enter your details account.</h2>
                                <form action="" className="flex w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
                                    <LabelInput name="email" type="email" register={register} required/>
                                    <LabelInput name="password" type="password" register={register} required/>
                                    <button type="submit" className="bg-[#EEEEEE] h-10 rounded-xl mt-3 text-[#00ADB5] font-bold">Log in</button>
                                </form>
                                <p className="text-xs text-[#EEEEEE] text-center mt-4">Not already a member? <a href="/register" className="text-[#00ADB5] font-bold">Register</a></p>
                            </div>
                        </div>
                        <div data-aos="flip-right" className="basis-2/3 md:grid hidden place-items-center">
                            <img src={BgLogin} alt="Exam" className="w-1/2 scale-x-[-1]" />
                        </div>
                    </main>
                </section>
            </Suspense>
            <ToastContainer />
        </>
    )
}
