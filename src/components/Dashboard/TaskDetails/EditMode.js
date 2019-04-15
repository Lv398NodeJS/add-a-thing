// import React from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import FormGroup from 'react-bootstrap/FormGroup';
//
// export default class EditMode extends React.Component {
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
//   closeTaskDetails() {
//     const { onClose: close } = this.props;
//     close();
//   }
//
//   handleEditTaskDetails() {
//     this.setState(prevState => ({
//       editMode: !prevState.editMode,
//     }));
//   }
//
//   handleSaveTaskDetails() {
//     this.setState(prevState => ({
//       editMode: !prevState.editMode,
//     }));
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
//     const taskName = this.taskName ? this.taskName.value : 'Name';
//     const taskDescription = this.taskDescription ? this.taskDescription.value : 'Description';
//     return (
//       <div>
//         <Modal
//           show={modalShow}
//           {...this.props}
//           aria-labelledby="contained-modal-title-center"
//           centered
//         >
//           <Modal.Header>
//             <Modal.Title>
//               <Form>
//               <FormGroup>
//                 <Form.Label htmlFor="taskName">Name:</Form.Label>
//                 <Form.Control
//                   ref={(taskName) => {
//                     this.taskName = taskName;
//                   }}
//                   name="taskName"
//                   type="text"
//                   placeholder="Name"
//                 />
//               </FormGroup>
//             </Form>
//             </Modal.Title>
//             <Button variant="outline-secondary" onClick={this.closeTaskDetails}>
//               Close
//             </Button>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <FormGroup>
//                 <Form.Label htmlFor="taskDescription">Description:</Form.Label>
//                 <Form.Control
//                   name="taskDescription"
//                   as="textarea"
//                   ref={(taskDescription) => {
//                     this.taskDescription = taskDescription;
//                   }}
//                 />
//               </FormGroup>
//             </Form>
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
//               Save
//             </Button>
//             <Button variant="outline-info" onClick={this.handleEditTaskDetails}>
//               Edit
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }
