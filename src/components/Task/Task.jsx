import {Card, Form, Popconfirm, Tag} from "antd";
import {CheckOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useContext, useState} from "react";
import {ErrorContext} from "../../context/ErrorContext.js";
import {deleteItem, toggleTaskStatus} from "../../shared/api/apiMethods.js";
import {ModalEditForm} from "../ModalEditForm/ModalEditForm.jsx";

export const Task = ({task, setTodos}) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {setError} = useContext(ErrorContext);

    const editHandler = () => {
        form.setFieldsValue({
            title: task.title,
            description: task.description,
            completed: task.completed,
        })
        setIsModalOpen(true);
    }

    const checkHandler = () => {
        toggleTaskStatus(task.id).then((task) => {
            setTodos(prev => prev.map(item =>
                item.id === task.id ? {...item, completed: !item.completed} : item
            ));
        })
    }

    const handleConfirm = ()=>{
      deleteItem(task.id).then(()=>{
         setTodos(prev => prev.filter(item => item.id !== task.id))
      })
    }

    return (
        <>
            <Card
                className={`task-card ${task.completed ? 'checked' : ''}`}
                title={task.title}
                variant="borderless"
                actions={[
                    <Popconfirm
                        title="Удалить задачу"
                        description="Вы уверены, что хотите удалить эту задачу?"
                        onConfirm={handleConfirm}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <DeleteOutlined key='bucket'/>
                    </Popconfirm>
                    ,
                    <EditOutlined key='edit' onClick={editHandler}/>,
                    <CheckOutlined key='check' onClick={checkHandler}/>
                ]}>
                <p className='card-description'>{task.description}</p>
                {task.completed && <Tag color='green' variant='outlined'>Выполнено</Tag>}
            </Card>
            <ModalEditForm form={form}
                           setTodos={setTodos}
                           task={task}
                           isModalOpen={isModalOpen}
                           setIsModalOpen={setIsModalOpen}
            />
        </>

    )
}