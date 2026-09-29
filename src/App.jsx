import {Routing} from "./components/routing/Routing.jsx";
import {Layout} from "antd";
import {Footer, Header} from "antd/es/layout/layout.js";

function App() {

    return (
        <div className="App">
            <Layout>
                <Header>HEADER</Header>
                    <Routing/>
                <Footer>FOOTER</Footer>
            </Layout>
        </div>
    )
}

export default App
