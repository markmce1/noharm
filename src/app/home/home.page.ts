import { Component } from '@angular/core';

import * as Phaser from 'phaser';

import config from './game/config';

import Scene1 from './game/menu';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {

    const game = new Phaser.Game(config);
    game.scene.add('scene1', Scene1, true, { x: 400, y: 300});
  }

}
