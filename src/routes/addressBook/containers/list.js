import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import _ from 'lodash'
import Page from './page'
import { removeAccount } from '../../../modules/addressBook/actions';

const List = props => (
  <Page title="Address book">
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
              <Link to={'/address-book/edit/' + item.address}>
                {item.name}<br />
                <small>{item.address}</small>
              </Link>
            </td>
            <td>
              <button onClick={() => props.removeAccount(item.address)} className="btn btn-danger btn-xs">
                <i className="fa fa-trash-o" /> remove
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </Page>
)

function mapStateToProps(state) {
  return {
    items: _.values(state.addressBook.items)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    removeAccount
  }, dispatch)
  return {
    removeAccount: actions.removeAccount
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
