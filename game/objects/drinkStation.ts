import { getGameHeight, getGameWidth } from "game/helpers";
import { DRINK } from "game/assets";

export class DrinkStation extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, -100, -100, DRINK, 0)
        this.setOrigin(0, 0)
    }

    public activate = (type: number) => {
        this.scene.physics.world.enable(this);

        this.displayHeight = getGameHeight(this.scene) * 0.25;
        this.displayWidth = getGameWidth(this.scene) * 0.125;

        (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);


        this.setPosition(getGameWidth(this.scene) * 0.375 , getGameHeight(this.scene) * 0.25);


    }
}
