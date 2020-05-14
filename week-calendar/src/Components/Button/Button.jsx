import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

const Button = (props) => (
    <div className='button-container' onClick={props.onClick}>
        <div className='button-title-container'>
            {props.title}
        </div>
    </div>
);

export default Button;

Button.propTypes = {
    onClick:PropTypes.func.isRequired,
    title:PropTypes.string
}