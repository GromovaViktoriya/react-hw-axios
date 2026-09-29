import {Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router";
import {login} from "../../shared/api/apiMethods.js";

export const Login = () => {
    const navigate = useNavigate();

    const onFinish = values => {
        login(values).then(res => {
            document.cookie = `access_token=${res.access_token}`
            navigate('/dashboard');
        }).catch(error => {
            message.error(error.message);
        })
    };

    const onFinishFailed = errorInfo => {
        message.error(errorInfo);
    };

    return (
        <Form
            name="login"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 500}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >
            <Form.Item
                label="Email"
                name="email"
                type="email"
                rules={[{required: true, message: 'Введите ваш email.'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{required: true, message: 'Введите ваш пароль.'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Отправить
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