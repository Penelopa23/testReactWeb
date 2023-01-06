import React, {useContext, useEffect, useState} from 'react';
import {login} from "../../http/userApi";
import {useTelegram} from "../../Hooks/useTelegram";
import Loading from "../../components/Preloader/Loading";
import AppRouter from "../../Routes/AppRouter";
import {Context} from "../../index";

const {tg, queryId, user} = useTelegram();
const tgUser = user;
const Login = () => {
    const {user} = useContext(Context);
    const logIn = async () => {
        return await login(123);
    }

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        logIn().then(function (response) {
            if (response.data.result !== null) {
                console.log(response)
                user.setIsAuth(true);
                setIsLoading(false);
            } else {
                console.log(response)
                user.setIsAuth(true);
                setIsLoading(false)
            }
        })
    })

    return (
        <div className="loader">
            {isLoading ? <Loading/> : AppRouter()}
        </div>
    );
};

export default Login;