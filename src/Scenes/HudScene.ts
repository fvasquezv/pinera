import 'phaser'
import { CST } from '../Config/CST'

export class HudScene extends Phaser.Scene {

    /**
     * Definición de botones.
     */
    controlIzquierdo!: Phaser.GameObjects.Sprite
    controlDerecho!: Phaser.GameObjects.Sprite
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

        /**
         * Crear botonoes e insertarlos en el HUD
         */
        this.controlIzquierdo = this.add.sprite(100,600, 'boton_flecha').setScale(.4).setDepth(1)
        this.controlDerecho = this.add.sprite(1100,600, 'boton_flecha').setScale(.4).setDepth(1)
        this.controlDerecho.flipX = true
        this.controlIzquierdo.setInteractive()
        this.controlDerecho.setInteractive()
        this.Moneda = this.scene.get(CST.SCENES.MONEDA)        
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
