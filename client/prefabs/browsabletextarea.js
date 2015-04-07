'use strict';

var BrowsableTextArea = function(game, task) {
  Phaser.Image.call(this, game, game.world.centerX - 288, 360, 'question-background');
  this.inputEnabled = true;
  this.events.onInputDown.add(this.browseText, this);
  this.textString = task.question;
  this.splitText = [];
  this.splitTextToPages(this.textString);
  this.visibleTextIndex = 0;

  this.textStyle = {
    font: '14px Arial',
    fill: 'white',
    align: 'left',
    wordWrap: true,
    wordWrapWidth: 574
  };
  this.currentVisibleText = this.game.add.text(3, 5, this.splitText[this.visibleTextIndex],  this.textStyle);
  this.addChild(this.currentVisibleText);
  this.addPageNumberText();
  this.addAnswerTexts(task.answers);
};

BrowsableTextArea.prototype = Object.create(Phaser.Image.prototype);
BrowsableTextArea.prototype.constructor = BrowsableTextArea;

BrowsableTextArea.prototype.update = function() {
};

BrowsableTextArea.prototype.browseText = function() {
  this.visibleTextIndex = (this.visibleTextIndex + 1) % this.splitText.length;
  this.currentVisibleText.text = this.splitText[this.visibleTextIndex];

  if (this.visibleTextIndex + 1 < this.splitText.length) {
    this.pageNumberText.text = 'jatkuu... ' + (this.visibleTextIndex + 1) + '/' + this.splitText.length;
  } else {
    this.pageNumberText.text = (this.visibleTextIndex + 1) + '/' + this.splitText.length;
  }
};

BrowsableTextArea.prototype.splitTextToPages = function(text) {
  if (text.length < 715) {
    this.splitText.push(text);
  } else {
    var i = 715;
    while (text[i] !== ' ') {
      i--;
    }
    var pageOfText = text.slice(0, i);
    this.splitText.push(pageOfText);
    this.splitTextToPages(text.slice(i));
  }
};

BrowsableTextArea.prototype.addPageNumberText = function() {
  var pageNumberTextStyle = {font: 'bold 14pt Arial', fill: 'red', align: 'right'};
  var pageNumberString = 'jatkuu... ' + (this.visibleTextIndex + 1) + '/' + this.splitText.length;
  this.pageNumberText = this.game.add.text(576, 154, pageNumberString, pageNumberTextStyle);
  this.pageNumberText.anchor.setTo(1, 1);
  if (this.splitText.length === 1) {
    this.pageNumberText.visible = false;
  }
  this.addChild(this.pageNumberText);
};

BrowsableTextArea.prototype.addAnswerTexts = function(answers) {
  var textStyle = {
    font: '21px Arial',
    fill: 'white',
    align: 'left',
    wordWrap: true,
    wordWrapWidth: 574,
    strokeThickness: 5,
  };

  var answerA = this.game.add.text(5, 176, 'A: ' + answers[0].text, textStyle);
  this.addChild(answerA);
  var answerB = this.game.add.text(5, 199, 'B: ' + answers[1].text, textStyle);
  this.addChild(answerB);
  var answerC = this.game.add.text(5, 222, 'C: ' + answers[2].text, textStyle);
  this.addChild(answerC);
  var answerD = this.game.add.text(5, 245, 'D: ' + answers[3].text, textStyle);
  this.addChild(answerD);
};
module.exports = BrowsableTextArea;
