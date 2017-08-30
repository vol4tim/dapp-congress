import React from 'react'
import _ from 'lodash'
import styles from './style.css'

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
              <input value={field.value} onChange={props.handleChange} name={field.name} placeholder={field.placeholder} type="text" className="form-control" />
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
