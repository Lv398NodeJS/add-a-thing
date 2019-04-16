import React from 'react';
import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Container,
} from 'react-bootstrap';
import SpeechRecognition from "../SpeechRecognition/SpeechRecognition";

export default class MainInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskVal: '',
    };
    this.setInputValue = this.setInputValue.bind(this);
    this.sendNewTaskToParent = this.sendNewTaskToParent.bind(this);
  }
  
  setInputValue(value) {
    this.setState({
      newTaskVal: value,
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
              onChange={event => this.setInputValue(event.target.value)}
              value={newTaskVal}
            />
            <InputGroup.Append>
              <SpeechRecognition onResultReady={this.setInputValue}/>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button variant="outline-primary" onClick={() => this.sendNewTaskToParent(newTaskVal)}>+</Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
      </Container>
    );
  }
}
