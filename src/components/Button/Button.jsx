import React from 'react';
import './Button.css';
const Button = (props) => {
    return (
        <div>
            <button{...props} className={'button ' + props.ClassName}/>
        </div>
    );
};

export default Button;