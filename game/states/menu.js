'use strict';
var GameData = require('../prefabs/gamedata');

function Menu() {}

Menu.prototype = {
  preload: function() {
    this.load.json('gamedata', 'assets/gamedata.json', true);
  },
  create: function() {
    window.scrollTo(10, 10);
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.backgroundImage = this.game.add.sprite(0, 0, 'menu-background');
    this.fullScreenButton = this.game.add.button(30, 30, 'fullscreenButton');
    this.fullScreenButton.scale.setTo(0.25, 0.25);
    this.fullScreenButton.events.onInputDown.add(this.toggleFullscreen, this);

    this.startButton = this.game.add.button(402, 614, 'start-button', this.actionOnClick, this, 1, 0);
    this.game.data = new GameData(this.game.cache.getJSON('gamedata'));
    console.log(this.game.cache.getJSON('gamedata'));

  },
  update: function() {
  },
  toggleFullscreen: function(button) {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
      button.frame = 0;
    } else {
      this.game.scale.startFullScreen();
      button.frame = 1;
    }
  },
  actionOnClick: function() {
    this.game.state.start('play');
  }
};

module.exports = Menu;
