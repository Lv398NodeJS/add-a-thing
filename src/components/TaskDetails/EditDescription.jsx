import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

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
        <Button onClick={this.handleSaveDescription}>
          {'Save description'}
        </Button>
      </Container>
    );
  }
}
