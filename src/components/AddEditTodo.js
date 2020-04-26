import React from 'react';
import {Form,Card} from 'react-bootstrap';
import Select from 'react-select';

 class AddEditTodo extends React.Component {
  constructor(props){
  super(props);
    this.state={
      todo:props.todo,
      currentSelectedBucket:props.todo.bucketId,
      isRequired:false
    }
  }

  todoNameChange=(e)=>{
    const{todo}=this.state;
    let todoObj = JSON.parse(JSON.stringify(todo))
    todoObj['text'] = e.target.value;
    this.setState({todo:todoObj,isRequired:e.target.value.trim() == ""})
  }
  changeDropDown=(val)=>{
    const{todo}=this.state;
    let todoObj = JSON.parse(JSON.stringify(todo))
    todoObj['bucketId'] = val.value;
    this.setState({todo:todoObj,currentSelectedBucket:val.value})
  }
  returnValue=(bucketId)=>{
    let returnObj = {}
    let bucketObj = this.props.buckets.list.find((r)=> r.id == bucketId);
    if(bucketObj){
      returnObj = {label:bucketObj.text,value:bucketId};
    }
    return returnObj;
  }
  render () {
    const {todo,currentSelectedBucket,isRequired} = this.state;
    const{buckets}=this.props;
    return (
      <Form>
        <Form.Group controlId="formBucket">
          <Form.Label>Todo Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Todo Name" value={todo.text} onChange={this.todoNameChange}/>
          <Form.Text className="text-danger">{isRequired ? 'Required' : ''}
          </Form.Text>
          <Form.Label>Select Bucket</Form.Label>
          <Select
            options={buckets.list.map((er)=>({label:er.text,value:er.id}))}
            labelKey={"text"}
            valueKey={"text"}
            value={this.returnValue(currentSelectedBucket)}
            onChange={this.changeDropDown}
            placeholder="Select Bucket"
          />
        </Form.Group>
        <Card bg="info" text="white">
        <Card.Body>
          <Card.Text>
            <i className="fa fa-info-circle"></i> If No Bucket is Selected then it will fall under All Bucket list
          </Card.Text>
        </Card.Body>
      </Card>
      </Form>
      // <h1>asdasd</h1>
    );
  }
}

export default AddEditTodo;
