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
    }

    handleDate(date) {
        this.setState({date: date});
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

    handleTitle(title) {
        this.setState({title: title.text});
    }
    

    render() {
        return(
            <div className='add-meeting-container'>
                <div>
                    <TextField id="standard-basic" label="Title" onChange={this.handleTitle} value={this.state.title} />
                </div>
                <div className='date-picker-container'>
                    <DatePicker onChange={this.handleDate} value ={this.state.date} />   
                </div>
                <div className="startTimePicker-container">
                    <TimePicker label='Start time:' onChange={this.handleStartTime} value={this.state.startTime} />  
                </div>
                <div className="endTimePicker-container">
                    <TimePicker label='End time:' onChange={this.handleEndTime} value={this.state.endTime} />  
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
                    <Button>Cancel</Button>
                    <Button>Create</Button>
                </div>
            </div>
        );
    }
}

export default AddMeetingForm;