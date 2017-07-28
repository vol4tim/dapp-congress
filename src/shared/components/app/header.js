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
            <li><Link to="#"><span className="glyphicon glyphicon-bell" /></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
