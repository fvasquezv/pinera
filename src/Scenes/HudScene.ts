import 'phaser'

export class HudScene extends Phaser.Scene {

    controlIzquierdo!: Phaser.GameObjects.Sprite
    controlDerecho!: Phaser.GameObjects.Sprite
    constructor() {
        super({
            key: 'HUD',
            active: true
        })
    }

    preload() {
        // Cargar el sprite de botones.
        this.load.spritesheet('boton_flecha', '../assets/sprites/boton_flecha.png', { frameHeight: 420, frameWidth: 420 })

    }

    create() {
        this.controlIzquierdo = this.add.sprite(100,600, 'boton_flecha').setScale(.4).setDepth(100)
        this.controlDerecho = this.add.sprite(1100,600, 'boton_flecha').setScale(.4).setDepth(100)
        this.controlDerecho.flipX = true
        this.controlIzquierdo.setInteractive()
        this.controlDerecho.setInteractive()
    }

    update( time: number, delta: number) {
        this.controlIzquierdo.on('pointerdown', () => {
            console.log('mueve mueve')
            this.events.emit('controlIzquierdoDown')
        })

        this.controlIzquierdo.on('pointerup', () => {
            this.events.emit('noTouch')
        })
    }
}
