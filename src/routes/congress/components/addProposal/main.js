import React, { Component } from 'react'
import _ from 'lodash'
import Auto from '../../../../shared/components/common/auto'

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleActions = this.handleActions.bind(this);
  }

  getActions() {
    const actions = []
    let abi = [];
    try {
      abi = JSON.parse(this.props.fields.abi.value.trim());
    } catch (e) {
      // console.log(e);
    }
    abi.forEach((item) => {
      if (item.constant === false && item.type === 'function') {
        actions.push({ name: item.name })
      }
    });
    return (
      <select value={this.props.fields.action.value} onChange={this.handleActions} name="action" className="form-control">
        <option value="">---</option>
        {actions.map((action, index) =>
          <option key={index} value={action.name}>{action.name}</option>
        )}
      </select>
    )
  }

  getParams() {
    const params = []
    let abi = [];
    try {
      abi = JSON.parse(this.props.fields.abi.value.trim());
    } catch (e) {
      // console.log(e);
    }
    abi.forEach((item) => {
      if (item.name === this.props.fields.action.value) {
        item.inputs.forEach((item2) => {
          params.push({ name: item2.name, type: item2.type })
        });
      }
    });
    return (
      <div>
        {_.map(this.props.fields.params, (item, index) => (
          <div key={index}className={(this.props.fields.action.error) ? 'form-group has-error' : 'form-group'}>
            <label>{item.label}</label>
            <input value={item.value} onChange={this.props.handleChange} name={item.name} placeholder={item.placeholder} type="text" className="form-control" />
            {item.error &&
              <span className="help-block">{item.error}</span>
            }
          </div>
        ))}
      </div>
    )
  }

  handleActions(event) {
    this.props.handleChange(event)
    const params = []
    let abi = [];
    try {
      abi = JSON.parse(this.props.fields.abi.value.trim());
    } catch (e) {
      // console.log(e);
    }
    abi.forEach((item) => {
      if (item.name === event.target.value) {
        item.inputs.forEach((item2) => {
          params.push({ name: item2.name, type: item2.type })
        });
      }
    });
    this.props.removeField('params');
    setTimeout(() => {
      _.forEach(params, (item) => {
        this.props.addField('params', {
          type: 'text',
          label: item.name,
          placeholder: item.type,
          value: ''
        })
      })
    }, 300)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className={(this.props.fields.beneficiary.error) ? 'form-group has-error' : 'form-group'}>
            <label>beneficiary</label>
            <Auto
              input={{
                value: this.props.fields.beneficiary.value,
                onChange: this.props.handleChange,
                name: 'beneficiary'
              }}
            />
            {this.props.fields.beneficiary.error &&
              <span className="help-block">{this.props.fields.beneficiary.error}</span>
            }
          </div>
          <div className={(this.props.fields.amount.error) ? 'form-group has-error' : 'form-group'}>
            <label>amount</label>
            <input type="text" value={this.props.fields.amount.value} onChange={this.props.handleChange} name="amount" className="form-control" />
            {this.props.fields.amount.error &&
              <span className="help-block">{this.props.fields.amount.error}</span>
            }
          </div>
          <div className={(this.props.fields.jobDescription.error) ? 'form-group has-error' : 'form-group'}>
            <label>jobDescription</label>
            <input type="text" value={this.props.fields.jobDescription.value} onChange={this.props.handleChange} name="jobDescription" className="form-control" />
            {this.props.fields.jobDescription.error &&
              <span className="help-block">{this.props.fields.jobDescription.error}</span>
            }
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">Code</div>
            <div className="panel-body">
              <div className={(this.props.fields.abi.error) ? 'form-group has-error' : 'form-group'}>
                <label>abi</label>
                <textarea value={this.props.fields.abi.value} onChange={this.props.handleChange} name="abi" className="form-control" />
                {this.props.fields.abi.error &&
                  <span className="help-block">{this.props.fields.abi.error}</span>
                }
              </div>
              <div className={(this.props.fields.action.error) ? 'form-group has-error' : 'form-group'}>
                <label>action</label>
                {this.getActions()}
                {this.props.fields.action.error &&
                  <span className="help-block">{this.props.fields.action.error}</span>
                }
              </div>
              <hr />
              <div>
                {this.getParams()}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-default" disabled={this.props.form.submitting}>Add</button>
          {this.props.form.error &&
            <div className="alert alert-danger">{this.props.form.error}</div>
          }
          {this.props.form.success &&
            <div className="alert alert-success">{this.props.form.success}</div>
          }
        </form>
      </div>
    );
  }
}

export default Main
