import React from 'react';
import {Form} from 'react-bootstrap';

export default class addEditCategory extends React.Component {
  constructor(props){
  super(props);
    this.state={
      bucket:props.bucket,
      isRequired:false
    }
  }
  bucketNameChange=(e)=>{
    const{bucket}=this.props;
    let bucketObj = JSON.parse(JSON.stringify(bucket))
    bucketObj['text'] = e.target.value;
    this.setState({bucket:bucketObj})
  }
  render () {
    const {bucket,isRequired} = this.state;
    return (
      <Form>
        <Form.Group controlId="formBucket">
          <Form.Label>Bucket Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Bucket Name" value={bucket.text} onChange={this.bucketNameChange}/>
          <Form.Text className="text-muted">{isRequired ? 'Required' : ''}
          </Form.Text>
        </Form.Group>
      </Form>
    );
  }
}
