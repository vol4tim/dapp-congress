import React, { Component } from 'react'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      name: ''
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
            <label>address</label>
            <input type="text" value={this.state.address} onChange={this.handleChange} name="address" className="form-control" />
          </div>
          <div className="form-group">
            <label>name</label>
            <input type="text" value={this.state.name} onChange={this.handleChange} name="name" className="form-control" />
          </div>
          <button type="submit" className="btn btn-default">Add</button>
        </form>
      </div>
    );
  }
}

export default Main
