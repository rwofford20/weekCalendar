import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import Button from '../Button/Button';

describe('Header', () => {
    let wrapper; 
    beforeEach(() => wrapper = shallow(<Header />));

    it('it should render a div with the class header-container', () => {
        expect(wrapper.find('div.header-container').length).toEqual(1);
    });

    it('should display a title in the div with class header-title-container', () => {
        const title = "Meeting Maker";
        wrapper.setProps({title: title});
        const titleContainer = wrapper.children('div.header-title-container').first();
        expect(titleContainer.text()).toEqual(title);
    });

    it('should have a button to add meetings', () => {
        const buttonContainer = wrapper.children('div.header-add-meeting-button-container').first();
        expect(buttonContainer.children('Button')).toHaveLength(1);
    });

    it('has an add meeting button which calls displayMeetingCreator', () => {
        const spy = jest.spyOn(Header.prototype, 'displayMeetingCreator');
        const component = mount(<Header />);
        const addMeetingButton = component.find('Button').first();
        
        // Clickity clickity
        addMeetingButton.simulate('click');
        // verify that it gets called
        expect(spy).toHaveBeenCalledTimes(1);

    });

    it('should have a menu', () => {

    });

    it('should have a date picker', () => {

    });

    it('should have a group picker', () => {

    });
});
