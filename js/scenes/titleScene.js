class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }

    create() {
        this.Em = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.add.image(490, 350, "BG").setScale(2.8,2.8);


        this.titleText = this.add.text(375, 100, 'THE DUNGEON', { font: "60px Arial", fill: '#FFD700' });
        const playButton = this.add.image(600, 400, 'play').setScale(.2);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            mainMusic.stop();
            this.scene.start("level1");
        });
        mainMusic.play();
        mainMusic.loop = true;

    }
    update() {

        if (Phaser.Input.Keyboard.JustDown(this.Em)) {
            mainMusic.stop();
            mainMusic.play();
            mainMusic.loop = true;

        }
    }

    
}