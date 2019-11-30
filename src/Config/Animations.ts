
import 'phaser'
export function makeAnimations(scene: Phaser.Scene) {
    
    scene.anims.create({
        key: 'pinera_idle',
        frameRate: 12,
        frames: scene.anims.generateFrameNumbers('pinera_idle_right', {
            start: 1, 
            end: 5
        }),
        repeat: -1
    })

    scene.anims.create({
        key: 'pinera_run',
        frameRate: 12,
        frames: scene.anims.generateFrameNumbers('pinera_run_right', {
            start: 1,
            end: 8
        }),
        repeat: -1,
    })

}