class Level_boss extends Phaser.Scene{
    constructor(){
      super("finalLevel");
    }

    create() {
        gamePhysics = this.physics;

        // plays the music
        themeMusic.play();
        themeMusic.loop = true;

        // load map
        map = this.make.tilemap({ key: "map4" });

        // tilesets
        tileset = map.addTilesetImage("dungeon_tile", "tiles");
        tileset2 = map.addTilesetImage("tiles", "rock");
        

        // layer names
        belowLayer = map.createStaticLayer("below", tileset, 0, 0);
        worldLayer = map.createStaticLayer("world", tileset, 0, 0);
        aboveLayer = map.createStaticLayer("above", tileset, 0, 0);
        exitLayer = map.createStaticLayer("exit", tileset, 0, 0);
        obstacleLayer = map.createDynamicLayer("obstacle", tileset2, 0, 0);

        //objects have collision property
        worldLayer.setCollisionByProperty({ collides: true });
        aboveLayer.setCollisionByProperty({ collides: true });
        obstacleLayer.setCollisionByProperty({ collides: true });
        exitLayer.setCollisionByProperty({ collides: true });

        this.cameras.main.setBounds(0, 50, map.widthInPixels, map.heightInPixels);


        //creates player on spawn point
        spawnPoint = map.findObject("Spawn", obj => obj.name === "Spawn Point");

        player = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "player", "player-down-walk_001")
        .setScale(0.1, 0.1)
        .setSize(450, 500)
        .setOffset(330, 350);
        
        revealBoss(874, 585);

        // colliders
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(player, aboveLayer);
        this.physics.add.collider(boss, worldLayer);
        

        key = this.physics.add
            .sprite(256, 442, "key", "key-idle_001")
            .setScale(0.25, 0.25);
        key.anims.play("bomb", true);

        weaponHit = this.physics.add.group();

        // generate weapon on click
        this.input.on("pointerdown", function (pointer) {
            if(pointer.isDown) {    // if clicked
                console.log(pointer.x + " and " + pointer.y);
                console.log(status);
                // weapon = gamePhysics.add
                // .sprite(pointer.x, pointer.y, "bar", "weapon_001")
                // .setScale(0.07, 0.07);
                // weapon.body.setVelocity(0);
                // weapon.anims.play("spin", true);
                // weaponHit.add(weapon);

                // weapon.on("animationcomplete", () =>{ // after animation
                //     weapon.destroy();
                // })
            }
        });

        // camera
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();
        
        // texts
        t_lives = this.add.text(20, 20, 'LIVES:', {
            font: '40px Arial',
            fill: '#FFFFFF'
        });

        heart = this.add.image(40, 83, "heart");
        
        lives = this.add.text(70, 60, 'x' + health, {
            font: '40px Arial',
            fill: '#FFFFFF'
        });

        b_status = this.add.text(520, 20, 'Get the BOMB', {
            font: '30px Arial',
            fill: '#FFFFFF'
        });

        e_status = this.add.text(430, 60, 'Remaining Hits: ' + hits_left, {
            font: '30px Arial',
            fill: '#FFFFFF'
        });

        
        stage = this.add.text(1080, 20, 'STAGE \n  BOSS', {
            font: '30px Arial',
            fill: '#FFFFFF'
        });

        // text anchored to screen
        t_lives.setScrollFactor(0);
        heart.setScrollFactor(0);
        lives.setScrollFactor(0);
        b_status.setScrollFactor(0);
        e_status.setScrollFactor(0);
        stage.setScrollFactor(0);

        // collide event
        this.physics.add.collider(boss, player, weaponTouch, null, this);
        //this.physics.add.collider(player, enemies, hit, null, this);
        //gamePhysics.add.collider(weaponHit, enemies, weaponTouch, null, this);
        this.physics.add.collider(player, key, checkStatus, null, this);
        this.physics.add.collider(player, exitLayer, nextLevel, null, this);
        this.physics.add.collider(player, obstacleLayer, unlock, null, this);

        function nextLevel() {
            themeMusic.stop();
            this.scene.start("finalLevel");
        }

        
    }

    update() {
    
        playerMovement(player, cursors);

        moveBoss(boss);


          if ((hits_left == 0) && (status)) {
            e_status.setText("FINISH THE GAME!");
          }

          console.log("X: " + player.body.x + "Y: " + player.body.y);

    }
    
}