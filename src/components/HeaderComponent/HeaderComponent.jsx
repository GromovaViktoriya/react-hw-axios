import {Layout} from "antd";
import {useAuthMe, useLogout} from "../../shared/hooks/useAuth.js";
import {useNavigate} from "react-router";

const {Header} = Layout;

export const HeaderComponent = () => {
    const {data: user, isLoggedIn} = useAuthMe()
    const logoutUser = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser()
        navigate('/')
    }


    return (
        <Header style={{background: 'var(--bg)', color: 'var(--text)'}}>
            {isLoggedIn && user.name ?
                <div className="login">
                    <p>Добро пожаловать, {user.name}!</p>
                    <button className='header-btn' onClick={handleLogout}>Выйти</button>
                </div>
                : <p className='logout-text'>Необходимо авторизоваться.</p>
            }
        </Header>
    )
}