import { getGameHeight, getGameWidth } from 'game/helpers'

interface Props {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  frame?: number;
}

export class Player extends Phaser.GameObjects.Sprite {
  private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys;
  private leftKey: Phaser.Input.Keyboard.Key
  private rightKey: Phaser.Input.Keyboard.Key
  private upKey: Phaser.Input.Keyboard.Key
  private downKey: Phaser.Input.Keyboard.Key
  

  public speed = 200;

  constructor({ scene, x, y, key }: Props) {
    super(scene, x, y, key);

    // sprite
    this.setOrigin(0, 0);
    this.displayWidth = getGameWidth(this.scene) * 0.125
    this.displayHeight = getGameWidth(this.scene) * 0.125

    // Add animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers(key || '', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [ 2 ]}),
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [ 4 ]}),
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [ 6 ]}),
    });

    // physics
    this.scene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).setSize(getGameWidth(this.scene) * 0.06, getGameWidth(this.scene) * 0.09) 

    // input
    this.cursorKeys = scene.input.keyboard.createCursorKeys();
    this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    

    this.scene.add.existing(this);
  }

  update(): void {

    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.




   
      if (this.cursorKeys?.left.isDown || this.leftKey.isDown)
      {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-getGameWidth(this.scene) * 0.3);
        this.anims.play('left', true);
      }
      else if (this.cursorKeys?.right.isDown || this.rightKey.isDown) 
      {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(getGameWidth(this.scene) * 0.3);
        this.anims.play('right', true);
      } 
      else 
      {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
       // this.anims.play('idle', true);
      }

      
      if (this.cursorKeys?.down.isDown || this.downKey.isDown) 
      {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityY(getGameWidth(this.scene) * 0.25);
        this.anims.play('idle', false);
      }
      else if (this.cursorKeys?.up.isDown || this.upKey.isDown)
      {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-getGameWidth(this.scene) * 0.25);
        this.anims.play('up', true);
      }
      else 
      {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityY(0);
        //this.anims.play('idle', true);
      }
    

    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    // const normalizedVelocity = velocity.normalize();
    // (this.body as Phaser.Physics.Arcade.Body).setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
}
