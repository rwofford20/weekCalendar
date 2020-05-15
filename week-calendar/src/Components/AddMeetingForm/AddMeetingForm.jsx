import {React, Component} from 'react';
import DatePicker from '@material-ui/pickers/DatePicker';
import TimePicker from '@material-ui/pickers/TimePicker';
import {Button} from '@material-ui/core/Button';
import './AddMeetingForm.css';

//TimeBlocks are the individual meeting block components in days
//TimeBlocks are rendered within the day components in Calendar.jsx
//In an empty day, there should be 12 default TimeBlocks
//Additional TimeBocks are created based on data passed in from the backend
class AddMeetingForm extends Component {
    
    render() {
        return(
        <div className='add-meeting-container'>
            <div className='date-picker-container'>
                <DatePicker></DatePicker>
            </div>
            <div className="startTimePicker-container">
                <TimePicker></TimePicker>
            </div>
            <div className="endTimePicker-container">
                <TimePicker></TimePicker>
            </div>
            <div className="add-meeting-buttons">
                
            </div>


        </div>
        );
    }

}
export default AddMeetingForm;