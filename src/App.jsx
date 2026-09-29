import {Routing} from "./components/routing/Routing.jsx";
import {Layout} from "antd";
import {Footer} from "antd/es/layout/layout.js";
import {useState} from "react";
import {LoginContext} from "./context/LoginContext.js";
import {HeaderComponent} from "./components/HeaderComponent/HeaderComponent.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <div className="App">
            <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
                <Layout style={{background: 'var(--bg)', color: 'var(--text)'}}>
                    <HeaderComponent/>
                    <Routing/>
                    <Footer
                        style={{
                            background: 'var(--bg)',
                            color: 'var(--text)',
                            borderTop: '1px solid var(--border)',
                            borderBottom: '1px solid var(--border)'
                        }}>FOOTER</Footer>
                </Layout>
            </LoginContext.Provider>
        </div>
    )
}

export default App
