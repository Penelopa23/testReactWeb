import React from 'react';
import {useTelegram} from "../hooks/useTelegram";

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <button onClick={onClose}>Close</button>
            <span className={'username'}>
                {user?.name}
            </span>
        </div>
    );
};

export default Header;