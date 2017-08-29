import React from 'react'
import { NavLink } from 'react-router-dom'

export default function () {
  return (
    <ul className="nav nav-pills nav-stacked">
      <li><NavLink to="/congress" activeClassName="activeLink"><i className="fa fa-university" /> Congress</NavLink></li>
      <li><NavLink to="/members" activeClassName="activeLink"><i className="fa fa-users" /> Members</NavLink></li>
      <li><NavLink to="/token" activeClassName="activeLink"><i className="fa fa-money" /> Token</NavLink></li>
      <li><NavLink to="/factory" activeClassName="activeLink"><i className="fa fa-magic" /> Factory</NavLink></li>
      <li><NavLink to="/address-book" activeClassName="activeLink"><i className="fa fa-address-card" /> Address</NavLink></li>
      <li><NavLink to="/settings" activeClassName="activeLink"><i className="fa fa-cog" /> Settings</NavLink></li>
    </ul>
  )
}
