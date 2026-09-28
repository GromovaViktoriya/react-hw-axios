import {Route, Routes} from "react-router";
import {Login} from "../../pages/Login/Login.jsx";
import {Dashboard} from "../../pages/Dashboard/Dashboard.jsx";
import {Auth} from "../../pages/Auth/Auth.jsx";

export const Routing = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Login/>} />
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/auth'} element={<Auth />} />
        </Routes>
    )
}