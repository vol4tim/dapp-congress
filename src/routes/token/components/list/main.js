import React from 'react'
import { Link } from 'react-router-dom'
import Account from '../../../../shared/components/common/account'

const Main = props => (
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
)

export default Main
