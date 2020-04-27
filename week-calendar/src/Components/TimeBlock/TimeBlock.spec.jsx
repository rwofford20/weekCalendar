import React from 'react';
import {shallow } from 'enzyme';
import TimeBlock from './TimeBlock';

describe('TimeBlock', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<TimeBlock />));

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('it should render a div with the class timeblock-container', () => {
        expect(wrapper.find('div.timeblock-container').length).toEqual(1);
    });

    it('it should render a title', () => {
        wrapper.setProps({ title: 'Sample'});
        expect(wrapper.text()).toEqual('Sample');
    });

    it('it should render a start time', () => {
        wrapper.setProps({ startTime: '900'});
        expect(wrapper.text()).toEqual('900');
    });

    it('it should render an end time', () => {
        wrapper.setProps({ endTime: '1000'});
        expect(wrapper.text()).toEqual('1000');
    });

    it('should render the meeting title in the first child div', () => {
        wrapper.setProps({title: 'Meet with Malcolm Reynolds', startTime: 1245, endTime: 1345});
        expect(wrapper.find('div.timeblock-container').children('.timeblock-title-container').at(0).text()).toEqual(
            "Meet with Malcolm Reynolds");
    });
});