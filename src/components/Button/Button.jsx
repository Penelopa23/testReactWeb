import React from 'react';

const Button = (props) => {
    return (
        <div>
            <button{...props} className={'button ' + props.ClassName}/>
        </div>
    );
};

export default Button;