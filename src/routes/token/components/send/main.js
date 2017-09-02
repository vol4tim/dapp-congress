import React from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'vol4-form'
import _ from 'lodash'
import { Fields } from './index'
import { Info } from '../common'

const Main = props => (
  <div>
    <div className="row">
      <div className="col-md-8">
        <Info {...props.token} />
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
  </div>
)

export default Main
