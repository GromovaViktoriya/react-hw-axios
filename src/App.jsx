import {Routing} from "./components/routing/Routing.jsx";
import {Layout} from "antd";
import {Footer} from "antd/es/layout/layout.js";
import {useState} from "react";
import {LoginContext} from "./context/LoginContext.js";
import {HeaderComponent} from "./components/HeaderComponent/HeaderComponent.jsx";
import {LoadingContext} from "./context/LoadingContext.js";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="App">
            <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
                <LoadingContext.Provider value={{isLoading, setIsLoading}}>
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
                </LoadingContext.Provider>
            </LoginContext.Provider>
        </div>
    )
}

export default App
