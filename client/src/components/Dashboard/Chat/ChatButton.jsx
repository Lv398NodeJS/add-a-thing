import React, { Component } from 'react';
import {
  Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from '../../../actions/chatActions';
import './Chat.scss';
import { ReactComponent as MessageIcon } from './icons/message.svg';

class ChatButton extends Component {
  showChat = () => {
    const { chatActions: { setChatVisibility } } = this.props;
    setChatVisibility(true);
  };

  render() {
    return (
      <Button size="sm" variant="none" className="text-white p-0" onClick={this.showChat}>
        <MessageIcon className="icon" fill="#ffffff" />
      </Button>
    );
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  ...chatReducer,
});
const mapDispatchToProps = dispatch => ({
  chatActions: bindActionCreators(chatActions, dispatch),
});

export { ChatButton as ChatButtonComponent };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatButton);
