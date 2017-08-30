import React from 'react'
import _ from 'lodash'
import styles from './style.css'

const Form = props => (
  <div className="panel panel-default">
    <div className="panel-heading">{props.name}</div>
    <div className="panel-body">
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
        <button type="submit" className="btn btn-primary" disabled={props.form.submitting}>Send</button>
        {props.form.success &&
          <div className={styles['bs-callout'] + ' ' + styles['bs-callout-info']}>
            <h4>Result</h4>
            <p>{props.form.success}</p>
          </div>
        }
      </form>
    </div>
  </div>
)

export default Form
