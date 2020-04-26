import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
import App from './App';
import configureStore from './store/configureStore';
import './index.css';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/all/all' component={App}/>
        <Route path='/all/completed' component={App}/>
        <Route path='/all/active' component={App}/>
        <Route path='/bucket/:bucketId/all' component={App}/>
        <Route path='/bucket/:bucketId/completed' component={App}/>
        <Route path='/bucket/:bucketId/active' component={App}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
