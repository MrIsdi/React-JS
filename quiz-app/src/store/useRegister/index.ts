import { toast, Bounce } from "react-toastify";
import { create } from "zustand";

interface useRegister{
    regist          : any,
    status          : boolean,
    handleRegister  : (data: any) => Promise<void>
}

const useRegister = create<useRegister>((set)=>({
    regist: {},
    status: false,
    handleRegister: async (data: any) =>{
        try {
            if(data.password != data.cpassword){
                throw new Error("Anda gagal register akun!")
            }
            toast.success("Anda berhasil register akun",{
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
            set({ regist: data})
            set({ status: true })
        } catch (error: any) {
            toast.error(`${error}`,{
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
        }
    }
}))

export default useRegister