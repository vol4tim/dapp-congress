import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import hett from 'hett'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { New as Fields } from '../components/form'
import { createCongress } from '../../../modules/congress/actions';
import { validate } from '../../../utils/helper';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: 0
    };
  }

  componentWillMount() {
    hett.getAddressByName('BuilderCongress')
      .then(address => hett.getContractByName('BuilderCongress', address))
      .then(contract => contract.call('buildingCostWei'))
      .then((result) => {
        this.setState({ cost: hett.web3.fromWei(Number(result)) });
      })
  }

  render() {
    return (
      <Layout title="Create new congress">
        <Form id="newCongress" {...this.props}>
          <Fields />
        </Form>
        <p>Building cost: <b>{this.state.cost} ETH</b></p>
        <hr />
        <Link className="btn btn-default" to="/start">Join an existing congress</Link>
      </Layout>
    )
  }
}

function mapStateToProps() {
  const fields = {
    quorum: {
      value: '',
      type: 'text',
      validator: ['required', 'uint'],
    },
    minutes: {
      value: '',
      type: 'text',
      validator: ['required', 'uint'],
    },
    majority: {
      value: '',
      type: 'text',
      validator: ['required', 'uint'],
    },
    leader: {
      value: hett.web3h.coinbase(),
      type: 'text',
      validator: ['required', 'address'],
    }
  }
  return {
    fields,
    onValidate: form => validate(fields, form)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    createCongress
  }, dispatch)
  return {
    onSubmit: actions.createCongress
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
