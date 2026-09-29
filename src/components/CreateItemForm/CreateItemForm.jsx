import {Button, Form, Input, message} from "antd";
import {createItem} from "../../shared/api/apiMethods.js";

export const CreateItemForm = ({setTodos}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        createItem(values).then((newTask) => {
            setTodos(prev => [newTask, ...prev]);
            form.resetFields();
            message.success('Задача создана успешно!')
        }).catch((error) => {
            message.error(error.message);
        })
    }
    const onFinishFailed = (error) => {
      message.error(error.message);
    }

    return (
        <Form
            form={form}
            name="createItemForm"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 500}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Название"
                name="title"
                rules={[{required: true, message: 'Введите название задачи.'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Описание"
                name="description"
                rules={[{required: true, message: 'Введите описание задачи.'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}