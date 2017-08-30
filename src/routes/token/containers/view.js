import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Main, Fields } from '../components/view';
import { getConstant } from '../../../modules/token/actions';
import { validate } from '../../../utils/helper';

const Container = props => (
  <Layout title={props.token.info.name} desc={props.token.address}>
    <div className="row">
      <div className="col-md-8">
        <Main {...props.token} />
      </div>
      <div className="col-md-4">
        <div className="dropdown pull-right">
          <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
            Execute <span className="caret" />
          </button>
          <ul className="dropdown-menu">
            {_.values(props.formsTx).map((form, index) =>
              <li key={index}><Link to={'/token/send/' + props.token.address + '/' + form.name}>{form.name}</Link></li>
            )}
          </ul>
        </div>
      </div>
    </div>
    <hr />
    <h3>Read</h3>
    {_.values(props.formsConstant).map((form, index) =>
      <Form
        key={index}
        id={form.idForm}
        {...form}
        onSubmit={data => props.onGetConstant(
          form.idForm,
          props.token.address,
          props.token.type,
          form.name,
          data
        )}
      >
        <Fields />
      </Form>
    )}
  </Layout>
)

function mapStateToProps(state, props) {
  const address = props.match.params.address;
  let token = {};
  if (_.has(state.token.items, address)) {
    token = state.token.items[address]
  }
  const formsConstant = {}
  _.forEach(token.abi, (item) => {
    if (_.has(item, 'constant') && item.constant && item.inputs.length > 0) {
      const idForm = address + item.name;
      formsConstant[idForm] = {
        idForm,
        name: item.name,
        fields: {}
      }
      _.forEach(item.inputs, (field) => {
        formsConstant[idForm].fields[field.name] = {
          value: '',
          type: 'text',
          placeholder: field.type,
          validator: ['required', field.type],
        }
      })
      formsConstant[idForm].onValidate = form => validate(formsConstant[idForm].fields, form)
    }
  })
  const formsTx = {}
  _.forEach(token.abi, (item) => {
    if (_.has(item, 'constant') && item.constant === false) {
      const idForm = address + item.name;
      formsTx[idForm] = {
        idForm,
        name: item.name,
        fields: {}
      }
      _.forEach(item.inputs, (field) => {
        formsTx[idForm].fields[field.name] = {
          value: '',
          type: 'text',
          placeholder: field.type,
          validator: ['required', field.type],
        }
      })
      formsTx[idForm].onValidate = form => validate(formsTx[idForm].fields, form)
    }
  })
  return {
    token,
    formsConstant,
    formsTx
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    getConstant
  }, dispatch)
  return {
    onGetConstant: actions.getConstant
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
