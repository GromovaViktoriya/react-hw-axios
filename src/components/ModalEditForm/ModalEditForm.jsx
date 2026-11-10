import {Form, Input, message, Modal} from "antd";
import {useUpdateTodo} from "../../shared/hooks/useTodos.js";

export const ModalEditForm = ({task, isModalOpen, setIsModalOpen, form}) => {
    const {mutate: updateItem, isPending} = useUpdateTodo()

    const onFinishEdit = (values) => {
        updateItem({taskId:task.id, values}, {
            onSuccess: () => {
                setIsModalOpen(false);
                message.success("Задача обновлена!");
            },
            onError: (error) => {
                message.error(error.message || "Ошибка при обновлении задачи");
            }
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
            confirmLoading={isPending}
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