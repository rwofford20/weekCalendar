import React, { Component } from 'react';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Day.css';

function convertTimeToString(intTime) {
    let timeString = intTime.toString();
    if (intTime < 1000) {
        timeString = '0' + timeString;
    }
    return timeString;
}

function generateTimes(startTime, endTime) {
    let timeArray = Array((endTime / 100) - (startTime / 100) + 1).fill().map((_, ndx) => startTime + 100 * ndx );
    timeArray = timeArray.map((intTime, ndx) => convertTimeToString(intTime));
    return timeArray;
}

function generateTimeBlocks(startTime, endTime) {
    const timeArray = generateTimes(startTime, endTime);
    let timeBlocks = [];
    for (let ndx = 0; ndx < timeArray.length - 1; ndx++) {
        timeBlocks.push(<TimeBlock title='Title' startTime={timeArray[ndx]} endTime={timeArray[ndx + 1]} />);
    }
    return timeBlocks;
}

const Day = () => (
    <div className = 'day-container'>
        {generateTimeBlocks(800, 2000)}
    </div>
);

export default Day;