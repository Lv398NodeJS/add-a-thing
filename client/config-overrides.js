const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@src': path.resolve(__dirname, 'src'),
    '@actions': path.resolve(__dirname, 'src/actions'),
    '@reducers': path.resolve(__dirname, 'src/reducers'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@Dashboard': path.resolve(__dirname, 'src/components/Dashboard'),
    '@TaskDetails': path.resolve(__dirname, 'src/components/Dashboard/TaskDetails'),
    '@MainView': path.resolve(__dirname, 'src/components/MainView'),
    '@Subtask': path.resolve(__dirname, 'src/components/Dashboard/Subtask'),
    '@assets': path.resolve(__dirname, 'src/components/assets'),
  }),
);
