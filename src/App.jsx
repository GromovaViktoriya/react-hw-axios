import {Routing} from "./components/routing/Routing.jsx";
import {Layout} from "antd";
import {HeaderComponent} from "./components/HeaderComponent/HeaderComponent.jsx";
const {Footer} = Layout;

function App() {
    return (
        <div className="App">
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
        </div>
    )
}

export default App
