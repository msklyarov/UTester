import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTotalQuestsNum } from '../actions/requests';

class InputQuestionsNum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questsToAskNum: this.props.examStore.userData.questsToAskNum,
    };

    this.handleQuestionsNumInput = this.handleQuestionsNumInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQuestionsNumInput(event) {
    this.setState({ questsToAskNum: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onInputQuestsNumToAsk(this.state.questsToAskNum);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="questionsToAsk">
            Please select number of questions to ask
          </label>
          &nbsp;
          <input
            type="text"
            id="questionsToAskNum"
            value={this.state.questsToAskNum}
            onChange={this.handleQuestionsNumInput}
            maxLength={this.props.examStore.examData.questsTotalNum.toString().length}
            size={this.props.examStore.examData.questsTotalNum.toString().length}
            required
          />
          &nbsp;
          from {this.props.examStore.examData.questsTotalNum}
        </div>
        <button>Submit</button>
      </form>
    );
  }

  componentWillMount() {
    this.props.onTotalQuestsNumLoad(this.props.examStore.userData.testName);
  }
}

export default connect(
  state => ({
    examStore: state,
  }),
  dispatch => ({
    onTotalQuestsNumLoad: (testName) => {
      getTotalQuestsNum(dispatch, testName);
    },
    onInputQuestsNumToAsk: (num) => {
      dispatch({ type: 'ADD_QUESTS_NUM_TO_ASK', payload: num })
    },
  }),
)(InputQuestionsNum);
