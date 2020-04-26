import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import {
  returnActiveBucket,
  changeTab
} from '../actions'
import {Nav} from 'react-bootstrap';
import TodoList from './TodoList';

class Content extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      activeKey:'all'
    }
  }
  componentDidMount(){

    this.setState({activeKey:this.props.match.url.endsWith('active') ? 'active' : this.props.match.url.endsWith('completed') ? 'completed': 'all'})
  }
  handleSelect = (key)=>{
    const{history,activeBucket}=this.props;

    this.setState({activeKey:key},()=>{
      this.props.changeTab(key)
      if(activeBucket == 0){
        history.push(`/all/${key}`);
      }else{
        history.push(`/bucket/${activeBucket}/${key}`);
      }
    })
  }
  render () {
    const{activeKey}=this.state
    return (

    <div id="page-content-wrapper">
       <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
         <h2 className="text-primary"><i className="fa fa-list text-dark"></i> TODO APP</h2>
       </nav>
         <div className="m-t-md row d-flex justify-content-center">
           <Nav variant="pills" activeKey={activeKey} onSelect={(key)=>this.handleSelect(key)}>
           <Nav.Item>
             <Nav.Link eventKey="all">All</Nav.Link>
           </Nav.Item>
           <Nav.Item>
             <Nav.Link eventKey="active">Active</Nav.Link>
           </Nav.Item>
           <Nav.Item>
             <Nav.Link eventKey="completed">
               Completed
             </Nav.Link>
           </Nav.Item>
         </Nav>
         </div>
        <TodoList {...this.props}/>
   </div>
    );
  }
}
const mapTodoListStateToProps = (state, ownProps) => {
    return Object.assign({}, state)
}

const mapDispatchToProps = dispatch => {
  return {
    returnActiveBucket() {
      dispatch(returnActiveBucket());
    },
    changeTab(text){
      dispatch(changeTab(text))
    }
  }
}
///////////////////////////////

export default connect(
  mapTodoListStateToProps,
  mapDispatchToProps
)(withRouter(Content))
