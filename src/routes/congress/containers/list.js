import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router'
import Page from './page'
import { timeConverter } from '../../../utils/helper'

const List = props => (
  <Page title={(props.type === 'completed') ? 'Completed Votings' : 'New Votings'}>
    <ul className="nav nav-pills pull-right">
      <li><Link to="/"><i className="fa fa-file-o" /> new</Link></li>
      <li><Link to="/congress/list/completed"><i className="fa fa-filter" /> completed</Link></li>
    </ul>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>description</th>
          <th>deadline</th>
        </tr>
      </thead>
      <tbody>
        {props.proposals.map((item, index) =>
          <tr key={index}>
            <td>{item.id}</td>
            <td>
              {props.type === 'completed' ?
                <Link to={'/congress/view/' + item.id}>{item.description}</Link>
                :
                <Link to={'/congress/vote/' + item.id}>{item.description}</Link>
              }
            </td>
            <td>{timeConverter(item.votingDeadline)}</td>
          </tr>
        )}
      </tbody>
    </table>
  </Page>
)

function mapStateToProps(state, props) {
  const type = (_.has(props.params, 'type') && props.params.type === 'completed') ? 'completed' : 'new'
  let proposals = []
  let filter
  const now = (new Date().getTime()) / 1000
  if (type === 'completed') {
    filter = (item) => {
      if (item.executed === true || item.votingDeadline <= now) {
        proposals.push(item)
      }
    }
  } else {
    filter = (item) => {
      if (item.executed === false && item.votingDeadline > now) {
        proposals.push(item)
      }
    }
  }
  _.forEach(state.congress.proposals, filter)
  proposals = _.reverse(proposals)
  return {
    type,
    proposals
  }
}

export default connect(mapStateToProps)(List)
