import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
    if (this.state.open) {
      css += ' open'
    }
    if (!this.props.isReadLogs) {
      css += ' bg-danger'
    }
    return (
      <li className={css}>
        <button to="#" onClick={this.handleOpen} className="btn btn-link" style={{ padding: 14 }}>
          <span className="glyphicon glyphicon-bell text-danger" />
        </button>
        <ul className="dropdown-menu" style={{ width: 365 }}>
          {this.props.logs.map((item, index) => (
            <li key={index} style={{ padding: '3px 20px', borderBottom: '1px solid #eee' }}>{item}</li>
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
