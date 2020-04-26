import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  addBucket,
  deleteBucket,
  editBucket,
  fetchBucketsIfNeeded,
  changeBucket,
  changeTab
} from '../actions';
import MyModal from './Modal';
import NotifyHelper from './NotifyHelper';
import AddEditCategory from './AddEditCategory';

class SideNavPage extends React.Component {
  constructor(props) {
  super(props);
  this.myInput= React.createRef();
  this.state = {
    activeBucket:0,
    bucketObj:{},
    modalShow:false,
  }
}
  componentDidMount () {
    this.props.fetchBucketsIfNeeded();
    let activeBucket = this.props.buckets.list.find((b)=> b.id == this.props.match.params.bucketId);
    this.setState({activeBucket:activeBucket ? activeBucket.id : 0})
  }
  componentDidUpdate(prevProps){
    if(prevProps.buckets.list.length !== this.props.buckets.list.length){
    let activeBucket = this.props.buckets.list.find((b)=> b.id == this.props.match.params.bucketId);
    this.setState({activeBucket:activeBucket ? activeBucket.id : 0})
    }
  }
  setActiveBucket=({bucket})=>{
    if(this.state.activeBucket != bucket.id){
      this.setState({activeBucket:bucket.id},()=>{
        this.props.changeBucket(bucket.id);
        this.props.changeTab('all');
        if(bucket.id == 0){
          this.props.history.push(`/all/all`)
        }else{
          this.props.history.push(`/bucket/${bucket.id}/all`)
        }
    })
    }
  }
  componenetWillRecieveProps(){
    setTimeout(()=>{
      let activeBucket = this.props.buckets.list.find((b)=> b.id == this.props.match.params.bucketId);
      this.setState({activeBucket:activeBucket ? activeBucket.id : 0})
    },0)
  }
  setModalShow=(flag)=>{
    this.setState({modalShow:flag})
  }
  updateBucket=()=>{
    const node = this.myInput.current;
    const{state}=node;
    if(state.bucket.text != ''){
      this.setState({modalShow:false});
      if(state.bucket.id){
      this.props.onEdit(state.bucket);
      NotifyHelper.notifySuccess({
        message: "Bucket Updated"
      });
      }else{
        this.props.addBucket(state.bucket);
        NotifyHelper.notifySuccess({
          message: "Bucket Created"
        });
      }
      this.props.fetchBucketsIfNeeded()
    }
  }
  showEditModal=({bucket,e})=>{
    e.preventDefault();
    e.stopPropagation();
    this.setState({bucketObj:bucket,modalShow:true})
  }
  showAddModal = (obj)=>{
    this.setState({bucketObj:obj,modalShow:true})
  }
  deleteBucket =obj=>{
    this.props.onDestroy(obj)
    this.setModalShow(false);
    NotifyHelper.notifySuccess({
      message: "Bucket Deleted"
    });
    this.props.history.push('/all/all')
  }
  render() {
  const {
    buckets
  } = this.props;
  const{setModalShow,updateBucket,showEditModal,myInput,showAddModal}=this;
  const {activeBucket,modalShow,bucketObj}=this.state
    return (
      <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading bg-light">Buckets</div>
      <div className="list-group list-group-flush">
        <span onClick={()=>this.setActiveBucket({bucket:{text:"All",id:0}})} className={`list-group-item  ${activeBucket == 0 ? 'active' : ''}`}>All
        </span>
          {buckets.list.map((bucket, i) => (
            <span key={i} onClick={()=>this.setActiveBucket({bucket})} className={`list-group-item w-b-bw ${activeBucket == bucket.id ? 'active' : ''}`}>{bucket.text}
              <div className="pull-right">
                <span style={{marginRight : '8px'}}>(0)</span>
                {activeBucket == bucket.id && <a onClick={(e)=>showEditModal({bucket,e})}><i className="fa fa-pencil"></i></a>}
              </div>
            </span>))}
      </div>
    <MyModal
      title={`${bucketObj.id ? 'Edit' : 'Add'} Bucket`}
      show={modalShow}
      onHide={() => setModalShow(false)}
      onSubmit={()=> updateBucket()}
      showDeleteButton = {bucketObj.id ? true : false}
      onDelete={()=>this.deleteBucket(bucketObj)}>
    <AddEditCategory ref={myInput} bucket={bucketObj}/>
    </MyModal>
    <a className="btn btn-sm addbuckt btn-dark" onClick={(e)=>showAddModal({text:'',todosList:[]})}>Add New Bucket</a>
    </div>
    );
  }
}
SideNavPage.propTypes = {
  addBucket: PropTypes.func.isRequired,
  fetchBucketsIfNeeded: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  buckets: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired,
  changeBucket: PropTypes.func.isRequired,
  changeTab:PropTypes.func.isRequired
};

SideNavPage.defaultProps = {
  addBucket: Function.prototype,
  fetchBucketsIfNeeded: Function.prototype,
  onDestroy: Function.prototype,
  onEdit: Function.prototype,
  buckets: { list: [] },
  activeBucket:'All',
  changeBucket : Function.prototype,
  changeTab:Function.prototype
};
const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, state)
}

const mapDispatchToProps = dispatch => {
  return {
    addBucket(bucket) {
      dispatch(addBucket(bucket));
    },
    onDestroy(bucket) {
      dispatch(deleteBucket(bucket))
    },

    fetchBucketsIfNeeded() {
      dispatch(fetchBucketsIfNeeded());
    },
    onEdit(bucket) {
      dispatch(editBucket(bucket))
    },
    changeBucket(text){
      dispatch(changeBucket(text))
    },
    changeTab(text){
      dispatch(changeTab(text))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideNavPage));
