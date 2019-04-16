import React from 'react';
import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Container,
} from 'react-bootstrap';

export default class MainInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskVal: '',
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.sendNewTaskToParent = this.sendNewTaskToParent.bind(this);
  }

  updateInputValue(val) {
    this.setState({
      newTaskVal: val.target.value,
    });
  }

  sendNewTaskToParent(inputData) {
    const { addNewTask } = this.props;
    addNewTask(inputData);
    this.setState({
      newTaskVal: '',
    });
  }

  render() {
    const { newTaskVal } = this.state;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <InputGroup className="mb-3 mt-3 col-10">
            <FormControl
              placeholder="Type task name"
              aria-label="Type task name"
              aria-describedby="basic-addon2"
              onChange={val => this.updateInputValue(val)}
              value={newTaskVal}
            />
            <InputGroup.Append>
              <Button variant="outline-primary" onClick={() => this.sendNewTaskToParent(newTaskVal)}>+</Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
      </Container>
    );
  }
}
