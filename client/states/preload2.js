'use strict';
var GameData = require('../prefabs/gamedata');
function Preload2() {
  this.asset = null;
  this.ready = false;
}

Preload2.prototype = {
  preload: function() {
    this.asset = this.add.sprite(512, 384, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    var gameData = this.game.data;

    var urlPrefix = 'files/';
    console.log(gameData);
    if (gameData.name === 'lukuseikkailu-2015') {
      urlPrefix = '';
    }

    this.load.image('map', urlPrefix + gameData.image);

    for (var i = 0; i < gameData.points.length; i++) {
      var pointData = gameData.points[i];
      if (pointData.image !== null && pointData.image !== undefined) {
        console.log('Loading ' + pointData.image);
        this.load.image(pointData.image, urlPrefix + pointData.image);
      }
      for (var j = 0; j < pointData.tasks.length; j++) {
        var task = pointData.tasks[j];
        if (task.image !== null && task.image !== undefined) {
          console.log('Loading ' + task.image);
          this.load.image(task.image, urlPrefix + task.image);
        }
      }
    }

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if (!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  },
  setAvatarSelectionToGameData: function(avatar) {
    if (avatar !== undefined) {
      this.game.data.selectedAvatarKey = avatar;
    }
  }
};

module.exports = Preload2;
