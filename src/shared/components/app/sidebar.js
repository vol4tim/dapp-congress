import React from 'react'
import { Link } from 'react-router'

export default function () {
  return (
    <ul className="nav nav-pills nav-stacked">
      <li><Link to="/"><i className="fa fa-university" /> Congress</Link></li>
      <li><Link to="/members"><i className="fa fa-users" /> Members</Link></li>
      <li><Link to="/address-book"><i className="fa fa-address-card" /> Address</Link></li>
      <li><Link to="/settings"><i className="fa fa-cog" /> Settings</Link></li>
    </ul>
  )
}
