import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default class EditName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: props.editName,
    };
  }

  handleSaveName = () => {
    const { saveName, closeEditNameField } = this.props;
    const { editName } = this.state;
    if (this.taskName.value.trim() === '') return;
    saveName(this.taskName.value, false, false, false);
    closeEditNameField();
    this.setState({ editName: !editName });
  };

  closeName = () => {
    const { closeEditNameField } = this.props;
    closeEditNameField();
  };

  render() {
    const { name } = this.props;
    return (
      <Container>
        <Form.Label htmlFor="taskName">Name: </Form.Label>
        <Form.Control
          name="taskName"
          type="text"
          placeholder="Name"
          defaultValue={name}
          maxLength={30}
          ref={(taskName) => {
            this.taskName = taskName;
          }}
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
          {'╳'}
        </Button>
      </Container>
    );
  }
}
