class defeatScene extends Phaser.Scene {
    constructor() {
        super("defeat");

    }

    create() {
        defeatMusic.play();
        this.add.image(490, 350, "BG").setScale(2.8,2.8);

        d_text = this.add.text(350, 100, "         GAME OVER!! \n\nYou have failed. TRY AGAIN", {
            font: '40px Arial',
            fill: '#FFD700'

        });


        const quitButton = this.add.image(600, 450, 'back').setScale(.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            defeatMusic.stop()
            health = 10;
            enemies_left = 5;
            status = false;
            this.scene.start("mainMenu");
        });
    }

    update() {

    }
}