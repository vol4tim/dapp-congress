import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Layout } from '../components/common'
import Account from '../../../shared/components/common/account'
import { removeAccount } from '../../../modules/addressBook/actions';

const List = props => (
  <Layout title="Address book">
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
              <Account name={item.name} address={item.address} />
            </td>
            <td>
              <div className="btn-group">
                <Link to={'/address-book/edit/' + item.address} className="btn btn-info btn-xs"><i className="fa fa-pencil" /> edit</Link>
                <button onClick={() => props.removeAccount(item.address)} type="button" className="btn btn-danger btn-xs"><i className="fa fa-trash-o" /> remove</button>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </Layout>
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
