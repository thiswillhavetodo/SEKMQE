/*global game*/

var bootState = {
    preload: function() {
        //game.load.image('star', 'assets/star.png');
        game.load.image('preloadBar', 'assets/preloadBar.png');
        game.canvas.id = 'canvasID';
    },
    create: function() {
        game.state.start('preload');
    }
};