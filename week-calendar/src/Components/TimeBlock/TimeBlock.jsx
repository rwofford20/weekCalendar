import React from 'react';
import './TimeBlock.css';

const TimeBlock = (props) => (
    <div>
        {props.title}
        {props.startTime}
        {props.endTime}
    </div>
);

export default TimeBlock;