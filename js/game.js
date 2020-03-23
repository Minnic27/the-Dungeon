var config = {
    type: Phaser.AUTO,
      width: 1200,
      height: 700,
      scene: [Load, MainMenu, Level1, Level2, Level3, victoryScene, defeatScene],
      physics: {
          default: 'arcade',
          arcade: {
              gravity: {y: 0},
              debug: false
          }
      },
     
  };
  

let game = new Phaser.Game(config);
var map;
var spawnPoint;
var tileset, tileset2;
var belowLayer, worldLayer, aboveLayer, obstacleLayer, exitLayer;
var player;
var speed;
var cursors;
var weapon, weaponHit;
var themeMusic, mainMusic, victoryMusic, defeatMusic;
var enemies, enemyX, enemyY;
var gamePhysics;
var heart;
var health = 10;
var t_lives, lives;
var b_status, e_status, d_text, v_text;
var status = false;
var stage;
var key;
var enemies_left = 5;



function playerMovement(player, cursors) {

  if (player.active === true) {
    speed = 175;

  // Stop any previous movement from the last frame
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);

  // Update the animation last and give left/right animations precedence over up/down animations
  if (cursors.left.isDown) {
      player.anims.play("player-left-walk", true);
  } else if (cursors.right.isDown) {
      player.anims.play("player-right-walk", true);
  } else if (cursors.up.isDown) {
      player.anims.play("player-up-walk", true);
  } else if (cursors.down.isDown) {
      player.anims.play("player-down-walk", true);
  } else {
      player.anims.stop();
    }
  }
  
}

function generateEnemies(num, positionX, positionY) {
    for (var i=0; i<num; i++) {
        this.enemy = gamePhysics.add
        .sprite(positionX[i], positionY[i], "enemy", "enemy-walk_001")
        .setScale(0.15, 0.15)
        .setSize(420, 550)
        .setOffset(250, 230);
        this.enemy.velocity = 100;
        gamePhysics.add.collider(this.enemy, worldLayer);
        gamePhysics.add.collider(this.enemy, aboveLayer);
        this.enemy.active = true;
        enemies.push(this.enemy);
    }
}


function moveEnemies(enemy){
  if(enemy.active === true){
      enemy.anims.play('enemy-walk', true);
      if(enemy.body.blocked.right){
        enemy.flipX = true;
        enemy.body.setVelocityX(-125);
        enemy.velocity = -125;
      }
      else if(enemy.body.blocked.left){
        enemy.flipX = false;
        enemy.body.setVelocityX(125);
        enemy.velocity = 125;
      }
      else{
        enemy.body.setVelocityX(enemy.velocity);
      }
   }
  }

function hit() {  
    console.log("hit");
    player.active = false;
    player.body.setVelocity(0);
    player.destroy();

  const cam = this.cameras.main;
    cam.shake(100, 0.05);
    cam.fade(250, 0, 0, 0);


    cam.once("camerafadeoutcomplete", () => {
      themeMusic.stop();
      health -= 1;
      enemies_left = 5;
      status = false;
      this.scene.restart();
    });
    
}

function weaponTouch(enemy, weapon) {
  console.log("dead");
  enemy.body.setVelocity(0);
  enemy.active = false;
  enemy.destroy();
  enemies_left -= 1;
  e_status.setText('Defeat remaining enemies: ' + enemies_left);
}


function checkStatus(player, key) {
  console.log("get");
  key.body.setVelocity(0);
  key.active = false;
  key.destroy();
  status = true;
  b_status.setText("");
};

function unlock(player, obstacle) {

  if ((enemies_left == 0) && (status)) {
    map.removeTileAt(obstacle.x, obstacle.y, obstacleLayer);
    console.log("unlocked");
  }
          
}

  
