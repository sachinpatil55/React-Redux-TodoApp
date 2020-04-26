import React from 'react';
import Content from './components/Content'
import { connect } from 'react-redux'
import Sidebar from './components/Sidebar';
import NotificationSystem from 'react-notification-system';
import NotifyHelper from './components/NotifyHelper';

class App extends React.Component{
  componentDidMount(){
    NotifyHelper.setNotificationSystem(this.refs.notificationSystem);
  }
  render(){
    return (
     <div className="d-flex" id="wrapper">
      <Sidebar key={this.props.match.params.bucketId} {...this.props}/>
      <Content {...this.props}/>
      <NotificationSystem ref="notificationSystem"/>
     </div>
    );
  }
}

export default connect()(App);
