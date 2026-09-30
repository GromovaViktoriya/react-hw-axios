import {useContext, useEffect} from "react";
import {LoginContext} from "../../context/LoginContext.js";
import {useNavigate} from "react-router";
import {Layout} from "antd";
const {Header} = Layout;

export const HeaderComponent = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");

    useEffect(() => {
      if (localStorage.getItem("userName")) {
          setIsLoggedIn(true);
      }
    }, [])


    const handleLogout = () => {
        setIsLoggedIn(false);
        document.cookie = "access_token=; Max-Age=0; path=/;"
        localStorage.removeItem("userName");
        navigate('/')
    }


    return (
        <Header style={{background: 'var(--bg)', color: 'var(--text)'}}>
            {isLoggedIn && userName ?
                <div className="login">
                    <p>Добро пожаловать, {userName}!</p>
                    <button className='header-btn' onClick={handleLogout}>Выйти</button>
                </div>
                : <p className='logout-text'>Необходимо авторизоваться.</p>
            }
        </Header>
    )
}