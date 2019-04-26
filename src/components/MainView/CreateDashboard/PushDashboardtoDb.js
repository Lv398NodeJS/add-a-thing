import db from '../../../fire';

export default (dashName, dashDescription, addDashboard) => {
  const dashboardsRef = db.database().ref('dashboards');
  const dashboard = {
    name: dashName,
    description: dashDescription,
  };
  addDashboard({ dashName, dashDescription });
  dashboardsRef.push(dashboard);
};
