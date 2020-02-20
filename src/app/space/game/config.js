import * as Phaser from 'phaser';
//config file for phaser to run

var width = 400;
var height = 600;
var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    physics: {
        default: 'arcade'
    }
    
};

export default config;
