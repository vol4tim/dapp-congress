import React from 'react'
import { NavLink } from 'react-router-dom'

const Layout = props => (
  <div>
    <h2 style={{ float: 'left', marginTop: 0 }}>{props.title}</h2>
    <ul className="nav nav-pills pull-right">
      <li><NavLink to="/congress" exact activeClassName="activeLink"><i className="fa fa-list" /> List</NavLink></li>
      <li><NavLink to="/congress/add" activeClassName="activeLink"><i className="fa fa-plus" /> Add</NavLink></li>
    </ul>
    <hr style={{ clear: 'both' }} />
    <div>
      {props.children}
    </div>
  </div>
)

export default Layout
