import {Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router";
import {register} from "../../shared/api/apiMethods.js";

export const Auth = ()=>{
    const navigate = useNavigate();

    const onFinish = values => {
        register(values).then(res => {
            document.cookie = `access_token=${res.access_token}`
            message.success('Регистрация проведена успешно!')
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
            name="auth"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 500 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
        >

            <Form.Item
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Введите ваше имя.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                type="email"
                rules={[{ required: true, message: 'Введите ваш email.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Введите ваш пароль.' , min: 6 }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Отправить
                </Button>
            </Form.Item>

            <Form.Item label={null}>
                <Link to="/">Уже есть аккаунт? Войти</Link>
            </Form.Item>
        </Form>
    )
}