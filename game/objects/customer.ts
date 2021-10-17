import { getGameHeight, getGameWidth } from "game/helpers";
import { CUSTOMER_COMMONROFL } from "game/assets";

export class Customer extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, -100, -100, CUSTOMER_COMMONROFL, 0)
        this.setOrigin(0, 0)
    }

    public activate = (customerType: number, customerRow: number, customerSpeed: number) => {
        this.scene.physics.world.enable(this);

        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(customerSpeed * getGameWidth(this.scene) * 0.125)

        let customerRowToHeight = {
          '0': getGameHeight(this.scene) * 0.40,
          '1': getGameHeight(this.scene) * 0.54,
          '2': getGameHeight(this.scene) * 0.68,
        };

        let customerSpeedToStart = {
          '-1': getGameWidth(this.scene) + 200,
          '1': -200,
        };

        this.setPosition(customerSpeedToStart[customerSpeed.toString()], customerRowToHeight[customerRow.toString()])

        this.displayHeight = getGameHeight(this.scene) * 0.08
        this.displayWidth = getGameWidth(this.scene) * 0.0625

        this.customerType = customerType;
        this.customerRow = customerRow;
        this.customerSpeed = customerSpeed;
    }

    public update = () => {
        if (this.x < -300 || this.x >= (getGameWidth(this.scene) + 300) ) {
            (this.body as Phaser.Physics.Arcade.Body).destroy()
            this.setVisible(false)
        }
    }
}
