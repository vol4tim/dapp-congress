import React from 'react'
import _ from 'lodash'

const Form = props => (
  <form onSubmit={props.handleSubmit}>
    {_.values(props.fields).map((field, index) =>
      <div key={index} className={(field.error) ? 'form-group has-error' : 'form-group'}>
        <label>{field.name}</label>
        <input value={field.value} onChange={props.handleChange} name={field.name} placeholder={field.placeholder} type="text" className="form-control" />
        {field.error &&
          <span className="help-block">{field.error}</span>
        }
      </div>
    )}
    <button type="submit" className="btn btn-primary" disabled={props.form.submitting}>Create</button>
    {props.form.success &&
      <div style={{ marginTop: 20 }}>
        <div className="alert alert-success">{props.form.success}</div>
        <b>ABI:</b><br />
        <figure className="highlight">
          <pre><a target="_blank" href={props.abi}>view</a></pre>
        </figure>
      </div>
    }
  </form>
)

export default Form
