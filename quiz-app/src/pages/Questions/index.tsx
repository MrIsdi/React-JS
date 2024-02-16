import { Suspense, useEffect, useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import useQuestions from "../../store/useQuestions";
import { useForm, SubmitHandler } from "react-hook-form";
import { useScore } from "../../store/useScore";
import { useNavigate } from "react-router-dom";

interface useForm{
    answer: string[]
}

export default function Questions(){
    const { questions, setQuestions, getQuestions, minutes, seconds, getTime, time, setTime, status } = useQuestions()
    const [ num, setNum ] = useState(1)
    const { register, handleSubmit } = useForm<useForm>()
    const { handleScore } = useScore()
    const navigate = useNavigate()
    const soal = JSON.parse(window.localStorage.getItem("soal") || "")
    const waktu = JSON.parse(window.localStorage.getItem("waktu") || "")
    const handleAnswer = (answers: any) =>{
        let correct: any = []
        answers?.map((answer: any)=>correct.push(answer?.correct_answer))
        return correct
    }
    const onSubmit: SubmitHandler<useForm> = (data) =>{
        let benar = 0, salah = 0, jumlah = 0, hasil = 0, total = data.answer.length
        const kunci = handleAnswer(questions)
        for(let i = 0; i < data.answer.length; i++){
            if(data.answer[i] == kunci[i]){
                benar += 1
            }else{
                salah += 1
            }
        }
        jumlah = data.answer.filter((a)=> a !== null).length
        hasil = (benar/data.answer.length)*100
        handleScore({benar, salah, jumlah, total, hasil})
        localStorage.setItem("soal", "[]")
        localStorage.setItem("waktu", "[]")
        navigate("/score")
    }
    useEffect(()=>{
        if(soal.length !== 0){
            setQuestions(soal)
            setTime(waktu)
        }
        else if(questions.length == 0){
            (async function(){
                await getQuestions()
            })()
        }
    }, [])
    useEffect(()=>{
        if(status){
            document.getElementById("submit")?.click()
        }
        getTime()
    }, [minutes, seconds, time])
    const onChangeQuestion = (i: number) =>{
        setNum(i)
    } 
    const onPrev = (i: number) =>{
        i === 1 ? setNum(i) : setNum(i - 1)
    } 
    const onNext = (i: number) =>{
        i === 10 ? setNum(i) : setNum(i + 1)
    } 
    return (
        <Suspense>
            <section className="h-screen w-full bg-[#FEFBF6] grid grid-rows-7">
                <nav className="bg-[#8CB9BD] flex justify-between px-4">
                    <div className="flex items-center text-[#B67352] font-bold gap-2">
                        <MdOutlineQuiz className="text-5xl" />
                        <p className="text-3xl">Quizz App</p>
                    </div>
                    <div className="flex items-center text-[#FEFBF6] gap-2">
                        <p className="w-28 py-2 text-center bg-[#B67352] rounded-full">{`${minutes < 10? `0${minutes}`:minutes}:${seconds < 10? `0${seconds}`:seconds}`}</p>
                    </div>
                </nav>
                <main className="row-span-6 flex px-4">
                    <div className="basis-1/5 flex gap-2 justify-center items-center flex-wrap h-fit my-8">
                        {
                            [1,2,3,4,5,6,7,8,9,10].map((a, i)=>(
                                <button key={i} className={`h-12 w-12 ${a == num? 'bg-[#B67352]' : 'bg-[#8CB9BD]'} grid place-items-center text-[#FEFBF6] rounded-2xl shadow`} onClick={()=>onChangeQuestion(a)}>{a}</button>
                            ))
                        }
                    </div>
                    <div className="basis-4/5 my-8">
                        <form action="" className="w-full flex justify-center flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                        {
                            questions?.map((quest: any,i: number)=>(
                                <div className={`w-1/2 shadow-lg h-fit p-4 rounded-xl text-[#B67352] ${num==(i+1)? "block": "hidden"}`} key={i}>
                                    <p>{num}</p>
                                    <div className="flex justify-between">
                                        <p>{quest?.category}</p>
                                        <p className="py-1 w-20 bg-[#B67352] text-[#FEFBF6] text-center rounded-full">{quest?.difficulty}</p>
                                    </div>
                                    <div>
                                        {quest?.question}
                                    </div>
                                    {
                                        quest?.option[0]?.map((a: any, j: number)=>(
                                            <label htmlFor={`${num}${i}`} className="flex gap-4" key={j}>
                                                <input
                                                    type="radio" 
                                                    id={`${num}${i}`}
                                                    {...register(`answer.${i}`)}
                                                    value={a} />
                                                <p>{a}</p>
                                            </label>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        <div className="mt-4 flex justify-between w-1/2">
                            <button type="button" className={`${num==1? "border border-[#B67352] text-[#B67352]":"bg-[#B67352] text-[#FEFBF6]"} py-1 px-4 rounded-xl`} onClick={()=>onPrev(num)}>Sebelumnya</button>
                            <button type="submit" className={`${num == 10? "visible": "invisible"} py-1 px-4 bg-slate-500 text-[#FEFBF6] rounded-xl`} id="submit">Submit</button>
                            <button type="button" className={`${num==10? "border border-[#B67352] text-[#B67352]":"bg-[#B67352] text-[#FEFBF6]"} py-1 px-4 rounded-xl`} onClick={()=>onNext(num)}>Sesudahnya</button>
                        </div>
                        </form>
                    </div>
                </main>
            </section>
        </Suspense>
    )
}