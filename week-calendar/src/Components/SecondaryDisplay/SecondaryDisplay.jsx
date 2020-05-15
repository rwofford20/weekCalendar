import React from 'react';
import './SecondaryDisplay.css';

const SecondaryDisplay = (props) => (
    <div className='secondary-display-container'>
        {props.children}
    </div>
);

export default SecondaryDisplay;