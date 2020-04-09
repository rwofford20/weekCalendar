import React, { Component } from 'react';
import Day from '../Day/Day';
import './Calendar.css';

class Calendar extends Component{
   render = () => {
       return (<div className = 'calendar-container'>
           <Day
                numericDay={1}
           />
           <Day
                numericDay={2}
           />
           <Day
                numericDay={3}
           />
           <Day
                numericDay={4}
           />
           <Day
                numericDay={5}
           />
           <Day
                numericDay={6}
           />
           <Day
                numericDay={7}
           />

       </div>);
   };
}

export default Calendar;
