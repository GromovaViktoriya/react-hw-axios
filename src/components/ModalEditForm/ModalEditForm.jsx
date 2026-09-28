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
        >
            <Form form={form} layout="vertical" onFinish={onFinishEdit}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{required: true, message: 'Please input task title!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{required: true, message: 'Please input task description!'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    )
}