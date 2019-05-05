import React, { Container } from 'react';
import { shallow } from 'enzyme';
import TaskItem from './TaskItem';


describe('TaskItem displays correctly', () => {
  it('should render task name', () => {
    const wrapper = shallow(<TaskItem />);
    const taskName = wrapper.find(<Container id={10} />);
    expect(taskName).to.be.equal(3);
  });
});
