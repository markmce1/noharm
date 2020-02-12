import * as Phaser from 'phaser';
import SceneMain from './SceneMain'
import SceneGameOver from './SceneGameOver'
import SceneMainMenu from './SceneMainMenu'
import Entities from './Entities'

const config = {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver
  ],
  pixelArt: true,
  roundPixels: true
};

export default config