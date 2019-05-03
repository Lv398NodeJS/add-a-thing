export default (percent) => {
  switch (true) {
    case percent === 100:
      return 'success';
    case percent > 50:
      return 'info';
    case percent > 30:
      return 'warning';
    default:
      return 'secondary';
  }
};
