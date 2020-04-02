import { Component, OnInit } from '@angular/core';

import config from './game/config';
import Scene1 from './game/game';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-dodge',
  templateUrl: './dodge.page.html',
  styleUrls: ['./dodge.page.scss'],
})
export class DodgePage implements OnInit {


  constructor(private screenOrientation: ScreenOrientation) { }
  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    const game = new Phaser.Game(config);
    game.scene.add('scene1', Scene1, true, { x: 400, y: 300});
    
  }

}
