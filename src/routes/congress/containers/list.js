import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import hett from 'hett'
import { Layout } from '../components/common'
import { timeConverter } from '../../../utils/helper'

const List = props => (
  <Layout title={props.titlePage}>
    <ul className="nav nav-pills pull-right">
      <li><Link to="/"><i className="fa fa-list" /> all</Link></li>
      <li><Link to="/congress/list/vote" className="text-danger"><i className="fa fa-paper-plane" /> проголосовать</Link></li>
      <li><Link to="/congress/list/completed" className="text-warning"><i className="fa fa-check-square-o" /> исполнить</Link></li>
      <li><Link to="/congress/list/pending" className="text-muted"><i className="fa fa-balance-scale" /> в ожидании</Link></li>
      <li><Link to="/congress/list/executed" className="text-success"><i className="fa fa-check" /> executed</Link></li>
    </ul>
    {props.children}
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>description</th>
          <th>voting deadline</th>
        </tr>
      </thead>
      <tbody>
        {props.proposals.map((item, index) => {
          let className = item.type
          if (item.type === 'completed') {
            className = 'text-warning'
          } else if (item.type === 'pending') {
            className = 'text-muted'
          } else if (item.type === 'executed') {
            className = 'text-success'
          }
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <b><Link
                  to={'/congress/proposal/' + item.id}
                  className={className}
                >{item.description}</Link></b>
              </td>
              <td>{timeConverter(item.votingDeadline)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </Layout>
)

function mapStateToProps(state, props) {
  const type = (_.has(props.match.params, 'type')) ? props.match.params.type : 'all'
  let proposals = _.values(state.congress.proposals)
  if (type !== 'all') {
    if (type === 'vote') {
      const coinbase = hett.web3h.coinbase()
      proposals = _.filter(proposals, (item) => {
        if (item.type === 'completed' || item.type === 'pending' || item.type === 'quorum') {
          if (_.has(item, 'voted') && _.has(item.voted, coinbase)) {
            return false;
          }
          return true;
        }
        return false;
      });
    } else if (type === 'pending') {
      proposals = _.filter(proposals, item => (
        item.type === 'pending' || item.type === 'quorum'
      ));
    } else {
      proposals = _.filter(proposals, ['type', type]);
    }
  }
  proposals = _.reverse(proposals)

  let titlePage = 'All proposals'
  if (type === 'vote') {
    titlePage = 'Проголосовать'
  } else if (type === 'completed') {
    titlePage = 'Исполнить'
  } else if (type === 'pending') {
    titlePage = 'В ожидании'
  } else if (type === 'executed') {
    titlePage = 'Executed'
  }
  return {
    titlePage,
    type,
    proposals
  }
}

export default connect(mapStateToProps)(List)
