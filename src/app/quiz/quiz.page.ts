import { Component, OnInit } from '@angular/core';


import config from './game/config';
import Scene1 from './game/game';

import * as Phaser from 'phaser';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  constructor() { }

  
  ngOnInit() {
    
    const game = new Phaser.Game(config);
    game.scene.add('scene1', Scene1, true, { x: 400, y: 300});
  }

}
