import { Component, OnInit } from '@angular/core';

import * as Phaser from 'phaser';

import config from './game/game.js'

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor() {
    
  }

  ngOnInit() {
		const game = new Phaser.Game(config)

  }

}
