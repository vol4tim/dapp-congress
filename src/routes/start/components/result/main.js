import React, { Component } from 'react'
import { timeConverter } from '../../../../utils/helper'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
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
            <label>id</label>
            <input type="text" value={this.state.id} onChange={this.handleChange} name="id" className="form-control" />
          </div>
          <button type="submit" className="btn btn-default">Result</button>
        </form>
        {this.props.result.id > 0 &&
          <div>
            <h2>result id {this.props.result.id}</h2>
            <ul className="list-group">
              <li className="list-group-item">executed: <b>{(this.props.result.executed) ? 'true' : 'false'}</b></li>
              <li className="list-group-item">proposalPassed: <b>{(this.props.result.proposalPassed) ? 'true' : 'false'}</b></li>
              <li className="list-group-item">recipient: <b>{this.props.result.recipient}</b></li>
              <li className="list-group-item">amount: <b>{this.props.result.amount} ETH</b></li>
              <li className="list-group-item">description: <b>{this.props.result.description}</b></li>
              <li className="list-group-item">votingDeadline: <b>{timeConverter(this.props.result.votingDeadline)}</b></li>
              <li className="list-group-item">numberOfVotes: <b>{this.props.result.numberOfVotes}</b></li>
              <li className="list-group-item">currentResult: <b>{this.props.result.currentResult}</b></li>
              <li className="list-group-item">proposalHash: <b>{this.props.result.proposalHash}</b></li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default Main
