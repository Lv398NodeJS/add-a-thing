export default (dashName, dashDescription, addDashboard, userId) => {
  const dashboard = {
    name: dashName,
    description: dashDescription,
    userId: userId,
  };
  addDashboard(dashboard);
};
