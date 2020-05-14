import React from 'react';
import './Schedule.css';
import Header from '../Header/Header';
import SecondaryDisplay from '../SecondaryDisplay/SecondaryDisplay';
import Calendar from '../Calendar/Calendar';

const Schedule = (props) => (
    <div className='schedule-container'>
        <Header />
        <SecondaryDisplay />
        <Calendar />
    </div>
);

export default Schedule;