import { getGameHeight, getGameWidth } from "game/helpers";
import { FOOD_DUMMY } from "game/assets";

export class TopFood extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, -100, -100, FOOD_DUMMY, 0)
        this.setOrigin(0, 0)
    }

    public activate = (foodType: number, foodSpeed: number) => {
        this.scene.physics.world.enable(this);

        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(foodSpeed * getGameWidth(this.scene) * 0.125)
        this.setPosition(getGameWidth(this.scene), getGameHeight(this.scene) * 0.27)

        this.displayHeight = getGameHeight(this.scene) * 0.08 
        this.displayWidth = getGameWidth(this.scene) * 0.0625
    }

    public update = () => {
        if (this.x < -2 ) {
            (this.body as Phaser.Physics.Arcade.Body).destroy()
            this.setVisible(false)
        }
    }
}
        