import {AUTH_PAGE, RECEIVED_PAGE, REGISTRATION_PAGE, SEND_PAGE} from "./pageConsts";
import Send from "../Pages/Send/Send";
import Received from "../Pages/Received/Received";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";


export const authRoutes = [
    {
        path: SEND_PAGE,
        Component: Send
    },
    {
        path: RECEIVED_PAGE,
        Component: Received
    }
]

export const publicRoutes = [
    {
        path: AUTH_PAGE,
        Component: Login
    },
    {
        path: REGISTRATION_PAGE,
        Component: Registration
    }
]