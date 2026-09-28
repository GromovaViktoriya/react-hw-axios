import {Button, Form, Input} from "antd";
import {Link} from "react-router";
import {useContext} from "react";
import {ErrorContext} from "../../context/ErrorContext.js";
import {register} from "../../shared/api/apiMethods.js";

export const Auth = ()=>{
    const {setError} = useContext(ErrorContext);

    const onFinish = values => {
        register(values).then(res => {
            document.cookie = `access_token=${res.access_token}`
        }).catch(error => {
            setError(error.message);
        })
    };

    const onFinishFailed = errorInfo => {
        setError(errorInfo);
    };

    return (
        <Form
            name="auth"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 500 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                type="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' , min: 6 }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <Form.Item label={null}>
                <Link to="/">Уже есть аккаунт? Войти</Link>
            </Form.Item>
        </Form>
    )
}