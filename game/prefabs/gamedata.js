'use strict';
var Point = require('../prefabs/point');

function GameData() {}
GameData.prototype = {
  'startPoint': {
    'x': 246,
    'y': 118
  },
  'endPoint': {
    'x': 797,
    'y': 680
  },
  'points': [
    {
      'x': 341,
      'y': 120,
      'state': 'next',
      'task': {
        'question': 'Tämä on kysymys?',
        'answers': [
          {
            'text': 'Kyllä',
            'correctAnswer': true
          },
          {
            'text': 'Ei',
            'correctAnswer': false
          },
          {
            'text': 'Ehkä',
            'correctAnswer': false
          },
          {
            'text': 'Täh?',
            'correctAnswer': false
          }
        ]
      }
    },
    {
      'x': 446,
      'y': 101,
      'state': 'unvisited'
    },
    {
      'x': 474,
      'y': 195,
      'state': 'unvisited'
    },
    {
      'x': 441,
      'y': 292,
      'state': 'unvisited'
    },
    {
      'x': 451,
      'y': 407,
      'state': 'unvisited'
    },
    {
      'x': 553,
      'y': 483,
      'state': 'unvisited'
    },
    {
      'x': 515,
      'y': 616,
      'state': 'unvisited'
    },
    {
      'x': 653,
      'y': 694,
      'state': 'unvisited'
    }
  ],
  markPointAs: function(oldState, newState) {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].state === oldState) {
        this.points[i].state = newState;
        break;
      }
    }
  },
  getCurrentTask: function() {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].state === Point.STATES.CURRENT) {
        return this.points[i].task;
      }
    }
  }
};

module.exports = GameData;
