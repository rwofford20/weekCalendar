import React, { Component } from 'react';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Day.css';

const Day = ({numericDay}) => (
    <div className = 'day-container'>
        {numericDay}
        <TimeBlock />
    </div>
);

export default Day;