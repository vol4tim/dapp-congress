import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notifications from 'react-notification-system-redux';
import _ from 'lodash'

import Header from '../components/app/header'
import Footer from '../components/app/footer'
import Sidebar from '../components/app/sidebar'
import { flashMessage, setLanguage } from '../../modules/app/actions';
import { read as readLogs, clearSave as clearLogs } from '../../modules/logs/actions';
import { getNetworkName } from '../../utils/helper';

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

const Layout = props => (
  <div>
    <Header
      title={props.title}
      language={props.language}
      setLanguage={props.setLanguage}
      congressAddress={props.settings.fields.address}
      balance={props.balance}
      balanceUsd={props.balanceUsd}
      logs={props.logs}
      isReadLogs={props.isReadLogs}
      onClearLogs={props.clearLogs}
      onReadLogs={props.readLogs}
    />
    <div className="container" id="maincontainer">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10" style={{ borderLeft: '1px solid #eee' }}>
          {props.children}
        </div>
      </div>
    </div>
    <Footer network={props.network} />
    <Notifications
      notifications={props.notifications}
      style={style}
      allowHTML
    />
  </div>
)

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
    isReadLogs: state.logs.isRead,
    network: getNetworkName()
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    flashMessage,
    setLanguage,
    clearLogs,
    readLogs,
  }, dispatch)
  return {
    flashMessage: actions.flashMessage,
    setLanguage: actions.setLanguage,
    clearLogs: actions.clearLogs,
    readLogs: actions.readLogs,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
