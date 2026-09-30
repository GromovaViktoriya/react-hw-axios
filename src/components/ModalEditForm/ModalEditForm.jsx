import {Form, Input, message, Modal} from "antd";
import {updateItem} from "../../shared/api/apiMethods.js";

export const ModalEditForm = ({setTodos, task, isModalOpen, setIsModalOpen, form}) => {

    const onFinishEdit = (values) => {
        updateItem(task.id, values).then(() => {
            setTodos(prev => prev.map(item =>
                item.id === task.id ? {...item, ...values} : item
            ));
            setIsModalOpen(false);
            message.success("Задача обновлена!");
        }).catch(error => {
            message.error(error.message || "Ошибка при обновлении задачи");
        })
    }
    const okHandler = () => {
        form.submit();
    }
    const cancelHandler = () => {
        setIsModalOpen(false);
    }

    return (
        <Modal
            title="Редактировать задачу"
            open={isModalOpen}
            onCancel={cancelHandler}
            onOk={okHandler}
            okText="Сохранить"
            cancelText="Отмена"
            width={350}
            forceRender
            styles={{
                content: {
                    color: 'var(--text)'
                }
            }}
        >
            <Form form={form} layout="vertical" onFinish={onFinishEdit} className="modal-edit-form">
                <Form.Item
                    label="Название"
                    name="title"
                    rules={[{required: true, message: 'Please input task title!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{required: true, message: 'Please input task description!'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    )
}