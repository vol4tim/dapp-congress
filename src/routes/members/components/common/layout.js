import React from 'react'
import { connect } from 'react-redux'
import hett from 'hett'
import { Link } from 'react-router-dom'

const Layout = props => (
  <div>
    <h2 style={{ float: 'left', marginTop: 0 }}>{props.title}</h2>
    {props.isOwner &&
      <ul className="nav nav-pills pull-right">
        <li><Link to="/members" className="active"><i className="fa fa-list" /> List</Link></li>
        <li><Link to="/members/add"><i className="fa fa-plus" /> Add</Link></li>
      </ul>
    }
    <hr style={{ clear: 'both' }} />
    <div>
      {props.children}
    </div>
  </div>
)

function mapStateToProps(state) {
  return {
    isOwner: hett.web3h.coinbase() === state.congress.owner
  }
}

export default connect(mapStateToProps)(Layout)
