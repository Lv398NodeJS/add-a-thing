export default (dashName, dashDescription, addDashboard) => {
  const dashboard = {
    name: dashName,
    description: dashDescription,
  };
  addDashboard(dashboard);
};
