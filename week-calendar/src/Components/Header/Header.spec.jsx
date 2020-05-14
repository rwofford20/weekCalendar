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

    it('\'s add meeting button calls displayMeetingCreator', () => {
        wrapper = mount(<Header />);
        const spy = jest.spyOn(Header, 'displayMeetingCreator');
        // Pass displayMeetingCreator to our button
        const addMeetingButton = wrapper.find('div.header-add-meeting-button-container').children('Button').first();
        // verify that it gets called
        addMeetingButton.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);

    });

    it('should have a menu', () => {

    });

    it('should have a date picker', () => {

    });

    it('should have a group picker', () => {

    });
});
