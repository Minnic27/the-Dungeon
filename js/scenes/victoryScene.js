class victoryScene extends Phaser.Scene {
    constructor() {
        super("winScene");

    }

    create() {
        victoryMusic.play();
        this.add.image(490, 350, "BG").setScale(2.8,2.8);

        v_text = this.add.text(320, 100, "      CONGRATULATIONS!! \n\nYou have completed the game", {
            font: '40px Arial',
            fill: '#FFD700'

        });


        const quitButton = this.add.image(600, 450, 'back').setScale(.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            victoryMusic.stop()
            enemies_left = 5;
            status = false;
            this.scene.start("mainMenu");
        });
    }

    update() {

    }
}