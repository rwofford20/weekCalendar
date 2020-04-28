import React, { Component } from 'react';
import Day from '../Day/Day';
import './Calendar.css';

class Calendar extends Component{
     render = () => {
          newDay = <Day />
          newDay.addTimeBlock('Meet with Pete','0700', '0800');

          return (<div className = 'calendar-container'>
               {newDay}
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

          </div>);
     };
}

export default Calendar;
