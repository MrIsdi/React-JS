import axios from "axios";
import { create } from "zustand";

interface useQuestions{
    questions: any,
    setQuestions: (data: any) => void
    time: number,
    setTime: (data: any) => void 
    minutes: number,
    seconds: number,
    getQuestions: () => Promise<void>,
    getTime: () => void,
    status: boolean
}

const useQuestions = create<useQuestions>(
    (set, get)=>(
        {
            questions: [],
            setQuestions: (data: any) => set({ questions: data }),
            time: 0,
            setTime: (data: any) => set({ time: data }),
            minutes: 0,
            seconds: 0,
            status: false,
            getQuestions: async () =>{
                try {
                    const response = await axios.get("https://opentdb.com/api.php?amount=10&category=19&type=multiple")
                    response.data.results.forEach((data: any) => {
                        data.option = []
                        data.option.push([...data?.incorrect_answers, data?.correct_answer].sort(()=>0.5 - Math.random()))
                    })
                    set({ questions: response.data.results })
                    set({ time: new Date().getTime() + 10000 })

                    localStorage.setItem("soal", JSON.stringify(get().questions))
                    localStorage.setItem("waktu", JSON.stringify(get().time))
                } catch (error) {
                    console.log(error)
                }
            },
            getTime: () =>{
                if(get().time > 0){
                    let x = setInterval(()=>{
                        let jarak = get().time - new Date().getTime()
                        set({ minutes: Math.floor((jarak % (1000*60*60))/(1000*60)) })
                        set({ seconds: Math.floor((jarak % (1000*60))/(1000)) })
                        if(jarak < 0){
                            set({ status: true })
                            clearInterval(x)
                        }
                    }, 1000)
                }
            }
        }
    )
)

export default useQuestions