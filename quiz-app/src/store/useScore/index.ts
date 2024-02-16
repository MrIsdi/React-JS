import { create } from "zustand";

interface useScore{
    benar: number
    salah: number
    jumlah: number
    total: number
    hasil: number
    handleScore: (data: any) => void
}

export const useScore = create<useScore>(
    (set)=>({
        benar: 0,
        salah: 0,
        jumlah: 0,
        hasil: 0,
        total: 0,
        handleScore: (data: any) =>{
            set({ benar: data.benar })
            set({ salah: data.salah })
            set({ jumlah: data.jumlah })
            set({ total: data.total })
            set({ hasil: data.hasil})
        }
    })
) 