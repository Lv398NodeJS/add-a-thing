import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class ChatMessage extends Component {
  render() {
    const { text, date } = this.props;
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
        {text}
        <b className="d-block">{userName}</b>
      </Alert>
    );
  }
}

export default ChatMessage;
