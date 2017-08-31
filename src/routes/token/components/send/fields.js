import React from 'react'
import _ from 'lodash'
import Auto from '../../../../shared/components/common/auto'
import styles from './style.css'

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
  <div className="panel panel-default">
    <div className="panel-heading">{props.name}</div>
    <div className="panel-body">
      <form onSubmit={props.handleSubmit}>
        {_.values(props.fields).map((field, index) => {
          if (field.name === 'payable') {
            return null
          }
          return (
            <div key={index} className={(field.error) ? 'form-group has-error' : 'form-group'}>
              <label>{field.name}</label>
              <Field field={field} handleChange={props.handleChange} />
              {field.error &&
                <span className="help-block">{field.error}</span>
              }
            </div>
          )
        })}
        {_.has(props.fields, 'payable') &&
          <div>
            <hr />
            <div className={(props.fields.payable.error) ? 'form-group has-error' : 'form-group'}>
              <label>transaction value (in ETH)</label>
              <input value={props.fields.payable.value} onChange={props.handleChange} name={props.fields.payable.name} placeholder={props.fields.payable.placeholder} type="text" className="form-control" />
              {props.fields.payable.error &&
                <span className="help-block">{props.fields.payable.error}</span>
              }
            </div>
          </div>
        }
        <button type="submit" className="btn btn-primary" disabled={props.form.submitting}>Send</button>
        {props.form.success &&
          <div className={styles['bs-callout'] + ' ' + styles['bs-callout-info']}>
            <h4>Result</h4>
            <p>TxId <a href={'https://' + props.network + 'etherscan.io/tx/' + props.form.success} target="_blank">{props.form.success}</a></p>
          </div>
        }
      </form>
    </div>
  </div>
)

export default Form
