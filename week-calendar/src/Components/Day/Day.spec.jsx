import React from 'react';
import { shallow } from 'enzyme';
import Day from './Day';
import TimeBlock from '../TimeBlock/TimeBlock';

describe('Day', () => {
    let wrapper; 

    beforeEach(() => wrapper = shallow(<Day />));

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    //Not necessary, passing in more than just a date value
    /*it('should render the date value', () => {
        wrapper.setProps({ numericDay: '32'});
        expect(wrapper.text()).toEqual('32');
    });*/
    
    it('should render 12 time blocks', () => {
        expect(wrapper.find('TimeBlock').length).toEqual(12);
    });

    it('should render the first time block with start time of 0800 - 0900 when no parameters are passed', () => {
        const timeBlocks = wrapper.find('div.day-container').children('TimeBlock');
        expect(timeBlocks.length).toEqual(12);
        expect(wrapper.find('div.day-container').children('TimeBlock').length).toEqual(12);
        //expect(firstTimeBlock.children('div.timeblock-container').length).toEqual(1);
        //const timeBlockTimes = firstTimeBlock.find('.timeblock-time-container');
        //expect(timeBlockTimes.text()).toEqual('0800 - 0900');
    });

});