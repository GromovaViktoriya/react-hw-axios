import {Button, Form, Input} from "antd";
import {useContext} from "react";
import {ErrorContext} from "../../context/ErrorContext.js";
import {createItem} from "../../shared/api/apiMethods.js";

export const CreateItemForm = ({setTodos}) => {
    const {setError} = useContext(ErrorContext)

    const onFinish = (values) => {
        createItem(values).then((newTask) => {
            setTodos(prev => [...prev, newTask]);
        })
    }
    const onFinishFailed = (error) => {
        setError(error)
    }

    return (
        <Form
            name="createItemForm"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 500}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
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

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}