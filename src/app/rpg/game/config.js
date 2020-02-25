import * as Phaser from 'phaser';

import {WorldScene, BootScene} from './mainScene';
    var config = {
        type: Phaser.AUTO,
        parent: 'content',
        width: 400,
        height: 200,
        zoom: 2,
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true
            }
        },
        scene: [
            BootScene,
            WorldScene
        ]
    };

    export default config;