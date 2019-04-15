import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import DashboardPreview from './DashboardPreview/DashboardPreview';

class ListOfDashBoards extends Component {
  constructor() {
    super();
    this.deleteDashboard = this.deleteDashboard.bind(this);
    this.jumpToThisDash = this.jumpToThisDash.bind(this);
  }

  deleteDashboard = (data) => {
    const { deleteDashboard } = this.props;
    deleteDashboard(data);
  }

  jumpToThisDash(data) {
    const { jumpToThisDash } = this.props;
    jumpToThisDash(data);
  }

  render() {
    const { dashboardArray } = this.props;
    const updatedDashes = dashboardArray.map(dashboard => (
      <DashboardPreview
        key={dashboard.id}
        id={dashboard.id}
        name={dashboard.name}
        description={dashboard.description}
        jumpToThisDash={this.jumpToThisDash}
        deleteDashboard={this.deleteDashboard}
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
