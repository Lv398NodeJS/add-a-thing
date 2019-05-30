const path = require('path');

module.exports = {
  extensions: ['*', '.js', '.jsx'],
  resolve: {
    Actions: path.resolve(__dirname, '../src/actions/'),
  },
};
