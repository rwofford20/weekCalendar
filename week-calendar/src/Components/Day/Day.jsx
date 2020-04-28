import React, { Component } from 'react';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Day.css';

const Day = () => (
    <div className = 'day-container'>
        <TimeBlock startTime = '0800' endTime = '0900'/>
        <TimeBlock />
        <TimeBlock />
        <TimeBlock />
        <TimeBlock />
        <TimeBlock />
        <TimeBlock />
        <TimeBlock />
        <TimeBlock />
        <TimeBlock />
        <TimeBlock />
        <TimeBlock />
    </div>
);

export default Day;