import 'phaser'
import { MonedaScene } from './Scenes/MonedaScene'

let game = new Phaser.Game({
    width: 1200,
    height: 800,
    scene: [
        MonedaScene
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
})