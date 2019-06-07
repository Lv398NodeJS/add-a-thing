import React from 'react';
import { Container, Dropdown } from 'react-bootstrap';

export default class TaskPriority extends React.Component {
  handleChangePriority = (priorityName) => {
    const { changePriority } = this.props;
    changePriority(false, false, false, priorityName);
  };

  render() {
    const { priority } = this.props;
    const priorityColor = `dropdown-container dropdown-priority-container col ${priority}`;

    return (
      <Container>
        <Dropdown>
          <Dropdown.Toggle className={priorityColor} size="sm" id="dropdown-basic">
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
