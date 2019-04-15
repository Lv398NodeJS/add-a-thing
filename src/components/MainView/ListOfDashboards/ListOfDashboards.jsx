import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import DashboardPreview from './DashboardPreview/DashboardPreview';

class ListOfDashBoards extends Component {
  render() {
    const { dashboardArray, deleteDashboard, jumpToThisDash } = this.props;
    const updatedDashes = dashboardArray.map(dashboard => (
      <DashboardPreview
        key={dashboard.id}
        id={dashboard.id}
        name={dashboard.name}
        description={dashboard.description}
        jumpToThisDash={jumpToThisDash}
        deleteDashboard={deleteDashboard}
      />
    ));
    const styles = {
      display: 'flex',
      justifyContent: 'center',
    };
    return (
      <Container style={styles}>
        {updatedDashes}
      </Container>
    );
  }
}

export default ListOfDashBoards;
