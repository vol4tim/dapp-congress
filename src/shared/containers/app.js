import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notifications from 'react-notification-system-redux';
import { PROGRAMMS } from '../../config/config'

import Header from '../components/app/header'
import Footer from '../components/app/footer'
import { flashMessage, setLanguage } from '../../modules/app/actions';

import './style.css'

// @translate(['view', 'nav'], { wait: true })
class App extends Component {
  componentWillMount() {
    console.log(this);
  }

  componentWillReceiveProps(next) {
    if (this.props.dao_address !== next.dao_address) {
      this.props.loadCore(next.dao_address);
    }
  }

  render() {
    const style = {
      Containers: {
        DefaultStyle: {
          width: '530px',
        }
      },
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 2px 1px'
        },
      }
    };
    return (<div>
      <Header
        title={this.props.title}
        dao_address={this.props.dao_address}
        role={this.props.role}
        language={this.props.language}
        setLanguage={this.props.setLanguage}
        programms={this.props.programms}
        setDaoAddress={this.props.setDaoAddress}
      />
      <div className="container" id="maincontainer">
        {this.props.children}
      </div>
      <Footer />
      <Notifications
        notifications={this.props.notifications}
        style={style}
        allowHTML
      />
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    title: state.app.title,
    language: state.app.language,
    programms: PROGRAMMS,
    notifications: state.notifications,
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    flashMessage,
    setLanguage
  }, dispatch)
  return {
    flashMessage: actions.flashMessage,
    setLanguage: actions.setLanguage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
