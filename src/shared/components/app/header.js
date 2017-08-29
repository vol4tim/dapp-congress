import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { timeConverter } from '../../../utils/helper'

class Notif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ open: !this.state.open });
    this.props.onReadLogs();
  }

  render() {
    if (this.props.logs.length === 0) {
      return <li className="navbar-text"><span className="glyphicon glyphicon-bell" /></li>
    }
    let css = 'dropdown';
    let cssBtn = { padding: 14, outline: 0 };
    if (this.state.open) {
      css += ' open'
      cssBtn = { ...cssBtn, color: '#555', backgroundColor: '#e7e7e7' };
    }
    if (!this.props.isReadLogs) {
      css += ' bg-danger'
    }

    const cssLi = { background: '#f7f7f7', padding: 5, margin: '6px 6px 0', fontSize: 11 }
    const cssTitle = { fontSize: 12 }
    const cssTime = { fontSize: 11, fontStyle: 'italic', fontWeight: 'bold', position: 'absolute', right: 12 }

    return (
      <li className={css}>
        <button to="#" onClick={this.handleOpen} className="btn btn-link" style={cssBtn}>
          <span className="glyphicon glyphicon-bell text-danger" />
        </button>
        <ul className="dropdown-menu" style={{ width: 365 }}>
          {this.props.logs.map((item, index) => (
            <li key={index} style={cssLi}>
              <div style={{ height: 20 }}>
                <span style={cssTitle}>{item.title}</span>
                <span style={cssTime}>{timeConverter(item.time)}</span>
              </div>
              <div>
                {item.message}
              </div>
            </li>
          ))}
          <li role="separator" className="divider" />
          <li className="text-right" style={{ paddingRight: 5 }}>
            <button className="btn btn-warning btn-xs" onClick={this.props.onClearLogs}><i className="fa fa-trash-o" /> Clear</button>
          </li>
        </ul>
      </li>
    )
  }
}

const Header = function Header(props) {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/">
            <img src="assets/img/aira-logo.svg" style={{ float: 'left', marginRight: 10, marginTop: -7 }} alt="" />
            <div style={{ marginTop: -10, float: 'right' }}>
              {props.title}<br />
              <small>{props.congressAddress}</small>
            </div>
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li className="navbar-text">Balance: <b>{props.balance} ETH ({props.balanceUsd} USD)</b></li>
            <Notif {...props} />
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
