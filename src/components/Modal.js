import React from 'react';
import { Modal , Button} from 'react-bootstrap';

export default class MyModal extends React.Component  {

  render(){
    const{title,onHide,onSubmit,onDelete,showDeleteButton}=this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button onClick={()=> onSubmit && onSubmit()}>Save</Button>
          {showDeleteButton ?  <Button variant="danger" onClick={()=>onDelete && onDelete()}>Delete</Button> : null }
        </Modal.Footer>
      </Modal>
    );

  }
}
