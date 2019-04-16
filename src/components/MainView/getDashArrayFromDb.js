export default (snapVal) => {
  const newDashArray = [];
  Object.keys(snapVal).forEach(dash => (
    newDashArray.push({
      id: dash,
      name: snapVal[dash].name,
      description: snapVal[dash].description,
      key: dash,
    })));

  return newDashArray;
};
