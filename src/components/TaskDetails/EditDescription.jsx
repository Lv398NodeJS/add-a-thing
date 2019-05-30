import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import del from "../assets/delete.svg";

export default class EditDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editDescription: props.editDescription,
    };
  }

  handleSaveDescription = () => {
    const { closeEditDescriptionField, saveDescription } = this.props;
    const { editDescription } = this.state;
    saveDescription(false, this.taskDescription.value, false, false);
    closeEditDescriptionField();
    this.setState({ editDescription: !editDescription });
  };

  closeDescription = () => {
    const { closeEditDescriptionField } = this.props;
    closeEditDescriptionField();
  };

  render() {
    const { description } = this.props;
    return (
      <Container>
        <Form.Label htmlFor="taskDescription">Description: </Form.Label>
        <Form.Control
          name="taskDescription"
          as="textarea"
          placeholder="Description"
          defaultValue={description}
          ref={(taskDescription) => {
            this.taskDescription = taskDescription;
          }}
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
