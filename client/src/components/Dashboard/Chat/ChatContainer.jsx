import React, { Component, createRef } from 'react';
import {
  Button, Alert,
  Container, FormControl, InputGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from '../../../actions/chatActions';
import { sendMessage } from '../../../socket';
import './Chat.scss';
import { ReactComponent as SendIcon } from './icons/send.svg';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    const { chatActions: { setChatVisibility } } = this.props;
    this.textInputRef = createRef();
    this.messagesEndRef = createRef();

    setChatVisibility(false);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const end = this.messagesEndRef.current;
    end.scrollIntoView({ behavior: 'smooth' });
  };

  hideChat = () => {
    const { chatActions: { setChatVisibility } } = this.props;
    setChatVisibility(false);
  };

  sendOnEnter = (event) => {
    if (event.key !== 'Enter') return;

    this.send();
  };

  send = () => {
    const input = this.textInputRef.current;
    const message = input.value.trim();
    sendMessage(message);
    input.value = '';
  };

  render() {
    const { visible, messages } = this.props;
    const messagesForRender = messages.map(message => (
      <Alert variant="secondary" className="p-1" key={message._id}>
        <small className="float-right font-italic text-black-50">
          {new Date(message.date).toLocaleString()}
        </small>
        {message.text}
      </Alert>
    ));

    return (
      <div>
        <div
          onClick={this.hideChat}
          className={['chat__container-backdrop', visible ? 'show' : 'hide'].join(' ')}
        />
        <Container
          fluid
          className={['chat__container', 'p-3', visible ? 'show' : 'hide'].join(' ')}
        >
          <div className="chat__header">
            <h4>Chat</h4>
          </div>
          <div className="chat__messages">
            {messagesForRender}
            <div ref={this.messagesEndRef} />
          </div>
          <div className="chat__input">
            <InputGroup>
              <FormControl
                onKeyPress={this.sendOnEnter}
                ref={this.textInputRef}
              />
              <InputGroup.Append>
                <Button variant="outline-primary" className="py-0" onClick={this.send}>
                  <SendIcon className="icon" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  ...chatReducer,
});
const mapDispatchToProps = dispatch => ({
  chatActions: bindActionCreators(chatActions, dispatch),
});

export { ChatContainer as ChatContainerComponent };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainer);
