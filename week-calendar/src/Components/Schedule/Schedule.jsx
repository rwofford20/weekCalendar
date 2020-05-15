import React, {Component} from 'react';
import './Schedule.css';
import Header from '../Header/Header';
import SecondaryDisplay from '../SecondaryDisplay/SecondaryDisplay';
import Calendar from '../Calendar/Calendar';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.dummy = "Schedule dummy value";
        this.state = {secondaryDisplay:<SecondaryDisplay />};
        this.updateSecondaryDisplay = this.updateSecondaryDisplay.bind(this);
    }

    updateSecondaryDisplay(stuffToDisplay) {
        this.setState((state,props) => {
            return {
                secondaryDisplay: <SecondaryDisplay>
                    {stuffToDisplay}
                </SecondaryDisplay>
            }

        });
    }

    render () {
        return (
            <div className='schedule-container'>
            <Header 
                displayMeetingCreator={this.updateSecondaryDisplay.bind(this, 'Add Meeting')} 
                title='Meeting Maker'
            />
            {this.state.secondaryDisplay}
            <Calendar />
            </div>
        );
    }
}


export default Schedule;