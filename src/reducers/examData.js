export default function examData(state = {
  testList: [],
  questsTotalNum: 60,
  currentQuest: {
    questNum: 0,
    questData: {
      questionText: '',
      answers: [],
    },
  },
  testResult: {
    questsCount: 0,
    answeredCorrect: 0,
  },
}, action) {
  switch (action.type) {
    case 'GET_TEST_LIST':
      return {
        ...state,
        testList: action.payload,
      };

    case 'GET_TOTAL_QUESTS_NUM':
      return {
        ...state,
        questsTotalNum: action.payload,
      };

    case 'SET_EXAM_INFO':
      return state;

    case 'GET_CURRENT_QUEST':
      return {
        ...state,
        currentQuest: action.payload,
      };

    case 'SET_QUEST_ANSWERS':
      return state;

    case 'GET_TEST_RESULT':
      return {
        ...state,
        testResult: action.payload,
      };

    default:
      return state;
  }
}

