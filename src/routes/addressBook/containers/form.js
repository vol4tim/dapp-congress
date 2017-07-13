import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Page from './page'
import { Add, Edit } from '../components/form';
import { addAccount } from '../../../modules/addressBook/actions';

const Form = props => (
  <Page title="Add voting">
    {props.isNew ?
      <Add onSubmit={props.onSubmit} />
      :
      <Edit {...props.item} onSubmit={props.onSubmit} />
    }
  </Page>
)

function mapStateToProps(state, props) {
  let isNew = true;
  let item = {};
  if (_.has(state.addressBook.items, props.params.address)) {
    isNew = false;
    item = state.addressBook.items[props.params.address]
  }
  return {
    isNew,
    item,
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    addAccount
  }, dispatch)
  return {
    onSubmit: form => actions.addAccount(form)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
