import React from 'react'
import _ from 'lodash'
import Auto from '../../../../shared/components/common/auto'

const Field = ({ field, handleChange }) => {
  if (field.type === 'address') {
    return (
      <Auto
        input={{
          value: field.value,
          name: field.name,
          placeholder: field.placeholder,
          onChange: handleChange
        }}
      />
    )
  }
  return <input value={field.value} onChange={handleChange} name={field.name} placeholder={field.placeholder} type="text" className="form-control" />
}

const Form = props => (
  <form onSubmit={props.handleSubmit}>
    {_.values(props.fields).map((field, index) =>
      <div key={index} className={(field.error) ? 'form-group has-error' : 'form-group'}>
        <label>{field.name}</label>
        <Field field={field} handleChange={props.handleChange} />
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
