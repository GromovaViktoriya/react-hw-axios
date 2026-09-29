import {Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router";
import {login} from "../../shared/api/apiMethods.js";
import {useContext} from "react";
import {LoginContext} from "../../context/LoginContext.js";
import {LoadingContext} from "../../context/LoadingContext.js";

export const Login = () => {
    const {setIsLoggedIn} = useContext(LoginContext);
    const {isLoading, setIsLoading} = useContext(LoadingContext);
    const navigate = useNavigate();

    const onFinish = values => {
        setIsLoading(true)
        login(values).then(res => {
            document.cookie = `access_token=${res.access_token}`
            setIsLoggedIn()
            navigate('/dashboard');
        }).catch(error => {
            message.error(error.message);
        }).finally(()=>{
            setIsLoading(false)
        })
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
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Вход</h2>
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
                    <Button type="primary" htmlType="submit" loading={isLoading}>
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