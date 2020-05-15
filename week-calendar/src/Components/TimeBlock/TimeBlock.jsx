import React from 'react';
import './TimeBlock.css';

//TimeBlocks are the individual meeting block components in days
//TimeBlocks are rendered within the day components in Calendar.jsx
//In an empty day, there should be 12 default TimeBlocks
//Additional TimeBocks are created based on data passed in from the backend
const TimeBlock = (props) => (
   
// gridRowStart and gridRowEnd refer to the grid layout in Day.css
    <div className='timeblock-container' style={{ gridRowStart: "g".concat(props.startTime), gridRowEnd: "g".concat(props.endTime) }}>
        <div className='timeblock-title-container'>{props.title}</div>
        <div className='timeblock-time-container'>{props.startTime} - {props.endTime}</div>
        </div>
);



export default TimeBlock;