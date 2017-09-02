import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Layout from '../components/common'
import Main from '../components/list'
import { del } from '../../../modules/token/actions';

const List = props => (
  <Layout title="Tokens">
    <Main {...props} />
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
