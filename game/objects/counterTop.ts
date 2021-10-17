import { getGameHeight, getGameWidth } from "game/helpers";
import { MCWAGIE_COUNTER } from "game/assets";

export class CounterTop extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, -100, -100, MCWAGIE_COUNTER, 0)
        this.setOrigin(0, 0)
    }

    public activate = (counterType: number) => {
        this.scene.physics.world.enable(this);

        let counterTypeToX = {
          '0': 150,
          '1': getGameWidth(this.scene) - 150 - 128,
        };

        let counterTopY = (getGameHeight(this.scene) / 2) - (350 / 2) + 70;

        // (this.body as Phaser.Physics.Arcade.Body)

        (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);


        this.setPosition(counterTypeToX[counterType.toString()], counterTopY)

        // this.displayHeight = getGameHeight(this.scene) * 0.08
        // this.displayWidth = getGameWidth(this.scene) * 0.0625
    }
}
