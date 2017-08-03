import React, { Component } from 'react'

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isView: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isView: !this.state.isView });
  }

  render() {
    const btn = <button
      className={this.props.btnClass}
      style={this.props.styleBtn}
      onClick={this.toggle}
    >
      {this.props.btnTitle}
    </button>
    let content = null;
    if (this.state.isView === true) {
      content = this.props.children
    }
    return (
      <div>
        {btn}
        {content}
      </div>
    );
  }
}

export default Toggle
