import React from 'react'
import { Link } from 'react-router'

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
            <li className={(props.isReadLogs) ? 'dropdown' : 'dropdown bg-danger'}>
              <Link to="#" onClick={props.onReadLogs} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span className="glyphicon glyphicon-bell text-danger" />
              </Link>
              <ul className="dropdown-menu" style={{ width: 250 }}>
                {props.logs.map((item, index) => (
                  <li key={index} style={{ padding: '3px 20px' }}>{item}</li>
                ))}
                <li role="separator" className="divider" />
                <li className="text-right" style={{ paddingRight: 5 }}>
                  <button className="btn btn-warning btn-xs" onClick={props.onClearLogs}><i className="fa fa-trash-o" /> Clear</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
