import BgLogin from "../../assets/imgLogin.svg"
import { Suspense, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useForm, SubmitHandler } from "react-hook-form"
import LabelInput from "../../components/LabelInput/LabelInput";
import useRegister from "../../store/user/useRegister";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AOS from "aos"
import 'aos/dist/aos.css';

import 'react-toastify/dist/ReactToastify.min.css';

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

export default function Register(){
    const { register, handleSubmit, reset } = useForm<IFormLogin | IFormRegister>()
    const { addUser, isLoading } = useRegister()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IFormLogin | IFormRegister> = async (data) => {
        await addUser(data)
            .then(()=>{
                setTimeout(()=>{
                    navigate("/")
                }, 3000)
            })
        reset()
    }

    useEffect(()=>{
        AOS.init()
    }, [])

    return(
        <>
            {
                isLoading && <Loading />
            }
            <Suspense fallback={<Loading />}>
                <section className="bg-[#222831] h-screen">
                    <main className="flex">
                        <div data-aos="flip-left" className="basis-2/3 md:grid hidden place-items-center">
                            <img src={BgLogin} alt="Exam" className="w-1/2" />
                        </div>
                        <div data-aos="flip-right" className="md:basis-1/3 basis-full bg-[#393E46] h-screen grid place-items-center rounded-s-3xl">
                            <div className="p-14 w-full">
                                <h1 className="block w-full text-3xl font-bold text-[#EEEEEE]">Register</h1>
                                <h2 className="block w-full text-xs font-light text-[#EEEEEE] mb-5">Please enter your details to get started.</h2>
                                <form action="" className="flex w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
                                    <LabelInput name="name" type="text" register={register} required/>
                                    <LabelInput name="email" type="email" register={register} required/>
                                    <LabelInput name="password" type="password" register={register} required/>
                                    <LabelInput name="password_confirmation" type="password" register={register} required/>
                                    <button type="submit" className="bg-[#EEEEEE] h-10 rounded-xl mt-3 text-[#00ADB5] font-bold">Create account</button>
                                </form>
                                <p className="text-xs text-[#EEEEEE] text-center mt-4">Already a member? <a href="/" className="text-[#00ADB5] font-bold">Login</a></p>
                            </div>
                        </div>
                    </main>
                </section>
            </Suspense>
            <ToastContainer />
        </>
    )
}
