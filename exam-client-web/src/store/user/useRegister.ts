import { create } from "zustand";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

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

interface RegisterState {
    isLoading: boolean;
    setIsLoading: (data: boolean) => void;
    addUser: (data: IFormLogin | IFormRegister) => Promise<void>;
}

const useRegister = create<RegisterState>((set)=>({
    isLoading: false,
    setIsLoading: (data: boolean) => set({ isLoading: data }),
    addUser: async (data: IFormLogin | IFormRegister) =>{
        set({ isLoading:true })
        try {
            const response = await axios.post(`${import.meta.env.VITE_EXAM_API}/register`, data)
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        } catch (error) {
            toast.error("Registrasi gagal", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    }
}))

export default useRegister