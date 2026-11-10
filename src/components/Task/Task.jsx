import {Card, Form, message, Popconfirm, Tag} from "antd";
import {CheckOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useState} from "react";
import {ModalEditForm} from "../ModalEditForm/ModalEditForm.jsx";
import {useDeleteTodo, useToggleStatusTodo} from "../../shared/hooks/useTodos.js";

export const Task = ({task}) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {mutate:toggleTaskStatus} = useToggleStatusTodo()
    const {mutate: deleteTask, isPending} = useDeleteTodo()

    const editHandler = () => {
        form.setFieldsValue({
            title: task.title,
            description: task.description,
            completed: task.completed,
        })
        setIsModalOpen(true);
    }

    const checkHandler = () => {
        toggleTaskStatus(task.id, {
            onSuccess: () => {
                message.success('Статус задачи изменён');
            },
            onError: (error) => {
                message.error(error.message);
            }
        })
    }

    const handleConfirm = () => {
        deleteTask(task.id, {
            onSuccess: () => {
                message.success('Задача удалена!');
            },
            onError: (error) => {
                message.error(error.message);
            }
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
                        okButtonProps={{loading: isPending}}
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
                           task={task}
                           isModalOpen={isModalOpen}
                           setIsModalOpen={setIsModalOpen}
            />
        </>

    )
}