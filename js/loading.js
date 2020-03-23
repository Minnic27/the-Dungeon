class Load extends Phaser.Scene{
    constructor() {
        super("LoadGame");
    }

    preload() {
        // load assets
        this.load.tilemapTiledJSON("map1", "assets/map/level1.json"); // loads map
        this.load.tilemapTiledJSON("map2", "assets/map/level2.json"); // loads map
        this.load.tilemapTiledJSON("map3", "assets/map/level3.json"); // loads map
        this.load.spritesheet("tiles", "assets/images/dungeon_tile.png", {frameWidth: 50, frameHeight: 50}); // loads images
        this.load.spritesheet("rock", "assets/images/tiles.png", {frameWidth: 50, frameHeight: 50}); // loads images
        this.load.atlas("player", "assets/sprites/character.png", "assets/sprites/character.json"); // loads player
        this.load.atlas("enemy", "assets/sprites/enemy.png", "assets/sprites/enemy.json"); // loads enemy
        this.load.atlas("bar", "assets/sprites/weapon.png", "assets/sprites/weapon.json"); // loads weapon
        this.load.atlas("key", "assets/sprites/bomb.png", "assets/sprites/bomb.json"); // loads bomb
        this.load.image("BG", "assets/images/BG.png");
        this.load.image("heart", "assets/images/health.png");
        this.load.image('play', 'assets/images/play.png');
        this.load.image('back', 'assets/images/back.png');
        this.load.audio('BGM', [
            'assets/audio/level_bgm.ogg'
        ]);
        this.load.audio('Main_Menu', [
            'assets/audio/main_menu.ogg'
        ]);
        this.load.audio('Victory', [
            'assets/audio/victory.ogg'
        ]);
        this.load.audio('Defeat', [
            'assets/audio/defeat.ogg'
        ]);
    }

    create() {
        // add music
        themeMusic = this.sound.add("BGM");
        mainMusic = this.sound.add("Main_Menu");
        victoryMusic = this.sound.add("Victory");
        defeatMusic = this.sound.add("Defeat");
        
        // player animations
        const anims = this.anims;
        anims.create({
            key: "player-down-walk",
            frames: anims.generateFrameNames("player", {
            prefix: "player-down-walk_",
            start: 1,
            end: 4,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "player-up-walk",
            frames: anims.generateFrameNames("player", {
            prefix: "player-up-walk_",
            start: 1,
            end: 4,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "player-right-walk",
            frames: anims.generateFrameNames("player", {
            prefix: "player-right-walk_",
            start: 1,
            end: 4,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "player-left-walk",
            frames: anims.generateFrameNames("player", {
            prefix: "player-left-walk_",
            start: 1,
            end: 4,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        // enemy animations
        anims.create({
            key: "enemy-walk",
            frames: anims.generateFrameNames("enemy", {
            prefix: "enemy-walk_",
            start: 1,
            end: 4,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        // weapon animation
        anims.create({
            key: "spin",
            frames: anims.generateFrameNames("bar", {
            prefix: "weapon_",
            start: 1,
            end: 9,
            zeroPad: 3
            }),
            frameRate: 10,
            
        });

        // bomb animation
        anims.create({
            key: "bomb",
            frames: anims.generateFrameNames("key", {
            prefix: "key-idle_",
            start: 1,
            end: 9,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
            
        });
    }

    update() {
        this.scene.start("mainMenu");
    }
}