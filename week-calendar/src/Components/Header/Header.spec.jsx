import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';

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
        const titleContainer = wrapper.children('div.header-title-container').first();
        expect(titleContainer.children('Button').length).toEqual(1);
    });

    it('should have a menu', () => {

    });

    it('should have a date picker', () => {

    });

    it('should have a group picker', () => {

    });
});
