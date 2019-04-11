import React, { Component } from 'react';
import Dashboard from './Dashboard/Dashboard';

export default class ListOfDashBoards extends Component {
  render() {
    const { dashes } = this.props;
    const updatedDashes = dashes.map(dashboard => (
      <Dashboard name={dashboard.dashName} description={dashboard.dashDescription} />
    ));
    return (
      <div>
        {updatedDashes}
      </div>
    );
  }
}