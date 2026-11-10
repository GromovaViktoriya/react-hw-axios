import {Task} from "../../components/Task/Task.jsx";
import {CreateItemForm} from "../../components/CreateItemForm/CreateItemForm.jsx";
import {Button, Empty, message, Spin} from "antd";
import {useTodos} from "../../shared/hooks/useTodos.js";
import {ReloadOutlined} from "@ant-design/icons";

export const Dashboard = () => {
    const {data: todos = [], isLoading, isError, error, isFetching, refetch} = useTodos()
    if (isError) message.error(error.message);

    return (
        <div className="dashboard">
            Dashboard
            <Button
                icon={<ReloadOutlined/>}
                onClick={() => refetch()}
                loading={isFetching}
            >
                Обновить
            </Button>
            <CreateItemForm/>
            {isLoading || isFetching?
                (<Spin size="large" style={{marginTop: '50px'}}/>)
                : (<ul className='dashboard-list'>
                    {todos.data.length > 0
                        ? todos.data.map(task => {
                            return <li key={task.id}><Task task={task}/></li>
                        })
                        : <Empty description='Создайте первую задачу'/>}
                </ul>)
            }
        </div>
    )
}