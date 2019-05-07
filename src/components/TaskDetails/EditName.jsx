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
    saveName(this.taskName.value, false, false, false);
    closeEditNameField();
    this.setState({ editName: !editName });
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
          ref={(taskName) => {
            this.taskName = taskName;
          }}
        />
        <Button onClick={this.handleSaveName}>
          {'Save name'}
        </Button>
      </Container>
    );
  }
}
