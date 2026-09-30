import {Route, Routes} from "react-router";
import React, {Suspense} from "react";
import {Spin} from "antd";

const Login = React.lazy(()=> import("../../pages/Login/Login.jsx")
    .then((module) => ({default:module.Login})))
const Dashboard = React.lazy(()=> import("../../pages/Dashboard/Dashboard.jsx")
    .then((module) => ({default:module.Dashboard})))
const Auth = React.lazy(()=> import("../../pages/Auth/Auth.jsx")
    .then((module) => ({default:module.Auth})))

export const Routing = ({ setUserName}) => {
    return (
        <Routes>
            <Route path={'/'} element={ <Suspense fallback={<Spin/>}><Login setUserName={setUserName}/></Suspense>} />
            <Route path={'/dashboard'} element={ <Suspense fallback={<Spin/>}><Dashboard /></Suspense>} />
            <Route path={'/auth'} element={<Suspense fallback={<Spin/>}><Auth /></Suspense>}/>
        </Routes>
    )
}