import axios from "axios";
import { create } from "zustand";
import { toast, Bounce } from "react-toastify";
import Cookie from "js-cookie"

interface IFormRegister {
    name                    : string,
    email                   : string,
    password                : string,
    password_confirmation   : string
}
interface IFormLogin {
    email                   : string,
    password                : string,
}

interface LoginState {
    user: any,
    setUser: (data: any) => void,
    loading: boolean,
    token: string,
    login: (data: IFormLogin | IFormRegister) => Promise<void>;
}

const useLogin = create<LoginState>((set, get)=>({
    user: {},
    setUser: (data: any) => set({ user: data }),
    loading: false,
    token: "",
    login: async (data) =>{
        set({ loading: true })
        try {
            const response = await axios.post(`${import.meta.env.VITE_EXAM_API}/login`, data)
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            set({ user: response.data.data })
            set({ token: response.data.token })

            Cookie.set("user", JSON.stringify(get().user), { expires: 1, secure: true })
            Cookie.set("token", JSON.stringify(get().token), { expires: 1, secure: true })
        } catch (error: any) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }finally{
            set({ loading: false })
        }
    }
}))

export default useLogin