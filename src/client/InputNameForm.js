import React, { Component } from 'react';
import { connect } from 'react-redux';

class InputNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
    };

    // this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    // this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleFirstNameInput(event) {
  //   this.setState({ firstName: event.target.value });
  // }
  //
  // handleLastNameInput(event) {
  //   this.setState({ lastName: event.target.value });
  // }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddName({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    });
  }

  render() {
    return (
      <div>
        <p>Please input your name in english.</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            &nbsp;
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              minLength="3"
              maxLength="20"
              size="20"
              required
              ref={(input) => { this.firstName = input; }}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            &nbsp;
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              minLength="3"
              maxLength="20"
              size="20"
              required
              ref={(input) => { this.lastName = input; }}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    examStore: state,
  }),
  dispatch => ({
    onAddName: (nameStruct) => {
      dispatch({ type: 'ADD_NAME', payload: nameStruct });
    },
  }),
)(InputNameForm);