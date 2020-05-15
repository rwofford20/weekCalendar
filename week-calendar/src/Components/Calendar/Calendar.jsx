import React, { Component } from 'react';
import './Calendar.css';

class Calendar extends Component{
     //Constructor to set the state of the Calendar component
     constructor(props) {
          super(props);
          //Array containing all of the default time blocks
          
          //Set the state using the default time blocks generated above and generate 5 days
          this.state = {
               
          };
     }

     render = () => {
          
          //Originally returns a default calendar
          //Adds a meeting to a specified when the 'Add a meeting!' button is clicked
          return (
               //<div>
                    <div className = 'calendar-container'>
                         {this.props.days}
                    </div>
                    /*
                    <div onClick={() => this.addTimeBlock('Ron Swanson', '1130', '1230', 'tuesday')} >
                         <p>
                              Add a meeting!
                         </p>
                    </div>
                    <div onClick={() => this.updateTimeBlock('Ron Swanson11301230', 'tuesday', 'tuesday', 'Updated Ron', '1300', '1430', false)}>
                         Update Ron's meeting
                    </div>
                    <div onClick={() => this.deleteTimeBlock('Ron Swanson11301230', 'tuesday')}>
                         Delete Ron's meeting
                    </div>
                    */
               //</div>
          );
     };
}

export default Calendar;
