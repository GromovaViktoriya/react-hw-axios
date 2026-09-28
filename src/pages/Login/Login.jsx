import {Button, Form, Input} from "antd";
import {useContext} from "react";
import {ErrorContext} from "../../context/ErrorContext.js";
import {Link, useNavigate} from "react-router";
import {login} from "../../shared/api/apiMethods.js";

export const Login = () => {
    const {setError} = useContext(ErrorContext);
   const navigate = useNavigate();

    const onFinish = values => {
        login(values).then(res => {
            document.cookie = `access_token=${res.access_token}`
            navigate('/dashboard');
        }).catch(error => {
            setError(error.message);
        })
    };

    const onFinishFailed = errorInfo => {
        setError(errorInfo);
    };

    return (
        <Form
            name="login"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 500}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                type="email"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
            <Form.Item label={null}>
                <Link to="/auth">
                    Регистрация
                </Link>
            </Form.Item>
        </Form>
    )
}