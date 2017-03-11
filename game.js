/*global Phaser*/
var game = new Phaser.Game(832, 640, Phaser.CANVAS, '');

game.state.add('boot', bootState);
game.state.add('preload', preloadState);
game.state.add('menu', menuState);
game.state.add('credits', creditsState);
game.state.add('intro', introState);
game.state.add('play', playState);
game.state.add('city', cityState);
game.state.add('shop', shopState);
game.state.add('tutorial', tutorialState);
game.state.add('defence', defenceState);
game.state.add('reset', resetState);
game.state.start('boot');

var canvasElement = document.getElementById("canvasID");
//var canvasWidth = canvasElement.style.width;

var kongregate;
var username;
var isGuest;

kongregateAPI.loadAPI(function(){
  kongregate = kongregateAPI.getAPI();
  // You can now access the Kongregate API with:
  isGuest = kongregate.services.isGuest();
  if (isGuest) {
      username = 'guest';
  }
  else {
    username = kongregate.services.getUsername();
  }
  // Proceed with loading your game...
  console.log("Username: " + username);
});
