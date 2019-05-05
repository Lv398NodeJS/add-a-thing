import React from 'react';
import { Container, Dropdown } from 'react-bootstrap';

export default class TaskStatus extends React.Component {
  handleChangeStatus = (statusName) => {
    const { changeStatus } = this.props;
    changeStatus(false, false, statusName, false);
  };

  render() {
    const { status } = this.props;
    return (
      <Container>
        <Dropdown>
          <Dropdown.Toggle className="dropdownContainer col" size="sm" variant="primary" id="dropdown-basic">
            {status}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { this.handleChangeStatus('To Do'); }}>
              {'To Do'}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => { this.handleChangeStatus('In Progress'); }}>
              {'In Progress'}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => { this.handleChangeStatus('Done'); }}>
              {'Done'}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  }
}
