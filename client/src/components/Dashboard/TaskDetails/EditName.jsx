import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import del from '../../assets/delete.svg';

export default class EditName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: props.editName,
    };
  }

  handleSaveName = () => {
    const { saveName, closeEditNameField } = this.props;
    const { editName, taskName } = this.state;
    if (taskName.trim() === '') {
      return;
    }
    saveName(taskName);
    closeEditNameField();
    this.setState({ editName: !editName });
  };

  closeName = () => {
    const { closeEditNameField } = this.props;
    closeEditNameField();
  };

  handleSave = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name } = this.props;
    return (
      <Container>
        <Form.Control
          name="taskName"
          type="text"
          placeholder="Name"
          defaultValue={name}
          maxLength={30}
          value={this.state.value}
          onChange={this.handleSave}
        />
        <Button
          className="button-save-task-details"
          onClick={this.handleSaveName}
        >
          {'Save name'}
        </Button>
        <Button
          className="cancel-button"
          onClick={this.closeName}
        >
          <img src={del} alt="close" className="delete-icon" />
        </Button>
      </Container>
    );
  }
}
