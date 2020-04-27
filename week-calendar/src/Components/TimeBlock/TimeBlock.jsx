import React from 'react';
import './TimeBlock.css';

const TimeBlock = (props) => (
    <div className='timeblock-container'>
        <div className='timeblock-title-container'>{props.title}</div>
        {props.startTime}
        {props.endTime}
    </div>
);

export default TimeBlock;