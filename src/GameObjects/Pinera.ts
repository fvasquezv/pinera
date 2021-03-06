import 'phaser'

export class Pinera extends Phaser.Physics.Arcade.Sprite {

    hp: number
    direction: string
    isJumping: boolean = false
    private velocity: number


    constructor( scene : Phaser.Scene, x: number, y: number, texture: string, frame? : number) {
        
        super( scene, x, y, texture, frame )
        
        scene.sys.updateList.add(this)
        scene.sys.displayList.add(this)
        scene.physics.world.enableBody(this)
        

        /**
         * Construccion especifica de piñera
         */
        this.setScale(.8)
        this.setImmovable(true)
        this.play('pinera_idle')
        this.setCollideWorldBounds(true)

        /**
         * Parametros iniciales
         */
        this.hp = 10;
        this.velocity = 200
        this.direction = 'right'

    }

    /**
     * Reproduce la animación y verifica la dirección
     * del sprite hacia la derecha.
     */
    walkRight() {
        if ( this.direction === 'left') {
            this.flipX = false
            this.direction = 'right'
        }
        this.setVelocityX(this.velocity)
        this.play('pinera_run', true, 1)
    }

    /**
     * Reproduce la animación y verifica la dirección
     * del sprite hacia la derecha.
     */
    walkLeft() {
        if ( this.direction === 'right') {
            this.flipX = true 
            this.direction = 'left'
        }
        this.setVelocityX(-1 *this.velocity)
        this.play('pinera_run', true, 1)
    }

    jump() {
        // 1.- verificar si piñera esta en una superficie
        //if (this.y <= 1000) {
        if (this.body.blocked.down) {
            this.setVelocityY(-950)
            this.setAccelerationY(800)
        }
        //}
    }

    /**
     * Detiene el movimiento y reproduce la animacion IDLE
     */
    idle() {
        this.setVelocityX(0)
        this.play('pinera_idle', true, 1)
    }

}