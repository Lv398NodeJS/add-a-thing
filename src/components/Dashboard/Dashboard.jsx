import React, { Component } from 'react';
import '../../App.scss';
import NavBar from './Header/Header';
import ColumnsContainer from './ColumnsContainer/ColumnsContainer';

export default class Dashboard extends Component {
  render() {
    const { id } = this.props;
    console.log(this.props);
    return (
      <div>
        <NavBar />
        <ColumnsContainer
          id={id}
        />
      </div>
    );
  }
}

// updateTaskList = (updatedTask) => {
//   this.setState(prevState => (
//     prevState.map(task => ({
//       if (task.id === updatedTask.id) {
//         return updatedTask;
//       } return task
//     )}
//   )
// };
//
