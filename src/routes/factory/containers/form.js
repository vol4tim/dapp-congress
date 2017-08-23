import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Fields } from '../components/form';
import Load from '../../../shared/components/app/load'
import { loadCreateFields, deploy } from '../../../modules/factory/actions';
import { validate } from '../../../utils/helper';

class Container extends Component {
  componentWillMount() {
    if (!_.isEmpty(this.props.builder) && _.isEmpty(this.props.fields)) {
      this.props.loadCreateFields(this.props.idBuilder);
    }
  }

  render() {
    return (
      <Layout title={this.props.builder.builderAbiName}>
        {_.isEmpty(this.props.fields) ?
          <Load />
          :
          <Form id={this.props.idForm} {...this.props} onSubmit={this.props.onSubmit}>
            <Fields />
          </Form>
        }
      </Layout>
    )
  }
}

function mapStateToProps(state, props) {
  let fields = {}
  let builder = {}
  let abi = ''
  if (_.has(state.factory.items, props.match.params.id)) {
    builder = state.factory.items[props.match.params.id]
    if (_.has(builder, 'createFields')) {
      fields = builder.createFields
    }
    // abi = JSON.stringify(builder.abi)
    abi = builder.abiUrl
  }
  return {
    idBuilder: props.match.params.id,
    idForm: 'factory_' + props.match.params.id,
    builder,
    fields,
    abi,
    onValidate: form => validate(fields, form)
  }
}
function mapDispatchToProps(dispatch, props) {
  const idForm = 'factory_' + props.match.params.id
  const actions = bindActionCreators({
    loadCreateFields,
    deploy
  }, dispatch)
  return {
    loadCreateFields: actions.loadCreateFields,
    onSubmit: form => actions.deploy(props.match.params.id, idForm, form)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
