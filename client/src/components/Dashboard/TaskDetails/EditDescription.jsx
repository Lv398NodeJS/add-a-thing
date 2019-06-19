import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import del from '../../assets/delete.svg';

export default class EditDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editDescription: props.editDescription,
    };
  }

  handleSaveDescription = () => {
    const { closeEditDescriptionField, saveDescription } = this.props;
    const { editDescription, taskDescription } = this.state;
    saveDescription(false, taskDescription, false, false);
    closeEditDescriptionField();
    this.setState({ editDescription: !editDescription });
  };

  closeDescription = () => {
    const { closeEditDescriptionField } = this.props;
    closeEditDescriptionField();
  };

  handleSave = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { description } = this.props;
    const { taskDescription } = this.state;
    return (
      <Container>
        <Form.Control
          name="taskDescription"
          as="textarea"
          placeholder="Description"
          defaultValue={description}
          value={taskDescription}
          onChange={this.handleSave}
        />
        <Button
          className="button-save-task-details"
          onClick={this.handleSaveDescription}
        >
          {'Save description'}
        </Button>
        <Button
          className="cancel-button"
          onClick={this.closeDescription}
        >
          <img src={del} alt="close" className="delete-icon" />
        </Button>
      </Container>
    );
  }
}
