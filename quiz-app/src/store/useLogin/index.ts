import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";
import { toast, Bounce } from "react-toastify";
import CryptoJS from "crypto-js"

interface useLogin{
    user        : any
    status      : boolean
    handleLogin : (data: any, validate: any)=> void
}

type persist = (
    confiq: StateCreator<useLogin>,
    options: PersistOptions<useLogin>
) => StateCreator<useLogin>

const secretKey = "quizapp"
const useLogin = create<useLogin, []>(
    (persist as persist)(
        (set): useLogin =>({
            user: {},
            status: false,
            handleLogin: (data, validate) => {
                try {
                    if(data.email == validate.email && data.password == validate.password){
                        toast.success("Anda berhasil login",{
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
                        set({ user: CryptoJS.AES.encrypt(JSON.stringify(validate), secretKey).toString() })
                        set({ status: true })
                    }else{
                        throw new Error("Anda gagal login!");
                    }
                    
                } catch (error) {
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
        }),{
            name: "user",
            storage: createJSONStorage(()=> sessionStorage)
        })
)

export default useLogin