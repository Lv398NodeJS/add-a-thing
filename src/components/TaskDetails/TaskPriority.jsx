import React from 'react';
import { Container, Dropdown } from 'react-bootstrap';

export default class TaskPriority extends React.Component {
  handleChangePriority = (priorityName) => {
    const { changePriority } = this.props;
    changePriority(false, false, false, priorityName);
  };

  render() {
    const { priority } = this.props;
    switch (priority) {
      case 'High':
        this.priorityColor = '#ff666b';
        break;

      case 'Medium':
        this.priorityColor = '#9effbd';
        break;

      case 'Low':
        this.priorityColor = '#fff98b';
        break;

      default:
        this.priorityColor = '#9fa1a3';
        break;
    }
    return (
      <Container>
        <Dropdown>
          <Dropdown.Toggle className="dropdownPriorityContainer col" size="sm" id="dropdown-basic" style={{ backgroundColor: this.priorityColor }}>
            {priority || 'Choose priority'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { this.handleChangePriority('High'); }}>
              {'High'}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => { this.handleChangePriority('Medium'); }}>
              {'Medium'}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => { this.handleChangePriority('Low'); }}>
              {'Low'}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  }
}
