import React, { Component } from 'react';
import './Day.css';

const Day = ({numericDay}) => (
    <div className = 'day-container'>
        {numericDay}
    </div>
);

export default Day;