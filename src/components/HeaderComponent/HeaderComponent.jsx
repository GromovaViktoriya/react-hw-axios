import {Header} from "antd/es/layout/layout.js";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../context/LoginContext.js";
import {useNavigate} from "react-router";
import {authMe} from "../../shared/api/apiMethods.js";

export const HeaderComponent = () => {
    const [userName, setUserName] = useState("");
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        document.cookie =  "access_token=; Max-Age=0; path=/;"
        navigate('/')
    }

    useEffect(() => {
        authMe().then((res) => {
            setUserName(res.name);
        })
    })

    return (
        <Header style={{background:'var(--bg)', color:'var(--text)'}}>
            {isLoggedIn ?
                <div className="login">
                <p>Добро пожаловать, {userName}!</p>
                    <button className='header-btn' onClick={handleLogout}>Выйти</button>
                </div>
                : <p className='logout-text'>Необходимо авторизоваться.</p>
            }

        </Header>
    )
}