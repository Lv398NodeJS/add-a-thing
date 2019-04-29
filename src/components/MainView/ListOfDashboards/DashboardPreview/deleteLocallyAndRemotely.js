import db from '../../../../fire';

export default (id, deleteDashboard) => {
  deleteDashboard({ id });
  const dashboardRef = db.database().ref(`/dashboards/${id}`);
  dashboardRef.remove();
};
