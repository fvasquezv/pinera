import "phaser"
import { Pinera } from '../GameObjects/Pinera'
import { Matapaco } from '../GameObjects/Matapaco'
import { CST } from '../Config/CST'
import { makeAnimations } from '../Config/Animations'

export class MonedaScene extends Phaser.Scene {

    pinera!: Pinera
    matapaco : Matapaco

    keyboard: { [index:string] : Phaser.Input.Keyboard.Key }
    direction : string = 'right'
    isKeyboardPressed : boolean
    floor : Phaser.GameObjects.Image
    bg : Phaser.GameObjects.Image
    cielo: Phaser.GameObjects.Image
    lastSpawn: number = 0
    spawnTime: number = Math.random() * 3000 + 2000

    constructor() {
        super({
            key: CST.SCENES.MONEDA
        })
    }

    preload() {

        /**
         * Precarga de sprites
         */
        this.load.spritesheet('pinera_run_right', '../assets/sprites/pinera/run_right.png', { frameHeight: 232, frameWidth: 250 })
        this.load.spritesheet('pinera_idle_right', '../assets/sprites/pinera/idle.png', { frameHeight: 232, frameWidth: 250 })
        this.load.image('background', '../assets/sprites/fondo.png')
        this.load.image('cielo', '../assets/sprites/cielo.gif')
        this.load.image('floor', '../assets/sprites/floor.png')
        this.load.spritesheet('matapaco', '../assets/sprites/matapaco.png',   { frameHeight: 232, frameWidth: 250 })
    
    }

    create() {
        
        //this.physics.world.setBounds(1200, 800, 10, 10)
        this.physics.world.setBoundsCollision(true, true, true, true)
       
        // Cargar fondo
        this.bg = this.add.image(0,0, 'background').setOrigin(0.5,0).setScale(.7).setDepth(2)
        this.cielo = this.add.image(0,0, 'cielo').setOrigin(0.5, 0).setScale(1).setDepth(1)
    
        this.physics.world.enableBody(this.matapaco)
        this.physics.add.existing(this.matapaco, true)


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
        this.pinera = new Pinera(this, 600, 600, 'pinera_idle_right', 1).setDepth(3)
        this.matapaco = new Matapaco(this, 600, 600, 'matapaco', 1).setDepth(3)

        
        
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
        this.cielo.x = this.pinera.x

        this.physics.add.collider(this.matapaco, this.pinera)


    }

    update(time: number, delta: number) {

        //console.log(this.pinera.anims.currentAnim.key)
        
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
                this.bg.x -= (this.pinera.x * 1) / 1500
                this.cielo.x -= (this.pinera.x * 1) / 3000
            }
        
        }

        if (this.keyboard.A.isDown === true) {
            this.isKeyboardPressed = true
            this.pinera.walkLeft()
            if (this.pinera.body.blocked.left === false) {
                this.bg.x += (this.pinera.x * 1) / 1500
                this.cielo.x += (this.pinera.x * 1) / 3000
            }
        }

        if (this.keyboard.W.isDown === true) {
                this.pinera.jump()
        }

        if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
            if ( this.isKeyboardPressed === true ) {
                this.pinera.idle()
                this.isKeyboardPressed = false
            }
        }
    }
}
