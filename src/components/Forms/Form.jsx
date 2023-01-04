import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, city, street,subject])

    useEffect(() => {
        tg.onEvent('mainButtomClicked', onSendData);
        return () => {
            tg.offEvent('mainButtomClicked', onSendData);
        }
    }, [])


    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send Data'
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCounty = (e) => {
        setCountry(e.target.value)
    }
    const onChangeCity = (e) => {
        setCity(e.target.value)
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }


    return (
        <div className={'form'}>
            <h3>Enter you data</h3>
            <input className={'input'} type="text" placeholder={'Country'} value={country} onChange={onChangeCounty}/>
            <input className={'input'} type="text" placeholder={'City'} value={city} onChange={onChangeCity}/>
            <input className={'input'} type="text" placeholder={'Street'} value={street} onChange={onChangeStreet}/>
            <select className={'select'} value={subject} onChange={onChangeSubject}>
                <option value={'legal'}>Legal Entity</option>
                <option value={'physical'}>Individual</option>
            </select>
        </div>
    );
};

export default Form;