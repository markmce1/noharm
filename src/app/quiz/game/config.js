import * as Phaser from 'phaser';
//config file for phaser to run

var width = 400;
var height = 650;
var config ={
    scale:{
    mode: Phaser.Scale.FIT,
    },

    type: Phaser.AUTO,
    width: width,
    height: height,
    physics: {
        default: 'arcade'
    }
    
};

export default config;