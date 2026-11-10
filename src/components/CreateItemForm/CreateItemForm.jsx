import {Button, Form, Input, message} from "antd";
import {useCreateTodo} from "../../shared/hooks/useTodos.js";

export const CreateItemForm = () => {
    const [form] = Form.useForm();
    const {mutate: createItem, isPending} = useCreateTodo()

    const onFinish = (values) => {
       createItem(values, {
           onSuccess: () => {
               message.success('Задача создана успешно!')
               form.resetFields();
           },
           onError: (error) => {
               message.error(error.message);
           }
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
                <Button type="primary" htmlType="submit" loading={isPending}>
                    Создать
                </Button>
            </Form.Item>
        </Form>
    )
}