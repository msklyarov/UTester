const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const config = require('../../../config');

class testController {
  constructor(isCachingEnabled = true) {
    // caches
    this._isCachingEnabled = isCachingEnabled;
    this._jsonDbCollections = {};
    this._jsonResultCollections = {};
  }

  getTestList(req, res) {
    console.log('getTestList');
    res.json(this._getTestList());
  }

  getTotalQuestsNum(req, res) {
    console.log('getQuestionsNumber');
    res.json({ length: this._getJsonDb(req.params.testName).length });
  }

  setExamInfo(req, res) {
    console.log('setExamInfo');

    this._setExamInfo(req.params.testName, req.params.firstName,
      req.params.lastName, req.params.questsToAskNum);

    res.sendStatus(200);
  }

  getCurrentQuest(req, res) {
    console.log('getCurrentQuest');

    const json = this._getCurrentQuest(req.params.testName,
      req.params.firstName, req.params.lastName);

    console.log('33', JSON.stringify(json.questData.answers, null, 2));

    if (json !== null) {
      res.json(this._removeIsCorrectFlags(json));
    } else {
      // non-existing question
      res.sendStatus(400);
    }
  }

  setQuestAnswers(req, res) {
    console.log('setQuestAnswers');

    const jsonInDb = this._getCurrentQuest(req.params.testName,
      req.params.firstName, req.params.lastName);

    console.log('11', JSON.stringify(jsonInDb.questData.answers, null, 2));

    jsonInDb.questData.answers = _.merge(jsonInDb.questData.answers, req.body.answers);

    console.log('22', JSON.stringify(jsonInDb.questData.answers, null, 2));

    const jsonResult = this._getJsonResult(req.params.testName,
      req.params.firstName, req.params.lastName);

    if (jsonResult.currentQuestNum < jsonResult.questsToAskNum) {
      jsonResult.currentQuestNum++;
      jsonResult.askedQuests.push(jsonInDb);

      if (jsonResult.currentQuestNum === jsonResult.questsToAskNum) {
        jsonResult.examStopDateTime = new Date().toString();
      }

      this._writeExamData(req.params.testName,
        req.params.firstName, req.params.lastName, jsonResult);

      res.sendStatus(200);
    } else {
      // out of range
      res.sendStatus(400);
    }
  }

  _checkQuest(element) {
    return (element.isCorrect && element.userAnswer) ||
      ((!element.hasOwnProperty('isCorrect') || !element.isCorrect) &&
      (!element.hasOwnProperty('userAnswer') || !element.userAnswer));
  }

  _processAllQuests(element) {
    return +element.questData.answers.every(this._checkQuest);
  }

  _calculateSum(sum, value) {
    return sum + value;
  }

  getTestResult(req, res) {
    const jsonResult = this._getJsonResult(req.params.testName,
      req.params.firstName, req.params.lastName);

    const result = jsonResult.askedQuests
      .map(this._processAllQuests.bind(this))
      .reduce(this._calculateSum, 0);

    const dateDiff = (Date.parse(jsonResult.examStopDateTime) -
      Date.parse(jsonResult.examStartDateTime)) / 1000;

    console.log(`${Math.floor((dateDiff / (60 * 60)) % 24)}:${Math.floor((dateDiff / 60) % 60)}:${Math.floor(dateDiff % 60)}`);

    res.json({
      questsCount: jsonResult.questsToAskNum,
      answeredCorrect: result,
      totalTime: `${Math.floor((dateDiff / (60 * 60)) % 24)}:${Math.floor((dateDiff / 60) % 60)}:${Math.floor(dateDiff % 60)}`,
    });
  }

  _getJsonDb(testName) {
    if (this._isCachingEnabled) {
      const collection = this._jsonDbCollections[testName];
      if (collection) {
        return collection;
      }
    }

    const questionsFullName = path.format({
      dir: config.dbFolder,
      name: testName,
      ext: '.json',
    });

    let collection = {};
    if (fs.existsSync(questionsFullName)) {
      collection = JSON.parse(fs.readFileSync(questionsFullName));
    }

    if (this._isCachingEnabled) {
      this._jsonDbCollections[testName] = collection;
    }

    return collection;
  }

  _createTestFolderIfNotExists(testName) {
    const testFolderName = path.format({
      dir: config.resultsFolder,
      name: testName,
    });

    if (!fs.existsSync(testFolderName)) {
      fs.mkdirSync(testFolderName);
    }
  }

  _getJsonResult(testName, firstName, lastName) {
    const collectionKey = `${testName}_${firstName}_${lastName}`;

    if (this._isCachingEnabled) {
      const collection = this._jsonResultCollections[collectionKey];
      if (collection) {
        return collection;
      }
    }

    this._createTestFolderIfNotExists(testName);

    const testResultsFullName = path.format({
      dir: path.join(config.resultsFolder, testName),
      name: `${firstName}_${lastName}`,
      ext: '.json',
    });

    let collection = {};
    if (fs.existsSync(testResultsFullName)) {
      collection = JSON.parse(fs.readFileSync(testResultsFullName));
    }

    if (this._isCachingEnabled) {
      this._jsonResultCollections[collectionKey] = collection;
    }

    return collection;
  }

  _getTestList() {
    const files = fs.readdirSync(config.dbFolder);
    const out = [];
    files.forEach((item) => {
      out.push(path.parse(item).name);
    });

    return out;
  }

  _setExamInfo(testName, firstName, lastName, questsToAskNum) {
    const jsonDb = this._getJsonDb(testName);

    // calculate questions sequence here
    let i = 0;
    const questions = [];
    while (i < questsToAskNum) {
      const num = Math.round(Math.random() * jsonDb.length);

      if (!questions.includes(num)) {
        questions.push(num);
        i++;
      }
    }

    console.log(questions);

    const data = {
      questsToAskNum: parseInt(questsToAskNum),
      fromTotalQuestsNum: jsonDb.length,
      questsSequence: questions.sort((a, b) => a - b),
      examStartDateTime: new Date().toString(),
      currentQuestNum: 0,
      askedQuests: [],
    };

    this._writeExamData(testName, firstName, lastName, data);
  }

  _writeExamData(testName, firstName, lastName, data) {
    const testResultsFullName = path.format({
      dir: path.join(config.resultsFolder, testName),
      name: `${firstName}_${lastName}`,
      ext: '.json',
    });

    this._createTestFolderIfNotExists(testName);

    fs.writeFileSync(testResultsFullName, JSON.stringify(data, null, 2));
  }

  _getCurrentQuest(testName, firstName, lastName) {
    const jsonDb = this._getJsonDb(testName);

    const resultJson = this._getJsonResult(testName,
      firstName, lastName);

    if (resultJson.currentQuestNum < resultJson.questsSequence.length &&
      resultJson.questsSequence[resultJson.currentQuestNum] <
      jsonDb.length) {
      return {
        questNum: resultJson.currentQuestNum,
        questData: jsonDb[resultJson.questsSequence[resultJson.currentQuestNum]],
      };
    }
    return null;
  }

  _removeIsCorrectFlags(inJson) {
    const outJson = _.cloneDeep(inJson);
    outJson.questData.answers.forEach((item) => {
      if (item.hasOwnProperty('isCorrect')) {
        delete item.isCorrect;
      }
    });
    return outJson;
  }
}

module.exports = testController;
