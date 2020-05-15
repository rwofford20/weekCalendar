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

    it('has an add meeting button which calls displayMeetingCreator', () => {
        const spy = jest.spyOn(Schedule.prototype, 'updateSecondaryDisplay');
        const component = mount(<Schedule />);
        //Find the button in Header
        const addMeetingButton = component.find('Header').find('div.header-add-meeting-button-container')
            .find('Button').first();
        
        // Clickity clickity
        addMeetingButton.simulate('click');
        // verify that it gets called
        expect(spy).toHaveBeenCalledTimes(1);

    });

    it('should output the text Add Meeting when the add meeting button is clicked', () => {
        let wrapper = mount(<Schedule />);

        //Find the button in Header
        const addMeetingButton = wrapper.find('Header').find('div.header-add-meeting-button-container')
        .find('Button').first();
        
        // Clickity clickity
        addMeetingButton.simulate('click');

        let secondaryDisplayContainer = wrapper.find('SecondaryDisplay').find('div.secondary-display-container');

        expect(secondaryDisplayContainer.text()).toEqual('Add Meeting');

    })
});
