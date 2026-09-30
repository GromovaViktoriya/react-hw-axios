import {Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router";
import {authMe, register} from "../../shared/api/apiMethods.js";
import {useContext} from "react";
import {LoginContext} from "../../context/LoginContext.js";
import {LoadingContext} from "../../context/LoadingContext.js";

export const Auth = () => {
    const {setIsLoggedIn} = useContext(LoginContext);
    const {isLoading, setIsLoading} = useContext(LoadingContext);
    const navigate = useNavigate();

    const onFinish = values => {
        setIsLoading(true)
        register(values).then(res => {
            document.cookie = `access_token=${res.access_token}`
            message.success('Регистрация проведена успешно!')
            setIsLoggedIn(true)
            return authMe()
        }).then((userData) => {
            localStorage.setItem('userName', userData.name)
            navigate('/dashboard');
        }).catch(error => {
            message.error(error.message);
        }).finally(() => {
            setIsLoading(false)
        })
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
                    <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
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