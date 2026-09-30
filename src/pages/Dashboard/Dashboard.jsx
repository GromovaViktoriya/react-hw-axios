import {useContext, useEffect, useState} from "react";
import {Task} from "../../components/Task/Task.jsx";
import {fetchData} from "../../shared/api/apiMethods.js";
import {CreateItemForm} from "../../components/CreateItemForm/CreateItemForm.jsx";
import {Empty, message, Spin} from "antd";
import {LoadingContext} from "../../context/LoadingContext.js";

export const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const {isLoading, setIsLoading} = useContext(LoadingContext);

    useEffect(() => {
        setIsLoading(true)
        fetchData().then((res) => {
            setTodos(res.data);
        }).catch((err) => {
            message.error(err.message);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])


    return (
        <div className="dashboard">
            Dashboard
            <CreateItemForm setTodos={setTodos}/>
            {isLoading ?
                (<Spin size="large" style={{marginTop: '50px'}}/>)
                : (<ul className='dashboard-list'>
                    {todos.length !== 0 && todos.map(task => {
                        return <li key={task.id}><Task task={task} setTodos={setTodos}/></li>
                    })}
                    {todos.length === 0 && <Empty description='Создайте первую задачу'/>}
                </ul>)
            }

        </div>
    )
}