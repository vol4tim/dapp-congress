import React from 'react'
import { Link } from 'react-router'

const Page = props => (
  <div>
    <h2 style={{ float: 'left', marginTop: 0 }}>{props.title}</h2>
    <ul className="nav nav-pills pull-right">
      <li><Link to="/address-book" activeClassName="active"><i className="fa fa-list" /> List</Link></li>
      <li><Link to="/address-book/add"><i className="fa fa-plus" /> Add</Link></li>
    </ul>
    <hr style={{ clear: 'both' }} />
    <div>
      {props.children}
    </div>
  </div>
)

export default Page
