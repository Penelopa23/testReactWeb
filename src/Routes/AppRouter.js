import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {authRoutes, publicRoutes} from "./Routes";
import {Context} from "../index";
import Registration from "../Pages/Registration/Registration";
import Send from "../Pages/Send/Send";

const AppRouter = () => {
    const {user} = useContext(Context);
    console.log(user.isAuth)
    return (
        <Routes>
            {
                user.isAuth ? <Route index element={<Send/>}/> : <Route index element={<Registration/>}/>
            }
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>,
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>,
            )}
        </Routes>
    );
};

export default AppRouter;