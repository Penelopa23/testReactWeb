import React from 'react';
import {useTelegram} from "../../Hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();
    onClose();

    return (
        <div className={'header'}>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;