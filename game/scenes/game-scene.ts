import {
  LEFT_CHEVRON, BG, CLICK, LOWER_BELT
} from 'game/assets';
import { AavegotchiGameObject } from 'types';
import { getGameWidth, getGameHeight, getRelative } from '../helpers';
import { Player, TopFood, BottomFood } from 'game/objects';


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

  // Sounds
  private back?: Phaser.Sound.BaseSound;

  constructor() {
    super(sceneConfig);
  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  private fetchFood = () => {
    const foodType = 0 
    const foodSpeed = -1

    this.loadBelt(foodType, foodSpeed)
  }

  private loadBelt = (foodType: number, foodSpeed: number): void => {
    const food: TopFood = this.topFoodLine?.get()
    food.activate(foodType, foodSpeed)  
  }



  public create(): void {
    // Add layout
    this.add.image(getGameWidth(this) / 2, getGameHeight(this) / 2, BG).setDisplaySize(getGameWidth(this), getGameHeight(this));
    this.back = this.sound.add(CLICK, { loop: false });
    this.createBackButton();

    const lowerBelt = this.add.sprite(getGameWidth(this) * 0.5 , getGameHeight(this) * 0.75 + getGameHeight(this) * 0.1875, LOWER_BELT).setDisplaySize(getGameWidth(this), getGameHeight(this) * 0.25).setVisible(true).setDepth(0.25)
    this.physics.add.existing(lowerBelt, true)

    const floor = this.add.rectangle(0, getGameHeight(this) * 0.9).setDisplaySize(getGameWidth(this), 50).setOrigin(0, 0)
    this.physics.add.existing(floor, true)

    const leftWall = this.add.rectangle(-100, -getGameHeight(this) * 40, 0x000000).setDisplaySize(50, getGameHeight(this) * 50,).setOrigin(0, 0)
    this.physics.add.existing(leftWall, true)

    const rightWall = this.add.rectangle(getGameWidth(this), -getGameHeight(this) * 40, 0x000000).setDisplaySize(50, getGameHeight(this) * 50,).setOrigin(0, 0)
    this.physics.add.existing(rightWall, true)

    const ceiling  = this.add.rectangle(0, getGameHeight(this) * 0.25).setDisplaySize(getGameWidth(this), 50).setOrigin(0, 0)
    this.physics.add.existing(ceiling, true)

    this.topFoodLine = this.add.group({
      maxSize: 500, 
      classType: TopFood,
      runChildUpdate: true, 
    })

    this.time.addEvent({
      delay: 1000,
      callback: this.fetchFood,
      callbackScope: true,
      loop: true
    })

 


    this.bottomFoodLine = this.add.group({
      maxSize: 30, 
      classType: BottomFood, 
    })


    // Add a player sprite that can be moved around.
    this.player = new Player({
      scene: this,
      x: getGameWidth(this) / 2,
      y: getGameHeight(this) / 2,
      key: this.selectedGotchi?.spritesheetKey || ''
    })

    this.physics.add.collider(floor, this.player);
    this.physics.add.collider(leftWall, this.player);
    this.physics.add.collider(rightWall, this.player);
    this.physics.add.collider(ceiling, this.player);

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
