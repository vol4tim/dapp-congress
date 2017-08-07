import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notifications from 'react-notification-system-redux';
import _ from 'lodash'

import Header from '../components/app/header'
import Footer from '../components/app/footer'
import Sidebar from '../components/app/sidebar'
import Load from '../components/app/load'
import { load, flashMessage, setLanguage } from '../../modules/app/actions';
import { read as readLogs, clearSave as clearLogs } from '../../modules/logs/actions';

import './style.css'

class App extends Component {
  componentWillMount() {
    this.props.load();
  }

  render() {
    if (!this.props.isLoaded) {
      return <Load />
    } else if (this.props.settings.fields.address === '') {
      this.context.router.push('/start')
      return null;
    }
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
        language={this.props.language}
        setLanguage={this.props.setLanguage}
        congressAddress={this.props.settings.fields.address}
        balance={this.props.balance}
        balanceUsd={this.props.balanceUsd}
        logs={this.props.logs}
        isReadLogs={this.props.isReadLogs}
        onClearLogs={this.props.clearLogs}
        onReadLogs={this.props.readLogs}
      />
      <div className="container" id="maincontainer">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10" style={{ borderLeft: '1px solid #eee' }}>
            {this.props.children}
          </div>
        </div>
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

App.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    isLoaded: state.app.isLoaded,
    settings: state.settings,
    title: state.app.title,
    language: state.app.language,
    notifications: state.notifications,
    balance: state.congress.balance,
    balanceUsd: state.congress.balanceUsd,
    logs: _.reverse(state.logs.messages.slice(-5)),
    isReadLogs: state.logs.isRead
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    load,
    flashMessage,
    setLanguage,
    clearLogs,
    readLogs,
  }, dispatch)
  return {
    load: actions.load,
    flashMessage: actions.flashMessage,
    setLanguage: actions.setLanguage,
    clearLogs: actions.clearLogs,
    readLogs: actions.readLogs,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
