import React from 'react'
import { NavLink } from 'react-router-dom'

const Layout = props => (
  <div>
    <div style={{ float: 'left', marginBottom: 10 }}>
      <h2 style={{ marginTop: 0, marginBottom: 0 }}>{props.title}</h2>
      {props.desc &&
        <p style={{ marginBottom: 0 }}>{props.desc}</p>
      }
    </div>
    <ul className="nav nav-pills pull-right">
      <li><NavLink to="/token" exact activeClassName="activeLink"><i className="fa fa-list" /> List</NavLink></li>
      <li><NavLink to="/token/add" activeClassName="activeLink"><i className="fa fa-plus" /> Add</NavLink></li>
    </ul>
    <hr style={{ clear: 'both' }} />
    <div>
      {props.children}
    </div>
  </div>
)

export default Layout
