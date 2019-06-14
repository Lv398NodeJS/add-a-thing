import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import Linkify from 'linkifyjs/react';

class ChatMessage extends Component {
  render() {
    const { text, date, userName } = this.props;
    const dateText = new Date(date)
      .toISOString()
      .replace('T', ' ')
      .replace(/:\d{2}\.\d{3}Z/, '');

    return (
      <Alert variant="secondary" className="p-1">
        <small className="float-right font-italic text-black-50">
          {dateText}
        </small>
        <b className="d-block">{userName}</b>
        <Linkify>
          {text}
        </Linkify>
      </Alert>
    );
  }
}

export default ChatMessage;
