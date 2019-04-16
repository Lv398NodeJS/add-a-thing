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
  }

  enterButtonPress = (button) => {
    const { newTaskVal } = this.state;
    if (button.key !== 'Enter') return;
    this.sendNewTaskToParent(newTaskVal);
  }

  clearInput = () => {
    this.setState({
      newTaskVal: '',
    });
  }

  updateInputValue = (val) => {
    this.setState({
      newTaskVal: val.target.value,
    });
  }

  sendNewTaskToParent = (inputData) => {
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
              onKeyPress={this.enterButtonPress}
              value={newTaskVal}
            />
            <InputGroup.Append>
              <Button variant="outline-primary" onClick={() => this.sendNewTaskToParent(newTaskVal)}>+</Button>
              <Button variant="outline-danger" onClick={this.clearInput}>X</Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
      </Container>
    );
  }
}
