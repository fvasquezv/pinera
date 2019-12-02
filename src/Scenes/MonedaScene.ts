import "phaser"
import { Pinera } from '../GameObjects/Pinera'
import { CST } from '../Config/CST'
import { makeAnimations } from '../Config/Animations'

export class MonedaScene extends Phaser.Scene {

    pinera!: Pinera
    keyboard: { [index:string] : Phaser.Input.Keyboard.Key }
    direction : string = 'right'
    isKeyboardPressed : boolean

    constructor() {
        super({
            key: CST.SCENES.MONEDA
        })
    }

    preload() {

        /**
         * Precarga de sprites
         */
        this.load.spritesheet('pinera_run_right', '../assets/sprites/pinera/run_right.png', { frameHeight: 250, frameWidth: 250 })
        this.load.spritesheet('pinera_idle_right', '../assets/sprites/pinera/idle.png', { frameHeight: 250, frameWidth: 250 })
    
    }

    create() {
        
        //@ts-ignore
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D")
        
        /**
         * No detener la animacion para eventos touch.
         */
        this.isKeyboardPressed = false

        /**
         * Cargar las animaciones de los sprites
         */
        makeAnimations(this)

        /**
         * CREAR A PIÑERA!!
         */
        this.pinera = new Pinera(this, 600, 600, 'pinera_idle_right', 1)
        
        /**
         * Manejo de eventos touch desde el HUD
         */
        this.events.on('touch_left', () => this.pinera.walkLeft())
        this.events.on('touch_left_out', () => this.pinera.idle())
        this.events.on('touch_right', () => this.pinera.walkRight())
        this.events.on('touch_right_out', () => this.pinera.idle())
    }

    update(time: number, delta: number) {
        
        if (this.pinera.y >= 675) {
            this.pinera.isJumping = false
        }

        if ( this.pinera.y <= 600) {
            this.pinera.isJumping = true
        }

        if (this.keyboard.D.isDown === true) {
            this.pinera.walkRight()
            this.isKeyboardPressed = true
        }

        if (this.keyboard.A.isDown === true) {
            this.isKeyboardPressed = true
            this.pinera.walkLeft()
        }

        if (this.keyboard.W.isDown === true) {
            if ( this.pinera.isJumping === false ) {
                this.pinera.jump()
            }
        }

        if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
            if ( this.isKeyboardPressed === true ) {
                this.pinera.idle()
                this.isKeyboardPressed = false
            }
        }
    }
}
