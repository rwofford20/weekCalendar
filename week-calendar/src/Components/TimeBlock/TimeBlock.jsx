import React from 'react';
import './TimeBlock.css';
import Grid from '@material-ui/core/Grid';

//TimeBlocks are the individual meeting block components in days
//TimeBlocks are rendered within the day components in Calendar.jsx
//In an empty day, there should be 12 default TimeBlocks
//Additional TimeBocks are created based on data passed in from the backend
const TimeBlock = (props) => (
    <Grid item xs={12}>
    <div className='timeblock-container'>
        <div className='timeblock-title-container'>{props.title}</div>
        <div className='timeblock-time-container'>{props.startTime} - {props.endTime}</div>
        </div>
    </Grid>
);

export default TimeBlock;