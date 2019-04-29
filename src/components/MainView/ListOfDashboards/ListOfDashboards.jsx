import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import DashboardPreview from './DashboardPreview/DashboardPreview';
import './ListOfDashboards.scss';

class ListOfDashBoards extends Component {
  render() {
    const { dashboardArray = [], deleteDashboard } = this.props;
    const updatedDashes = dashboardArray.map(dashboard => (
      <DashboardPreview
        key={dashboard.id}
        id={dashboard.id}
        name={dashboard.name}
        description={dashboard.description}
        deleteDashboard={deleteDashboard}
      />
    ));
    return (
      <Container className="lod-container">
        {updatedDashes}
      </Container>
    );
  }
}

export default ListOfDashBoards;
