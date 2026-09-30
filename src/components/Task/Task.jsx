import {Card, Form, message, Popconfirm, Tag} from "antd";
import {CheckOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useState} from "react";
import {deleteItem, getItemById, toggleTaskStatus} from "../../shared/api/apiMethods.js";
import {ModalEditForm} from "../ModalEditForm/ModalEditForm.jsx";

export const Task = ({task, setTodos}) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const editHandler = () => {
        setIsLoading(true)
        getItemById(task.id).then((res) => {
            form.setFieldsValue({
                title: res.title,
                description: res.description,
                completed: res.completed,
            })
        }).catch((error) => {
            message.error(error.message);
        }).finally(() => {
            setIsLoading(false)
        })
        setIsModalOpen(true);
    }

    const checkHandler = () => {
        setIsLoading(true)
        toggleTaskStatus(task.id).then((task) => {
            setTodos(prev => prev.map(item =>
                item.id === task.id ? {...item, completed: !item.completed} : item
            ));
            message.success('Статус задачи изменён');
        }).catch((error) => {
            message.error(error.message);
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleConfirm = () => {
        setIsLoading(true)
        deleteItem(task.id).then(() => {
            setTodos(prev => prev.filter(item => item.id !== task.id))
            message.success('Задача удалена!');
        }).catch((error) => {
            message.error(error.message);
        }).finally(() => {
            setIsLoading(false)
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
                        okButtonProps={{loading: isLoading}}
                    >
                        <DeleteOutlined key='bucket'/>
                    </Popconfirm>,
                    <EditOutlined key='edit' onClick={editHandler}/>,
                    <CheckOutlined key='check' onClick={checkHandler}/>
                ]}>
                <p className='card-description'>{task.description}</p>
                {task.completed && <Tag color='green' variant='outlined' className='tag'>Выполнено</Tag>}
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