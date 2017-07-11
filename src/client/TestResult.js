import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTestResult } from '../actions/requests';

class TestResult extends Component {
  constructor(props) {
    super(props);
    this.props.onPageLoad(this.props.examStore.userData.testName,
      this.props.examStore.userData.firstName,
      this.props.examStore.userData.lastName);
  }

  render() {
    const maxMark = 5;
    return (
      <div>
        <h2>Result</h2>
        <div>Asked questions count: {this.props.examStore.examData.testResult.questsCount}</div>
        <div>Correct answered questions count: {this.props.examStore.examData.testResult.answeredCorrect}</div>
        <div>Score {(this.props.examStore.examData.testResult.answeredCorrect * maxMark /
        this.props.examStore.examData.testResult.questsCount).toFixed(2)} from {maxMark}</div>
      </div>
    );
  }
}

export default connect(
  state => ({
    examStore: state,
  }),
  dispatch => ({
    onPageLoad: (testName, firstName, lastName) => {
      getTestResult(dispatch, testName, firstName, lastName);
    },
  }),
)(TestResult);