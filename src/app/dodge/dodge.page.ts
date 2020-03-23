import { Component, OnInit } from '@angular/core';

import config from './game/config';
import Scene1 from './game/game';

@Component({
  selector: 'app-dodge',
  templateUrl: './dodge.page.html',
  styleUrls: ['./dodge.page.scss'],
})
export class DodgePage implements OnInit {

  constructor() { }

  ngOnInit() {

    const game = new Phaser.Game(config);
    game.scene.add('scene1', Scene1, true, { x: 400, y: 300});
    
  }

}
