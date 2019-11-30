import 'phaser'

export class Pinera extends Phaser.Physics.Arcade.Sprite {

    hp: number
    direction: string

    constructor( scene : Phaser.Scene, x: number, y: number, texture: string, frame? : number) {
        super( scene, x, y, texture, frame )
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setScale(1);
        scene.physics.world.enableBody(this);
        this.setImmovable(true);
        this.hp = 10;
        this.play('pinera_idle')
        this.direction = 'right'
    }

    walkRight() {
        if ( this.direction === 'left') {
            this.flipX = false
            this.direction = 'right'
        }
        this.setVelocityX(160)
        this.play('pinera_run', true, 1)
    }

    walkLeft() {
        if ( this.direction === 'right') {
            this.flipX = true 
            this.direction = 'left'
        }
        this.setVelocityX(-160)
        this.play('pinera_run', true, 1)
    }

    /**
     * Detiene el movimiento y reproduce la animacion IDLE
     */
    idle() {
        this.setVelocityX(0)
        this.play('pinera_idle', true, 1)
    }

}