import { getGameHeight, getGameWidth } from "game/helpers";
import { CUSTOMER_COMMONROFL } from "game/assets";
import eventsCenter from 'game/objects/eventsCenter';

enum CustomerStatus {
  WalkingToCounter = 1,
  AtCounter = 2,
  LeavingCounter = 3,
}

export class Customer extends Phaser.GameObjects.Sprite {
    private customerType: number;
    private customerRow: number;
    private customerSpeed: number;
    private customerStatus: number = CustomerStatus.WalkingToCounter;
    private countdownTimer;
    private orderCountdown: number;
    private orderCounting: boolean = false;
    private timerText?: Phaser.GameObjects.Text;

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

    public deskCollision = () => {
      // console.log('deskCollision', this.customerRow, this.customerSpeed);
      if (this.customerStatus == CustomerStatus.WalkingToCounter) {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0)
        this.customerStatus = CustomerStatus.AtCounter;
        // console.log('make order', this.customerType, this.customerRow, this.customerSpeed);

        this.orderCountdown = 30;
        this.countdownTimer = this.scene.time.addEvent({
          delay: 1000,
          callback: this.decrementCountdown,
          callbackScope: true,
          loop: true
        })

        this.timerText = this.scene.add.text(this.x, this.y, this.orderCountdown.toString(), { color: '#fff200' }).setFontSize(70).setOrigin(0.5).setDepth(1)

        // console.log('collider', customerCounterCollider);
        // customerCounterCollider.active = false;
      }
    }

    private decrementCountdown = () => {
      this.orderCountdown -= 1;
      this.timerText?.setText(this.orderCountdown.toString())

      if (this.orderCountdown == 0) {
        eventsCenter.emit('gameOver');
        // this.scene.gameOver();
      }
    }
}
