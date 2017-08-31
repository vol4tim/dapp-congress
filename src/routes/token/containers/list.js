import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Layout } from '../components/common'
import Account from '../../../shared/components/common/account'
import { del } from '../../../modules/token/actions';

const List = props => (
  <Layout title="Tokens">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>token</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) =>
          <tr key={index}>
            <td>
              <Account name={item.info.name} address={item.address} isToken />
            </td>
            <td>
              <div className="btn-group">
                <Link to={'/token/view/' + item.address} className="btn btn-info btn-xs"><i className="fa fa-eye" /> view</Link>
                <button onClick={() => props.del(item.address)} type="button" className="btn btn-danger btn-xs"><i className="fa fa-trash-o" /> remove</button>
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
    items: _.values(state.token.items)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    del
  }, dispatch)
  return {
    del: actions.del
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
