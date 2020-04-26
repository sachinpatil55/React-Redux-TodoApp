import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import {
  addTodo
} from '../actions'
import {ButtonToolbar,Button} from 'react-bootstrap';
import Footer from './Footer';
import TodoList from './TodoList';
import MyModal from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
class Root extends React.Component {
  render () {
    const {
      addTodo,
      title
    } = this.props;

    let filter = {
      active: false,
      all: false,
      completed: false,
    };

    const url = this.props.match.url

    switch(url) {
      case '/':
      case '/all':
        filter.all = true;
        break;

      case '/active':
        filter.active = true;
        break;

      case '/completed':
        filter.completed = true;
        break;

      default:
        console.error(`Unhandled path ${url}`);
        filter.all = true;
    }

    return (
        <div>
          <div className="nav-header">
            <a href="#default" className="logo">TODO APP</a>
          </div>
          <AddNewTODO />
          <TodoList />
        </div>
    );
  }
}
const  AddNewTODO = ()=>{
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}
Root.propTypes = {
  addTodo: PropTypes.func.isRequired
};

Root.defaultProps = {
  addTodo: Function.prototype,
  title: 'Todo app'
};

const mapTodoStateToProps = (state, ownProps) => {
    return Object.assign({}, state)
}
const mapTodoDispatchToProps = dispatch => {
  return {
    addTodo(text) {
      dispatch(addTodo({ text, completed: false }));
    }
  }
}

export default connect(
  mapTodoStateToProps,
  mapTodoDispatchToProps
)(Root);
