import React from 'react'

const Form = props => (
  <form onSubmit={props.handleSubmit}>
    <div className={(props.fields.address.error) ? 'form-group has-error' : 'form-group'}>
      <label>address</label>
      <input value={props.fields.address.value} onChange={props.handleChange} name="address" type="text" className="form-control" />
      {props.fields.address.error &&
        <span className="help-block">{props.fields.address.error}</span>
      }
    </div>
    <button type="submit" className="btn btn-primary" disabled={props.form.submitting}>Save</button>
    {props.form.success &&
      <div className="alert alert-success">{props.form.success}</div>
    }
  </form>
)

export default Form
