import "phaser"
import { Pinera } from '../GameObjects/Pinera'
import { CST } from '../Config/CST'
import { makeAnimations } from '../Config/Animations'

export class MonedaScene extends Phaser.Scene {

    pinera!: Pinera
    keyboard: { [index:string] : Phaser.Input.Keyboard.Key }
    direction : string = 'right'
    isKeyboardPressed : boolean
    floor : Phaser.GameObjects.Sprite
    bg : Phaser.GameObjects.Image

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
        this.load.image('background', '../assets/sprites/fondo.gif')
        this.load.image('floor', '../assets/sprites/floor.png')
    
    }

    create() {
        
        //this.physics.world.setBounds(1200, 800, 10, 10)
        this.physics.world.setBoundsCollision(true, true, true, true)
        
        // Cargar fondo
        this.bg = this.add.image(0,0, 'background').setOrigin(0.5,0).setScale(1)

        this.floor = this.add.sprite(this.game.canvas.height,0, 'floor').setOrigin(0)
        

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
        this.events.on('touch_jump', () => this.pinera.jump())
        this.events.on('touch_jump_out', () => this.pinera.idle())

        this.bg.x = this.pinera.x

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
            if (this.pinera.body.blocked.right === false) {
                this.bg.x -= (this.pinera.x * 1) / 2000
            }
        }

        if (this.keyboard.A.isDown === true) {
            this.isKeyboardPressed = true
            this.pinera.walkLeft()
            if (this.pinera.body.blocked.left === false) {
                this.bg.x += (this.pinera.x * 1) / 2000
            }
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
