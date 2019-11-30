import 'phaser'

export class HudScene extends Phaser.Scene {

    controlIzquierdo!: Phaser.GameObjects.Sprite
    controlDerecho!: Phaser.GameObjects.Sprite
    Moneda!: Phaser.Scene

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
        this.controlIzquierdo = this.add.sprite(100,600, 'boton_flecha').setScale(.4).setDepth(1)
        this.controlDerecho = this.add.sprite(1100,600, 'boton_flecha').setScale(.4).setDepth(1)
        this.controlDerecho.flipX = true
        this.controlIzquierdo.setInteractive()
        this.controlDerecho.setInteractive()

        this.Moneda = this.scene.get('MONEDA')        
    }

    update( time: number, delta: number) {
        
        this.controlIzquierdo.on('pointerdown', () => {
            this.Moneda.events.emit('touch_left')
        })

        this.controlIzquierdo.on('pointerup', () => {
            this.Moneda.events.emit('touch_left_out')
        })

        this.controlDerecho.on('pointerdown', () => {
            this.Moneda.events.emit('touch_right')
        })

        this.controlDerecho.on('pointerup', () => {
            this.Moneda.events.emit('touch_right_out')
        })
        

    }
}
