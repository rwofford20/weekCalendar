import React from 'react';
import { mount, shallow } from 'enzyme';
import Calendar from './Calendar';

describe('Calendar', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calendar />));

    it ('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render 5 days', () => {
        expect(wrapper.find('Day').length).toEqual(5);
    });

    it('Each Day should have an ID corresponding to the day of the week', () => {
        const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        wrapper = mount(<Calendar />);
        const dayList = wrapper.children('div.calendar-container').at(0).children('Day');
        for (let ndx = 0; ndx < dayList.length; ndx++) {
            expect(dayList.at(ndx).key()).toEqual(weekdays[ndx]);
        }
    });

});