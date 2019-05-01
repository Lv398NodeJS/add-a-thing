import db from '../../fire';

export default () => {
  const newDashArray = [];
  const dashboardsRef = db.database().ref('dashboards');
  dashboardsRef.on('value', (snapshot) => {
    const dashboardsSnap = snapshot.val();
    Object.keys(dashboardsSnap).forEach(dash => (
      newDashArray.push({
        id: dash,
        name: dashboardsSnap[dash].name,
        description: dashboardsSnap[dash].description,
        key: dash,
      })));
  });
  return newDashArray;
};
