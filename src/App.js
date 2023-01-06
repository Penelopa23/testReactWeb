import {useEffect} from 'react';
import './App.css';
import {useTelegram} from "./Hooks/useTelegram";
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Form from "./Pages/Registration/Registration";
import Send from "./Pages/Send/Send";
import AppRouter from "./Routes/AppRouter";

function App() {
    const {tg, onToggleButton} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <BrowserRouter>
           <AppRouter />
         </BrowserRouter>
    );
}

export default App;
