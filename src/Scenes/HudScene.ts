import 'phaser'
import { CST } from '../Config/CST'

export class HudScene extends Phaser.Scene {

    /**
     * Definición de botones.
     */
    controlIzquierdo!: Phaser.GameObjects.Sprite
    controlDerecho!: Phaser.GameObjects.Sprite
    controlSalto!: Phaser.GameObjects.Sprite
    Moneda!: Phaser.Scene

    constructor() {
        super({
            key: CST.SCENES.HUD,
            active: true
        })
    }

    preload() {
        // Cargar el sprite de botones.
        this.load.spritesheet('boton_flecha', '../assets/sprites/boton_flecha.png', { frameHeight: 420, frameWidth: 420 })

    }

    create() {

        var rect = new Phaser.Geom.Rectangle(10, 10, 400, 40);
        var rectContainer = new Phaser.Geom.Rectangle(10, 10, 600, 40);

        const lifeMeter = this.add.graphics( {fillStyle: {color: 0xffff00}})
        const lifeMeterContainer = this.add.graphics( {fillStyle: {color: 0x440000}})
        
        lifeMeterContainer.fillRectShape(rectContainer).setDepth(1)
        lifeMeter.fillRectShape(rect).setDepth(2)

        /**
         * Crear botonoes e insertarlos en el HUD
         */
        this.input.addPointer()
        this.input.addPointer()

        this.controlIzquierdo = this.add.sprite(100,600, 'boton_flecha').setScale(.3).setDepth(1).setAlpha(.3)
        this.controlDerecho = this.add.sprite(200,700, 'boton_flecha').setScale(.3).setDepth(1).setAlpha(.3)
        this.controlSalto = this.add.sprite((this.game.canvas.width - 100),670, 'boton_flecha').setScale(.3).setDepth(1).setAlpha(.3)

        this.controlDerecho.flipX = true
        //this.controlSalto.setOrigin( this.controlSalto.width / 2, this.controlSalto.height / 2 )
        this.controlSalto.setRotation(89.5)
        this.controlIzquierdo.setInteractive()
        this.controlDerecho.setInteractive()
        this.controlSalto.setInteractive()
        this.Moneda = this.scene.get(CST.SCENES.MONEDA)        
    }

    update( time: number, delta: number) {
        
        this.controlIzquierdo.on('pointerdown', () => {
            this.controlIzquierdo.setScale(.24)
            this.Moneda.events.emit('touch_left')
        })

        this.controlIzquierdo.on('pointerup', () => {
            this.controlIzquierdo.setScale(.3)
            this.Moneda.events.emit('touch_left_out')
        })

        this.controlDerecho.on('pointerdown', () => {
            this.controlDerecho.setScale(.24)
            this.Moneda.events.emit('touch_right')
        })

        this.controlDerecho.on('pointerup', () => {
            this.controlDerecho.setScale(.3)
            this.Moneda.events.emit('touch_right_out')
        })

        this.controlSalto.on('pointerdown', () => {
            this.controlSalto.setScale(.24)
            this.Moneda.events.emit('touch_jump')
        })

        this.controlSalto.on('pointerup', () => {
            this.controlSalto.setScale(.3)
            this.Moneda.events.emit('touch_jump_out')
        })
    }
}
