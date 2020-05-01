import React, { Component } from 'react';
import Day from '../Day/Day';
import TimeBlock from '../TimeBlock/TimeBlock';
import './Calendar.css';

class Calendar extends Component{

     addTimeBlock = (title, startTime, endTime) => {
          let updatedTimeBlocks=this.state.timeBlocks;
          updatedTimeBlocks.push(<TimeBlock title={title} startTime={startTime} endTime={endTime}/>);
          this.setState({timeBlocks:updatedTimeBlocks});
      };

     render = () => {
          //let newDay = <Day />;
          //newDay.addTimeBlock('Meet with Pete','0700', '0800');

          return (
          <div className = 'calendar-container'>
               <Day>
                    numericDay={1}
               </Day>
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
