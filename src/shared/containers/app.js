import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Notifications from 'react-notification-system-redux';
import { Link } from 'react-router'
import { CONGRESS } from '../../config/config'

import Header from '../components/app/header'
import Footer from '../components/app/footer'
import { flashMessage, setLanguage } from '../../modules/app/actions';
import { loadBalance, loadProposals, loadLogs } from '../../modules/congress/actions';
import { loadAccounts } from '../../modules/addressBook/actions';

import './style.css'

class App extends Component {
  componentWillMount() {
    this.props.loadProposals();
    this.props.loadBalance();
    this.props.loadLogs();
    this.props.loadAccounts();
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
        language={this.props.language}
        setLanguage={this.props.setLanguage}
        congressAddress={this.props.congressAddress}
        balance={this.props.balance}
        balanceUsd={this.props.balanceUsd}
      />
      <div className="container" id="maincontainer">
        <div className="row">
          <div className="col-md-2">
            <ul className="nav nav-pills nav-stacked">
              <li><Link to="/"><i className="fa fa-university" /> Congress</Link></li>
              <li><Link to="/address-book"><i className="fa fa-address-card" /> Address</Link></li>
            </ul>
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

function mapStateToProps(state) {
  return {
    title: state.app.title,
    language: state.app.language,
    notifications: state.notifications,
    congressAddress: CONGRESS,
    balance: state.congress.balance,
    balanceUsd: state.congress.balanceUsd,
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    flashMessage,
    setLanguage,
    loadBalance,
    loadProposals,
    loadLogs,
    loadAccounts,
  }, dispatch)
  return {
    flashMessage: actions.flashMessage,
    setLanguage: actions.setLanguage,
    loadBalance: actions.loadBalance,
    loadProposals: actions.loadProposals,
    loadLogs: actions.loadLogs,
    loadAccounts: actions.loadAccounts,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
