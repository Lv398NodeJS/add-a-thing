import React, { Component, createRef } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatMessage from './ChatMessage';
import * as chatActions from '../../../actions/chatActions';
import { sendMessage } from '../../../socket';
import { ReactComponent as SendIcon } from './icons/send.svg';
import { ReactComponent as CrossIcon } from '../../assets/delete.svg';
import './Chat.scss';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    const { setChatVisibility } = this.props;
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
    const { setChatVisibility } = this.props;
    setChatVisibility(false);
  };

  sendOnEnter = (event) => {
    if (event.key !== 'Enter') return;

    this.send();
  };

  send = () => {
    const { userData } = this.props;
    const input = this.textInputRef.current;
    const message = input.value.trim();
    sendMessage(message, userData.name);
    input.value = '';
  };

  render() {
    const { visible, messages } = this.props;
    const messagesForRender = messages.map(({ _id, ...message }) => (
      <ChatMessage key={_id} {...message} />
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
            <Button
              className="float-right p-0"
              size="sm"
              variant=""
              onClick={this.hideChat}
            >
              <CrossIcon className="icon" fill="#000000" />
            </Button>
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

const mapStateToProps = ({ chatReducer, loginationReducer }) => ({
  ...chatReducer,
  ...loginationReducer,
});
const mapDispatchToProps = dispatch => bindActionCreators(chatActions, dispatch);

export { ChatContainer as ChatContainerComponent };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainer);
