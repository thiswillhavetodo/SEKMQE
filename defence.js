/* global game */
/* global Phaser */
/* global coins */
/* global player */
/* global bullets */
/* global defence */
var attackers;
var defenders;
var obstacles;
//var attacker;
//var defender;
var attackStrength = 5;
var attackerCount = attackStrength;
var defenceStrength = Math.round(defence/4);
var defenderCount = Math.round(defence/4);
var defenceAudio;
var newCitizens;
var defendingDoorOpen = false;

var tutorialDefence = "first";
var tutorialSprite;
var tutorialSpeechBubble;
var tutorialText = "";
var tutorialText2 = "";
var tutorialText3 = "";
var tutorialText4 = "";
var tutorialText5 = "";
var tutorialText6 = "";

var defenceState = {
    create: function() {
        game.world.removeAll();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'cityOutskirts');
        
        defenceAudio = game.add.audio('defence');
        defenceAudio.stop();
        defenceAudio.loopFull(0.5);
        
        //  Set up gui and display text
        if (coins>=1000000) {
            coinsText = game.add.bitmapText(395, 10, 'font', (Math.round(coins/1000))/1000 + "M", 30);
        }
        else {
            coinsText = game.add.bitmapText(395, 10, 'font', coins, 30);
        }
        hudDisplay = game.add.sprite(0, 0, 'hudDisplay');
        hudDisplay.scale.setTo(1.1, 1.1);
        hpBar = game.add.sprite(92, 7, 'hudBarRed');
        hpBar.scale.setTo(1.1, 1.1);
        hpCrop = new Phaser.Rectangle(0, 0, 88, 15);
        hpBar.crop(hpCrop);
        healthText = game.add.bitmapText(93, 7, 'fontWhite', 'HP: ' + health + "/" + maxHealth, 15);
        manaBar = game.add.sprite(92, 28, 'hudBarBlue');
        manaBar.scale.setTo(1.1, 1.1);
        manaCrop = new Phaser.Rectangle(0, 0, 88, 15);
        manaBar.crop(manaCrop);
        manaText = game.add.bitmapText(93, 28, 'fontWhite', 'MP: ' + mana + "/" + maxMana, 15); 
        xpBar = game.add.sprite(92, 50, 'hudBarGreen');
        xpBar.scale.setTo(1.1, 1.1);
        xpCrop = new Phaser.Rectangle(0, 0, 88, 15);
        xpBar.crop(xpCrop);
        xpText = game.add.bitmapText(93, 50, 'fontWhite', 'XP: ' + xpDisplay + '/' + nextLevelXpDisplay, 15);
        this.xpDisplayConvert();
        if (playerLevel>=100) {
           playerLevelText = game.add.bitmapText(9, 23, 'font', playerLevel, 30);  
        }
        else if (playerLevel>=10) {
           playerLevelText = game.add.bitmapText(18, 23, 'font', playerLevel, 30);  
        }
        else {
           playerLevelText = game.add.bitmapText(26, 23, 'font', playerLevel, 30); 
        }
        
        coinsText.alpha = 0.7;
        xpText.alpha = 0.7;
        healthText.alpha = 0.7;
        manaText.alpha = 0.7;
        playerLevelText.alpha = 0.7;
        coinDisplay = game.add.sprite(360, 8, 'coin');
        coinDisplay.frame = 0;
        
        // The player and its settings
        player = game.add.sprite(16, 300, 'dude');
        
        //  enable physics on the player
        game.physics.arcade.enable(player);
        player.body.setSize(27, 12, 2, 22);
        player.body.collideWorldBounds = true;
        player.isAlive = true;
        player.spinTimer = 0;
        //  Our animations, walking left, right, up and down.
        player.animations.add('left', [9, 10, 11], 10, true);
        player.animations.add('right', [3, 4, 5], 10, true);
        player.animations.add('up', [0, 1, 2], 10, true);
        player.animations.add('down', [6, 7, 8], 10, true);
        player.animations.add('spin', [14, 12, 15, 13], 8, false);
        player.animations.add('stop', [4], 10, true);
        player.animations.play('stop');
        
        spinSFX = game.add.audio('spinSFX');
        spinSFX.allowMultiple = false;
        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.createMultiple(90, 'bullet');
        attackers = game.add.group();
        attackers.enableBody = true;  
        defenders = game.add.group();
        defenders.enableBody = true;  
        obstacles = game.add.group();
        obstacles.enableBody = true;  
        
        for (var i=1; i<=attackStrength; i++) {
            this.attackerCreate(750, ((i-1)*32)+(300-(attackStrength/2*32)));
        }
        if (coins>=0) {
            for (var i=0; i<=defenceStrength; i++) {
                if (i<=10) {
                    this.defenderCreate(224, (i*32)+(300-(defenceStrength/2*32)));
                }
                else {
                    this.defenderCreate(188, ((i-10)*32)+(300-(defenceStrength/2*32)));
                }
            }
        }
        for (var i=0; i<=7; i++) {
            if (i<3) {
                var statue = obstacles.create(512, (i*96)-40, 'statue');
                statue.body.setSize(30, 18, 1, 45);
                statue.body.immovable = true;
                statue.frame = 0;
            }
            else {
                statue = obstacles.create(512, (i*96)-16, 'statue');
                statue.body.setSize(30, 18, 1, 45);
                statue.body.immovable = true;
                statue.frame = 0;
            }
        }
        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        if (!game.device.desktop) { 
            buttonWalkLeft = game.add.button(20, 470, 'leftControl', null, this, 0, 1, 0, 1);
            buttonWalkLeft.alpha = 0.4;
            buttonWalkLeft.events.onInputOver.add(function(){walkLeft=true;});
            buttonWalkLeft.events.onInputOut.add(function(){walkLeft=false;});
            buttonWalkLeft.events.onInputDown.add(function(){walkLeft=true;});
            buttonWalkLeft.events.onInputUp.add(function(){walkLeft=false;});
            
            buttonWalkLeftTop = game.add.button(20, 430, 'controlLeftRight', null, this, 0, 1, 0, 1);
            buttonWalkLeftTop.alpha = 0;
            buttonWalkLeftTop.setFrames(3, 3, 3);
            buttonWalkLeftTop.events.onInputOver.add(function(){walkLeft=true;});
            buttonWalkLeftTop.events.onInputOut.add(function(){walkLeft=false;});
            buttonWalkLeftTop.events.onInputDown.add(function(){walkLeft=true;});
            buttonWalkLeftTop.events.onInputUp.add(function(){walkLeft=false;});
            
            buttonWalkLeftBottom = game.add.button(20, 540, 'controlLeftRight', null, this, 0, 1, 0, 1);
            buttonWalkLeftBottom.alpha = 0;
            buttonWalkLeftBottom.setFrames(2, 2, 2);
            buttonWalkLeftBottom.events.onInputOver.add(function(){walkLeft=true;});
            buttonWalkLeftBottom.events.onInputOut.add(function(){walkLeft=false;});
            buttonWalkLeftBottom.events.onInputDown.add(function(){walkLeft=true;});
            buttonWalkLeftBottom.events.onInputUp.add(function(){walkLeft=false;});
            
            buttonWalkRight = game.add.button(165, 470, 'rightControl', null, this, 0, 1, 0, 1);
            buttonWalkRight.alpha = 0.4;
            buttonWalkRight.events.onInputOver.add(function(){walkRight=true;});
            buttonWalkRight.events.onInputOut.add(function(){walkRight=false;});
            buttonWalkRight.events.onInputDown.add(function(){walkRight=true;});
            buttonWalkRight.events.onInputUp.add(function(){walkRight=false;});
            
            buttonWalkRightTop = game.add.button(165, 430, 'controlLeftRight', null, this, 0, 1, 0, 1);
            buttonWalkRightTop.alpha = 0;
            buttonWalkRightTop.setFrames(0, 0, 0);
            buttonWalkRightTop.events.onInputOver.add(function(){walkRight=true;});
            buttonWalkRightTop.events.onInputOut.add(function(){walkRight=false;});
            buttonWalkRightTop.events.onInputDown.add(function(){walkRight=true;});
            buttonWalkRightTop.events.onInputUp.add(function(){walkRight=false;});
            
            buttonWalkRightBottom = game.add.button(165, 540, 'controlLeftRight', null, this, 0, 1, 0, 1);
            buttonWalkRightBottom.alpha = 0;
            buttonWalkRightBottom.setFrames(1, 1, 1);
            buttonWalkRightBottom.events.onInputOver.add(function(){walkRight=true;});
            buttonWalkRightBottom.events.onInputOut.add(function(){walkRight=false;});
            buttonWalkRightBottom.events.onInputDown.add(function(){walkRight=true;});
            buttonWalkRightBottom.events.onInputUp.add(function(){walkRight=false;});
            
            buttonWalkUp = game.add.button(95, 417, 'rightControl', null, this, 0, 1, 0, 1);
            buttonWalkUp.alpha = 0.4;
            buttonWalkUp.rotation = -1.57;
            buttonWalkUp.anchor.setTo(0.75, 0);
            buttonWalkUp.events.onInputOver.add(function(){walkUp=true;});
            buttonWalkUp.events.onInputOut.add(function(){walkUp=false;});
            buttonWalkUp.events.onInputDown.add(function(){walkUp=true;});
            buttonWalkUp.events.onInputUp.add(function(){walkUp=false;});
            
            buttonWalkUpLeft = game.add.button(50, 400, 'controlUpDown', null, this, 0, 1, 0, 1);
            buttonWalkUpLeft.alpha = 0;
            buttonWalkUpLeft.setFrames(3, 3, 3);
            buttonWalkUpLeft.events.onInputOver.add(function(){walkUp=true;});
            buttonWalkUpLeft.events.onInputOut.add(function(){walkUp=false;});
            buttonWalkUpLeft.events.onInputDown.add(function(){walkUp=true;});
            buttonWalkUpLeft.events.onInputUp.add(function(){walkUp=false;});
            
            buttonWalkUpRight = game.add.button(165, 400, 'controlUpDown', null, this, 0, 1, 0, 1);
            buttonWalkUpRight.alpha = 0;
            buttonWalkUpRight.setFrames(2, 2, 2);
            buttonWalkUpRight.events.onInputOver.add(function(){walkUp=true;});
            buttonWalkUpRight.events.onInputOut.add(function(){walkUp=false;});
            buttonWalkUpRight.events.onInputDown.add(function(){walkUp=true;});
            buttonWalkUpRight.events.onInputUp.add(function(){walkUp=false;});
            
            buttonWalkDown = game.add.button(95, 560, 'leftControl', null, this, 0, 1, 0, 1);
            buttonWalkDown.alpha = 0.4;
            buttonWalkDown.rotation = -1.57;
            buttonWalkDown.anchor.setTo(0.75, 0);
            buttonWalkDown.events.onInputOver.add(function(){walkDown=true;});
            buttonWalkDown.events.onInputOut.add(function(){walkDown=false;});
            buttonWalkDown.events.onInputDown.add(function(){walkDown=true;});
            buttonWalkDown.events.onInputUp.add(function(){walkDown=false;});
            
            buttonWalkDownLeft = game.add.button(50, 540, 'controlUpDown', null, this, 0, 1, 0, 1);
            buttonWalkDownLeft.alpha = 0;
            buttonWalkDownLeft.setFrames(1, 1, 1);
            buttonWalkDownLeft.events.onInputOver.add(function(){walkDown=true;});
            buttonWalkDownLeft.events.onInputOut.add(function(){walkDown=false;});
            buttonWalkDownLeft.events.onInputDown.add(function(){walkDown=true;});
            buttonWalkDownLeft.events.onInputUp.add(function(){walkDown=false;});
            
            buttonWalkDownRight = game.add.button(165, 540, 'controlUpDown', null, this, 0, 1, 0, 1);
            buttonWalkDownRight.alpha = 0;
            buttonWalkDownRight.setFrames(0, 0, 0);
            buttonWalkDownRight.events.onInputOver.add(function(){walkDown=true;});
            buttonWalkDownRight.events.onInputOut.add(function(){walkDown=false;});
            buttonWalkDownRight.events.onInputDown.add(function(){walkDown=true;});
            buttonWalkDownRight.events.onInputUp.add(function(){walkDown=false;});
            
            buttonFireLeft = game.add.button(587, 470, 'leftControl', null, this, 0, 1, 0, 1);
            buttonFireLeft.alpha = 0.4;
            buttonFireLeft.events.onInputOver.add(function(){fireLeft=true;});
            buttonFireLeft.events.onInputOut.add(function(){fireLeft=false;});
            buttonFireLeft.events.onInputDown.add(function(){fireLeft=true;});
            buttonFireLeft.events.onInputUp.add(function(){fireLeft=false;});
            
            buttonFireLeftTop = game.add.button(587, 430, 'controlLeftRight', null, this, 0, 1, 0, 1);
            buttonFireLeftTop.alpha = 0;
            buttonFireLeftTop.setFrames(3, 3, 3);
            buttonFireLeftTop.events.onInputOver.add(function(){fireLeft=true;});
            buttonFireLeftTop.events.onInputOut.add(function(){fireLeft=false;});
            buttonFireLeftTop.events.onInputDown.add(function(){fireLeft=true;});
            buttonFireLeftTop.events.onInputUp.add(function(){fireLeft=false;});
            
            buttonFireLeftBottom = game.add.button(587, 540, 'controlLeftRight', null, this, 0, 1, 0, 1);
            buttonFireLeftBottom.alpha = 0;
            buttonFireLeftBottom.setFrames(2, 2, 2);
            buttonFireLeftBottom.events.onInputOver.add(function(){fireLeft=true;});
            buttonFireLeftBottom.events.onInputOut.add(function(){fireLeft=false;});
            buttonFireLeftBottom.events.onInputDown.add(function(){fireLeft=true;});
            buttonFireLeftBottom.events.onInputUp.add(function(){fireLeft=false;});
            
            buttonFireRight = game.add.button(732, 470, 'rightControl', null, this, 0, 1, 0, 1);
            buttonFireRight.alpha = 0.4;
            buttonFireRight.events.onInputOver.add(function(){fireRight=true;});
            buttonFireRight.events.onInputOut.add(function(){fireRight=false;});
            buttonFireRight.events.onInputDown.add(function(){fireRight=true;});
            buttonFireRight.events.onInputUp.add(function(){fireRight=false;});
            
            buttonFireRightTop = game.add.button(732, 430, 'controlLeftRight', null, this, 0, 1, 0, 1);
            buttonFireRightTop.alpha = 0;
            buttonFireRightTop.setFrames(0, 0, 0);
            buttonFireRightTop.events.onInputOver.add(function(){fireRight=true;});
            buttonFireRightTop.events.onInputOut.add(function(){fireRight=false;});
            buttonFireRightTop.events.onInputDown.add(function(){fireRight=true;});
            buttonFireRightTop.events.onInputUp.add(function(){fireRight=false;});
            
            buttonFireRightBottom = game.add.button(732, 540, 'controlLeftRight', null, this, 0, 1, 0, 1);
            buttonFireRightBottom.alpha = 0;
            buttonFireRightBottom.setFrames(1, 1, 1);
            buttonFireRightBottom.events.onInputOver.add(function(){fireRight=true;});
            buttonFireRightBottom.events.onInputOut.add(function(){fireRight=false;});
            buttonFireRightBottom.events.onInputDown.add(function(){fireRight=true;});
            buttonFireRightBottom.events.onInputUp.add(function(){fireRight=false;});
            
            buttonFireUp = game.add.button(662, 417, 'rightControl', null, this, 0, 1, 0, 1);
            buttonFireUp.alpha = 0.4;
            buttonFireUp.rotation = -1.57;
            buttonFireUp.anchor.setTo(0.75, 0);
            buttonFireUp.events.onInputOver.add(function(){fireUp=true;});
            buttonFireUp.events.onInputOut.add(function(){fireUp=false;});
            buttonFireUp.events.onInputDown.add(function(){fireUp=true;});
            buttonFireUp.events.onInputUp.add(function(){fireUp=false;});
            
            buttonFireUpLeft = game.add.button(617, 400, 'controlUpDown', null, this, 0, 1, 0, 1);
            buttonFireUpLeft.alpha = 0;
            buttonFireUpLeft.setFrames(3, 3, 3);
            buttonFireUpLeft.events.onInputOver.add(function(){fireUp=true;});
            buttonFireUpLeft.events.onInputOut.add(function(){fireUp=false;});
            buttonFireUpLeft.events.onInputDown.add(function(){fireUp=true;});
            buttonFireUpLeft.events.onInputUp.add(function(){fireUp=false;});
            
            buttonFireUpRight = game.add.button(732, 400, 'controlUpDown', null, this, 0, 1, 0, 1);
            buttonFireUpRight.alpha = 0;
            buttonFireUpRight.setFrames(2, 2, 2);
            buttonFireUpRight.events.onInputOver.add(function(){fireUp=true;});
            buttonFireUpRight.events.onInputOut.add(function(){fireUp=false;});
            buttonFireUpRight.events.onInputDown.add(function(){fireUp=true;});
            buttonFireUpRight.events.onInputUp.add(function(){fireUp=false;});
            
            buttonFireDown = game.add.button(662, 560, 'leftControl', null, this, 0, 1, 0, 1);
            buttonFireDown.alpha = 0.4;
            buttonFireDown.rotation = -1.57;
            buttonFireDown.anchor.setTo(0.75, 0);
            buttonFireDown.events.onInputOver.add(function(){fireDown=true;});
            buttonFireDown.events.onInputOut.add(function(){fireDown=false;});
            buttonFireDown.events.onInputDown.add(function(){fireDown=true;});
            buttonFireDown.events.onInputUp.add(function(){fireDown=false;});
            
            buttonFireDownLeft = game.add.button(617, 540, 'controlUpDown', null, this, 0, 1, 0, 1);
            buttonFireDownLeft.alpha = 0;
            buttonFireDownLeft.setFrames(1, 1, 1);
            buttonFireDownLeft.events.onInputOver.add(function(){fireDown=true;});
            buttonFireDownLeft.events.onInputOut.add(function(){fireDown=false;});
            buttonFireDownLeft.events.onInputDown.add(function(){fireDown=true;});
            buttonFireDownLeft.events.onInputUp.add(function(){fireDown=false;});
            
            buttonFireDownRight = game.add.button(732, 540, 'controlUpDown', null, this, 0, 1, 0, 1);
            buttonFireDownRight.alpha = 0;
            buttonFireDownRight.setFrames(0, 0, 0);
            buttonFireDownRight.events.onInputOver.add(function(){fireDown=true;});
            buttonFireDownRight.events.onInputOut.add(function(){fireDown=false;});
            buttonFireDownRight.events.onInputDown.add(function(){fireDown=true;});
            buttonFireDownRight.events.onInputUp.add(function(){fireDown=false;});
        }
        //enable separate hitbox for use in obstacle collisions
        playerLegs = game.add.sprite(0, 0, 'dude');
        game.physics.arcade.enable(playerLegs);
        playerLegs.body.collideWorldBounds = true;
        playerLegs.alpha = 0;
        playerLegs.body.setSize(27, 32, 2, 2);
        //player.addChild(playerLegs);
        
        dummyPlayer = game.add.sprite(player.x, player.y, 'dude');
        dummyPlayer.alpha = 0;
        
        resultBackground = game.add.sprite(-1000, 150, 'scrollStrip');
        resultText = game.add.bitmapText(140, 185, 'font', '', 32);
        //tutorialSpeechBubble = game.add.button(-200, 469, 'speechBubble', this.tutorialChange, this); 
        this.tutorialText();
        this.tutorialShow();
    },
    update: function() {
        if (tutorialDefence == "") {
        
        if (player.exists && defendingDoorOpen==false) {
            playerLegs.exists = true;
            playerLegs.x = player.x;
            playerLegs.y = player.y;
        }
        //game.physics.arcade.collide(player, defenders);
        game.physics.arcade.collide(defenders, attackers, this.npcFight, null, this);
        game.physics.arcade.collide(attackers, attackers);
        game.physics.arcade.collide(defenders, defenders);
        game.physics.arcade.collide(player, obstacles);
        game.physics.arcade.overlap(playerLegs, obstacles, this.dummyPlayerShow, null, this);
        game.physics.arcade.collide(attackers, obstacles, this.attackerMove, null, this);
        game.physics.arcade.collide(defenders, obstacles);
        
        game.physics.arcade.collide(bullets, attackers, this.attackerKill, null, this);
        if (spinning) {
            game.physics.arcade.collide(playerLegs, attackers, this.attackerKill, null, this);
        }
        else if (game.time.now>invulnerableTimer){
            player.alpha = 1;
            game.physics.arcade.collide(playerLegs, attackers, this.badTouchDefence, null, this);
        }
        else {
            player.alpha = 0.5;
        }
        
        if (attackerCount<=0) {
            game.physics.arcade.collide(player, door, this.defenceDoorOpen, null, this);
        }
         //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y= 0;
    
        if (aKey.isDown || walkLeft==true)        {
            //  Move to the left
            if (wKey.isDown==false && sKey.isDown==false) {
                diagonalAdjust = 1;
            }
            else {
                diagonalAdjust = 0.71;
            }
            player.body.velocity.x = -((runSpeed*diagonalAdjust) + runSpeedEndLevelAdjust);
            if (spinning) {
                player.animations.play('spin'); 
            }
            else {
                player.animations.play('left');
            }
            facing = 'left';
            manaRegenInterval = manaRegenHolder- manaRegenEndLevelAdjust;
        }
        if (dKey.isDown || walkRight==true)      {
            //  Move to the right
            if (wKey.isDown==false && sKey.isDown==false) {
                diagonalAdjust = 1;
            }
            else {
                diagonalAdjust = 0.71;
            }
            player.body.velocity.x = ((runSpeed*diagonalAdjust) + runSpeedEndLevelAdjust);
            if (spinning) {
                player.animations.play('spin'); 
            }
            else {
                player.animations.play('right');
            }
            facing = 'right';
            manaRegenInterval = manaRegenHolder- manaRegenEndLevelAdjust;
        }
        if (wKey.isDown || walkUp==true)       {
            //  Move up
            if (aKey.isDown==false && dKey.isDown==false) {
                diagonalAdjust = 1;
            }
            else {
                diagonalAdjust = 0.71;
            }
            player.body.velocity.y = -((runSpeed*diagonalAdjust) + runSpeedEndLevelAdjust);
            if (spinning) {
                player.animations.play('spin'); 
            }
            else if (aKey.isDown==false && dKey.isDown==false) {
                player.animations.play('up');
            }
            facing = 'up';
            manaRegenInterval = manaRegenHolder- manaRegenEndLevelAdjust;
        }
        if (sKey.isDown || walkDown==true)        {
            //  Move down
            if (aKey.isDown==false && dKey.isDown==false) {
                diagonalAdjust = 1;
            }
            else {
                diagonalAdjust = 0.71;
            }
            player.body.velocity.y = ((runSpeed*diagonalAdjust) + runSpeedEndLevelAdjust);
            if (spinning) {
                player.animations.play('spin'); 
            }
            else if (aKey.isDown==false && dKey.isDown==false) {
                player.animations.play('down');
            }
            facing = 'down';
            manaRegenInterval = manaRegenHolder- manaRegenEndLevelAdjust;
        }
        if (aKey.isDown==false && dKey.isDown==false && wKey.isDown==false && sKey.isDown==false) {
            //  Stand still
            if (spinning) {
                player.animations.play('spin'); 
            }
            else {
                player.animations.stop();
            }
            manaRegenInterval = (manaRegenHolder- manaRegenEndLevelAdjust)*0.25;
        }
        
        if ((cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown || fireLeft==true || fireRight==true || fireUp==true || fireDown==true) && game.time.now>bulletTimer && player.isAlive && mana>=manaCost) {
            this.fire();
            mana -= 4;
            manaText.text = 'MP: ' + mana + "/" + maxMana;
        }
        if (spaceBar.isDown && spinning==false && mana>=10 && game.time.now>player.spinTimer) {
            spinning = true;
            spinSFX.play();
            player.spinTimer = game.time.now + 750;
            mana -= 10;
            game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {   spinning = false; });
        }
        this.manaRegen();
        this.defenderUpdate();
        this.attackerUpdate();
        this.dummyPlayerUpdate();
        }
        else {
            player.body.velocity.x = 0;
            player.body.velocity.y= 0;
        }
        if (spaceBar.isDown && tutorialDefence!="" && game.time.now>assistantChangeTimer) {
            this.tutorialChange();
            assistantChangeTimer = game.time.now + 1000;
        }
        hpCrop.x = (1-(health/maxHealth))*80;
        hpBar.updateCrop();
        manaCrop.x = (1-(mana/maxMana))*80;
        manaBar.updateCrop();
        xpCrop.x = (1-(xp/nextLevelXp))*80;
        xpBar.updateCrop();
        
        if (!game.device.desktop) { 
            if (walkLeft) {
                buttonWalkLeftTop.input.priorityID = 1;
                buttonWalkUpLeft.input.priorityID = 0;
                buttonWalkLeftBottom.input.priorityID = 1;
                buttonWalkDownLeft.input.priorityID = 0;
            }
            else if (walkUp) {
                buttonWalkLeftTop.input.priorityID = 0;
                buttonWalkUpLeft.input.priorityID = 1;
                buttonWalkRightTop.input.priorityID = 0;
                buttonWalkUpRight.input.priorityID = 1;
            }
            else if (walkRight) {
                buttonWalkRightTop.input.priorityID = 1;
                buttonWalkUpRight.input.priorityID = 0;
                buttonWalkRightBottom.input.priorityID = 1;
                buttonWalkDownRight.input.priorityID = 0;
            }
            else if (walkDown) {
                buttonWalkLeftBottom.input.priorityID = 0;
                buttonWalkDownLeft.input.priorityID = 1;
                buttonWalkRightBottom.input.priorityID = 0;
                buttonWalkDownRight.input.priorityID = 1;
            }
            
            if (fireLeft) {
                buttonFireLeftTop.input.priorityID = 1;
                buttonFireUpLeft.input.priorityID = 0;
                buttonFireLeftBottom.input.priorityID = 1;
                buttonFireDownLeft.input.priorityID = 0;
            }
            else if (fireUp) {
                buttonFireLeftTop.input.priorityID = 0;
                buttonFireUpLeft.input.priorityID = 1;
                buttonFireRightTop.input.priorityID = 0;
                buttonFireUpRight.input.priorityID = 1;
            }
            else if (fireRight) {
                buttonFireRightTop.input.priorityID = 1;
                buttonFireUpRight.input.priorityID = 0;
                buttonFireRightBottom.input.priorityID = 1;
                buttonFireDownRight.input.priorityID = 0;
            }
            else if (fireDown) {
                buttonFireLeftBottom.input.priorityID = 0;
                buttonFireDownLeft.input.priorityID = 1;
                buttonFireRightBottom.input.priorityID = 0;
                buttonFireDownRight.input.priorityID = 1;
            }
        }
    },
    tutorialText: function() {
        tutorialText = game.add.bitmapText(200, 477, 'fontBorder', '', 15);
        tutorialText2 = game.add.bitmapText(170, 494, 'fontBorder', '', 15);
        tutorialText3 = game.add.bitmapText(158, 509, 'fontBorder', '', 15);
        tutorialText4 = game.add.bitmapText(158, 524, 'fontBorder', '', 15);
        tutorialText5 = game.add.bitmapText(170, 539, 'fontBorder', '', 15);
        tutorialText6 = game.add.bitmapText(190, 554, 'fontBorder', '', 15);
        tutorialText.tint = 000000;
        tutorialText2.tint = 000000;
        tutorialText3.tint = 000000;
        tutorialText4.tint = 000000;
        tutorialText5.tint = 000000;
        tutorialText6.tint = 000000;
    },
    tutorialTextDestroy: function() {
        if (tutorialSprite!=null) {
            tutorialSprite.kill();
            tutorialSpeechBubble.kill();
        }
        tutorialText.destroy();//.text = '';//
        tutorialText2.destroy();
        tutorialText3.destroy();
        tutorialText4.destroy();
        tutorialText5.destroy();
        tutorialText6.destroy();
    },
    defenderCreate: function(x, y) {
        if (Math.random()<0.5) {
            var defender = defenders.create(x, y, 'warriorMan');
            defender.gender = "male";
        }
        else {
            var defender = defenders.create(x, y, 'warriorWoman');
            defender.gender = "female";
        }
        defender.health = defenceStrength-2;
        defender.maxHealth = defenceStrength-2;
        defender.fighting = false;
        defender.timer = game.time.now;
        //  enable physics on the defender
        game.physics.arcade.enable(defender);
        defender.body.collideWorldBounds = true;
        
        defender.healthBarBack = defender.addChild(game.add.graphics(0, 0));
        defender.healthBarBack.lineStyle(3, 0xba3500, 1);
        defender.healthBarBack.moveTo(0, 0);
        defender.healthBarBack.lineTo(20, 0);
        defender.healthBar = defender.addChild(game.add.graphics(0, 0));
        defender.healthBar.lineStyle(3, 0xffd900, 1);
        defender.healthBar.moveTo(0, 0);
        defender.healthBar.lineTo(20*(defender.health/defender.maxHealth), 0);
        
        defender.healthBarBack.visible = false;
        defender.healthBar.visible = false;
    
        //  Our two animations, walking left and right.
        defender.animations.add('defenderLeft', [9, 10, 11], 15, true);
        defender.animations.add('defenderRight', [3, 4, 5], 15, true);
        defender.animations.add('defenderStop', [4], 15, true);
        defender.animations.play('defenderStop');
    },
    defenderUpdate: function() {
        defenders.forEach(function(defender) {
            defender.body.velocity.x = 0;
            defender.body.velocity.y = 0;
            
            defender.healthBar.clear();
            defender.healthBar.lineStyle(3, 0xffd900, 1);
            defender.healthBar.moveTo(0, 0);
            defender.healthBar.lineTo(20*(defender.health/defender.maxHealth), 0);
            
            if ((Math.abs(player.x - defender.x)) + (Math.abs(player.y - defender.y)) > 300 && (defender.fighting==false)) {
                game.physics.arcade.moveToObject(defender, player, 115);
                if (player.x < defender.x) {
                    defender.animations.play('defenderLeft');
                }
                else {
                    defender.animations.play('defenderRight');
                }
            }
            else {
                defender.animations.play('defenderStop');
            }
        });
    },
    attackerCreate: function(x, y) {
        var attacker = attackers.create(x, y, 'attacker');
        attacker.health = attackStrength-3;
        attacker.maxHealth = attackStrength-3;
        attacker.timer = game.time.now;
        attacker.fighting = false;
        //  enable physics on the attacker
        game.physics.arcade.enable(attacker);
        attacker.body.collideWorldBounds = true;
        
        attacker.healthBarBack = attacker.addChild(game.add.graphics(0, 0));
        attacker.healthBarBack.lineStyle(3, 0xba3500, 1);
        attacker.healthBarBack.moveTo(0, 0);
        attacker.healthBarBack.lineTo(20, 0);
        attacker.healthBar = attacker.addChild(game.add.graphics(0, 0));
        attacker.healthBar.lineStyle(3, 0xffd900, 1);
        attacker.healthBar.moveTo(0, 0);
        attacker.healthBar.lineTo(20*(attacker.health/attacker.maxHealth), 0);
        
        attacker.healthBarBack.visible = false;
        attacker.healthBar.visible = false;
    
        //  Our two animations, walking left and right.
        attacker.animations.add('attackerLeft', [9, 10, 11], 15, true);
        attacker.animations.add('attackerRight', [3, 4, 5], 15, true);
        attacker.animations.add('attackerStop', [10], 15, true);
        attacker.animations.play('attackerStop');
    },
    attackerUpdate: function() {
        attackers.forEach(function(attacker) {
            attacker.body.velocity.x = 0;
            attacker.body.velocity.y = 0;
            
            attacker.healthBar.clear();
            attacker.healthBar.lineStyle(3, 0xffd900, 1);
            attacker.healthBar.moveTo(0, 0);
            attacker.healthBar.lineTo(20*(attacker.health/attacker.maxHealth), 0);
            
            if (attacker.fighting == false) {
                game.physics.arcade.moveToObject(attacker, player, 110);
            }
            else {
                attacker.animations.play('attackerStop');
            }
            if (player.body.x < attacker.body.x) {
                attacker.animations.play('attackerLeft');
            }
            else {
                attacker.animations.play('attackerRight');
            }
        });
    },
    attackerMove: function(attacker) {
        if (attacker.y<player.y) {
            attacker.y += 2;
        }
        else {
            attacker.y -= 2;
        }
    },
    attackerKill: function(bullet, attacker) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.66) {
            if (bullet.travel == 'left') {
                attacker.x -= knockback;
            }
            else if (bullet.travel == 'right') {
                attacker.x += knockback;
            }
            else if (bullet.travel == 'up') {
                attacker.y -= knockback;
            }
            else if (bullet.travel == 'down') {
                attacker.y += knockback;
            }
        }
        bullet.kill();
        if (attacker.health <= shotPower) {
            attacker.kill();
            this.maleDeathSFX();
            var death = game.add.sprite(attacker.x, attacker.y, 'deathSheet');
            death.frame = 2;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.kill(); });
            xp += 4;
            this.xpDisplayConvert();
            attackerCount --;
            //console.log(attackerCount);
            this.checkLevelUp();
            this.checkDefenceComplete();
        }
        else {
            attacker.health -= shotPower;
            attacker.healthBarBack.visible = true;
            attacker.healthBar.visible = true;
        }
    },
    smallExplosion: function(x, y) {
        var explode = game.add.sprite(x, y, 'explosionMini');
        explode.animations.add('explosion', [0, 1, 2, 3], 30, false);
        explode.animations.play('explosion');
        this.shortExplodeSFX();
        game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {   explode.destroy();  });
    },
    fire: function() {
        var bullet = bullets.getFirstExists(false);//bullets.create(player.x + 10, player.y + 15, 'bullet');
        bullet.reset(player.x + 10, player.y + 15);
        bullet.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 13, true);
        var emitter = game.add.emitter(game.world.centerX, game.world.centerY, 20);
        emitter.makeParticles('bulletParticles', [0, 1, 2, 3]);
        emitter.gravity.y = 0;
        emitter.forEach(function(particle) {
            particle.body.allowGravity = false;
        }, this);
        emitter.start(false, 500, 50);
        bullet.addChild(emitter);
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function() { emitter.destroy();});
        emitter.x = 0;
        emitter.y = 0;
        bullet.scale.x = 0.8;
        bullet.scale.y = 0.8;
        bullet.lifespan = (832/shotSpeed)*1000;
        
        if (cursors.left.isDown || fireLeft==true) {
            game.physics.arcade.moveToXY(bullet, 0, bullet.y, shotSpeed);
            bullet.animations.play('spin');
            bullet.travel = "left";
            emitter.minParticleSpeed.set(-shotSpeed, 0);
            emitter.maxParticleSpeed.set(-shotSpeed, 0);
            emitter.rotation = 3.14;
            emitter.x = -14;
            emitter.y = -8;
        }
        else if (cursors.right.isDown || fireRight==true) {
            game.physics.arcade.moveToXY(bullet, 832, bullet.y, shotSpeed);
            bullet.animations.play('spin');
            bullet.travel = "right";
            emitter.minParticleSpeed.set(shotSpeed, 0);
            emitter.maxParticleSpeed.set(shotSpeed, 0);
            emitter.rotation = 3.14;
            emitter.x = 14;
            emitter.y = -8;
        }
        else if (cursors.up.isDown || fireUp==true) {
            game.physics.arcade.moveToXY(bullet, bullet.x, 0, shotSpeed);
            bullet.animations.play('spin');
            bullet.travel = "up";
            emitter.minParticleSpeed.set(0, -shotSpeed);
            emitter.maxParticleSpeed.set(0, -shotSpeed);
            emitter.rotation = 3.14;
            emitter.x = -8;
            emitter.y = -14;
        }
        else if (cursors.down.isDown || fireDown==true) {
            game.physics.arcade.moveToXY(bullet, bullet.x, 600, shotSpeed);
            bullet.animations.play('spin');
            bullet.travel = "down";
            emitter.minParticleSpeed.set(0, shotSpeed);
            emitter.maxParticleSpeed.set(0, shotSpeed);
            emitter.rotation = 3.14;
            emitter.x = -8;
            emitter.y = 14;
        }
        this.pew();
        bulletTimer = game.time.now + bulletSpacing;
    },
    pew: function() {
        var pewSound = game.add.audio('pew');
        pewSound.play();
    },
    shortExplodeSFX: function() {
        var shortExplodeSound = game.add.audio('shortExplode');
        shortExplodeSound.play();
    },
    maleDeathSFX: function() {
        var maleDeath = game.add.audio('maleDeath');
        maleDeath.play();
    },
    femaleDeathSFX: function() {
        var femaleDeath = game.add.audio('femaleDeath');
        femaleDeath.play();
    },
    badTouchDefence: function() {
        if (health>(attackStrength-7)) {
            health -= (attackStrength-7);
            var grunt = game.add.audio('grunt');
            grunt.play();
            healthText.text = 'HP: ' + health + "/" + maxHealth;
            invulnerableTimer = game.time.now + invulnerableSpacing;
        }
        else {
        // Removes the player from the screen
            player.kill();
            this.maleDeathSFX();
            var death = game.add.sprite(player.x, player.y, 'deathSheet');
            death.frame = 0;
            var teleportSFX = game.add.audio('teleport');
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.kill(); 
                                                                     var playerTeleport = game.add.sprite(death.x+5, death.y+5, 'playerTeleport');
                                                                     playerTeleport.animations.add('teleport', [0, 1, 2, 3], 8, false);
                                                                     playerTeleport.animations.play('teleport');
                                                                     teleportSFX.play();
                                                                     defenceAudio.stop();
                                                                     game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {  playerTeleport.kill(); });
                                                                     });
            player.isAlive = false;
            population -= defenceStrength;
            tutorialDefence = "defeat";
            this.tutorialShow();
            healthText.text = 'HP: 0/' + maxHealth;
            resultBackground.x = 96;
            resultText.text = ' Your Majesty, it is time to come home!';
            endLevelButton = game.add.button(305, 250, 'blankButton', this.defenceComplete, this);
            game.add.bitmapText(355, 280, 'font', 'Return to my City', 16);
        }
    },
    checkLevelUp: function() {
        while (xp >= nextLevelXp) {
            levelUpImage = game.add.sprite(132, 15, 'levelUp');
            levelUpImage.animations.add('flash', [0, 1, 2], 6, true);
            levelUpImage.animations.play('flash');
            var levelUpSFX = game.add.audio('levelUpSound');
            levelUpSFX.play();
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {   levelUpImage.kill();  });
            xp -= nextLevelXp;
            nextLevelXp += Math.round(8 + playerLevel*0.75);
            maxHealth ++;
            maxMana ++;
            shotPower += 0.05;
            health = maxHealth;
            mana = maxMana;
            playerLevel ++;
            this.xpDisplayConvert();
            manaText.text = 'MP: ' + mana + "/" + maxMana;
            healthText.text = 'HP: ' + health + "/" + maxHealth;
            playerLevelText.text = playerLevel;
        }
    },
    checkDefenceComplete: function() {
        if (attackerCount <= 0 && player.isAlive) {
            if (player.x < 75 && player.y < 145) {
                doorway = game.add.sprite(750, 70, 'doorway');
                door = game.add.sprite(750, 70, 'animateddoor');
            }
            else {
                doorway = game.add.sprite(5, 70, 'doorway');
                door = game.add.sprite(5, 70, 'animateddoor');
            }
            door.animations.add('openDoor', [0, 1, 2, 3], 4, false);
            game.physics.arcade.enable(door);
            door.body.immovable = true;
            if (defenderCount/defenceStrength >= 0.5) {
                newCitizens = attackStrength-(defenceStrength-defenderCount)+2;
                population += newCitizens;
                attackStrength ++;
                tutorialDefence = "victory";
                this.tutorialShow();
            }
            else if (defenderCount/defenceStrength >= 0.25) {
                newCitizens = Math.round(1+(attackStrength/10));
                population += newCitizens;
                tutorialDefence = "victory";
                this.tutorialShow();
            }
            else {
                population ++;
                tutorialDefence = "narrowVictory";
                this.tutorialShow();
            }
        }
    },
    defenceComplete: function() {
        defending = false;
        game.world.removeAll();
        game.state.start('city');
    },
    defenceDoorOpen: function() {
        door.animations.play('openDoor');
        defendingDoorOpen = true;
        var doorOpenSFX = game.add.audio('creakylightwoodendoor1');
        doorOpenSFX.play();
        player.kill();
        playerLegs.kill();
        defenceAudio.stop();
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 2, function () {   self.defenceComplete();  });
    },
    manaRegen: function() {
        if (game.time.now>manaRegenTimer && mana<maxMana) {
            mana++;
            manaRegenTimer = game.time.now + manaRegenInterval;
            manaText.text = 'MP: ' + mana + "/" + maxMana;
        }
    },
    npcFight: function(defender, attacker) {
        if (defender.timer<game.time.now) {
            defender.sword = defender.addChild(game.add.sprite(20, 0, 'sword'));
            defender.sword.animations.add('swing', [0, 1, 2, 2, 1, 0], 6, true);
            defender.sword.animations.play('swing');
            defender.fighting = true;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  defender.fighting = false; defender.sword.kill(); });
            if (defender.health <= (attackStrength-7)) {
                defender.kill();
                var death = game.add.sprite(defender.x, defender.y, 'deathSheet');
                if (defender.gender=="male") {
                    death.frame = 8;
                    this.maleDeathSFX();
                }
                else {
                    death.frame = 9;
                    this.femaleDeathSFX();
                }
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.kill(); });
                defenderCount --;
            }
            else {
                defender.health -= (attackStrength-7);
                defender.timer = game.time.now + 1000;
                defender.healthBarBack.visible = true;
                defender.healthBar.visible = true;
            }
        }
        if (attacker.timer<game.time.now) {
            attacker.sword = attacker.addChild(game.add.sprite(-12, 0, 'sword'));
            attacker.sword.animations.add('swing', [3, 4, 5, 5, 4, 3], 6, true);
            attacker.sword.animations.play('swing');
            attacker.fighting = true;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  attacker.fighting = false; attacker.sword.kill();});
            if (attacker.health <= 1) {
                attacker.kill();
                this.maleDeathSFX();
                var death = game.add.sprite(attacker.x, attacker.y, 'deathSheet');
                death.frame = 2;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.kill(); });
                attackerCount --;
                xp += 4;
                //console.log(attackerCount);
                this.checkDefenceComplete();
            }
            else {
                attacker.health --;
                attacker.timer = game.time.now + 1000;
                attacker.healthBarBack.visible = true;
                attacker.healthBar.visible = true;
            }
        }
    },
    tutorialShow: function() {
        switch(tutorialDefence) {
            case "first":
                tutorialSprite = game.add.sprite(350, 469, 'assistant');
                tutorialSpeechBubble = game.add.button(150, 469, 'speechBubble', this.tutorialChange, this); 
                this.tutorialText();
                tutorialText.text = " Your Majesty!";
                tutorialText2.text = "   Our defenders will";
                tutorialText3.text = "   shield you if you stay ";
                tutorialText4.text = " behind them. You should ";
                tutorialText5.text = " keep your distance from";
                tutorialText6.text = "  the enemy.";
                break;
            case "second":
                this.tutorialTextDestroy();
                tutorialSprite = game.add.sprite(350, 469, 'assistant');
                tutorialSpeechBubble = game.add.button(150, 469, 'speechBubble', this.tutorialChange, this); 
                this.tutorialText();
                tutorialText.text = "  A convincing";
                tutorialText2.text = " victory may be enough";
                tutorialText3.text = "   to persuade the people";
                tutorialText4.text = "    of neighbouring cities";
                tutorialText5.text = "     to move here for";
                tutorialText6.text = "  their protection.";
                assistant = "tutorialEnd";
                break;
            case "victory":
                this.tutorialTextDestroy();
                tutorialSprite = game.add.sprite(350, 469, 'assistant');
                tutorialSpeechBubble = game.add.button(150, 469, 'speechBubble', this.tutorialChange, this); 
                this.tutorialText();
                tutorialText.text = "  You fought";
                tutorialText2.text = "  them off! As news of";
                tutorialText3.text = "   your victory spread our";
                tutorialText4.text = "      city attracted " + newCitizens + " new ";
                tutorialText5.text = "   immigrants to bolster ";
                tutorialText6.text = "      our ranks.";
                break;
            case "narrowVictory":
                this.tutorialTextDestroy();
                tutorialSprite = game.add.sprite(350, 469, 'assistant');
                tutorialSpeechBubble = game.add.button(150, 469, 'speechBubble', this.tutorialChange, this); 
                this.tutorialText();
                tutorialText.text = "  A narrow";
                tutorialText2.text = "   victory, but a victory";
                tutorialText3.text = "  nonetheless. 1 new citizen";
                tutorialText4.text = "  moved to our city when";
                tutorialText5.text = "  word of your success";
                tutorialText6.text = "      spread.";
                break;
            case "defeat":
                this.tutorialTextDestroy();
                tutorialSprite = game.add.sprite(350, 469, 'assistant');
                tutorialSpeechBubble = game.add.button(150, 469, 'speechBubble', this.tutorialChange, this); 
                this.tutorialText();
                tutorialText.text = "  Oh no! Our";
                tutorialText2.text = "  forces were routed.";
                tutorialText3.text = "  Our reserves fought off";
                tutorialText4.text = "  the attackers but the raid";
                tutorialText5.text = "   killed " + defenceStrength + " of our";
                tutorialText6.text = "   citizens.";
                break;
            case "": 
                tutorialText.text = "";
                tutorialText2.text = "";
                tutorialText3.text = "";
                tutorialText4.text = "";
                tutorialText5.text = "";
                tutorialText6.text = "";
                if (tutorialSprite!=null) {
                    tutorialSprite.kill();
                    tutorialSpeechBubble.kill();
                }
                break;
        }
        
    },
    tutorialChange: function() {
        switch(tutorialDefence) {
            case "first":
                tutorialDefence = "second";
                this.tutorialShow();
                break;
            case "second":
                tutorialDefence = "";
                tutorialSprite.kill();
                tutorialSpeechBubble.kill();
                this.tutorialShow();
                break;
            case "victory":
                tutorialDefence = "";
                tutorialSprite.kill();
                tutorialSpeechBubble.kill();
                this.tutorialShow();
                break;
            case "narrowVictory":
                tutorialDefence = "";
                tutorialSprite.kill();
                tutorialSpeechBubble.kill();
                this.tutorialShow();
                break;
            case "defeat":
                tutorialDefence = "";
                tutorialSprite.kill();
                tutorialSpeechBubble.kill();
                this.tutorialShow();
                break;
        }
    },
    xpDisplayConvert: function() {
        if (xp>=1000) {
            xpDisplay = (Math.round(xp/100))/10 + 'k'; 
        }
        else {
            xpDisplay = Math.round(xp);
        }
        if (nextLevelXp>=1000) {
            nextLevelXpDisplay = (Math.round(nextLevelXp/100))/10 + 'k'; 
        }
        else {
            nextLevelXpDisplay = Math.round(nextLevelXp);
        }
        xpText.text = "XP: " + xpDisplay + '/' + nextLevelXpDisplay;
    },
    dummyPlayerShow: function(player, platforms) {
        if (player.body.y+25>(platforms.y+platforms.height)) {
            dummyPlayer.alpha = 1;
            console.log('Platform.y/height/player.y:' + platforms.y + '/' + platforms.height + '/' + player.body.y);
            game.time.events.add(Phaser.Timer.SECOND * 0.1, function () {   dummyPlayer.alpha = 0; });
        }
    },
    dummyPlayerUpdate: function() {
        dummyPlayer.x = player.body.x-1;
        dummyPlayer.y = player.body.y-22;
        dummyPlayer.frame = player.frame;
    }
};