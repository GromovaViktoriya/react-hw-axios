import {Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router";
import {useRegister} from "../../shared/hooks/useAuth.js";

export const Auth = () => {
    const navigate = useNavigate();
    const { mutate: registerUser, isPending } = useRegister();

    const onFinish = values => {
        registerUser(values, {
            onSuccess: () => {
                message.success('Регистрация проведена успешно!');
                navigate('/dashboard');
            },
            onError: (error) => {
                message.error(error.message);
            }
        });
    };

    const onFinishFailed = errorInfo => {
        message.error(errorInfo);
    };

    return (
        <div className="form-container">
            <Form
                name="auth"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 500}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                <h2 style={{textAlign: 'center', marginBottom: '24px'}}>Регистрация</h2>
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[{required: true, message: 'Введите ваше имя.'}]}
                >
                    <Input/>
                </Form.Item>
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
                    rules={[{required: true, message: 'Пароль должен быть минимум 6 символов.', min: 6}]}
                >
                    <Input.Password placeholder="••••••••"/>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" loading={isPending} disabled={isPending}>
                        Зарегистрироваться
                    </Button>
                </Form.Item>

                <Form.Item label={null}>
                    <Link to="/">Уже есть аккаунт? Войти</Link>
                </Form.Item>
            </Form>
        </div>

    )
}