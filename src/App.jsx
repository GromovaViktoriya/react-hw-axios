import {Routing} from "./components/routing/Routing.jsx";
import {Alert, Layout} from "antd";
import {Footer, Header} from "antd/es/layout/layout.js";
import {ErrorContext} from "./context/ErrorContext.js";
import {useState} from "react";

function App() {
const [error, setError] = useState(null);

    return (
        <div className="App">
            <Layout>
                <Header>HEADER</Header>
                <ErrorContext.Provider value={{error, setError}}>
                    <Routing/>
                    {error? <Alert title="Error" description={error.message} type="error" showIcon/> : ''}
                </ErrorContext.Provider>
                <Footer>FOOTER</Footer>
            </Layout>
        </div>
    )
}

export default App
