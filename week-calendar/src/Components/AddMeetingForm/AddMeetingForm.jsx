import React, {Component} from 'react';
import {DatePicker, TimePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './AddMeetingForm.css';

//TimeBlocks are the individual meeting block components in days
//TimeBlocks are rendered within the day components in Calendar.jsx
//In an empty day, there should be 12 default TimeBlocks
//Additional TimeBocks are created based on data passed in from the backend
class AddMeetingForm extends Component {
    constructor(props) {
        super(props);
        
        this.state= {
            availablePeople: [
                "Malcolm Reynolds",
                "Zoe Washburne",
                "Inara Serra",
                "Hoban Washburne",
                "Derrial Book",
                "Kaylee Frye",
                "Simon Tam",
                "River Tam",
                "Jayne Cobb"
            ],
            date: new Date(),
            day: '',
            endTime: null,
            participants: [],
            //selectedPerson: null,
            startTime: null,
            title: '',
        };

        this.handleDate = this.handleDate.bind(this);
        this.handleEndTime = this.handleEndTime.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleParticipants = this.handleParticipants.bind(this);
        this.createMeeting = this.createMeeting.bind(this);
    }

    fullweek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    //Function to convert integer time values to a string and add a leading zero if necessary
    //Used in generateTimes function
    //Input is an integer value
    //Output is the above integer value converted to a string
    convertTimeToString = (intTime) => {
        let timeString = intTime.toString();
        if (intTime < 1000) {
            timeString = '0' + timeString;
        }
        return timeString;
   };

    createMeeting() {
        //title, startTime, endTime, dayID
        console.log('Selected day: ' + this.state.date);
        let title = this.state.title;
        let dayOfWeek = this.state.day;
        let startTime = this.convertTimeToString((this.state.startTime.getHours())*100 
            + (Math.floor(this.state.startTime.getMinutes() / 15))*15);
        let endTime = this.convertTimeToString((this.state.endTime.getHours())*100 
        + (Math.floor(this.state.endTime.getMinutes() / 15))*15);
        this.props.addMeeting(title, startTime, endTime, dayOfWeek);
    }

    handleDate(date) {
        this.setState({day: this.fullweek[date.getDay()]});
    }

    handleEndTime(time) {
        this.setState({endTime: time});
    }

    handleParticipants(person) {
        let newParticipants = this.state.participants;
        newParticipants.push(person);
        this.setState({participants: newParticipants});
        //this.setState({selectedPerson: null});
        console.log('handleParticipants added ' + person + ' to ' + this.state.participants);
    }

    handleStartTime(time) {
        this.setState({startTime: time});
    }

    handleTitle(e) {
        this.setState({title: e.target.value});
    }

    render() {
        return(
            <div className='add-meeting-container'>
                <h4>Create Meeting</h4>
                <div>
                    <TextField id="standard-basic" label="Title" onChange={this.handleTitle} />
                </div>
                <div className='date-picker-container'>
                    <DatePicker onChange={this.handleDate} value ={this.state.date} onChange={this.handleDate} />   
                </div>
                <div className="startTimePicker-container">
                    <TimePicker ampm={false} label='Start time:' onChange={this.handleStartTime} value={this.state.startTime} />  
                </div>
                <div className="endTimePicker-container">
                    <TimePicker ampm={false} label='End time:' onChange={this.handleEndTime} value={this.state.endTime} />  
                </div>
                <div>
                    <Autocomplete 
                        multiple 
                        limitTags={5}
                        options={this.state.availablePeople} 
                        renderInput={(params) => <TextField {...params} label="Choose Participants" />}
                        onChange={this.handleParticipants}
                    />
                </div>

                <div className="add-meeting-buttons">
                    <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            startIcon=""
                            //onClick={this.createMeeting}
                            title='Cancel'
                    >
                    Cancel
                    </Button>
                    <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            startIcon=""
                            onClick={this.createMeeting}
                            title='Create'
                    >
                    Create
                    </Button>
                </div>
            </div>
        );
    }
}

export default AddMeetingForm;