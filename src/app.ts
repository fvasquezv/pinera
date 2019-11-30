import 'phaser'
import { MonedaScene } from './Scenes/MonedaScene'
import { HudScene } from './Scenes/HudScene'

let game = new Phaser.Game({
    width: 1200,
    height: 800,
    scene: [
        MonedaScene,
        HudScene
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
})