import {
  LEFT_CHEVRON, BG, CLICK, LOWER_BELT, TRASH
} from 'game/assets';
import { AavegotchiGameObject } from 'types';
import { getGameWidth, getGameHeight, getRelative } from '../helpers';
import { Player, TopFood, BottomFood, Customer, CounterTop } from 'game/objects';


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

/**
 * Scene where gameplay takes place
 */
export class GameScene extends Phaser.Scene {
  private player?: Player;
  private selectedGotchi?: AavegotchiGameObject;
  private topFoodLine?: Phaser.GameObjects.Group
  private bottomFoodLine?: Phaser.GameObjects.Group
  private customers?: Phaser.GameObjects.Group
  private counterTops?: Phaser.GameObjects.Group
  private grabKey: Phaser.Input.Keyboard.Key
  private score = 0;
  private scoreText?: Phaser.GameObjects.Text;

  // Sounds
  private back?: Phaser.Sound.BaseSound;
  private trash?: Phaser.Sound.BaseSound;


  constructor() {
    super(sceneConfig);


  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  private fetchFoodTop = () => {
    const foodType = 0
    const foodSpeed = -1

    this.loadBeltTop(foodType, foodSpeed)
  }

  private loadBeltTop = (foodType: number, foodSpeed: number): void => {
    const food: TopFood = this.topFoodLine?.get()
    food.activate(foodType, foodSpeed)
  }

  private fetchFoodBottom = () => {
    const foodType = 0
    const foodSpeed = -1

    this.loadBeltBottom(foodType, foodSpeed)
  }

  private loadBeltBottom = (foodType: number, foodSpeed: number): void => {
    const food: BottomFood = this.bottomFoodLine?.get()
    food.activate(foodType, foodSpeed)
  }

  private fetchCustomer = () => {
    console.log('fetchCustomer');
    const customerType = 0
    const customerRow = Math.floor(Math.random() * 3)

    let speeds = [-1, 1];
    const customerSpeed = speeds[Math.floor(Math.random() * speeds.length)]

    this.loadCustomer(customerType, customerRow, customerSpeed)
  }

  private loadCustomer = (customerType: number, customerRow: number, customerSpeed: number): void => {
    const customer: Customer = this.customers?.get()
    customer.activate(customerType, customerRow, customerSpeed)
  }


  public create(): void {
    // Add layout
    this.add.image(getGameWidth(this) / 2, getGameHeight(this) / 2, BG).setDisplaySize(getGameWidth(this), getGameHeight(this));
    this.back = this.sound.add(CLICK, { loop: false });
    this.trash = this.sound.add(TRASH, { loop: false });
    this.createBackButton();

    const lowerBelt = this.add.sprite(getGameWidth(this) * 0.5 , getGameHeight(this) * 0.82 + getGameHeight(this) * 0.1875, LOWER_BELT).setDisplaySize(getGameWidth(this) *1.5, getGameHeight(this) * 0.4).setVisible(true).setDepth(0.25)
    this.physics.add.existing(lowerBelt, true)

    const floor = this.add.rectangle(0, getGameHeight(this) * 0.9).setDisplaySize(getGameWidth(this), 50).setOrigin(0, 0)
    this.physics.add.existing(floor, true)

    const leftWall = this.add.rectangle(-100, -getGameHeight(this) * 40, 0x000000).setDisplaySize(50, getGameHeight(this) * 50,).setOrigin(0, 0)
    this.physics.add.existing(leftWall, true)

    const rightWall = this.add.rectangle(getGameWidth(this), -getGameHeight(this) * 40, 0x000000).setDisplaySize(50, getGameHeight(this) * 50,).setOrigin(0, 0)
    this.physics.add.existing(rightWall, true)

    const ceiling  = this.add.rectangle(0, getGameHeight(this) * 0.25).setDisplaySize(getGameWidth(this), 50).setOrigin(0, 0)
    this.physics.add.existing(ceiling, true)

    this.scoreText = this.add.text(getGameWidth(this) * 0.5, getGameHeight(this) * 0.15, this.score.toString(), { color: '#fff200' }).setFontSize(getRelative(70, this)).setOrigin(0.5).setDepth(1)

    this.topFoodLine = this.add.group({
      maxSize: 500,
      classType: TopFood,
      runChildUpdate: true,
    })

    this.time.addEvent({
      delay: 1100,
      callback: this.fetchFoodTop,
      callbackScope: true,
      loop: true
    })

    this.bottomFoodLine = this.add.group({
      maxSize: 300,
      classType: BottomFood,
      runChildUpdate: true,
    })

    this.time.addEvent({
      delay: 750,
      callback: this.fetchFoodBottom,
      callbackScope: true,
      loop: true
    })

    this.customers = this.add.group({
      maxSize: 500,
      classType: Customer,
      runChildUpdate: true,
    })

    this.time.addEvent({
      delay: 5000,
      callback: this.fetchCustomer,
      callbackScope: true,
      loop: true
    })

    this.counterTops = this.add.group({
      maxSize: 500,
      classType: CounterTop,
      runChildUpdate: true,
    })

    const leftCounterTop: Customer = this.counterTops?.get();
    leftCounterTop.activate(0);

    const rightCounterTop: Customer = this.counterTops?.get();
    rightCounterTop.activate(1);

    // Add a player sprite that can be moved around.
    this.player = new Player({
      scene: this,
      x: getGameWidth(this) / 2,
      y: getGameHeight(this) / 2,
      key: this.selectedGotchi?.spritesheetKey || ''
    }).setDepth(0.125)

    this.grabKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.physics.add.collider(floor, this.player);
    this.physics.add.collider(leftWall, this.player);
    this.physics.add.collider(rightWall, this.player);
    this.physics.add.collider(ceiling, this.player);

    this.physics.add.collider(this.player, this.counterTops);
    this.physics.add.collider(this.customers, this.counterTops);
    this.physics.add.collider(this.customers, this.customers);

    this.physics.add.overlap(this.player, this.topFoodLine, (_, TopFood) => { this.foodInteractTop(TopFood) });
    this.physics.add.overlap(this.player, this.bottomFoodLine, (_, BottomFood) => { this.foodInteractBottom(BottomFood) });
  }

  private foodInteractTop(TopFood) {
    if (this.grabKey.isDown) {
      TopFood.destroy()
      this.score += 1
      this.scoreText?.setText(this.score.toString())
      this.trash?.play();
    }
  }

  private foodInteractBottom(BottomFood) {
    if (this.grabKey.isDown) {
      BottomFood.destroy()
      this.score += 1
      this.scoreText?.setText(this.score.toString())
      this.trash?.play();
    }
  }

  private createBackButton = () => {
    this.add
      .image(getRelative(54, this), getRelative(54, this), LEFT_CHEVRON)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .setDisplaySize(getRelative(94, this), getRelative(94, this))
      .on('pointerdown', () => {
        this.back?.play();
        window.history.back();
      });
  };

  public update(): void {
    // Every frame, we update the player
    this.player?.update();


  }
}
