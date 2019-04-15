// import React from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
//
// export default class SaveMode extends React.Component {
//   constructor(...args) {
//     super(...args);
//     this.state = {
//       editMode: false,
//     };
//     this.closeTaskDetails = this.closeTaskDetails.bind(this);
//     this.handleSaveTaskDetails = this.handleSaveTaskDetails.bind(this);
//     this.handleEditTaskDetails = this.handleEditTaskDetails.bind(this);
//   }
//
//   render() {
//     const stylesForSubTask = {
//       width: '100%',
//       height: 100,
//       backgroundColor: 'gray',
//       borderRadius: 2,
//     };
//     const stylesForDescription = {
//       width: '100%',
//       height: 100,
//     };
//
//     const { show: modalShow } = this.props;
//     const { editMode } = this.state;
//     return (
//       <div>
//         <Modal
//           show={modalShow}
//           {...this.props}
//           aria-labelledby="contained-modal-title-center"
//           centered
//         >
//           <Modal.Header>
//             <Modal.Title><p>{taskName}</p></Modal.Title>
//             <Button variant="outline-secondary" onClick={this.closeTaskDetails}>
//
//               Close
//             </Button>
//           </Modal.Header>
//           <Modal.Body>
//             <div style={stylesForDescription}><p>{taskDescription}</p></div>
//             <h3>Sub task:</h3>
//             <div style={stylesForSubTask} />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant="outline-success"
//               onClick={() => {
//                 this.handleSaveTaskDetails(this.taskName.value, this.taskDescription.value);
//               }}
//             >
//
//               Save
//             </Button>
//             <Button variant="outline-info" onClick={this.handleEditTaskDetails}>
//
//               Edit
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }
