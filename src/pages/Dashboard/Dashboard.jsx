import {useContext, useEffect, useState} from "react";
import {Task} from "../../components/Task/Task.jsx";
import {fetchData} from "../../shared/api/apiMethods.js";
import {ErrorContext} from "../../context/ErrorContext.js";
import {CreateItemForm} from "../../components/CreateItemForm/CreateItemForm.jsx";

export const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    
    const {setError} = useContext(ErrorContext);

    useEffect(() => {
        fetchData().then((res) => {
            setTodos(res.data);
        }).catch((err) => {
            setError(err.message);
        })
    }, [])


    return (
        <div>
            Dashboard
            <CreateItemForm setTodos={setTodos}/>
            <ul className='dashboard-list'>
                {todos.map(task => {
                    return <li key={task.id}><Task task={task} setTodos={setTodos}/></li>
                })}
            </ul>
        </div>
    )
}