import React, { Component } from 'react'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: '',
      bool: 'true',
      desc: ''
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
            <input type="text" value={this.state.num} onChange={this.handleChange} name="num" className="form-control" />
          </div>
          <div className="form-group">
            <label>supported</label>
            <select value={this.state.bool} onChange={this.handleChange} name="bool" className="form-control">
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
          <div className="form-group">
            <label>desc</label>
            <input type="text" value={this.state.desc} onChange={this.handleChange} name="desc" className="form-control" />
          </div>
          <button type="submit" className="btn btn-default">Vote</button>
        </form>
      </div>
    );
  }
}

export default Main
