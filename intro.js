/*global game*/
/*global Phaser*/
/*global Typewriter*/

var cutScene;
var typewriter;
var lowerTypewriter;
var skipText;
var introMusic;
var introState = {
    create: function() {
        introMusic = game.add.audio('introCreditsMusic');
        introMusic.play();
        cutScene = game.add.sprite(0, 0, 'introCutscene');
        game.add.sprite(0, 0, 'cutsceneBorder');
        game.add.button(-5, -5, 'blankButton', this.skip, this);
        skipText = game.add.bitmapText(40, 23, 'font', 'Skip Cutscene', 16);
        lowerTypewriter = new Typewriter();
        lowerTypewriter.init(game, {
            x: 116,
            y: 490,
            time: Phaser.Timer.SECOND / 20,
            fontFamily: "font",
            fontSize: 16,
            maxWidth: 600,
            //sound: reg.track,
            endFn: this.startButtonTextChange,
            text: "Centuries passed, many of the Kings and Queens who followed ruled wisely, but many more did not. The outlying Provinces broke away and grew hostile, leaving behind only an embattled core barely larger than a city state. Now the crops have failed again, your country is on the brink, and the horrors have returned to the badlands . . . ."
        });
        typewriter = new Typewriter();
        typewriter.init(game, {
            x: 116,
            y: 65,
            time: Phaser.Timer.SECOND / 20,
            fontFamily: "font",
            fontSize: 16,
            maxWidth: 600,
            //sound: reg.track,
            text: "The legends tell of a King of old, the first King, the founder of your dynasty. A King who, when the crops failed and his people were hungry, when the economy collapsed and his people lost hope, refused to surrender to despair. A King who instead undertook a great quest to vanquish the horrors of the badlands, and use their despoiled treasure to rebuild his shattered kingdom.",
            endFn: this.lowerTypewriterStart,
        });
        typewriter.start();
    },
    update: function() {
        cutScene.scale.x += 0.001;
        cutScene.scale.y += 0.001;
        cutScene.x = -Math.floor((cutScene.scale.x - 1)*600);
        cutScene.y = -Math.floor((cutScene.scale.y - 1)*300);
    },
    skip: function() {
        introMusic.stop();
        game.state.start('city');
    },
    lowerTypewriterStart: function() {
        game.time.events.add(Phaser.Timer.SECOND * 1.5, function () { lowerTypewriter.start(); });
    },
    startButtonTextChange: function() {
        skipText.text = "    Start Game";
    }
};