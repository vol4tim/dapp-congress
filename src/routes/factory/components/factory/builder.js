import React from 'react'
import { Link } from 'react-router-dom'

const Builder = props => (
  <div className="col-md-6">
    <div className="panel panel-default">
      <div className="panel-heading"><b>{props.item.name}</b></div>
      <div className="panel-body">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Builder address:</th>
              <td><small><a target="_blank" href={'https://etherscan.io/address/' + props.item.builderAddress}>{props.item.builderAddress}</a></small></td>
            </tr>
            <tr>
              <th>Builder abi:</th>
              <td><a target="_blank" href={props.item.builderAbiUrl}>{props.item.builderAbiName}</a></td>
            </tr>
            <tr>
              <th>Abi for created contract:</th>
              <td><a target="_blank" href={props.item.abiUrl}>{props.item.abiName}</a></td>
            </tr>
            <tr>
              <th>Service fee:</th>
              <td>{props.item.fee} Ether</td>
            </tr>
          </tbody>
        </table>
        <div className="text-right">
          <Link to={`/factory/create/${props.item.id}`} className="btn btn-xs btn-info">Create</Link>
        </div>
      </div>
    </div>
  </div>
)

export default Builder
