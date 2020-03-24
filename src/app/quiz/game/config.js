import * as Phaser from 'phaser';
//config file for phaser to run

var width = window.innerWidth;
var height = window.innerHeight;
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