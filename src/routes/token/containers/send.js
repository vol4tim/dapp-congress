import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import hett from 'hett'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Fields } from '../components/send';
import { Main } from '../components/view';
import { send } from '../../../modules/token/actions';
import { validate } from '../../../utils/helper';

const Container = props => (
  <Layout title={'Execute ' + props.token.info.name} desc={props.token.address}>
    <div className="row">
      <div className="col-md-8">
        <Main {...props.token} />
      </div>
      <div className="col-md-4">
        <Link to={'/token/view/' + props.token.address} className="btn btn-primary pull-right">Back</Link>
      </div>
    </div>
    <hr />
    {_.isEmpty(props.form) ?
      <p>...</p>
      :
      <Form
        id={props.form.idForm}
        {...props.form}
        network={props.network}
        onSubmit={data => props.onSend(
          props.form.idForm,
          props.token.address,
          props.token.type,
          props.form.name,
          data
        )}
      >
        <Fields />
      </Form>
    }
  </Layout>
)

function mapStateToProps(state, props) {
  const address = props.match.params.address;
  const func = props.match.params.func;
  let token = {};
  if (_.has(state.token.items, address)) {
    token = state.token.items[address]
  }
  let form = {}
  const info = _.find(token.abi, { name: func })
  if (info) {
    form = {
      idForm: address + func,
      name: func,
      fields: {}
    }
    _.forEach(info.inputs, (field) => {
      form.fields[field.name] = {
        value: '',
        type: (field.type === 'address') ? 'address' : 'text',
        placeholder: field.type,
        validator: ['required', field.type],
      }
    })
    if (info.payable) {
      form.fields.payable = {
        value: 0,
        type: 'text',
        placeholder: 'the amount to send to with the transaction',
        validator: ['required', 'uint'],
      }
    }
    form.onValidate = data => validate(form.fields, data)
  }
  const network = (Number(hett.web3.version.network) === 42) ? 'kovan.' : ''
  return {
    token,
    form,
    network
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    send
  }, dispatch)
  return {
    onSend: actions.send
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
