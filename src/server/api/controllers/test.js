const dateDiff = (Date.parse("Mon Jul 10 2017 11:14:53 GMT+0000") -
  Date.parse("Mon Jul 10 2017 11:04:06 GMT+0000"))/1000;

console.log(`${Math.floor(dateDiff / (60 * 60) % 24)}:${Math.floor(dateDiff / 60 % 60)}:${Math.floor(dateDiff % 60)}`)

const jsonResult = {
  "questsToAskNum": 3,
  "fromTotalQuestsNum": 38,
  "questsSequence": [
  15,
  21,
  24
],
  "examStartDateTime": "Mon Jul 10 2017 15:45:36 GMT+0300 (Russia TZ 2 Standard Time)",
  "currentQuestNum": 3,
  "askedQuests": [
  {
    "questNum": 0,
    "questData": {
      "questionText": "Which of the following is correct with regards to how to upload a file asynchronously with jQuery?",
      "areMultyAnswers": false,
      "answers": [
        {
          "text": "In HTML5 file can be uploaded using Ajax and jQuery. Not only that, file validations(name,size,MIME-type) and handling the progress event can also be done with the HTML5 progress tag(or a div).",
          "userAnswer": true
        },
        {
          "text": "$('#one-specific-file').ajaxfileupload({\n  'action': '/upload.php'\n});"
        },
        {
          "text": "Ajax file uploads cannot be done."
        },
        {
          "text": "$(document).ready(function() {\n$(\"#uploadbutton\").jsupload({ \n    action: \"addFile.do\",\n    onComplete: function(response){\n      alert( \"server response: \" + response);\n    }   \n});"
        }
      ]
    }
  },
  {
    "questNum": 1,
    "questData": {
      "questionText": "To wrap  text in  element and give id as \"title\"?",
      "areMultyAnswers": false,
      "answers": [
        {
          "text": "In HTML5 file can be uploaded using Ajax and jQuery. Not only that, file validations(name,size,MIME-type) and handling the progress event can also be done with the HTML5 progress tag(or a div)."
        },
        {
          "isCorrect": true,
          "text": "$('#one-specific-file').ajaxfileupload({\n  'action': '/upload.php'\n});",
          "userAnswer": true
        },
        {
          "text": "Ajax file uploads cannot be done."
        },
        {
          "text": "$(document).ready(function() {\n$(\"#uploadbutton\").jsupload({ \n    action: \"addFile.do\",\n    onComplete: function(response){\n      alert( \"server response: \" + response);\n    }   \n});"
        }
      ]
    }
  },
  {
    "questNum": 2,
    "questData": {
      "questionText": "Which of the following is the correct way to move an element into another element? ",
      "areMultyAnswers": false,
      "notsure": true,
      "answers": [
        {
          "text": "$('#source').prependTo('#destination');",
          "userAnswer": true
        },
        {
          "text": "$(\"#source\").add(\"#destination\");"
        },
        {
          "text": " $(\"#source\").html(\"#destination\");"
        },
        {
          "text": "$(\"#source\").add().html().(\"#destination\");"
        }
      ]
    }
  }
],
  "examStopDateTime": "Mon Jul 10 2017 15:45:44 GMT+0300 (Russia TZ 2 Standard Time)"
};

function _checkQuest(element) {
  return (element.isCorrect && element.userAnswer) ||
    ((!element.hasOwnProperty('isCorrect') || !element.isCorrect) &&
    (!element.hasOwnProperty('userAnswer') || !element.userAnswer));
}

function _processAllQuests(element) {
  //console.log(element.questData.answers.length);
  return +element.questData.answers.every(_checkQuest);
}

function _calculateSum(sum, value) {
  return sum + value;
}

  const result = jsonResult.askedQuests.map(_processAllQuests)
    .reduce(_calculateSum, 0);

console.log(result)
