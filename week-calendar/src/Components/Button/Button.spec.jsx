import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import './Button.css';

describe('Button', () => {
    let wrapper; 
    beforeEach(() => wrapper = shallow(<Button onClick={() => {}}/>));

    it('it should render a div with the class button-container', () => {
        expect(wrapper.find('div.button-container').length).toEqual(1);
    });

    it('it should execute the props.onClick function when clicked', () => {
        const mockFunction = jest.fn();
        wrapper.setProps({onClick: mockFunction});
        wrapper.simulate('click');
        expect(mockFunction.mock.calls.length).toEqual(1);
    });

    it('it should display the text that is passed in', () => {
        const title = "Push Button";
        wrapper.setProps({title: title});
        const buttonTitleContainer = wrapper.children('div.button-title-container').first();
        expect(buttonTitleContainer.text()).toEqual(title);
    })
});