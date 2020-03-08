
import * as Phaser from 'phaser';

var gameWidth = 400;
var gameHeight = 650;

    
    var config = {
        type: Phaser.AUTO,
        width: gameWidth,
        height: gameHeight,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'phaser-example',
            // width: gameWidth,
            // height: gameHeight
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 550 },
                debug: false
            }
        },
    };

    
export default config;