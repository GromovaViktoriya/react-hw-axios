import {Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router";
import {useLogin} from "../../shared/hooks/useAuth.js";

export const Login = () => {
    const navigate = useNavigate();
    const {mutate:loginUser, isPending} = useLogin()

    const onFinish = values => {
        loginUser(values, {
            onSuccess: () => {
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
                name="login"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 500}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                <h2 style={{textAlign: 'center', marginBottom: '24px'}}>Вход</h2>
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
                    <Input.Password placeholder="••••••••"/>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" loading={isPending} disabled={isPending}>
                        Отправить
                    </Button>
                </Form.Item>
                <Form.Item label={null}>
                    <Link to="/auth">
                        Нет аккаунта? Зарегистрироваться
                    </Link>
                </Form.Item>
            </Form>
        </div>

    )
}