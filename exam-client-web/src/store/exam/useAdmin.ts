import axios from "axios";
import { create } from "zustand";

const useAdmin = create(()=>({
    getUser: async (token: string) =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_EXAM_API}/user`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.data
        } catch (error: any) {
            return error.response.data.message
        }
    }
}))

export default useAdmin