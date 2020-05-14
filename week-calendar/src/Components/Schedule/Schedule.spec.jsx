import React from 'react';
import { shallow, mount } from 'enzyme';
import Schedule from './Schedule';
import Calendar from '../Calendar/Calendar';
import SecondaryDisplay from '../SecondaryDisplay/SecondaryDisplay';
import Header from '../Header/Header';

//function to convert integer time values to string and add a leading zero to the string if necessary


describe('Schedule', () => {
    let wrapper; 
    beforeEach(() => wrapper = shallow(<Schedule />));

    it('it should render a div with the class schedule-container', () => {
        expect(wrapper.find('div.schedule-container').length).toEqual(1);
    });

    it('should render a Calendar', () => {
        let container = wrapper.find('div.schedule-container').first();
        expect(container.children('Calendar').length).toEqual(1);

    });

    it('should render a Header', () => {
        let container = wrapper.find('div.schedule-container').first();
        expect(container.children('Header').length).toEqual(1);

    });

    it('should render a SecondaryDisplay', () => {
        let container = wrapper.find('div.schedule-container').first();
        expect(container.children('SecondaryDisplay').length).toEqual(1);

    });
});
