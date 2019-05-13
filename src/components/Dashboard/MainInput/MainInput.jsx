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
import { addTaskWithHash, showPriorityColor, changePriority } from './utils';

export default class MainInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskVal: '',
      newPriority: 'Medium',
      hasHash: false,
      hasError: false,
    };
  }

  enterButtonPress = (button) => {
    const { newTaskVal, newPriority } = this.state;
    if (button.key !== 'Enter') return;
    this.sendNewTaskToParent(newTaskVal, newPriority);
  };

  clearInput = () => {
    this.setState({
      newTaskVal: '',
    });
  };

  setInputValue = (value = '') => {
    const { newPriority } = this.state;
    const inputDataArr = value;
    const hashCheck = inputDataArr[inputDataArr.length - 2];
    let setPriority = newPriority;
    if (hashCheck === '#') {
      const getPriority = inputDataArr[inputDataArr.length - 1];
      setPriority = changePriority(getPriority);
      this.setState({
        hasHash: true,
      });
    }
    this.setState({
      newTaskVal: inputDataArr,
      newPriority: setPriority,
      hasError: false,
    });
  };

  sendNewTaskToParent = (inputData, newPriority) => {
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
      addNewTask(addTaskWithHash(inputData), newPriority);
    } else {
      addNewTask(inputData.trim(), newPriority);
    }
    this.clearInput();
    this.setState({
      hasHash: false,
      hasError: false,
    });
  };

  handleSelect = (value) => {
    this.setState({
      newPriority: value,
    });
  }

  render() {
    const { newTaskVal, newPriority, hasError } = this.state;

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
            className={showPriorityColor(newPriority)}
            value={newPriority}
            onChange={event => this.handleSelect(event.target.value)}
          >
            <option value="High">H</option>
            <option value="Medium">M</option>
            <option value="Low">L</option>
          </Form.Control>
        </OverlayTrigger>
        <InputGroup.Append>
          <SpeechRecognition setText={this.setInputValue} />
          <Button variant="outline-primary" onClick={() => this.sendNewTaskToParent(newTaskVal, newPriority)}>
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
