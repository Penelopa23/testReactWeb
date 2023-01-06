import React, {useCallback, useEffect, useState} from 'react';
import './Registration.css'
import {useTelegram} from "../../Hooks/useTelegram";
// require('dotenv-webpack').config();


const Form = () => {
    const [wallet, setWallet] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const {tg, queryId, user, onClose} = useTelegram();
    tg.expand(); //Expand page
    onClose();

    const onSendData = useCallback(() => {
        const data = {
            wallet,
            privateKey,
            queryId,
            user
        }

        fetch(process.env.REACT_APP_API_URL + '/registration', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [wallet, privateKey, queryId, user])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData])


    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Registration'
        })
    }, [])

    useEffect(() => {
        if(!wallet || !privateKey) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [wallet, privateKey])

    const onChangeWallet = (e) => {
        setWallet(e.target.value)
    }
    const onChangePrivateKey = (e) => {
        setPrivateKey(e.target.value)
    }


    return (
        <div className={'form'}>
            <h3>Enter you data</h3>
            <input className={'input'} type="text" placeholder={'You Wallet'} value={wallet}
                   onChange={onChangeWallet}/>
            <input className={'input'} type="text" placeholder={'Private Key'} value={privateKey}
                   onChange={onChangePrivateKey}/>
        </div>
    );
};

export default Form;