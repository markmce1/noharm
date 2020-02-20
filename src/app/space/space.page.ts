import * as Phaser from 'phaser';

import config from './game/config';
import Scene1 from './game/spaceScene';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.page.html',
  styleUrls: ['./space.page.scss'],
})
export class SpacePage implements OnInit {

  constructor() { }

  ngOnInit() {

    const game = new Phaser.Game(config);
		  game.scene.add('scene1', Scene1, true, { x: 400, y: 300});
  }

}
