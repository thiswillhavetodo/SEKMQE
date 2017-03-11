/*global game*/
/*global Phaser*/
/*global Typewriter*/

var resetCutScene;
var resetTypewriter;
var resetLowerTypewriter;
var skipText;
var introMusic;
var resetState = {
    create: function() {
        introMusic = game.add.audio('introCreditsMusic');
        introMusic.play();
        resetCutScene = game.add.sprite(0, 0, 'marriageCutscene');
        game.add.sprite(0, 0, 'cutsceneBorder');
        game.add.button(-5, -5, 'blankButton', this.skip, this);
        skipText = game.add.bitmapText(40, 20, 'font', 'Skip Cutscene', 16);
        resetLowerTypewriter = new Typewriter();
        resetLowerTypewriter.init(game, {
            x: 116,
            y: 490,
            time: Phaser.Timer.SECOND / 18,
            fontFamily: "font",
            fontSize: 16,
            maxWidth: 600,
            //sound: reg.track,
            endFn: this.startButtonTextChange,
            text: "Many years later, you received troubling news from a small kingdom bordering the badlands. Your years of questing had beaten back the horrors, but some had fled and sought easier prey. The King and Queen of this kingdom had died valiantly defending their land, extinguishing their line. The kingdom pleaded for your aid and so, with a heavy heart, you sent your youngest child with their personal guard and a modest sum of gold to take the throne."
        });
        resetTypewriter = new Typewriter();
        resetTypewriter.init(game, {
            x: 116,
            y: 65,
            time: Phaser.Timer.SECOND / 18,
            fontFamily: "font",
            fontSize: 16,
            maxWidth: 600,
            //sound: reg.track,
            text: "The Alliance with your neighbour made a strong Kingdom even stronger, bringing peace and prosperity to the whole region. Your marriage was a happy one and together you raised many children to continue your line. Although you no longer had need to quest in the badlands you ensured your sons and daughters were well trained to defend their city should the need ever arise again.",
            endFn: this.lowerTypewriterStart,
        });
        resetTypewriter.start();
    },
    update: function() {
        resetCutScene.scale.x += 0.001;
        resetCutScene.scale.y += 0.001;
        resetCutScene.x = -Math.floor((resetCutScene.scale.x - 1)*400);
        resetCutScene.y = -Math.floor((resetCutScene.scale.y - 1)*290);
    },
    skip: function() {
        introMusic.stop();
        game.state.start('city');
    },
    lowerTypewriterStart: function() {
        game.time.events.add(Phaser.Timer.SECOND * 1, function () { resetLowerTypewriter.start(); });
    },
    startButtonTextChange: function() {
        skipText.text = "Start Game";
    }
};