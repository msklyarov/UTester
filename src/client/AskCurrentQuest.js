import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentQuest, setQuestAnswers } from '../actions/requests';

class AskCurrentQuest extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.props.onCurrentQuestLoad(this.props.examStore.userData.testName,
      this.props.examStore.userData.firstName,
      this.props.examStore.userData.lastName);

  }

  handleSubmit(event) {
    event.preventDefault();
    this.disableSubmitButton();

    const jsonData = this.props.examStore.examData.currentQuest.questData;
    jsonData.answers.forEach((item, index) => {
      delete item.userAnswer;
      if (document.getElementsByName('question')[index].checked) {
        item.userAnswer = true;
      }
    });

    this.props.onQuestAnswersSubmit(this.props.examStore.userData.testName,
      this.props.examStore.userData.firstName,
      this.props.examStore.userData.lastName,
      jsonData);

    if (this.props.examStore.examData.currentQuest.questNum < this.props.examStore.userData.questsToAskNum - 1) {
      this.props.onCurrentQuestLoad(this.props.examStore.userData.testName,
        this.props.examStore.userData.firstName,
        this.props.examStore.userData.lastName);
    } else {
      this.props.onTestFinished();
    }
  }

  enableSubmitButton() {
    document.getElementsByClassName('submit-quest-answer')[0]
      .removeAttribute('disabled');
  }

  disableSubmitButton() {
    document.getElementsByClassName('submit-quest-answer')[0]
      .setAttribute('disabled', 'disabled');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Test name: {this.props.examStore.userData.testName.replace(/_/g, ' ')}</h3>
        <h4>Quiestion {this.props.examStore.examData.currentQuest.questNum + 1} from {this.props.examStore.userData.questsToAskNum}</h4>
        <p>{this.props.examStore.examData.currentQuest.questData.questionText}</p>
        <div>
          {this.props.examStore.examData.currentQuest.questData.answers.map((item, index) =>
            <div key={item.text}>
              <input
                type={this.props.examStore.examData.currentQuest.questData.areMultyAnswers ? "checkbox" : "radio"}
                name="question"
                value={item.text}
                onChange={this.enableSubmitButton}
              />
              {item.text}
            </div>
          )}
        </div>
        <button className="submit-quest-answer" disabled>Submit</button>
      </form>
    );
  }

  componentWillMount() {
    if (this.props.examStore.examData.currentQuest.questNum < this.props.examStore.userData.questsToAskNum - 1) {
      this.props.onCurrentQuestLoad(this.props.examStore.userData.testName,
        this.props.examStore.userData.firstName,
        this.props.examStore.userData.lastName);
    } else {
      this.props.onTestFinished();
    }
  }
}

export default connect(
  state => ({
    examStore: state,
  }),
  dispatch => ({
    onCurrentQuestLoad: (testName, firstName, lastName) => {
      getCurrentQuest(dispatch, testName, firstName, lastName);
    },
    onQuestAnswersSubmit: (testName,
      firstName, lastName, jsonData) => {
      setQuestAnswers(dispatch, testName, firstName, lastName, jsonData);
    },
    onTestFinished: () => {
      dispatch({type: 'SHOW_TEST_RESULT'});
    },
  }),
)(AskCurrentQuest);
