import {useEffect, useState} from "react";
import {Task} from "../../components/Task/Task.jsx";
import {fetchData} from "../../shared/api/apiMethods.js";
import {CreateItemForm} from "../../components/CreateItemForm/CreateItemForm.jsx";
import {message} from "antd";

export const Dashboard = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchData().then((res) => {
            setTodos(res.data);
        }).catch((err) => {
            message.error(err.message);
        })
    }, [])


    return (
        <div className="dashboard">
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