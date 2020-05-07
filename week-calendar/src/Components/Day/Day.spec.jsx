import React from 'react';
import { shallow, mount } from 'enzyme';
import Day from './Day';
import TimeBlock from '../TimeBlock/TimeBlock';

//function to convert integer time values to string and add a leading zero to the string if necessary
function convertIntToTimeString(intHour) {
    let strHour = intHour.toString() + '00';
    if (intHour < 10) {
        strHour = '0' + strHour;
    }
    return strHour;
}

describe('Day', () => {
    let wrapper; 

    beforeEach(() => wrapper = shallow(<Day />));

    //Snapshot test
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    //Test to determine if Day.jsx renders 1 div
    it('should render a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    //Not necessary, passing in more than just a date value - early test
    /*it('should render the date value', () => {
        wrapper.setProps({ numericDay: '32'});
        expect(wrapper.text()).toEqual('32');
    });*/

    //Test to determine if 12 default TimeBlocks are rendered when no parameters are passed in from the backend
    it('should render sequential time blocks when no parameters are passed', () => {
        wrapper = mount(<Day />);
        //Drill into the TimeBlock children of Day
        const timeBlocks = wrapper.children('div.day-container').at(0).children('TimeBlock');
        //expect(timeBlocks.length).toEqual(12)
        let timeBlock, startTime, endTime, timeRange, theoreticalTimeRange;
        //Compare the timeRange contained in timeblock-time-container to the theoretical start time
        //The theoretical start time is based on the start and end times calculated from ndx
        for (let ndx = 0; ndx < timeBlocks.length; ndx++) {
            timeBlock = timeBlocks.at(ndx);
            timeRange = timeBlock.find('div.timeblock-time-container').text();
            startTime = convertIntToTimeString(ndx + 8);
            endTime = convertIntToTimeString(ndx + 9);
            theoreticalTimeRange = startTime + ' - ' + endTime;
            expect(timeRange).toEqual(theoreticalTimeRange);
        }
    
    });

    //Test to determine whether the ID of a TimeBlock was set correctly 
    it('should have an ID equal to the index', () => {
        wrapper = mount(<Day />);
        //Drill into the TimeBlock children of Day
        const timeBlockList = wrapper.children('div.day-container').at(0).children('TimeBlock');
        //Compares the key of each TimeBlock at ndx to ndx
        for (let ndx =0; ndx < timeBlockList.length; ndx++) {
            expect(timeBlockList.at(ndx).key()).toEqual(ndx.toString());
        };
        //timeBlockList.forEach((node) => {
            //expect(node.key()).toEqual(node.prop('key'));
            //expect(node.key()).toEqual('0800');
        //});
    });
});