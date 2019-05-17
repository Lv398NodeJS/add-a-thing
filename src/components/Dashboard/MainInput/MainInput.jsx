import React from 'react';
import {
  InputGroup,
  Button,
  FormControl,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import add from '../../assets/add.svg';
import crossicon from '../../assets/crossicon.svg';
import './MainInput.scss';
import SpeechRecognition from '../SpeechRecognition/SpeechRecognition';
import { addTaskWithHash, showPriorityColor, getPriority } from './utils';

export default class MainInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskVal: '',
      priority: 'Medium',
      hasHash: false,
      hasError: false,
    };
  }

  enterButtonPress = (button) => {
    const { newTaskVal, priority } = this.state;
    if (button.key !== 'Enter') return;
    this.sendNewTaskToParent(newTaskVal, priority);
  };

  clearInput = () => {
    this.setState({
      newTaskVal: '',
    });
  };

  setInputValue = (value = '') => {
    const hashCheck = value[value.length - 2];
    if (hashCheck === '#') {
      const enteredPriority = value[value.length - 1];
      this.setState({
        hasHash: true,
        priority: getPriority(enteredPriority),
      });
    }
    this.setState({
      newTaskVal: value,
      hasError: false,
    });
  };

  sendNewTaskToParent = (inputData, priority) => {
    const { addNewTask } = this.props;
    const { hasHash } = this.state;
    if (!inputData.trim().length) {
      this.setState({
        hasError: true,
      });
      this.clearInput();
      return;
    }
    if (hasHash && inputData.trim().length > 1) {
      addNewTask(addTaskWithHash(inputData), priority);
    } else {
      addNewTask(inputData.trim(), priority);
    }
    this.clearInput();
    this.setState({
      hasHash: false,
      hasError: false,
    });
  };

  handleSelect = (value) => {
    this.setState({
      priority: value,
    });
  }

  render() {
    const { newTaskVal, priority, hasError } = this.state;

    return (
      <InputGroup className="mb-3 mt-3 main-input">
        <OverlayTrigger
          placement="bottom-start"
          trigger="focus"
          overlay={(
            <Tooltip className="gray-tooltip">Add #num in the end to set priority 1 High, 2 Medium, 3 Low</Tooltip>
          )}
        >
          <FormControl
            placeholder={hasError ? 'This field cannot be empty!' : 'Type task name'}
            aria-label="Type task name"
            aria-describedby="basic-addon2"
            size="lg"
            maxLength="100"
            onChange={event => this.setInputValue(event.target.value)}
            onKeyPress={this.enterButtonPress}
            className={hasError ? 'error' : ''}
            value={newTaskVal}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={(
            <Tooltip>Click to set priority.</Tooltip>
          )}
        >
          <Form.Control
            as="select"
            size="lg"
            className={showPriorityColor(priority)}
            value={priority}
            onChange={event => this.handleSelect(event.target.value)}
          >
            <option value="High">H</option>
            <option value="Medium">M</option>
            <option value="Low">L</option>
          </Form.Control>
        </OverlayTrigger>
        <InputGroup.Append>
          <SpeechRecognition setText={this.setInputValue} />
          <Button variant="outline-primary" onClick={() => this.sendNewTaskToParent(newTaskVal, priority)}>
            <img src={add} alt={add} className="inputicon" />
          </Button>
          <Button variant="outline-danger" onClick={this.clearInput}>
            <img src={crossicon} alt={crossicon} className="inputicon" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
