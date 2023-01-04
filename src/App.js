import {useEffect} from 'react';
import './App.css';
import {useTelegram} from "./components/hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Form from "./components/Forms/Form";
import Send from "./components/Send/Send";

function App() {
    const {tg, onToggleButton} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])


    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route index element={ <Form/>}/>
                <Route path={'form'} element={ <Form/>}/>
                <Route path={'send'} element={ <Send/>}/>
            </Routes>
         </div>
    );
}

export default App;
