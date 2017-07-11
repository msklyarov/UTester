import request from 'superagent';

export function getTestList(dispatch) {
  request
    .get('http://localhost:8080/api/tests/getAll')
    .end((err, res) => {
      dispatch({
        type: 'GET_TEST_LIST',
        payload: res.body,
      });
    });
}

export function getTotalQuestsNum(dispatch, testName) {
  request
    .get(`http://localhost:8080/api/${testName}/getQuestsNum`)
    .end((err, res) => {
      console.log(res.body);
      dispatch({
        type: 'GET_TOTAL_QUESTS_NUM',
        payload: res.body.length,
      });
    });
}

export function setExamInfo(dispatch, testName,
  firstName, lastName, questionsToAskNum) {
  request
    .post(`http://localhost:8080/api/setExamInfo/${testName}/${firstName}/${lastName}/${questionsToAskNum}`)
    .end((err, res) => {
      console.log(res.body);
      dispatch({
        type: 'SET_EXAM_INFO',
      });
    });
}

export function getCurrentQuest(dispatch, testName,
  firstName, lastName) {
  request
    .get(`http://localhost:8080/api/getCurrQuest/${testName}/${firstName}/${lastName}`)
    .end((err, res) => {
      console.log(res.body);
      dispatch({
        type: 'GET_CURRENT_QUEST',
        payload: res.body,
      });
    });
}

export function setQuestAnswers(dispatch, testName,
  firstName, lastName, jsonData) {
  request
    .post(`http://localhost:8080/api/setQuestAnswers/${testName}/${firstName}/${lastName}`)
    .set('Content-Type', 'application/json')
    .send(jsonData)
    .end((err, res) => {
      console.log(res.body);
      dispatch({
        type: 'SET_QUEST_ANSWERS',
      });
    });
}

export function getTestResult(dispatch, testName,
  firstName, lastName) {
  request
    .get(`http://localhost:8080/api/getTestResult/${testName}/${firstName}/${lastName}`)
    .end((err, res) => {
      console.log(res.body);
      dispatch({
        type: 'GET_TEST_RESULT',
        payload: res.body,
      });
    });
}
