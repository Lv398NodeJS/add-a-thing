import db from '../../../../../fire';

export const deleteLocallyAndRemotely = (
  id, deleteDashboard, dashboards,
) => {
  delete dashboards.id;
  deleteDashboard(dashboards);
  const dashboardRef = db.database().ref(`/dashboards/${id}`);
  dashboardRef.remove();
};
