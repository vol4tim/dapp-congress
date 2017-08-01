import React, { Component } from 'react'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Comment</label>
            <textarea onChange={this.handleChange} name="desc" className="form-control">{this.state.desc}</textarea>
          </div>
          <div className="btn-group" style={{ width: '100%' }}>
            <button
              onClick={(e) => {
                this.props.onSubmit(this.props.congressAddress, true, this.state.desc);
                e.preventDefault();
              }}
              className="btn btn-success"
              style={{ width: '50%' }}
            >Ok</button>
            <button
              onClick={(e) => {
                this.props.onSubmit(this.props.congressAddress, false, this.state.desc);
                e.preventDefault();
              }}
              className="btn btn-danger"
              style={{ width: '50%' }}
            >No</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Main
