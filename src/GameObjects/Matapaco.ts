import 'phaser'

export class Matapaco extends Phaser.Physics.Arcade.Sprite {

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


}