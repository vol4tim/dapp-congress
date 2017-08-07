import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import hett from 'hett'
import Page from './page'
import { removeMember } from '../../../modules/members/actions';

const List = props => (
  <Page title="Members">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>account</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) =>
          <tr key={index}>
            <td>
              {item.name}<br />
              <small>{item.address}</small>
            </td>
            <td>
              {props.isOwner ?
                <button onClick={() => props.removeMember(item.address)} className="btn btn-danger btn-xs">
                  <i className="fa fa-trash-o" /> remove
                </button>
                :
                <span>-</span>
              }
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </Page>
)

function mapStateToProps(state) {
  return {
    isOwner: hett.web3h.coinbase() === state.congress.owner,
    items: _.values(state.members.items)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    removeMember
  }, dispatch)
  return {
    removeMember: actions.removeMember
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
