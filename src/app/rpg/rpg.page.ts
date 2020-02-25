import { Component, OnInit } from '@angular/core';

import * as Phaser from 'phaser';

import config from './game/config';
import {WorldScene, BootScene} from './game/mainScene';


@Component({
  selector: 'app-rpg',
  templateUrl: './rpg.page.html',
  styleUrls: ['./rpg.page.scss'],
})
export class RPGPage implements OnInit {

  constructor() { 

  }

  ngOnInit() {
    const game = new Phaser.Game(config);

  }

}
