import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTestList } from '../actions/requests';

class TestList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onSelectTestName(event.target.id);
  }

  render() {
    return (
      <ul>
        {this.props.examStore.examData.testList.map((item, index) =>
          <li key={index}>
            <a href={item} id={item}
               onClick={this.handleClick}
            >
              {item.replace(/_/g, ' ')}
            </a>
          </li>
        )}
      </ul>
    );
  }

  componentDidMount() {
    this.props.onTestListLoad();
  }
}

export default connect(
  state => ({
    examStore: state,
  }),
  dispatch => ({
    onTestListLoad: () => {
      getTestList(dispatch);
    },
    onSelectTestName: (testName) => {
      dispatch({ type: 'ADD_TEST_NAME', payload: testName })
    },
  }),
)(TestList);