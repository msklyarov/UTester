import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setExamInfo } from '../actions/requests';

class ReadyToStartTest extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onStartTest(this.props.examStore.userData.testName,
      this.props.examStore.userData.firstName,
      this.props.examStore.userData.lastName,
      this.props.examStore.userData.questsToAskNum);

    this.props.onAskCurrentQuest();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button>Start test</button>
      </form>
    );
  }
}

// export default ReadyToStartTest;
export default connect(
  state => ({
    examStore: state,
  }),
  dispatch => ({
    onStartTest: (testName, firstName, lastName, questionsToAskNum) => {
      setExamInfo(dispatch, testName, firstName, lastName, questionsToAskNum);
    },
    onAskCurrentQuest: () => {
      dispatch({ type: 'ASK_CURRENT_QUEST' });
    },
  }),
)(ReadyToStartTest);
