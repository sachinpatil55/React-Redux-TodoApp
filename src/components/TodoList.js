import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodosIfNeeded,
  toggleTodo,
  fetchBucketsIfNeeded,
  fetchTodos
} from '../actions'
import {ButtonToolbar,Button,Badge} from 'react-bootstrap';
import MyModal from './Modal';
import AddEditTodo from './AddEditTodo';
import NotifyHelper from './NotifyHelper';
import Loader from './Loader';
import CSSTransitionGroup from 'react-addons-css-transition-group';
class TodoList extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    todoObj:{},
    modalShow:false,
    loading:true
  }
  this.addEditTodoModalView= React.createRef();
}
  componentDidMount () {
    this.fetchWithParams();
  }
  componentDidUpdate (prevProps){
    if(prevProps.match.params.bucketId != this.props.match.params.bucketId){
      this.fetchWithParams();
    }
  }
  fetchWithParams=()=>{
    this.setState({loading:true});
    let params={}
    if(this.props.match.url.endsWith('/completed')){
      params.completed = true
    }else if(this.props.match.url.endsWith('/active')){
      params.completed = false
    }
    if(this.props.match.params.bucketId && this.props.match.params.bucketId != 0){
      params['bucketId']= this.props.match.params.bucketId
    }
    this.props.fetchTodos(params);
    setTimeout(()=>{
      this.setState({loading:false});
    },2000)
  }
  setModalShow=(flag)=>{
      this.setState({modalShow:flag})
  }
  showModalView = (obj)=>{
    this.setState({todoObj:obj,modalShow:true})
  }
  updateTodo=()=>{
    const addEditTodoModalView = this.addEditTodoModalView.current;
    const{state}=addEditTodoModalView;
    if(state.todo.text != ''){
      this.setState({modalShow:false});
      if(state.todo.id){
        this.props.onEdit(state.todo);
        NotifyHelper.notifySuccess({
          message: "TODO Updated"
        });
      }else{
        this.props.addTodo(state.todo);
        NotifyHelper.notifySuccess({
          message: "TODO Created ,new Todo Status is active by default"
        });
      }
      this.fetchWithParams();
    }
  }
  findBucketName =(todo)=>{
  const {buckets} = this.props;
  const foundObj = buckets.list.find(t=>t.id == todo.bucketId);
    return foundObj ? foundObj.text : ''
  }
  onToggleTodo=(todo)=>{
    NotifyHelper.notifySuccess({
      message: "Status Changed"
    });
    this.props.onToggle(todo);
    setTimeout(()=>{
      this.fetchWithParams();
    },0)
  }
  render () {

  const {
    onDestroy,
    todos,
    buckets
  } = this.props;
  const{modalShow,todoObj,loading}=this.state;
  const {showModalView,setModalShow,updateTodo,findBucketName,onToggleTodo}=this;
  const {bucketId}=this.props.match.params
    return (<React.Fragment>
      { loading ? <Loader /> :
      <div className="container-fluid">
        <Button size="sm" variant="primary" className="m-t-md pull-right"onClick={(e)=>showModalView({text:'',completed:false,bucketId:''})}>
          Add New TODO
        </Button>
          <h3 className="box-title text-info">{ bucketId ? findBucketName({bucketId:bucketId}) : 'All'}</h3>
         <div className="table-responsive">
            <CSSTransitionGroup>
             <table className="table">
                 <thead>
                     <tr>
                         <th></th>
                         <th>#</th>
                         <th>NAME</th>
                         <th>Action</th>
                         <th>Bucket</th>
                     </tr>
                 </thead>
                 <tbody>
                   {todos.list.map((todo,index) =>
                     <tr key={index}>
                       <td>
                         <div className='view'>
                           <input
                             title="change Status"
                             className='toggle'
                             type='checkbox'
                             checked={todo.completed}
                             onChange={()=>onToggleTodo(todo)}
                           />
                         </div>
                       </td>
                       <td>{todo.id}</td>
                       <td className="txt-oflo">{todo.text}</td>
                       <td>
                         <ButtonToolbar>
                           <Button onClick={(e)=>showModalView(todo)} className='btn btn-sm btn-primary m-r-5'>Edit</Button>
                           <Button className='btn btn-sm btn-danger'
                           onClick={()=>onDestroy(todo)}>Delete</Button>
                         </ButtonToolbar>
                        </td>
                        <td>
                          <Badge variant="success">{findBucketName(todo)}</Badge>
                         </td>
                     </tr>
                    )}
                 </tbody>
             </table>
            </CSSTransitionGroup>
             {
               todos.list.length == 0 ? <h2 className="text-center">No Todos Found</h2>:null
              }
             <MyModal
               show={modalShow}
               onHide={() => setModalShow(false)}
               title={`${todoObj.id ? 'Edit' : 'Add'} Todo` }
               onSubmit={()=> updateTodo()}>
             <AddEditTodo ref ={this.addEditTodoModalView} todo={todoObj} buckets={buckets}/></MyModal>
         </div>
      </div>}</React.Fragment>
    );
  }
}

TodoList.propTypes = {
  fetchTodosIfNeeded: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  todos: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired
};

TodoList.defaultProps = {
  fetchTodosIfNeeded: Function.prototype,
  onEdit: Function.prototype,
  onToggle: Function.prototype,
  title: 'Todo app',
  todos: { list: [] },
  todo:{text:'',bucketId:0,completed:false},
  activeBucket:0,
};

const mapTodoListStateToProps = (state, ownProps) => {
    return Object.assign({}, state)
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo(todo) {
      dispatch(addTodo(todo));
    },
    fetchTodosIfNeeded() {
      dispatch(fetchTodosIfNeeded());
    },
    fetchBucketsIfNeeded() {
      dispatch(fetchBucketsIfNeeded());
    },
    onDestroy(todo) {
      NotifyHelper.notifySuccess({
        message: "TODO Deleted"
      });
      dispatch(deleteTodo(todo))
    },
    onEdit(todo) {
        dispatch(editTodo(todo))
    },
    onToggle(todo) {
        dispatch(toggleTodo(todo))
    },
    fetchTodos(obj={}){
      dispatch(fetchTodos(obj))
    }
  }
}
///////////////////////////////

export default connect(
  mapTodoListStateToProps,
  mapDispatchToProps
)(withRouter(TodoList))
