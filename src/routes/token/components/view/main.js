import React from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'vol4-form'
import { Fields } from './index'
import { Info } from '../common'

const Main = props => (
  <div>
    <div className="row">
      <div className="col-md-8">
        <Info {...props.token} />
      </div>
      <div className="col-md-4">
        <div className="dropdown pull-right">
          <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
            Execute <span className="caret" />
          </button>
          <ul className="dropdown-menu">
            {props.formsTx.map((form, index) =>
              <li key={index}><Link to={'/token/send/' + props.token.address + '/' + form}>{form}</Link></li>
            )}
          </ul>
        </div>
      </div>
    </div>
    <hr />
    <h3>Read</h3>
    {props.formsConstant.map((form, index) =>
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
  </div>
)

export default Main
