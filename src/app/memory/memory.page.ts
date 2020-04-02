import { Component, OnInit } from '@angular/core';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


import config from './game/config';

import Scene1 from './game/memory';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.page.html',
  styleUrls: ['./memory.page.scss'],
})
export class MemoryPage implements OnInit {

  constructor(private screenOrientation: ScreenOrientation) { }
  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    const game = new Phaser.Game(config);
    game.scene.add('scene1', Scene1, true, { x: 400, y: 300});
  }

}
