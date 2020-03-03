import { Component, OnInit } from '@angular/core';


import config from './game/config';
import Scene1 from './game/game';

import * as Phaser from 'phaser';

@Component({
  selector: 'app-flap',
  templateUrl: './flap.page.html',
  styleUrls: ['./flap.page.scss'],
})
export class FlapPage implements OnInit {

  constructor() {
   }

  ngOnInit() {

    const game = new Phaser.Game(config);
    game.scene.add('Scene1', Scene1 , true, { x: 400, y: 300});
  }

}
