import React, {useCallback, useEffect, useState} from 'react';
import './Send.css'
import {useTelegram} from "../../Hooks/useTelegram";
import {ethers} from "ethers";

const Send = () => {
    const [wallet, setWallet] = useState('');
    const [sum, setSum] = useState('');
    const {tg, queryId, user, onClose} = useTelegram();
    tg.expand(); //Expand page
    tg.MainButton.show() // показать кнопку
    onClose();

    const onSendData = useCallback(() => {
        const data = {
            wallet,
            sum,
            queryId,
            user
        }

        fetch(process.env.REACT_APP_API_URL + '/web-data', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [wallet, sum, queryId, user])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', tg.HapticFeedback.notificationOccurred("success"), onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData])


    useEffect(() => {
        tg.MainButton.setParams({
            text: 'SEND',
            textColor: '#FFFFFF',
            color: '#2cab37'
        })
    }, [])

    useEffect(() => {
        if(!wallet || !sum) {
            tg.MainButton.disable();
        } else {
            if (!checkNum(sum)) {
                alert("Sum must be more than 0")
            } else if(!ethers.utils.isAddress(wallet)) {
                alert("Wallet address incorrect");
            } else {
                tg.MainButton.enable();
            }
        }
    }, [wallet, sum])

    // Telegram.WebApp.onEvent('backButtonClicked', function () {
    //     history.back();
    //     tg.MainButton.hide();
    // });

    const onChangeWallet = (e) => {
        setWallet(e.target.value)
    }
    const onChangeSum = (e) => {
        setSum(e.target.value)
    }

//Check sum
    function checkNum(num) {
        return num > 0 && num < 999999999;
    }


    return (
        <div className={'form'}>
            <input className={'input'} type="text" placeholder={'Recepient\'s Wallet'} value={wallet}
                   onChange={onChangeWallet}/>
            <input className={'input'} type="number" placeholder={'SUM USDT'} value={sum}
                   onChange={onChangeSum}/>
        </div>

    );
};

export default Send;