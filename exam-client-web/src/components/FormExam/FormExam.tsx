import { Suspense } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Loading from "../Loading/Loading"

interface FormExam{
    id: number,
    name: string,
    desc: string,
    status: string
}

interface props{
    name: string
}

export default function FormExam({name}:props){
    const { register, handleSubmit, reset } = useForm<FormExam>()
    const onSubmit: SubmitHandler<FormExam> = async (data) =>{
        console.log(data)
    }
    return (
        <Suspense fallback={<Loading />}>
            <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                {
                    name == "Update Exam"? 
                    <label htmlFor="id" className="w-full">
                        <p className="text-lg text-[#EEEEEE] font-bold">Exam name</p>
                        <select id="id" className="w-full h-10 rounded-xl px-2 bg-transparent border border-gray-500 text-[#EEEEEE]" {...register("id")}>
                            <option></option>
                        </select>
                    </label>:""
                }
                <label htmlFor="name" className="w-full">
                    <p className="text-lg text-[#EEEEEE] font-bold">Exam name</p>
                    <input type="text" id="name" className="w-full h-10 rounded-xl ps-2 bg-transparent border border-gray-500 text-[#EEEEEE]" {...register("name")}/>
                </label>
                <label htmlFor="desc" className="w-full">
                    <p className="text-lg text-[#EEEEEE] font-bold">Exam description</p>
                    <input type="text" id="desc" className="w-full h-10 rounded-xl ps-2 bg-transparent border border-gray-500 text-[#EEEEEE]" {...register("desc")} />
                </label>
                <label htmlFor="status" className="w-full">
                    <p className="text-lg text-[#EEEEEE] font-bold">Exam status</p>
                    <input type="text" id="status" className="w-full h-10 rounded-xl ps-2 bg-transparent border border-gray-500 text-[#EEEEEE]" {...register("status")} />
                </label>
                <button type="submit" className="bg-[#EEEEEE] h-10 rounded-xl mt-3 text-[#00ADB5] font-bold">{name}</button>
            </form>
        </Suspense>
    )
}