import React from 'react';
import { shallow } from 'enzyme';
import { SubtaskEditComponent } from '../Dashboard/Subtask/SubtaskItem/SubtaskEdit';

describe('SubtaskEdit component', () => {
  const subtaskActions = { editSubtaskText: jest.fn() };
  it('should render correctly and match the snapshot', () => {
    const subtaskEditComponent = shallow(
      <SubtaskEditComponent subtaskActions={subtaskActions} />,
    );
    expect(subtaskEditComponent).toMatchSnapshot();
  });


  it('should contain FormControl input with .new-subtask-name class name', () => {
    const subtaskEditComponent = shallow(
      <SubtaskEditComponent
        subtaskActions={subtaskActions}
      />,
    );
    expect(subtaskEditComponent.find('FormControl').hasClass('new-subtask-name')).toBeTruthy();
  });


  it('should contain FormControl input with placeholder "Enter subtask name here..."', () => {
    const subtaskEditComponent = shallow(
      <SubtaskEditComponent
        subtaskActions={subtaskActions}
      />,
    );
    expect(subtaskEditComponent.find('FormControl').prop('placeholder')).toBe('Enter subtask name here...');
  });

  it('should contain Button with .subtask-save-button class name', () => {
    const subtaskEditComponent = shallow(
      <SubtaskEditComponent
        subtaskActions={subtaskActions}
      />,
    );
    expect(subtaskEditComponent.find('Button').hasClass('subtask-save-button')).toBeTruthy();
  });

  it('should contain div with .valid-feedback class name', () => {
    const subtaskEditComponent = shallow(
      <SubtaskEditComponent
        subtaskActions={subtaskActions}
      />,
    );
    expect(subtaskEditComponent.find('.valid-feedback').length).toBe(1);
  });

  it('should contain div with .invalid-feedback class name', () => {
    const subtaskEditComponent = shallow(
      <SubtaskEditComponent
        subtaskActions={subtaskActions}
      />,
    );
    expect(subtaskEditComponent.find('.invalid-feedback').length).toBe(1);
  });
});
