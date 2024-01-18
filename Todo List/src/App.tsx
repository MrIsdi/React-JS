import { useEffect, useState } from "react";
import FormTodo from "./components/FormTodo/FormTodo";
import ListTodo from "./components/ListTodo/ListTodo";

type todo = {
  id: string,
  name: string,
  isCompleted: boolean
}

export default function App() {
  const [todos, setTodos] = useState([])
  useEffect(()=>{
    setInterval(()=>{
      if(!localStorage.getItem("todo")){
        localStorage.setItem("todo", "[]")
      }else{
        setTodos(JSON.parse(localStorage.getItem("todo") || "[]"))
      }
    }, 500)
  },[])
  return (
    <>
      <main className="flex h-screen justify-center items-center md:p-0 p-2">
        <div className="md:basis-1/3 basis-full bg-[#86B6F6] rounded-3xl shadow-xl">
          <h1 className="text-3xl text-center font-bold mx-4 my-6 text-[#176B87]">Todo List</h1>
          <FormTodo />
          <div className="bg-[#B4D4FF] px-4 py-6 rounded-3xl">
            <ul className="flex flex-col gap-2 mb-4">
              {
                todos.length === 0 ? <p className="text-center font-light">There is no todo list</p> : <ListTodo data={todos} />
              }
            </ul>
            <div className="flex gap-2 md:flex-row flex-col">
              <p className="text-[#176B87] text-xs">Total Todo List: {todos.length}</p>
              <p className="text-[#176B87] text-xs">Total Completed: {todos.filter((todo: todo)=>todo.isCompleted === true).length}</p>
              <p className="text-[#176B87] text-xs">Total Not Completed: {todos.filter((todo: todo)=>todo.isCompleted === false).length}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
