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

export default class MainInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskVal: '',
      newPriority: 'Medium',
      hasHash: false,
      error: false,
    };
  }

  showPriorityColor = () => {
    const { newPriority } = this.state;
    let style = '';
    switch (newPriority) {
      case 'High':
        style += 'priorityH';
        break;
      case 'Medium':
        style += 'priorityM';
        break;
      case 'Low':
        style += 'priorityL';
        break;
      default:
        break;
    }
    return style;
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

  setInputValue = (value) => {
    const { newPriority } = this.state;
    const inputDataArr = value.split('');
    const hashCheck = inputDataArr[inputDataArr.length - 2];
    let setPriority = newPriority;
    if (hashCheck === '#') {
      const getPriority = inputDataArr[inputDataArr.length - 1];
      if (getPriority === '1') {
        setPriority = 'High';
      } else if (getPriority === '3') {
        setPriority = 'Low';
      } else {
        setPriority = 'Medium';
      }
      this.setState({
        hasHash: true,
      });
    }
    this.setState({
      newTaskVal: inputDataArr.join(''),
      newPriority: setPriority,
    });
  };

  sendNewTaskToParent = (inputData, newPriority) => {
    const { addNewTask } = this.props;
    const { hasHash } = this.state;
    if (!inputData.trim().length) {
      this.setState({
        error: true,
      });
      return;
    }
    if (hasHash) {
      addNewTask(inputData.split('').slice(0, inputData.length - 2).join('').trim(), newPriority);
    } else {
      addNewTask(inputData.trim(), newPriority);
    }
    this.clearInput();
    this.setState({
      hasHash: false,
      error: false,
    });
  };

  handleSelect = (value) => {
    this.setState({
      newPriority: value,
    });
  }

  render() {
    const { newTaskVal, newPriority, error } = this.state;
    const returnError = error ? 'error' : '';

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
            placeholder="Type task name"
            aria-label="Type task name"
            aria-describedby="basic-addon2"
            size="lg"
            maxLength="100"
            onChange={event => this.setInputValue(event.target.value)}
            onKeyPress={this.enterButtonPress}
            className={returnError}
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
            className={this.showPriorityColor()}
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
