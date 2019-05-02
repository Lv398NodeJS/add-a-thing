const arrayFromObj = (dashboards) => {
  const newDashArray = [];
  Object.keys(dashboards).forEach(dash => (
    newDashArray.push({
      id: dash,
      name: dashboards[dash].name,
      description: dashboards[dash].description,
      key: dash,
    })));
  return newDashArray;
};

export default arrayFromObj;
