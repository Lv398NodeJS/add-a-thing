import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewActions from '@actions/mainViewActions';
import DashboardPreview from './DashboardPreview/DashboardPreview';
import './ListOfDashboards.scss';

export class ListOfDashBoards extends Component {
  componentWillMount() {
    const { mainViewActions } = this.props;
    mainViewActions.fetchDashes();
  }

  render() {
    const { dashboards = [] } = this.props;
    const updatedDashes = dashboards.map(dashboard => (
      <DashboardPreview
        key={dashboard._id}
        id={dashboard._id}
        name={dashboard.name}
        description={dashboard.description}
      />
    ));
    return (
      <Container className="lod-container">
        {updatedDashes}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dashboards: state.mainViewReducer.dashboards,
});

const mapDispatchToProps = dispatch => ({
  mainViewActions: bindActionCreators(viewActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListOfDashBoards);
