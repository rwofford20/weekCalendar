import React from 'react';
import './TimeBlock.css';

const TimeBlock = (props) => (
    <div className='timeblock-container'>
        <div className='timeblock-title-container'>{props.title}</div>
        <div className='timeblock-time-container'>{props.startTime} - {props.endTime}</div>
    </div>
);

export default TimeBlock;