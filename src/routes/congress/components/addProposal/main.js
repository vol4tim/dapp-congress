import React, { Component } from 'react'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beneficiary: '',
      amount: '',
      jobDescription: '',
      abi: '',
      action: '',
      params: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getActions() {
    const actions = []
    let abi = [];
    try {
      abi = JSON.parse(this.state.abi.trim());
    } catch (e) {
      console.log(e);
    }
    abi.forEach((item) => {
      if (item.constant === false && item.type === 'function') {
        actions.push({ name: item.name })
      }
    });
    return (
      <select value={this.state.action} onChange={this.handleChange} name="action" className="form-control">
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
      abi = JSON.parse(this.state.abi.trim());
    } catch (e) {
      console.log(e);
    }
    abi.forEach((item) => {
      if (item.name === this.state.action) {
        item.inputs.forEach((item2) => {
          params.push({ name: item2.name, type: item2.type })
        });
      }
    });
    return (
      <div>
        {params.map((param, index) =>
          <div key={index} className="form-group">
            <label>{param.name}</label>
            <input type="text" value={this.state.params[index]} onChange={event => this.handleParamsListChange(index, event)} className="form-control" placeholder={param.type} />
          </div>
        )}
      </div>
    )
  }

  handleParamsListChange(index, event) {
    const params = this.state.params;
    params[index] = event.target.value;
    this.setState({ params });
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
    if (event.target.name === 'action') {
      this.setState({ params: [] });
    }
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>beneficiary</label>
            <input type="text" value={this.state.beneficiary} onChange={this.handleChange} name="beneficiary" className="form-control" />
          </div>
          <div className="form-group">
            <label>amount</label>
            <input type="text" value={this.state.amount} onChange={this.handleChange} name="amount" className="form-control" />
          </div>
          <div className="form-group">
            <label>jobDescription</label>
            <input type="text" value={this.state.jobDescription} onChange={this.handleChange} name="jobDescription" className="form-control" />
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">Code</div>
            <div className="panel-body">
              <div className="form-group">
                <label>abi</label>
                <textarea value={this.state.abi} onChange={this.handleChange} name="abi" className="form-control" />
              </div>
              <div className="form-group">
                <label>action</label>
                {this.getActions()}
              </div>
              <hr />
              <div>
                {this.getParams()}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-default">Add</button>
        </form>
      </div>
    );
  }
}

export default Main
