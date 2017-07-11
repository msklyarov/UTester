export default function userData(state = {
  windowType: 'InputNameForm',
  questsToAskNum: 20,
}, action) {
  switch (action.type) {
    case 'ADD_NAME':
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        windowType: 'TestList',
      };

    case 'ADD_TEST_NAME':
      return {
        ...state,
        testName: action.payload,
        windowType: 'InputQuestionsNum',
      };

    case 'ADD_QUESTS_NUM_TO_ASK':
      return {
        ...state,
        questsToAskNum: action.payload,
        windowType: 'ReadyToStartTest',
      };

    case 'ASK_CURRENT_QUEST':
      return {
        ...state,
        windowType: 'AskCurrentQuest',
      };

    case 'SHOW_TEST_RESULT':
      return {
        ...state,
        windowType: 'TestResult',
      };

    default:
      return state;
  }
}
