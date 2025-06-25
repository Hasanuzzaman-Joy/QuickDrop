import React from 'react';

const Button = ({title, type, width, height}) => {
    return <button type={type} className={`btn btn-primary hover:btn-secondary ${width} ${height} text-base font-bold text-black hover:text-white rounded-full transition-all duration-300`}>{title}</button>
};

export default Button;