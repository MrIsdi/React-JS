type todo = {
    id: string,
    name: string,
    isCompleted: boolean
}

interface props{
    data: todo[]
}

export default function ListTodo({data}: props) {
    const handleCheck = (id: string) =>{
        const todos = JSON.parse(localStorage.getItem("todo") || "[]")
        const newTodos = todos.filter((filterTodo: todo) => filterTodo.id == id)[0]
        if(newTodos.isCompleted === false){
            newTodos.isCompleted = true
        }else if(newTodos.isCompleted === true){
            newTodos.isCompleted = false
        }
        todos[todos.indexOf(newTodos)] = newTodos
        localStorage.setItem("todo", JSON.stringify(todos))
    }
    const handleClear = (id: string) =>{
        const todos = JSON.parse(localStorage.getItem("todo") || "[]")
        const newTodos = todos.filter((filterTodo: todo) => filterTodo.id !== id)
        localStorage.setItem("todo", JSON.stringify(newTodos))
    }
    return (
        <>
            {
                data.map((todo: todo)=>(
                    <li key={todo?.id} className="flex justify-between border items-center rounded-lg px-2 py-1 shadow-lg">
                        <p className={`text-[#176B87] font-bold ${todo?.isCompleted === true? "line-through" : "no-underline"}`}>{todo?.name}</p>
                        <div>
                            <button onClick={()=>handleCheck(todo?.id)}>
                                <i className='bx bx-checkbox-checked text-3xl text-cyan-500'></i>
                            </button>
                            <button onClick={()=>handleClear(todo?.id)}>
                                <i className='bx bxs-trash text-3xl text-red-500'></i>
                            </button>
                        </div>
                    </li>
                ))
            }
        </>
    );
}
