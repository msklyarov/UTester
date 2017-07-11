const Controller = require('../controllers/testController');

const routes = {
  getTestList: '/tests/getAll', // GET
  getTotalQuestsNum: '/:testName/getQuestsNum', // GET
  setExamInfo: '/setExamInfo/:testName/:firstName/:lastName/:questsToAskNum', // POST
  getCurrentQuest: '/getCurrQuest/:testName/:firstName/:lastName', // GET
  setQuestAnswers: '/setQuestAnswers/:testName/:firstName/:lastName', // POST
  getTestResult: '/getTestResult/:testName/:firstName/:lastName', // GET
};

class testRoutes {
  constructor(router) {
    const controller = new Controller();
    router.get(routes.getTestList, controller.getTestList.bind(controller));
    router.get(routes.getTotalQuestsNum, controller.getTotalQuestsNum.bind(controller));
    router.post(routes.setExamInfo, controller.setExamInfo.bind(controller));
    router.get(routes.getCurrentQuest, controller.getCurrentQuest.bind(controller));
    router.post(routes.setQuestAnswers, controller.setQuestAnswers.bind(controller));
    router.get(routes.getTestResult, controller.getTestResult.bind(controller));
    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}

module.exports = testRoutes;
