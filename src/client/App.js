import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import InputNameForm from './InputNameForm';
import TestList from './TestList';
import InputQuestsNum from './InputQuestsNum';
import ReadyToStartTest from './ReadyToStartTest';
import AskCurrentQuest from './AskCurrentQuest';
import TestResult from './TestResult';

class App extends Component {
  render() {
    let currentWindow;
    console.log(this.props);
    switch (this.props.examStore.userData.windowType) {
      case 'TestList':
        currentWindow = <TestList />;
        break;

      case 'InputQuestionsNum':
        currentWindow = <InputQuestsNum />;

        break;

      case 'ReadyToStartTest':
        currentWindow = <ReadyToStartTest />;
        break;

      case 'AskCurrentQuest':
        currentWindow = <AskCurrentQuest />;
        break;

      case 'TestResult':
        currentWindow = <TestResult />;
        break;

      default:
        currentWindow = <InputNameForm />;
        break;
    }

    return (
      <div>
        <Header />
        {currentWindow}
        <Footer />
      </div>
    );
  }
}

// export default App;
export default connect(
  state => ({
    examStore: state,
  }),
  dispatch => ({}),
)(App);