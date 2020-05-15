import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
//import PropTypes from 'prop-types';
//import TimeBlock from '../TimeBlock/TimeBlock';
//import equal from 'fast-deep-equal';
import './Day.css';

//Each Day component contains the TimeBlocks relevant to that Day
class Day extends Component{ 
    // constructor(props) {
    //     super(props);
    //     //this.state = {timeBlocks: generateTimeBlocks(800, 2000)};    
    // };
    
    //Returns the props of each TimeBlock associated with a Day
    render = () => {
        return(
            <div className='day-container'>
                <Grid container spacing={3}>
                    {this.props.timeBlocks}
                </Grid>
         </div>
    )};
};

export default Day;