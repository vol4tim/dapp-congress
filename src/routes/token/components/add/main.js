import React from 'react'
import { Form } from 'vol4-form'
import { Fields } from './index'

const Main = props => (
  <Form id="token" {...props} onSubmit={props.onSubmit}>
    <Fields />
  </Form>
)

export default Main
