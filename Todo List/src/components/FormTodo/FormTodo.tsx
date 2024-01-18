import React, { useState } from "react"
import uuid from "react-uuid"

export default function FormTodo(){
    const [data, setData] = useState("") 
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setData(e.target.value)
    }
    const handleSubmit = (e: React.SyntheticEvent) =>{
        e.preventDefault()
        const todo: {id: string, name: string, isCompleted: boolean} = {
            id: uuid(),
            name: data,
            isCompleted: false
        }
        const newTodo = JSON.parse(localStorage.getItem("todo") || "[]")
        newTodo.push(todo)
        localStorage.setItem("todo", JSON.stringify(newTodo))

        setData("")
    }
    return(
        <>
            <form action="" className="flex gap-2 mx-4 mb-4">
                <input type="text" className="ps-2 block w-full h-10 rounded-lg bg-[#EEF5FF] shadow-md" onChange={handleInput} value={data} />
                <button className="border aspect-square w-[40px] h-[40px] bg-[#EEF5FF] rounded-lg shadow-lg" onClick={handleSubmit}>
                    <i className='bx bx-list-plus text-3xl text-teal-500'></i>
                </button>
            </form>
        </>
    )
}