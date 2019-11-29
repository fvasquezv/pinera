import "phaser"
import { CST } from '../Config/CST'

export class MonedaScene extends Phaser.Scene {

    pinera!: Phaser.Physics.Arcade.Sprite
    keyboard: { [index:string] : Phaser.Input.Keyboard.Key }
    direction : string = 'right'


    constructor() {
        super({
            key: CST.SCENES.MONEDA
        })
    }

    init() {
    }

    preload() {
        this.load.spritesheet('pinera_run_right', '../assets/sprites/pinera/run_right.png', { frameHeight: 250, frameWidth: 250 })
        this.load.spritesheet('pinera_idle_right', '../assets/sprites/pinera/idle.png', { frameHeight: 250, frameWidth: 250 })
    }

    create() {
            
        this.anims.create({
            key: 'pinera_run',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('pinera_run_right', {
                start: 1,
                end: 8
            }),
            repeat: -1,
        })

        this.anims.create({
            key: 'pinera_idle',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('pinera_idle_right', {
                start: 1, 
                end: 5
            }),
            repeat: -1
        })

        // @ts-ignore
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D")
        this.pinera = this.physics.add.sprite( 600, 590, 'pinera_run_right', 0).setScale(1).setImmovable(true)

    }

    update(time: number, delta: number) {

        if (this.keyboard.D.isDown === true) {
            
            if ( this.direction === 'left') {
                this.pinera.flipX = false
                this.direction = 'right'
            }
            this.pinera.setVelocityX(160)
            this.pinera.play('pinera_run', true, 1)
        }

        if (this.keyboard.A.isDown === true) {

            if ( this.direction === 'right') {
                this.pinera.flipX = true 
                this.direction = 'left'
            }
            this.pinera.setVelocityX(-160)
            this.pinera.play('pinera_run', true, 1)

        }

        if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
            this.pinera.setVelocityX(0)
            this.pinera.play('pinera_idle', true, 1)
        }

    }
}
