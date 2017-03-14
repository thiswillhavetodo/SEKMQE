var platforms;
var player;
var playerLegs;
var dummyPlayer;
var spinning = false;
var diagonalAdjust;
var playerLevel = 1;
var facing;
var bullets;
var bulletTimer = 0;
var bulletSpacing = 525;
var beamWeapon = false;
var shotSpeed = 320;
var manaCost = 4;
var flameBullets;
var flameBulletSpacing = 4250;
var iceBeams;
var charges;
var waterShots;
var freezeTimer = 0;
var invulnerableTimer = 0;
var invulnerableSpacing = 800;
var manaRegenTimer = 0;
var manaRegenHolder = 490;
var manaRegenEndLevelAdjust = 0;
var manaRegenInterval = manaRegenHolder;
var manaRefillAvailable = false;
var first = true;

var timerBeam;
var timerBeamEvent;
var timerMana;
var timerManaEvent;

var baddies;
var flames;
var skeletons;
var swordZombies;
var mummies;
var evilwizards;
var zombieBirds;
var miniZombieBirds;
var spiders;
var swampCreatures;
var treeBeasts;
var evilRoots;
var vampires;
var decoys;
var bossZombies;
var bossZombieBirds;
var bossMummies;
var bossFinals;
var bossZombieKilled = false;
var bossTreeBeastKilled = false;
var bossSkeletonKilled = false;
var bossZombieBirdKilled = false;
var bossMummyKilled = false;
var bossFinalKilled = false;
var totalMonstersKilled = 0;

var cursors;
var fireButton;
var wKey;
var aKey;
var sKey;
var dKey;
var qKey;
var eKey;
var buttonFireLeft;
var fireLeft = false;
var buttonFireRight;
var fireRight = false;
var buttonFireUp;
var fireUp = false;
var buttonFireDown;
var fireDown = false;
var buttonWalkLeft;
var walkLeft = false;
var buttonWalkRight;
var walkRight = false;
var buttonWalkUp;
var walkUp = false;
var buttonWalkDown;
var walkDown = false;

var stars;
var door;
var doorAvailable = false;
var levelUpImage;
var coins = 2000;
var stage = 1;
var reward = 0;

var hudDisplay;
var hpBar;
var manaBar;
var xpBar;
var hpCrop;
var manaCrop;
var xpCrop;
var stageText;
var coinDisplay;
var coinsText;
var healthText;
var resultBackground;
var levelRecordBackground;
var resultText;
var resultText2;
var resultText3;
var levelRecord;
var levelRecord2;
var levelRecord3;
var playerLevelText;
var xpText;
var manaText;
var beamSprite;
var beamText;
var bottleSprite;
var bottleText;
var manaWarn = false;

var xp = 0;
var xpDisplay = 0;
var nextLevelXp = 10;
var nextLevelXpDisplay = 10;
var health = 6;
var maxHealth = 6;
var mana = 75;
var maxMana = 75;
var starTotal = 8.5;
var baddieTotal = 7;
var baddieCount = 7;
var baddieAdjuster = 0;
var baddieDamageAdjuster = 1;
var baddieHpAdjuster = 1;
var baddieXpAdjuster = 1;
var baddieSpeedAdjuster = 1;
var baddieCreated = 0;
var chestCreated = 0;
var flameCount = 0;
var evilwizardCount = 0;
var zombieBirdCount = 0;
var swampCreatureCount = 0;
var shotPower = 1.5;
var knockback = 1;
var runSpeed = 190;
var runSpeedEndLevelAdjust = 0;
var nullArray = [66, 67, 68, 69, 70, 71, 79, 80, 81, 82, 83, 84, 92, 93, 94, 95, 96, 97, 105, 106,
            107, 108, 109, 110, 118, 119, 120, 121, 122, 123];
var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
             23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
             43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
             63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
             83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101,
             102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
             118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130];
var sceneryCount = 0;
var backgroundScene = "";
var gameMusic;
var advertImage;
var adStopTime;
var adTimeText;
var beamSFX;
var waterShotSFX;
var flameShot;
var zombieDeathSFX;
var shortExplodeSFX;
var collectSFX;
var pewSound;
var spinSFX;
var swordZombieTest = false;

/* global game */
/* global Phaser */
var playState = {

    create: function() {
        if (!game.device.desktop) { 
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.input.onDown.add(this.gofull, this); 
        }
        game.world.removeAll();
        game.time.advancedTiming = true; //needed for fps display in debug
        //  enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        if (Math.random()>0.66 || stage-(Math.floor(stage/100)*100)==50 || stage-(Math.floor(stage/100)*100)==60) { 
            game.add.sprite(0, 0, 'field');
            backgroundScene = "wasteland";
            gameMusic = game.add.audio('wastelandMusic');
            gameMusic.play();
        }
        else if(Math.random()<0.34) {
            game.add.sprite(0, 0, 'stonepavingOvergrown');
            backgroundScene = "ruins";
            gameMusic = game.add.audio('ruinsMusic');
            gameMusic.play();
        }
        else {
            game.add.sprite(0, 0, 'forestBackground');
            backgroundScene = "forest";
            gameMusic = game.add.audio('forestMusic');
            gameMusic.play();
        }
        invulnerableTimer = game.time.now + 50;
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
        hpCrop.x = (1-(health/maxHealth))*80;
        hpBar.updateCrop();
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
        
        stageText = game.add.bitmapText(600, 10, 'font', 'Stage: ' + stage, 30); 
        coinsText.alpha = 0.7;
        xpText.alpha = 0.7;
        healthText.alpha = 0.7;
        manaText.alpha = 0.7;
        playerLevelText.alpha = 0.7;
        stageText.alpha = 0.7;
        coinDisplay = game.add.sprite(360, 8, 'coin');
        coinDisplay.frame = 0;
        

        // The player and its settings
        player = game.add.sprite(16, game.world.height - 50, 'dude');
        
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
       
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.createMultiple(90, 'bullet');
        pewSound = game.add.audio('pew');
        shortExplodeSFX = game.add.audio('shortExplode');
        spinSFX = game.add.audio('spinSFX');
        spinSFX.allowMultiple = false;
        //enemy projectiles
        flameBullets = game.add.group();
        flameBullets.enableBody = true;   
        iceBeams = game.add.group();
        iceBeams.enableBody = true;
        iceBeams.createMultiple(110, 'iceBeamMini');
        charges = game.add.group();
        charges.enableBody = true;
        //charges.createMultiple(3, 'blueCharge');
        waterShots = game.add.group();
        waterShots.enableBody = true; 
        waterShots.createMultiple(6, 'waterShot');
        miniZombieBirds = game.add.group();
        miniZombieBirds.enableBody = true;
        miniZombieBirds.createMultiple(23, 'miniZombieBird');
        //enemies
        skeletons = game.add.group();
        skeletons.enableBody = true;
        mummies = game.add.group();
        mummies.enableBody = true;
        baddies = game.add.group();
        baddies.enableBody = true;
        zombieDeathSFX = game.add.audio('zombieDeath');
        zombieDeathSFX.allowMultiple = true;
        swordZombies = game.add.group();
        swordZombies.enableBody = true;
        flames = game.add.group();
        flames.enableBody = true;
        evilwizards = game.add.group();
        evilwizards.enableBody = true;
        zombieBirds = game.add.group();
        zombieBirds.enableBody = true;
        spiders = game.add.group();
        spiders.enableBody = true;
        swampCreatures = game.add.group();
        swampCreatures.enableBody = true;
        treeBeasts = game.add.group();
        treeBeasts.enableBody = true;
        evilRoots = game.add.group();
        evilRoots.enableBody = true;
        /*if (stage>50) {
            evilRoots.createMultiple(30, 'evilRoot');
        }*/
        bossZombies = game.add.group();
        bossZombies.enableBody = true;
        bossZombieBirds = game.add.group();
        bossZombieBirds.enableBody = true;
        bossMummies = game.add.group();
        bossMummies.enableBody = true;
        bossFinals = game.add.group();
        bossFinals.enableBody = true;
        vampires = game.add.group();
        vampires.enableBody = true;
        decoys = game.add.group();
        decoys.enableBody = true;
        
        if (swordZombieTest) {
            this.evilwizardCreate(600, 300);
            //this.bossFinalCreate(600, 300);
            beamSFX = game.add.audio('shotSFX');
            //this.swordZombieCreate(770, 300, "green");
            //this.swordZombieCreate(600, 500, "red");
            baddieCreated = baddieTotal;
        }
        
        if (stage-(Math.floor(stage/100)*100)==50 && bossZombieKilled==false) {
            if (stage>=150) {
                this.bossZombieCreate(760, 200, "red");
            }
            else {
                this.bossZombieCreate(760, 200, "green");
            }
            baddieCreated = baddieTotal;
            this.treeCreate(300, 0);
            this.treeCreate(360, 570);
            this.treeCreate(0, 384);
            this.treeCreate(790, 448);
        }
        if (stage-(Math.floor(stage/100)*100)==60 && bossTreeBeastKilled==false) {
            this.treeBeastCreate(64, 64);
            this.treeBeastCreate(448, 54);
            this.treeBeastCreate(704, 74);
            this.treeBeastCreate(192, 128);
            this.treeBeastCreate(458, 138);
            this.treeBeastCreate(438, 192);
            this.treeBeastCreate(640, 182);
            this.treeBeastCreate(128, 256);
            this.treeBeastCreate(384, 266);
            this.treeBeastCreate(128, 320);
            this.treeBeastCreate(694, 310);
            this.treeBeastCreate(512, 384);
            this.treeBeastCreate(320, 448);
            this.treeBeastCreate(650, 512);
            baddieCreated=baddieTotal;
            baddieCount -= (stageMilestone*0.1);
            this.treeCreate(256, 64);
            this.treeCreate(576, 256);
            this.treeCreate(64, 384);
            this.treeCreate(704, 448);
            this.treeCreate(128, 512);
            this.treeCreate(448, 512);
            sceneryCount = 28;
        }
        if (stage-(Math.floor(stage/100)*100)==70 && bossSkeletonKilled==false) {
            this.skeletonCreate(750, 200, "redBoss");
            flameShot = game.add.audio('flameShot');
            baddieCreated = baddieTotal;
        }
        if (stage-(Math.floor(stage/100)*100)==80 && bossZombieBirdKilled==false) {
            this.bossZombieBirdCreate(750, 200);
            baddieCreated = baddieTotal;
        }
        if (stage-(Math.floor(stage/100)*100)==90 && bossMummyKilled==false) {
            this.bossMummyCreate(750, 200);
            baddieCreated = baddieTotal;
        }
        while(baddieCreated<baddieTotal) {
          var i = array[Math.floor(Math.random() * array.length-1)];
          if (nullArray.indexOf(i) >= 0/*includes(i)*/) {
                //stops enemies spawning in bottom left of screen near the player
          }
          else if (array.indexOf(i) >= 0/*includes(i)*/) {
            if (Math.random()>(0.85-stage*0.01)) {
              remainder = i%13;
              if (remainder<1) {
                remainder = 13;
              }
              var baddieX = (remainder-1)*64;
              var baddieY = Math.floor((array[i]-1)/13)*64;
              if (baddieY<0 || baddieY.isNaN) {
                  baddieY = 0;
              }
              if (Math.random()>(0.6) && (baddieTotal>11) && ((baddieTotal-baddieCreated)*0.1)>8) {
                this.vampireCreate(baddieX, baddieY);
                //console.log(i + ": vampire, " + baddieX + ", " + baddieY);
                baddieCreated += 11;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (Math.random()>(0.6) && (baddieTotal>10) && ((baddieTotal-baddieCreated)*0.13)>8&& evilwizardCount<1) {
                this.evilwizardCreate(baddieX, baddieY);
                //console.log(i + ": evil wizard, " + baddieX + ", " + baddieY);
                baddieCreated += 10;
                evilwizardCount ++;
                beamSFX = game.add.audio('shotSFX');
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (backgroundScene=="wasteland" && (baddieTotal>9) && ((baddieTotal-baddieCreated)*0.13)>6.5) {
                this.treeBeastCreate(baddieX, baddieY);
                //console.log(i + ": tree beast, " + baddieX + ", " + baddieY);
                baddieCreated += 9;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (Math.random()>(0.55) && (baddieTotal>9) && ((baddieTotal-baddieCreated)*0.13)>6.5&& swampCreatureCount<1) {
                this.swampCreatureCreate(baddieX, baddieY);
                //console.log(i + ": swamp creature, " + baddieX + ", " + baddieY);
                baddieCreated += 9;
                swampCreatureCount ++;
                waterShotSFX = game.add.audio('bubble');
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (Math.random()>(0.5) && (baddieTotal>8) && ((baddieTotal-baddieCreated)*0.14)>6&& zombieBirdCount<=5) {
                this.zombieBirdCreate(baddieX, baddieY);
                //console.log(i + ": zombie bird, " + baddieX + ", " + baddieY);
                baddieCreated += 8;
                zombieBirdCount ++;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (Math.random()>(0.45) && (baddieTotal>7) && ((baddieTotal-baddieCreated)*0.15)>5) {
                this.mummyCreate(baddieX, baddieY);
                //console.log(i + ": mummy, " + baddieX + ", " + baddieY);
                baddieCreated += 7;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (Math.random()>(0.4) && (baddieTotal>6) && ((baddieTotal-baddieCreated)*0.2)>5 && flameCount<=2) {
                this.flameCreate(baddieX, baddieY);
                //console.log(i + ": flame, " + baddieX + ", " + baddieY);
                baddieCreated += 6;
                flameCount += 1;
                flameShot = game.add.audio('flameShot');
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (Math.random()>(0.3) && (baddieTotal > baddieCreated)&&(baddieTotal>5)&&((baddieTotal-baddieCreated)*0.17)>3) {
                if (Math.random()*100>(117-stage)) {
                    this.skeletonCreate(baddieX, baddieY, "red");
                }
                else {
                    this.skeletonCreate(baddieX, baddieY, "grey");
                }
                //console.log(i + ": skeleton, " + baddieX + ", " + baddieY);
                baddieCreated += 5;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (Math.random()>(0.20) && (baddieTotal > baddieCreated)&&(baddieTotal>4)&&((baddieTotal-baddieCreated)*0.15)>2) {
                if (Math.random()*100>(108-stage)) {
                    this.swordZombieCreate(baddieX, baddieY, "red");
                }
                else {
                    this.swordZombieCreate(baddieX, baddieY, "green");
                }
                //console.log(i + ": swordZombie, " + baddieX + ", " + baddieY);
                baddieCreated += 4;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (Math.random()>(0.15) && (baddieTotal > baddieCreated)&&(baddieTotal>3)&&((baddieTotal-baddieCreated)*0.2)>=2) {
                this.spiderCreate(baddieX, baddieY);
                //console.log(i + ": spider, " + baddieX + ", " + baddieY);
                baddieCreated += 3;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (baddieTotal > baddieCreated) {
                if (Math.random()*100>(101-stage)) {
                    this.baddieCreate(baddieX, baddieY, "red");
                }
                else {
                    this.baddieCreate(baddieX, baddieY, "green");
                }
                //console.log(i + ": zombie, " + baddieX + ", " + baddieY);
                baddieCreated ++;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
            }     
          }
        }
        stars = game.add.group();
        stars.enableBody = true;
        collectSFX = game.add.audio('collect');
        
        while (chestCreated+1 < starTotal) {
            var starX = Math.random(0.05, 1) * 780;
            var starY = Math.random(0.1, 1) * 580;
            if (starTotal - chestCreated > 20) {
                this.coinCreate(starX, starY, "yellow"); 
                chestCreated += 25;
            }
            else if (starTotal - chestCreated > 10) {
                this.coinCreate(starX, starY, "green");
                chestCreated += 10;
            }
            else if (starTotal - chestCreated > 4) {
                this.coinCreate(starX, starY, "blue");
                chestCreated += 5;
            }
            else {
                this.coinCreate(starX, starY, "red");
                chestCreated += 2;
            }
        }
    
        //  The obstacles group
        platforms = game.add.group();
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        for (var i=0; i<117; i++) {
          if (array.indexOf(i) >= 0/*includes(i)*/) {
            if (((array[i]>14 && array[i]<117) && array[i]%13>1)&& sceneryCount<28) {
              var remainder = array[i]%13;
              if (remainder<1) {
                remainder = 13;
              }
              var blockX = (remainder-1)*64 + Math.round(Math.random()*10);
              var blockY = Math.floor((array[i]-1)/13)*64 + Math.round(Math.random()*10);
              var index;
              var sceneryModifier = 1 + (1-(sceneryCount/28)) + stage*0.001;
              if ((Math.random()<(0.10*sceneryModifier))) {
                //console.log(array[i] + ": tree, " + blockX + ", " + blockY);
                if (backgroundScene=="wasteland") {
                    var tree = platforms.create(blockX, blockY, 'tree');
                    tree.body.setSize(35, 20, 0, 33);
                    tree.body.immovable = true;
                    tree.Shadow = tree.addChild(game.add.sprite(-18, 11, 'treeShadow'));
                    tree.Shadow.alpha = 0.35;
                }
                else if (backgroundScene=="ruins") {
                    var statue = platforms.create(blockX, blockY, 'statue');
                    statue.body.setSize(30, 24, 1, 45);
                    statue.body.immovable = true;
                    statue.frame = Math.floor(Math.random()*4.99);
                }
                else {
                    var forestTree = platforms.create(blockX, blockY, 'largeTree');
                    forestTree.body.setSize(36, 21, 10, 50);
                    forestTree.body.immovable = true;
                }
                sceneryCount++;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              }
              else if (Math.random()>(1-(0.10*sceneryModifier))) {
                //console.log(array[i] + ": rock, " + blockX + ", " + blockY);
                if (backgroundScene=="wasteland") {
                    var rock = platforms.create(blockX, blockY, 'rock');
                    rock.body.immovable = true;
                    rock.body.setSize(32, 17, 0, 9);
                }
                else if (backgroundScene=="ruins") {
                    var pillar = platforms.create(blockX, blockY-8, 'pillars');
                    pillar.body.immovable = true;
                    pillar.body.setSize(32, 32, 0, 64);
                    pillar.frame = Math.floor(Math.random()*2.99);
                }
                else {
                    var forestScenery = platforms.create(blockX, blockY, 'forestScenery');
                    forestScenery.body.setSize(23, 16, 4, 4);
                    forestScenery.body.immovable = true;
                    forestScenery.frame = Math.floor(Math.random()*2.99);
                }
                sceneryCount++;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              } 
              else if (Math.random()>=0.2 && Math.random()<(0.3*(sceneryModifier/3))) {
                //console.log(array[i] + ": gravestone, " + blockX + ", " + blockY);
                if (backgroundScene=="wasteland") {
                    var gravestone = platforms.create(blockX, blockY, 'gravestone');
                    gravestone.body.immovable = true;
                    gravestone.body.setSize(19, 10, 0, 18);
                }
                else if (backgroundScene=="ruins") {
                    statue = platforms.create(blockX, blockY, 'statue');
                    statue.body.setSize(30, 18, 1, 45);
                    statue.body.immovable = true;
                    statue.frame = Math.floor(Math.random()*4.99);
                }
                else {
                    var forestTree = platforms.create(blockX, blockY, 'largeTree');
                    forestTree.body.setSize(36, 21, 10, 50);
                    forestTree.body.immovable = true;
                }
                sceneryCount++;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              } 
              else if ((28-sceneryCount)>=(116-array[i])) {
                //console.log(array[i] + ": tree");
                if (backgroundScene=="wasteland") {
                    tree = platforms.create(blockX, blockY, 'tree');
                    tree.body.setSize(35, 20, 0, 33);
                    tree.body.immovable = true;
                    tree.Shadow = tree.addChild(game.add.sprite(-18, 11, 'treeShadow'));
                    tree.Shadow.alpha = 0.35;
                }
                else if (backgroundScene=="ruins") {
                    pillar = platforms.create(blockX, blockY-8, 'pillars');
                    pillar.body.immovable = true;
                    pillar.body.setSize(32, 32, 0, 64);
                    pillar.frame = Math.floor(Math.random()*2.99);
                }
                else {
                    var forestScenery = platforms.create(blockX, blockY, 'forestScenery');
                    forestScenery.body.setSize(23, 16, 4, 4);
                    forestScenery.body.immovable = true;
                    forestScenery.frame = Math.floor(Math.random()*2.99);
                }
                sceneryCount++;
                index = array.indexOf(i);
                if (index > -1) {
                  array.splice(index, 1);
                }
              } 
            }     
          }
        }
        
        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
        
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
        /*
        //  Set up gui and display text
        if (coins>=1000000) {
            coinsText = game.add.bitmapText(10, 600, 'font', 'Coins: ' + (Math.round(coins*0.001))*0.001 + "M", 30);
        }
        else {
            coinsText = game.add.bitmapText(10, 600, 'font', 'Coins: ' + coins, 30);
        }
        xpText = game.add.bitmapText(60, 10, 'font', 'XP: ' + Math.round(xp) + '/' + nextLevelXp, 30);
        healthText = game.add.bitmapText(600, 10, 'font', 'Health: ' + health + "/" + maxHealth, 30);
        playerLevelText = game.add.bitmapText(625, 600, 'font', 'Your Level: ' + playerLevel, 30);
        stageText = game.add.bitmapText(335, 600, 'font', 'Stage: ' + stage, 30);    
        manaText = game.add.bitmapText(330, 10, 'font', 'Mana: ' + mana, 30); 
        coinsText.alpha = 0.7;
        xpText.alpha = 0.7;
        healthText.alpha = 0.7;
        playerLevelText.alpha = 0.7;
        stageText.alpha = 0.7;
        manaText.alpha = 0.7; */
        if (beamUnlockShown==true) {
            beamSprite = game.add.sprite(223, 597, 'beamIcon');
            beamSprite.frame = 1;
            var style = { font:'18px courier bolder', fill: '#f99a08', stroke: 'black', strokeThickness: 1.5};
            beamText = game.add.text(230, 604, '  E', style);
            if (timerBeam!= null && timerBeam.running) {
                beamText.text = this.formatTime(Math.round((timerBeamEvent.delay - timerBeam.ms) *0.001));
            }
            //beamText = game.add.bitmapText(230, 608, 'fontWhite', 'SPACE', 16);
            //beamText.tint = 0xf99a08;
        }
        if (manaRefillUnlockShown==true) {
            bottleSprite = game.add.sprite(535, 597, 'bottle');
            bottleSprite.frame = 1;
            var manaStyle = { font:'24px courier bolder', fill: '#f99a08', stroke: 'black', strokeThickness: 1.5};
            bottleText = game.add.text(543, 601, 'Q', manaStyle);
            if (timerMana!= null && timerMana.running) {
                bottleText.text = this.formatTime(Math.round((timerManaEvent.delay - timerMana.ms) *0.001));
            }
            //bottleText = game.add.bitmapText(536, 605, 'fontWhite', ' Q', 24);
            //bottleText.tint = 0xff0000;
        }
        resultBackground = game.add.sprite(-1000, 150, 'scrollStrip');
        levelRecordBackground = game.add.sprite(-1000, 370, 'scrollStrip');
        resultText = game.add.bitmapText(205, 160, 'font', '', 24);
        resultText2 = game.add.bitmapText(250, 190, 'font', '', 18);
        resultText3 = game.add.bitmapText(125, 215, 'font', '', 18);
        levelRecord = game.add.bitmapText(325, 380, 'font', '', 24);
        levelRecord2 = game.add.bitmapText(310, 410, 'font', '', 18);
        levelRecord3 = game.add.bitmapText(220, 435, 'font', '', 18);
        
        //enable separate hitbox for use in obstacle collisions
        playerLegs = game.add.sprite(0, 0, 'dude');
        game.physics.arcade.enable(playerLegs);
        playerLegs.body.collideWorldBounds = true;
        playerLegs.alpha = 0;
        playerLegs.body.setSize(27, 32, 2, 2);
        //player.addChild(playerLegs);
        
        dummyPlayer = game.add.sprite(player.x, player.y, 'dude');
        dummyPlayer.alpha = 0;
    },
    
    update: function() {
        /*if (player.x!=playerLegs.x || player.y!=playerLegs.y) {
            console.log('exists' + playerLegs.exists + '/' + player.x + '/' + player.y + ':'  + playerLegs.x + '/' + playerLegs.y);
        }*/
        if (player.exists) { //fix melee attack collision detection problem
            playerLegs.exists = true;
            playerLegs.x = player.x;
            playerLegs.y = player.y;
        }
        //  Collide the player and enemies with the platforms(obstacles)
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.overlap(playerLegs, platforms, this.dummyPlayerShow, null, this);
        game.physics.arcade.collide(baddies, baddies); 
        //game.physics.arcade.collide(baddies, bossZombies); 
        game.physics.arcade.collide(baddies, flames);
        game.physics.arcade.collide(flames, flames);  
        game.physics.arcade.collide(skeletons, baddies); 
        if (stage!=70) {
            game.physics.arcade.collide(skeletons, flames);
        }
        game.physics.arcade.collide(skeletons, skeletons); 
        game.physics.arcade.collide(mummies, baddies); 
        game.physics.arcade.collide(mummies, flames);
        game.physics.arcade.collide(mummies, skeletons); 
        game.physics.arcade.collide(mummies, spiders); 
        game.physics.arcade.collide(mummies, mummies); 
        game.physics.arcade.collide(vampires, baddies); 
        game.physics.arcade.collide(vampires, flames);
        game.physics.arcade.collide(vampires, skeletons); 
        game.physics.arcade.collide(vampires, spiders); 
        game.physics.arcade.collide(vampires, mummies);
        game.physics.arcade.collide(vampires, vampires);
        game.physics.arcade.collide(vampires, decoys);
        game.physics.arcade.collide(swordZombies, baddies); 
        game.physics.arcade.collide(swordZombies, flames);
        game.physics.arcade.collide(swordZombies, skeletons); 
        game.physics.arcade.collide(swordZombies, spiders); 
        game.physics.arcade.collide(swordZombies, mummies);
        game.physics.arcade.collide(swordZombies, vampires);
        game.physics.arcade.collide(swordZombies, decoys);
        game.physics.arcade.collide(decoys, baddies); 
        game.physics.arcade.collide(decoys, flames);
        game.physics.arcade.collide(decoys, skeletons); 
        game.physics.arcade.collide(decoys, spiders); 
        game.physics.arcade.collide(decoys, mummies);
        game.physics.arcade.collide(decoys, decoys);
        game.physics.arcade.collide(spiders, baddies); 
        game.physics.arcade.collide(spiders, spiders); 
        game.physics.arcade.collide(spiders, flames);
        game.physics.arcade.collide(spiders, skeletons); 
        game.physics.arcade.collide(zombieBirds, zombieBirds); 
        //  Check to see if player overlaps with a chest    
        game.physics.arcade.overlap(playerLegs, stars, this.collectStar, null, this);
        game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        game.physics.arcade.overlap(door, stars, this.collectStar, null, this);
        if (baddieCount<=0) {
            game.physics.arcade.collide(playerLegs, door, this.doorOpen, null, this);    
        }
        if (spinning) {
            game.physics.arcade.collide(playerLegs, baddies, this.badKill, null, this);
            game.physics.arcade.collide(playerLegs, bossZombies, this.bossZombieKill, null, this);
            game.physics.arcade.collide(playerLegs, bossZombieBirds, this.bossZombieBirdKill, null, this);
            game.physics.arcade.collide(playerLegs, bossMummies, this.bossMummyKill, null, this);
            game.physics.arcade.collide(playerLegs, bossFinals, this.bossFinalKill, null, this);
            game.physics.arcade.collide(playerLegs, flames, this.flameKill, null, this);
            game.physics.arcade.collide(playerLegs, skeletons, this.skeletonKill, null, this);
            game.physics.arcade.collide(playerLegs, mummies, this.mummyKill, null, this);
            game.physics.arcade.collide(playerLegs, spiders, this.spiderKill, null, this);
            game.physics.arcade.collide(playerLegs, evilwizards, this.evilwizardKill, null, this);
            game.physics.arcade.collide(playerLegs, swampCreatures, this.swampCreatureKill, null, this);
            game.physics.arcade.collide(playerLegs, zombieBirds, this.zombieBirdKill, null, this);
            game.physics.arcade.collide(playerLegs, miniZombieBirds, this.miniZombieBirdKill, null, this);
            game.physics.arcade.collide(playerLegs, treeBeasts, this.treeBeastKill, null, this);
            game.physics.arcade.collide(playerLegs, swordZombies, this.swordZombieKill, null, this);
            game.physics.arcade.collide(playerLegs, vampires, this.vampireKill, null, this);
            game.physics.arcade.collide(playerLegs, decoys, this.decoyKill, null, this);
        }
        else if (game.time.now>invulnerableTimer){
            player.alpha = 1;
            game.physics.arcade.overlap(playerLegs, baddies, this.badTouch, null, this);
            game.physics.arcade.overlap(playerLegs, swordZombies, this.badTouch, null, this);
            game.physics.arcade.overlap(playerLegs, bossZombies, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, bossZombieBirds, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, bossMummies, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, bossFinals, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, flames, this.badTouch, null, this);
            game.physics.arcade.overlap(playerLegs, flameBullets, this.badTouch, null, this);
            game.physics.arcade.overlap(playerLegs, skeletons, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, mummies, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, iceBeams, this.badTouch, null, this);
            game.physics.arcade.overlap(playerLegs, iceBeams, this.freeze, null, this);
            game.physics.arcade.overlap(playerLegs, waterShots, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, zombieBirds, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, miniZombieBirds, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, spiders, this.badTouch, null, this);
            game.physics.arcade.overlap(playerLegs, treeBeasts, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, evilRoots, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, vampires, this.badTouchTwo, null, this);
            game.physics.arcade.overlap(playerLegs, decoys, this.badTouch, null, this);
            game.physics.arcade.overlap(playerLegs, swampCreatures, this.badTouch, null, this);
        }
        else {
            player.alpha = 0.5;
            //console.log(spinning);
        }
        game.physics.arcade.collide(bullets, baddies, this.badKill, null, this);
        game.physics.arcade.collide(bullets, bossZombies, this.bossZombieKill, null, this);
        game.physics.arcade.collide(bullets, bossZombieBirds, this.bossZombieBirdKill, null, this);
        game.physics.arcade.collide(bullets, bossMummies, this.bossMummyKill, null, this);
        game.physics.arcade.collide(bullets, bossFinals, this.bossFinalKill, null, this);
        game.physics.arcade.collide(bullets, flames, this.flameKill, null, this);
        game.physics.arcade.collide(bullets, skeletons, this.skeletonKill, null, this);
        game.physics.arcade.collide(bullets, mummies, this.mummyKill, null, this);
        game.physics.arcade.collide(bullets, spiders, this.spiderKill, null, this);
        game.physics.arcade.collide(bullets, evilwizards, this.evilwizardKill, null, this);
        game.physics.arcade.collide(bullets, swampCreatures, this.swampCreatureKill, null, this);
        game.physics.arcade.collide(bullets, zombieBirds, this.zombieBirdKill, null, this);
        game.physics.arcade.collide(bullets, miniZombieBirds, this.miniZombieBirdKill, null, this);
        game.physics.arcade.collide(bullets, platforms, this.bulletKill, null, this);
        game.physics.arcade.collide(bullets, treeBeasts, this.treeBeastKill, null, this);
        game.physics.arcade.collide(bullets, swordZombies, this.swordZombieKill, null, this);
        game.physics.arcade.collide(bullets, vampires, this.vampireKill, null, this);
        game.physics.arcade.collide(bullets, decoys, this.decoyKill, null, this);
        
        game.physics.arcade.overlap(skeletons, platforms, this.skeletonSmash, null, this);
        game.physics.arcade.overlap(mummies, platforms, this.mummySmash, null, this);
        game.physics.arcade.overlap(bossZombies, platforms, this.bossZombieSmash, null, this);
        game.physics.arcade.overlap(bossZombieBirds, platforms, this.bossZombieBirdSmash, null, this);
        game.physics.arcade.overlap(bossMummies, platforms, this.bossMummySmash, null, this);
        game.physics.arcade.overlap(spiders, platforms, this.spiderClimb, null, this);
        game.physics.arcade.collide(swordZombies, platforms, this.swordZombieSteer, null, this);
        game.physics.arcade.overlap(platforms, stars, this.moveStar, null, this);
        game.physics.arcade.overlap(platforms, flames, this.moveFlame, null, this);
        game.physics.arcade.overlap(platforms, evilwizards, this.moveEvilWizard, null, this);
        //game.physics.arcade.overlap(stars, stars, this.moveStar, null, this);
    
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
    
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
        if (eKey.isDown && beamWeapon==true) {
            this.beamWeaponActivate();
        }
        if (qKey.isDown && manaRefillAvailable==true) {
            this.manaRefillActivate();
        }
        if ((cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown || fireLeft==true || fireRight==true || fireUp==true || fireDown==true) && game.time.now>bulletTimer && player.isAlive) {
            if (mana>=manaCost) {
                this.fire();
                mana -= manaCost;
                manaText.text = "MP: " + mana + "/" + maxMana;
                manaCrop.x = (1-(mana/maxMana))*80;
                manaBar.updateCrop();
            }
            else {
                this.manaWarnHighlightShow();
            }
        }
        if (fireButton.isDown && spinning==false && mana>=10 && game.time.now>player.spinTimer) {
            spinning = true;
            spinSFX.play();
            player.spinTimer = game.time.now + 750;
            mana -= 10;
            game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {   spinning = false; });
        }
        
        this.baddieUpdate();
        this.spiderUpdate();
        this.flameUpdate();
        this.skeletonUpdate();
        this.mummyUpdate();
        this.evilwizardUpdate();
        this.zombieBirdUpdate();
        if (zombieBirdCount>0 || stage-(Math.floor(stage/100)*100)==80) {
            this.miniZombieBirdUpdate();
        }
        this.swampCreatureUpdate();
        this.treeBeastUpdate();
        this.evilRootUpdate();
        this.bossZombieUpdate();
        this.bossZombieBirdUpdate();
        this.bossMummyUpdate();
        this.bossFinalUpdate();
        this.manaRegen();
        this.swordZombieUpdate();
        //this.adTimeUpdate();
        this.vampireUpdate();
        this.decoyUpdate();
        this.beamTimerUpdate();
        this.manaRefillTimerUpdate();
        this.dummyPlayerUpdate();

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
    /*render: function() {
    	game.debug.text(game.time.fps, 800, 14, "#00ff00");
    },*/
    baddieCreate: function(x, y, colour) {
        if (colour=="green") {
            var baddie = baddies.create(x, y, 'baddie');
            baddie.health = baddieHpAdjuster * 4;
            baddie.maxHealth = baddieHpAdjuster * 4;
            baddie.colour = "green";
        }
        else if (colour=="red") {
            var baddie = baddies.create(x, y, 'zombieRed');
            baddie.health = baddieHpAdjuster * 6;
            baddie.maxHealth = baddieHpAdjuster * 6;
            baddie.colour = "red";
        }
        //  enable physics on the baddie
        game.physics.arcade.enable(baddie);
        baddie.body.collideWorldBounds = true;
        
        baddie.healthBarBack = baddie.addChild(game.add.graphics(0, 0));
        baddie.healthBarBack.lineStyle(3, 0xba3500, 1);
        baddie.healthBarBack.moveTo(0, 0);
        baddie.healthBarBack.lineTo(20, 0);
        baddie.healthBar = baddie.addChild(game.add.graphics(0, 0));
        baddie.healthBar.lineStyle(3, 0xffd900, 1);
        baddie.healthBar.moveTo(0, 0);
        baddie.healthBar.lineTo(20*(baddie.health/baddie.maxHealth), 0);
        
        baddie.healthBarBack.visible = false;
        baddie.healthBar.visible = false;
        //  Our two animations, walking left and right.
        baddie.animations.add('baddieLeft', [0, 1, 2], 15, true);
        baddie.animations.add('baddieRight', [3, 4, 5], 15, true);
    },
    baddieUpdate: function() {
        baddies.forEach(function(baddie) {
            baddie.body.velocity.x = 0;
            baddie.body.velocity.y = 0;
        
            game.physics.arcade.collide(baddie, platforms);
            
            if (baddie.colour=="green") {
                if (stage<3) {
                    game.physics.arcade.moveToObject(baddie, player, baddieSpeedAdjuster*110);
                }
                else {
                    game.physics.arcade.moveToObject(baddie, player, baddieSpeedAdjuster*130);    
                }
            }
            else if (baddie.colour=="red") {
                game.physics.arcade.moveToObject(baddie, player, baddieSpeedAdjuster*155);
            }
            
            if (player.body.x < baddie.body.x) {
                baddie.animations.play('baddieLeft');
            }
            else {
                baddie.animations.play('baddieRight');
            }
        });
    },
    bossZombieCreate: function(x, y, colour) {
        if (colour=="green") {
            var bossZombie = bossZombies.create(x, y, 'bossZombie');
            bossZombie.health = baddieHpAdjuster * 325;
            bossZombie.maxHealth = baddieHpAdjuster * 325;
            bossZombie.colour = "green";
        }
        else if (colour=="red") {
            bossZombie = bossZombies.create(x, y, 'zombieRed');
            bossZombie.health = baddieHpAdjuster * 400;
            bossZombie.maxHealth = baddieHpAdjuster * 400;
            bossZombie.colour = "red";
        }
        //  enable physics on the bossZombie
        game.physics.arcade.enable(bossZombie);
        bossZombie.body.collideWorldBounds = true;
        bossZombie.timer = game.time.now;
        bossZombie.interval = 3000;
        bossZombie.damageTimer = 0;
        
        bossZombie.healthBarBack = bossZombie.addChild(game.add.graphics(0, 0));
        bossZombie.healthBarBack.lineStyle(3, 0xba3500, 1);
        bossZombie.healthBarBack.moveTo(0, 0);
        bossZombie.healthBarBack.lineTo(20, 0);
        bossZombie.healthBar = bossZombie.addChild(game.add.graphics(0, 0));
        bossZombie.healthBar.lineStyle(3, 0xffd900, 1);
        bossZombie.healthBar.moveTo(0, 0);
        bossZombie.healthBar.lineTo(20*(bossZombie.health/bossZombie.maxHealth), 0);
        
        bossZombie.healthBarBack.visible = false;
        bossZombie.healthBar.visible = false;
        //  Our two animations, walking left and right.
        bossZombie.animations.add('bossZombieLeft', [0, 1, 2], 5, true);
        bossZombie.animations.add('bossZombieRight', [3, 4, 5], 5, true);
    },
    bossZombieUpdate: function() {
        bossZombies.forEach(function(bossZombie) {
            bossZombie.body.velocity.x = 0;
            bossZombie.body.velocity.y = 0;
    
            game.physics.arcade.collide(bossZombie, platforms);
            
            if (bossZombie.colour=="green") {
                    game.physics.arcade.moveToObject(bossZombie, player, baddieSpeedAdjuster*160-((bossZombie.health/baddieHpAdjuster)*0.1));
            }
            else if (bossZombie.colour=="red") {
                    game.physics.arcade.moveToObject(bossZombie, player, baddieSpeedAdjuster*200-((bossZombie.health/baddieHpAdjuster)*0.1));
            }
            if (player.body.x < bossZombie.body.x) {
                bossZombie.animations.play('bossZombieLeft');
            }
            else {
                bossZombie.animations.play('bossZombieRight');
            }
        });
    },
    bossZombieSmash: function(bossZombie, platforms) {
        platforms.destroy(); 
        var woodSmash = game.add.audio('woodSmash'); 
        woodSmash.play(); 
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 0.6, function () { self.rubbleCreate(platforms.x, platforms.y); });
    },
    rubbleCreate: function(x, y) {
        var rubble = platforms.create(x, y, 'rubble');
        //console.log("rubble");
        rubble.body.setSize(32, 16, 0, 16);
        rubble.body.immovable = true;
    },
    spiderCreate: function(x, y) {
        var spider = spiders.create(x, y, 'spider');
        spider.health = baddieHpAdjuster * 11;
        spider.maxHealth = baddieHpAdjuster * 11;
        //  enable physics on the spider
        game.physics.arcade.enable(spider);
        spider.body.collideWorldBounds = true;
        spider.collide = false;
        
        spider.healthBarBack = spider.addChild(game.add.graphics(0, 0));
        spider.healthBarBack.lineStyle(3, 0xba3500, 1);
        spider.healthBarBack.moveTo(0, 0);
        spider.healthBarBack.lineTo(20, 0);
        spider.healthBar = spider.addChild(game.add.graphics(0, 0));
        spider.healthBar.lineStyle(3, 0xffd900, 1);
        spider.healthBar.moveTo(0, 0);
        spider.healthBar.lineTo(20*(spider.health/spider.maxHealth), 0);
        
        spider.healthBarBack.visible = false;
        spider.healthBar.visible = false;
        //  Our animations.
        spider.animations.add('spiderLeft', [6, 7, 8, 9, 10, 11], 10, true);
        spider.animations.add('spiderRight', [18, 19, 20, 21, 22, 23], 10, true); 
        spider.animations.add('climbUp', [0, 1, 2, 3, 4, 5], 10, true);
        spider.animations.add('climbDown', [12, 13, 14, 15, 16, 17], 10, true);
    },
    spiderUpdate: function() {
        spiders.forEach(function(spider) {
            spider.body.velocity.x = 0;
            spider.body.velocity.y = 0;
            
            if (spider.collide) {
                game.physics.arcade.moveToObject(spider, player, baddieSpeedAdjuster*60-(spider.health/baddieHpAdjuster));
                if (player.y>spider.y) {
                    spider.animations.play('climbDown');
                }
                else {
                    spider.animations.play('climbUp');
                }
            }
            else {
                game.physics.arcade.moveToObject(spider, player, baddieSpeedAdjuster*146-(spider.health*2/baddieHpAdjuster));
                if (player.body.x < spider.body.x) {
                    spider.animations.play('spiderLeft');
                }
                else {
                    spider.animations.play('spiderRight');
                }
            }
        });
    },
    spiderClimb: function(spider, platforms) {
        spider.collide = true;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {   spider.collide = false; });
    },  
    swordZombieCreate: function(x, y, colour) {
        if (colour=="green") {
            var swordZombie = swordZombies.create(x, y, 'swordZombie');
            swordZombie.health = baddieHpAdjuster * 14;
            swordZombie.maxHealth = baddieHpAdjuster * 14;
            swordZombie.colour = "green";
        }
        else if (colour=="red") {
            swordZombie = swordZombies.create(x, y, 'swordZombie');
            swordZombie.health = baddieHpAdjuster * 23;
            swordZombie.maxHealth = baddieHpAdjuster * 23;
            swordZombie.colour = "red";
        }
        //  enable physics on the swordZombie
        game.physics.arcade.enable(swordZombie);
        swordZombie.body.collideWorldBounds = true;
        swordZombie.isAlive = true;
        swordZombie.collide = false;
        swordZombie.collideTimer = 0;
        
        swordZombie.healthBarBack = swordZombie.addChild(game.add.graphics(0, 0));
        swordZombie.healthBarBack.lineStyle(3, 0xba3500, 1);
        swordZombie.healthBarBack.moveTo(0, 0);
        swordZombie.healthBarBack.lineTo(20, 0);
        swordZombie.healthBar = swordZombie.addChild(game.add.graphics(0, 0));
        swordZombie.healthBar.lineStyle(3, 0xffd900, 1);
        swordZombie.healthBar.moveTo(0, 0);
        swordZombie.healthBar.lineTo(20*(swordZombie.health/swordZombie.maxHealth), 0);
        
        swordZombie.healthBarBack.visible = false;
        swordZombie.healthBar.visible = false;
        //  Our two animations, walking left and right.
        swordZombie.animations.add('swordZombieLeft', [0, 1, 2], 15, true);
        swordZombie.animations.add('swordZombieRight', [3, 4, 5], 15, true);
        swordZombie.animations.add('swordZombieLeftRed', [6, 7, 8], 15, true);
        swordZombie.animations.add('swordZombieRightRed', [9, 10, 11], 15, true);
    },
    swordZombieUpdate: function() {
        swordZombies.forEach(function(swordZombie) {
            swordZombie.body.velocity.x = 0;
            swordZombie.body.velocity.y = 0;
        
            game.physics.arcade.collide(swordZombie, platforms);
            
            if (swordZombie.colour=="green") {
                if (swordZombie.collide == false) {
                    game.physics.arcade.moveToObject(swordZombie, player, baddieSpeedAdjuster*140);
                }
                else {
                    game.physics.arcade.moveToXY(swordZombie, 832-player.x+swordZombie.x, 640-player.y+swordZombie.y, 40);
                }
                if (player.body.x < swordZombie.body.x) {
                    swordZombie.animations.play('swordZombieLeft');
                }
                else {
                    swordZombie.animations.play('swordZombieRight');
                }
            }
            else if (swordZombie.colour=="red") {
                if (swordZombie.collide == false) {
                    game.physics.arcade.moveToObject(swordZombie, player, baddieSpeedAdjuster*165);
                }
                else {
                    game.physics.arcade.moveToXY(swordZombie, 832-player.x+swordZombie.x, 640-player.y+swordZombie.y, 40);
                }
                if (player.body.x < swordZombie.body.x) {
                    swordZombie.animations.play('swordZombieLeftRed');
                }
                else {
                    swordZombie.animations.play('swordZombieRightRed');
                }
            }
        });
    },
    swordZombieSteer: function(swordZombie, platforms) {
        if (swordZombie.collide == false && game.time.now>swordZombie.collideTimer) {
            swordZombie.collideTimer = game.time.now + 3000;
            swordZombie.collide = true;
            game.time.events.add(Phaser.Timer.SECOND * 0.65, function () { swordZombie.collide = false; });
        }
    },
    skeletonCreate: function(x, y, colour) {
        if (colour=="grey") {
            var skeleton = skeletons.create(x, y, 'skeleton');
            skeleton.health = baddieHpAdjuster * 18;
            skeleton.maxHealth = baddieHpAdjuster * 18;
            skeleton.colour = "grey";
        }
        else if (colour=="red") {
            skeleton = skeletons.create(x, y, 'skeleton');
            skeleton.health = baddieHpAdjuster * 28;
            skeleton.maxHealth = baddieHpAdjuster * 28;
            skeleton.colour = "red";
            skeleton.tint = 0xba3500;
        }
        else if (colour=="redBoss") {
            skeleton = skeletons.create(x, y, 'skeleton');
            skeleton.health = baddieHpAdjuster * 325;
            skeleton.maxHealth = baddieHpAdjuster * 325;
            skeleton.colour = "redBoss";
            skeleton.tint = 0xba3500;
            skeleton.scale.x = 2.5;
            skeleton.scale.y = 2.5;
            skeleton.bossTimer = 0;
            skeleton.bossDamageTimer = 0;
            skeleton.isAlive = true;
        }
        //  enable physics on the skeleton
        game.physics.arcade.enable(skeleton);
        skeleton.body.collideWorldBounds = true;
        skeleton.collide = false;
        
        skeleton.healthBarBack = skeleton.addChild(game.add.graphics(0, 0));
        skeleton.healthBarBack.lineStyle(3, 0xba3500, 1);
        skeleton.healthBarBack.moveTo(0, 0);
        skeleton.healthBarBack.lineTo(20, 0);
        skeleton.healthBar = skeleton.addChild(game.add.graphics(0, 0));
        skeleton.healthBar.lineStyle(3, 0xffd900, 1);
        skeleton.healthBar.moveTo(0, 0);
        skeleton.healthBar.lineTo(20*(skeleton.health/skeleton.maxHealth), 0);
        
        skeleton.healthBarBack.visible = false;
        skeleton.healthBar.visible = false;
        //  Our animations.
        skeleton.animations.add('skeletonLeft', [3, 4, 5], 10, true);
        skeleton.animations.add('skeletonRight', [6, 7, 8], 10, true); 
        skeleton.animations.add('stomp', [0, 1, 2], 10, true);
        skeleton.animations.add('smash', [9, 10], 10, true);
    },
    skeletonUpdate: function() {
        var self = this;
        skeletons.forEach(function(skeleton) {
            
            skeleton.body.velocity.x = 0;
            skeleton.body.velocity.y = 0;
            
            game.physics.arcade.collide(skeleton, platforms);
            
            if (skeleton.collide) {
                skeleton.animations.stop();
                skeleton.animations.play('smash');
            }
            else if ((Math.abs(player.x - skeleton.x)) + (Math.abs(player.y - skeleton.y)) < 275 || skeleton.colour=="redBoss") {
                if (skeleton.colour=="grey") {
                    game.physics.arcade.moveToObject(skeleton, player, baddieSpeedAdjuster*178-(skeleton.health*2/baddieHpAdjuster));
                }
                else if (skeleton.colour=="red") {
                    game.physics.arcade.moveToObject(skeleton, player, baddieSpeedAdjuster*232-(skeleton.health*2/baddieHpAdjuster));
                }
                else if (skeleton.colour=="redBoss") {
                    game.physics.arcade.moveToObject(skeleton, player, baddieSpeedAdjuster*190-(skeleton.health*0.1/baddieHpAdjuster));
                }
                if (player.body.x < skeleton.body.x) {
                    skeleton.animations.play('skeletonLeft');
                }
                else {
                    skeleton.animations.play('skeletonRight');
                }
            }
            else if (skeleton.health<skeleton.maxHealth) {
                if (skeleton.colour=="grey") {
                    game.physics.arcade.moveToObject(skeleton, player, baddieSpeedAdjuster*175-(skeleton.health*2/baddieHpAdjuster));
                }
                else if (skeleton.colour=="red") {
                    game.physics.arcade.moveToObject(skeleton, player, baddieSpeedAdjuster*223-(skeleton.health*2/baddieHpAdjuster));
                }
                if (player.body.x < skeleton.body.x) {
                    skeleton.animations.play('skeletonLeft');
                }
                else {
                    skeleton.animations.play('skeletonRight');
                }
            }
            else {
                skeleton.animations.play('stomp');
            }
            if (skeleton.colour=="redBoss" && skeleton.bossTimer<game.time.now && flameCount<3 && skeleton.isAlive) {
                self.flameCreate(skeleton.x, skeleton.y);
                flameCount++;
                baddieCount += 6;
                skeleton.bossTimer = game.time.now + 2000;
            }
        });
    },
    skeletonSmash: function(skeleton, platforms) {
        skeleton.collide = true;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {   platforms.destroy(); var woodSmash = game.add.audio('woodSmash'); woodSmash.play(); skeleton.collide = false; });
    },
    mummyCreate: function(x, y) {
        if (backgroundScene=="wasteland") {
            var mummy = mummies.create(x, y, 'mummy');
            mummy.animations.add('mummyLeft', [9, 10, 11], 10, true);
            mummy.animations.add('mummyRight', [3, 4, 5], 10, true); 
            mummy.animations.add('smash', [12, 7], 10, true);
        }
        else {
            var mummy = mummies.create(x, y, 'golem');
            mummy.animations.add('golemLeft', [9, 10, 11], 10, true);
            mummy.animations.add('golemRight', [6, 7, 8], 10, true); 
            mummy.animations.add('smashLeft', [10, 12], 4, true);
            mummy.animations.add('smashRight', [7, 13], 4, true);
        }
        mummy.health = baddieHpAdjuster * 35;
        mummy.maxHealth = baddieHpAdjuster * 35;
        //  enable physics on the mummy
        game.physics.arcade.enable(mummy);
        mummy.body.collideWorldBounds = true;
        mummy.collide = false;
        
        mummy.healthBarBack = mummy.addChild(game.add.graphics(0, 0));
        mummy.healthBarBack.lineStyle(3, 0xba3500, 1);
        mummy.healthBarBack.moveTo(0, 0);
        mummy.healthBarBack.lineTo(20, 0);
        mummy.healthBar = mummy.addChild(game.add.graphics(0, 0));
        mummy.healthBar.lineStyle(3, 0xffd900, 1);
        mummy.healthBar.moveTo(0, 0);
        mummy.healthBar.lineTo(20*(mummy.health/mummy.maxHealth), 0);
        
        mummy.healthBarBack.visible = false;
        mummy.healthBar.visible = false;
    },
    mummyUpdate: function() {
        mummies.forEach(function(mummy) {
            mummy.body.velocity.x = 0;
            mummy.body.velocity.y = 0;
        
            game.physics.arcade.collide(mummy, platforms);
            
            if (mummy.collide) {
                mummy.animations.stop();
                if (backgroundScene=="wasteland") {
                    mummy.animations.play('smash');
                }
                else if (mummy.x<player.x) {
                    mummy.animations.play('smashRight');
                }
                else {
                    mummy.animations.play('smashLeft');
                }
            }
            else {
                if ((baddieCount/baddieTotal)<0.75 || (Math.abs(player.x - mummy.x)) + (Math.abs(player.y - mummy.y)) < 150) {
                    game.physics.arcade.moveToObject(mummy, player, baddieSpeedAdjuster*210-(mummy.health*4/baddieHpAdjuster));
                }
                else {
                    if (player.y<320) {
                        game.physics.arcade.moveToXY(mummy, player.x, player.y+150, 225-mummy.health*4);
                    }
                    else {
                        game.physics.arcade.moveToXY(mummy, player.x, player.y-150, 225-mummy.health*4);
                    }
                }
                if (player.body.x < mummy.body.x) {
                    if (backgroundScene=="wasteland") {
                        mummy.animations.play('mummyLeft');
                    }
                    else {
                        mummy.animations.play('golemLeft');
                    }
                }
                else {
                    if (backgroundScene=="wasteland") {
                        mummy.animations.play('mummyRight');
                    }
                    else {
                        mummy.animations.play('golemRight');
                    }
                }
            }
        });
    },
    mummySmash: function(mummy, platforms) {
        mummy.collide = true;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {   platforms.destroy(); var woodSmash = game.add.audio('woodSmash'); woodSmash.play(); mummy.collide = false; });
    },
    flameCreate: function(x, y) {
        var flame = flames.create(x, y, 'flame');
        flame.health = baddieHpAdjuster * 15;
        flame.maxHealth = baddieHpAdjuster * 15;
        game.physics.arcade.enable(flame);
        flame.body.collideWorldBounds = true;
        flame.body.immovable = true;
        flame.isAlive = true;
        flame.timer = 10 + (Math.random()*1200);
        flame.animations.add('flicker', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        
        flame.healthBarBack = flame.addChild(game.add.graphics(0, 0));
        flame.healthBarBack.lineStyle(3, 0xba3500, 1);
        flame.healthBarBack.moveTo(0, 0);
        flame.healthBarBack.lineTo(20, 0);
        flame.healthBar = flame.addChild(game.add.graphics(0, 0));
        flame.healthBar.lineStyle(3, 0xffd900, 1);
        flame.healthBar.moveTo(0, 0);
        flame.healthBar.lineTo(20*(flame.health/flame.maxHealth), 0);
        
        flame.healthBarBack.visible = false;
        flame.healthBar.visible = false;
    },
    flameUpdate: function() {
        flames.forEach(function(flame) {
            flame.animations.play('flicker');
            if ((game.time.now > flame.timer) && flame.isAlive) {
                var flameBullet = flameBullets.create(flame.x, flame.y, 'flame');
                flameBullet.animations.add('fire', [0], true);
                game.physics.arcade.moveToXY(flameBullet, player.x, player.y, 160);
                flameBullet.lifespan = 6900;
                flameBullet.animations.play('fire');
                flame.timer = game.time.now + flameBulletSpacing;
                flameShot.play();
            }
        });
    },
    treeBeastCreate: function(x, y) {
        var treeBeast = treeBeasts.create(x, y, 'treeBeast');
        treeBeast.health = baddieHpAdjuster * 44;
        treeBeast.maxHealth = baddieHpAdjuster * 44;
        treeBeast.frame = 0;
        treeBeast.shadow = treeBeast.addChild(game.add.sprite(17, 11, 'treeShadow'));
        treeBeast.shadow.alpha = 0.35,
        game.physics.arcade.enable(treeBeast);
        treeBeast.body.immovable = true;
        treeBeast.isAlive = true;
        treeBeast.active = false;
        treeBeast.animations.add('reveal', [0, 1, 2], 3, false);
        treeBeast.animations.add('wiggle', [3, 4, 5, 5, 4, 3], 10, true);
        treeBeast.rootTimer = game.time.now + 1000 + (Math.random()*5000);
        
        treeBeast.healthBarBack = treeBeast.addChild(game.add.graphics(0, 0));
        treeBeast.healthBarBack.lineStyle(3, 0xba3500, 1);
        treeBeast.healthBarBack.moveTo(0, 0);
        treeBeast.healthBarBack.lineTo(20, 0);
        treeBeast.healthBar = treeBeast.addChild(game.add.graphics(0, 0));
        treeBeast.healthBar.lineStyle(3, 0xffd900, 1);
        treeBeast.healthBar.moveTo(0, 0);
        treeBeast.healthBar.lineTo(20*(treeBeast.health/treeBeast.maxHealth), 0);
        
        treeBeast.healthBarBack.visible = false;
        treeBeast.healthBar.visible = false;
    },
    evilRootWarning: function(x, y) {
        var evilRootShoot = game.add.sprite(x, y, 'evilRoot');
        evilRootShoot.animations.add('sprout', [0, 0, 0, 1, 2, 3], 4, false);
        evilRootShoot.animations.play('sprout');
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {  evilRootShoot.destroy(); self.evilRootCreate(evilRootShoot.x, evilRootShoot.y);});
    },
    treeBeastUpdate: function() {
        var self = this;
        treeBeasts.forEach(function(treeBeast) {
            if (treeBeast.active==true) {
                treeBeast.animations.play('wiggle');
            }
            else if ((((Math.abs(player.x - (treeBeast.x+52))) + (Math.abs(player.y - (treeBeast.y+26))) < 110) || treeBeast.health<treeBeast.maxHealth) && treeBeast.active==false) {
                treeBeast.animations.play('reveal');
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { treeBeast.animations.stop(); treeBeast.active = true; treeBeast.animations.play('wiggle'); });
            }
            if (treeBeast.isAlive && treeBeast.rootTimer<game.time.now){
                var random = (Math.floor(Math.random()*20))-10;
                var randomX = random + player.x;
                var randomY = random + player.y;
                self.evilRootWarning(randomX, randomY);
                treeBeast.rootTimer = game.time.now + (Math.random()*15000);
            }
        });
    },
    evilRootCreate: function(x, y) {
        var evilRoot = evilRoots.create(x, y, 'evilRoot');
        evilRoot.animations.add('wave', [4, 3, 5, 3, 4], 10, true);
        evilRoot.animations.add('retreat', [3, 2, 1, 0], 4, false);
        evilRoot.timer = game.time.now + 5000;
    },
    evilRootUpdate: function() {
        evilRoots.forEach(function(evilRoot) {
            if (evilRoot.timer>game.time.now) {
                evilRoot.animations.play('wave');
            }
            else {
                evilRoot.animations.play('retreat');
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {  evilRoot.destroy(); });
            }
        });
    },
    evilwizardCreate: function(x, y) {
        var evilwizard = evilwizards.create(x, y, 'evilWizard');
        evilwizard.health = baddieHpAdjuster * 37;
        evilwizard.maxHealth = baddieHpAdjuster * 37;
        //  We need to enable physics on the evilwizard
        game.physics.arcade.enable(evilwizard);
        evilwizard.body.collideWorldBounds = true;
        evilwizard.timer = game.time.now;
        evilwizard.chargeTimer = game.time.now + 1000;
        evilwizard.shotTimer = game.time.now + 3000;
        evilwizard.sfxTimer = evilwizard.shotTimer;
        evilwizard.stopTimer = game.time.now + 7000;
        evilwizard.isAlive = true;
        
        evilwizard.healthBarBack = evilwizard.addChild(game.add.graphics(0, 0));
        evilwizard.healthBarBack.lineStyle(3, 0xba3500, 1);
        evilwizard.healthBarBack.moveTo(0, 0);
        evilwizard.healthBarBack.lineTo(20, 0);
        evilwizard.healthBar = evilwizard.addChild(game.add.graphics(0, 0));
        evilwizard.healthBar.lineStyle(3, 0xffd900, 1);
        evilwizard.healthBar.moveTo(0, 0);
        evilwizard.healthBar.lineTo(20*(evilwizard.health/evilwizard.maxHealth), 0);
        
        evilwizard.healthBarBack.visible = false;
        evilwizard.healthBar.visible = false;
        //  Our two animations, walking left and right.
        //evilwizard.animations.add('evilwizardLeft', [3, 4, 5], 10, true);
        //evilwizard.animations.add('evilwizardRight', [6, 7, 8], 10, true);
    },
    evilwizardUpdate: function() {
        evilwizards.forEach(function(evilwizard) {
            evilwizard.body.velocity.x = 0;
            evilwizard.body.velocity.y = 0;
        
            game.physics.arcade.collide(evilwizard, platforms);
            
            var x = 0;
            var y = 0;
            
            if (player.x < 400) {
                x = player.x + 100;
            }
            else {
                x = player.x - 100;
            }
            if (player.y < 300) {
                y = player.y + 100;
            }
            else {
                y = player.y - 100;
            }
            if (game.time.now > evilwizard.timer && evilwizard.isAlive) {
                var teleport = game.add.audio('teleport');
                teleport.play();
                evilwizard.x = x;
                evilwizard.y = y;
                evilwizard.timer = game.time.now + 10000;
            }
            if (game.time.now > evilwizard.chargeTimer && evilwizard.isAlive) {
                if (evilwizard.frame==4) {
                    var charge = game.add.sprite(16, 18, 'blueCharge');//charges.getFirstExists(false);
                }
                else {
                    charge = game.add.sprite(0, 18, 'blueCharge');
                }
                //charge.reset(16, 20);
                charge.animations.add('chargeUp', [0, 1, 2, 3, 4, 4], 2, false);
                charge.animations.play('chargeUp');
                evilwizard.addChild(charge);
                evilwizard.chargeTimer = game.time.now + 10000;
                game.time.events.add(Phaser.Timer.SECOND * 3, function() {  evilwizard.removeChild(charge); charge.destroy(); });
            }
            if (game.time.now > evilwizard.sfxTimer && evilwizard.isAlive) {
                beamSFX.play();
                evilwizard.sfxTimer = game.time.now + 10000;
            }
            if (game.time.now > evilwizard.shotTimer && evilwizard.isAlive) {
                var iceBeam = iceBeams.getFirstExists(false);//iceBeams.create(evilwizard.x + 16, evilwizard.y + 24, 'iceBeamMini');
                if (evilwizard.frame==12 || evilwizard.frame==4) {
                    iceBeam.reset(evilwizard.x + 24, evilwizard.y + 18);//face right
                }
                else {
                    iceBeam.reset(evilwizard.x + 8, evilwizard.y + 36);
                }
                iceBeam.pivot.setTo(0.25, 0.5);
                //iceBeam.scale.x = 1.4;
                iceBeam.animations.add('beam', [0, 1, 2, 3], 4, false);
                game.physics.arcade.moveToXY(iceBeam, player.x, player.y, 600);
                iceBeam.rotation = game.physics.arcade.moveToXY(iceBeam, player.x, player.y, 600);
                iceBeam.lifespan = 1650;
                //iceBeam.frame = 0;
                iceBeam.animations.play('beam');
                evilwizard.shotTimer = game.time.now + 120;
                game.time.events.add(Phaser.Timer.SECOND * 4, function() { 
                                                                iceBeams.forEach(function(iceBeam) { 
                                                                    iceBeam.kill(); 
                                                                } 
                                                              );});
            }
            if (game.time.now > evilwizard.stopTimer) {
                evilwizard.shotTimer = game.time.now + 6000;
                //beamSFX.destroy();
                evilwizard.sfxTimer = evilwizard.shotTimer;
                evilwizard.stopTimer = game.time.now + 10000;
            }
            if (player.body.x < evilwizard.body.x) {
                if (evilwizard.shotTimer<game.time.now + 121) {
                    evilwizard.frame = 17;
                }
                else {
                    evilwizard.frame = 10;
                }
            }
            else {
                if (evilwizard.shotTimer<game.time.now + 121) {
                    evilwizard.frame = 12;
                }
                else {
                    evilwizard.frame = 4;
                }
            }
        });
    },
    swampCreatureCreate: function(x, y) {
        var swampCreature = swampCreatures.create(x, y, 'swampCreature');
        swampCreature.health = baddieHpAdjuster * 35;
        swampCreature.maxHealth = baddieHpAdjuster * 35;
        //  We need to enable physics on the swampCreature
        game.physics.arcade.enable(swampCreature);
        swampCreature.body.collideWorldBounds = true;
        swampCreature.crouchTimer = game.time.now;
        swampCreature.jumpTimer = game.time.now + 2000;
        swampCreature.shotTimer1 = game.time.now + 5000;
        swampCreature.shotTimer2 = game.time.now + 5500;
        swampCreature.shotTimer3 = game.time.now + 6000;
        swampCreature.shotTimer4 = game.time.now + 6500;
        swampCreature.shotTimer5 = game.time.now + 7000;
        swampCreature.isAlive = true;
        swampCreature.body.immovable = true;
        
        swampCreature.healthBarBack = swampCreature.addChild(game.add.graphics(0, 0));
        swampCreature.healthBarBack.lineStyle(3, 0xba3500, 1);
        swampCreature.healthBarBack.moveTo(0, 0);
        swampCreature.healthBarBack.lineTo(20, 0);
        swampCreature.healthBar = swampCreature.addChild(game.add.graphics(0, 0));
        swampCreature.healthBar.lineStyle(3, 0xffd900, 1);
        swampCreature.healthBar.moveTo(0, 0);
        swampCreature.healthBar.lineTo(20*(swampCreature.health/swampCreature.maxHealth), 0);
        
        swampCreature.healthBarBack.visible = false;
        swampCreature.healthBar.visible = false;
        //  Our two animations, walking left and right.
        swampCreature.animations.add('swampCreatureLeft', [9, 10, 11], 10, true);
        swampCreature.animations.add('swampCreatureRight', [3, 4, 5], 10, true);
    },
    swampCreatureUpdate: function() {
        swampCreatures.forEach(function(swampCreature) {
            //game.physics.arcade.collide(swampCreature, platforms);
            
            if (game.time.now > swampCreature.crouchTimer && swampCreature.isAlive) {
                //console.log('crouch');
                swampCreature.body.velocity.x = 0;
                swampCreature.body.velocity.y = 0;
                swampCreature.animations.stop();
                swampCreature.frame = 6;
                swampCreature.crouchTimer = game.time.now + 10000;
            }
            if (game.time.now > swampCreature.jumpTimer && swampCreature.isAlive) {
                swampCreature.body.immovable = false;
                //console.log('jump');
                swampCreature.body.velocity.x = 0;
                swampCreature.body.velocity.y = 0;
                swampCreature.frame = 7;
                game.physics.arcade.moveToXY(swampCreature, player.x, player.y, 350);
                swampCreature.jumpTimer = game.time.now + 10000;
            }
            if (game.time.now > swampCreature.shotTimer1 && swampCreature.isAlive) {
                swampCreature.body.immovable = true;
                //console.log('fire');
                swampCreature.body.velocity.x = 0;
                swampCreature.body.velocity.y = 0;
                if (player.body.x < swampCreature.body.x) {
                    swampCreature.frame = 10;
                }
                else {
                    swampCreature.frame = 4;
                }
                var waterShot = waterShots.getFirstExists(false);//(swampCreature.x+10, swampCreature.y+10, 'waterShot');
                waterShot.reset(swampCreature.x+10, swampCreature.y+10);
                waterShot.lifespan = 3500;
                game.physics.arcade.moveToXY(waterShot, player.x+25, player.y+15, 300);
                waterShot.rotation = game.physics.arcade.moveToXY(waterShot, player.x, player.y, 300);
                waterShotSFX.play();
                swampCreature.shotTimer1 = game.time.now + 10000;
            }
            if (game.time.now > swampCreature.shotTimer2 && swampCreature.isAlive) {
                //console.log('fire');
                swampCreature.body.velocity.x = 0;
                swampCreature.body.velocity.y = 0;
                waterShot = waterShots.getFirstExists(false);//(swampCreature.x+10, swampCreature.y+10, 'waterShot');
                waterShot.reset(swampCreature.x+10, swampCreature.y+10);
                waterShot.lifespan = 3500;
                game.physics.arcade.moveToXY(waterShot, player.x+15, player.y+25, 300);
                waterShot.rotation = game.physics.arcade.moveToXY(waterShot, player.x, player.y, 300);
                waterShotSFX.play();
                swampCreature.shotTimer2 = game.time.now + 10000;
            }
            if (game.time.now > swampCreature.shotTimer3 && swampCreature.isAlive) {
                //console.log('fire');
                swampCreature.body.velocity.x = 0;
                swampCreature.body.velocity.y = 0;
                waterShot = waterShots.getFirstExists(false);//(swampCreature.x+10, swampCreature.y+10, 'waterShot');
                waterShot.reset(swampCreature.x+10, swampCreature.y+10);
                waterShot.lifespan = 3500;
                game.physics.arcade.moveToXY(waterShot, player.x+5, player.y-15, 300);
                waterShot.rotation = game.physics.arcade.moveToXY(waterShot, player.x, player.y, 300);
                waterShotSFX.play();
                swampCreature.shotTimer3 = game.time.now + 10000;
            }
            if (game.time.now > swampCreature.shotTimer4 && swampCreature.isAlive) {
                //console.log('fire');
                swampCreature.body.velocity.x = 0;
                swampCreature.body.velocity.y = 0;
                waterShot = waterShots.getFirstExists(false);//(swampCreature.x+10, swampCreature.y+10, 'waterShot');
                waterShot.reset(swampCreature.x+10, swampCreature.y+10);
                waterShot.lifespan = 3500;
                game.physics.arcade.moveToXY(waterShot, player.x-15, player.y-25, 300);
                waterShot.rotation = game.physics.arcade.moveToXY(waterShot, player.x, player.y, 300);
                waterShotSFX.play();
                swampCreature.shotTimer4 = game.time.now + 10000;
            }
            if (game.time.now > swampCreature.shotTimer5 && swampCreature.isAlive) {
                //console.log('fire');
                swampCreature.body.velocity.x = 0;
                swampCreature.body.velocity.y = 0;
                waterShot = waterShots.getFirstExists(false);//(swampCreature.x+10, swampCreature.y+10, 'waterShot');
                waterShot.reset(swampCreature.x+10, swampCreature.y+10);
                waterShot.lifespan = 3500;
                game.physics.arcade.moveToXY(waterShot, player.x-25, player.y+15, 300);
                waterShot.rotation = game.physics.arcade.moveToXY(waterShot, player.x, player.y, 300);
                waterShotSFX.play();
                swampCreature.shotTimer5 = game.time.now + 10000;
            }
        });
    },
    zombieBirdCreate: function(x, y) {
        var zombieBird = zombieBirds.create(x, y, 'zombieBird');
        zombieBird.health = baddieHpAdjuster * 13;
        zombieBird.maxHealth = baddieHpAdjuster * 13;
        zombieBird.scale.x = 0.4;
        zombieBird.scale.y = 0.4;
        //  enable physics on the zombieBird
        game.physics.arcade.enable(zombieBird);
        zombieBird.body.collideWorldBounds = true;
        zombieBird.moveRight = true;
        zombieBird.moveRightTimer = game.time.now;
        zombieBird.moveLeftTimer = game.time.now + 5000;
        zombieBird.moveUp = true;
        zombieBird.moveUpTimer = game.time.now;
        zombieBird.moveDownTimer = game.time.now + 3000;
        //zombieBird.body.bounce.set(0.1);
        zombieBird.healthBarBack = zombieBird.addChild(game.add.graphics(0, 0));
        zombieBird.healthBarBack.scale.x = 2.5;
        zombieBird.healthBarBack.scale.y = 2.5;
        zombieBird.healthBarBack.lineStyle(3, 0xba3500, 1);
        zombieBird.healthBarBack.moveTo(0, 0);
        zombieBird.healthBarBack.lineTo(20, 0);
        zombieBird.healthBar = zombieBird.addChild(game.add.graphics(0, 0));
        zombieBird.healthBar.scale.x = 2.5;
        zombieBird.healthBar.scale.y = 2.5;
        zombieBird.healthBar.lineStyle(3, 0xffd900, 1);
        zombieBird.healthBar.moveTo(0, 0);
        zombieBird.healthBar.lineTo(20*(zombieBird.health/zombieBird.maxHealth), 0);
        
        zombieBird.healthBarBack.visible = false;
        zombieBird.healthBar.visible = false;
    
        //  Our animations.
        zombieBird.animations.add('zombieBirdLeft', [0, 1, 2, 3], 10, true);
        zombieBird.animations.add('zombieBirdRight', [4, 5, 6, 7], 10, true); 
    },
    zombieBirdUpdate: function() {
        zombieBirds.forEach(function(zombieBird) {
            zombieBird.body.velocity.x = 0;
            zombieBird.body.velocity.y = 0;
            
            game.physics.arcade.collide(zombieBird, platforms);
            if (game.time.now>zombieBird.moveRightTimer) {
                zombieBird.moveRight = true;
                zombieBird.moveRightTimer = game.time.now + 10000;
            }
            if (game.time.now>zombieBird.moveLeftTimer) {
                zombieBird.moveRight = false;
                zombieBird.moveLeftTimer = game.time.now + 10000;
            }
            if (game.time.now>zombieBird.moveUpTimer) {
                zombieBird.moveUp = true;
                zombieBird.moveUpTimer = game.time.now + 6000;
            }
            if (game.time.now>zombieBird.moveDownTimer) {
                zombieBird.moveUp = false;
                zombieBird.moveDownTimer = game.time.now + 6000;
            }
            if ((Math.abs(player.x - zombieBird.x)) + (Math.abs(player.y - zombieBird.y)) < 250) {
                game.physics.arcade.moveToObject(zombieBird, player, baddieSpeedAdjuster*146-(zombieBird.health*2/baddieHpAdjuster));
                if (player.body.x < zombieBird.body.x) {
                    zombieBird.animations.play('zombieBirdLeft');
                }
                else {
                    zombieBird.animations.play('zombieBirdRight');
                }
            }
            else {
                if (zombieBird.moveRight == false) {
                    zombieBird.animations.play('zombieBirdLeft');
                    if (zombieBird.moveRight == false) {
                        zombieBird.body.velocity.x -= 50;
                        if (zombieBird.moveUp == true) {
                            zombieBird.body.velocity.y += 15;
                        }
                        else {
                            zombieBird.body.velocity.y -= 15;
                        }
                    }
                }
                else {
                    zombieBird.animations.play('zombieBirdRight');
                    if (zombieBird.moveRight) {
                        zombieBird.body.velocity.x += 50;
                        if (zombieBird.moveUp == true) {
                            zombieBird.body.velocity.y += 15;
                        }
                        else {
                            zombieBird.body.velocity.y -= 15;
                        }
                    }
                }
            }
        });
    }, 
    miniZombieBirdCreate: function(x, y) {
        var miniZombieBird = miniZombieBirds.getFirstExists(false);//create(x, y, 'miniZombieBird');
        miniZombieBird.reset(x, y);
        miniZombieBird.health = baddieHpAdjuster * 10;
        miniZombieBird.maxHealth = baddieHpAdjuster * 10;
        //  enable physics
        game.physics.arcade.enable(miniZombieBird);
        miniZombieBird.body.collideWorldBounds = true;
        
        miniZombieBird.healthBarBack = miniZombieBird.addChild(game.add.graphics(0, 0));
        miniZombieBird.healthBarBack.lineStyle(3, 0xba3500, 1);
        miniZombieBird.healthBarBack.moveTo(0, 0);
        miniZombieBird.healthBarBack.lineTo(20, 0);
        miniZombieBird.healthBar = miniZombieBird.addChild(game.add.graphics(0, 0));
        miniZombieBird.healthBar.lineStyle(3, 0xffd900, 1);
        miniZombieBird.healthBar.moveTo(0, 0);
        miniZombieBird.healthBar.lineTo(20*(miniZombieBird.health/miniZombieBird.maxHealth), 0);
        
        miniZombieBird.healthBarBack.visible = false;
        miniZombieBird.healthBar.visible = false;
        //  animations.
        miniZombieBird.animations.add('miniZombieBirdLeft', [0, 1, 2, 3], 10, true);
        miniZombieBird.animations.add('miniZombieBirdRight', [4, 5, 6, 7], 10, true); 
    },
    miniZombieBirdUpdate: function() {
        miniZombieBirds.forEach(function(miniZombieBird) {
            miniZombieBird.body.velocity.x = 0;
            miniZombieBird.body.velocity.y = 0;
            
            game.physics.arcade.collide(miniZombieBird, platforms);
            game.physics.arcade.moveToObject(miniZombieBird, player, baddieSpeedAdjuster*201-(miniZombieBird.health*2/baddieHpAdjuster));
            if (player.body.x < miniZombieBird.body.x) {
                    miniZombieBird.animations.play('miniZombieBirdLeft');
            }
            else {
                    miniZombieBird.animations.play('miniZombieBirdRight');
            }
        });
    }, 
    bossZombieBirdCreate: function(x, y) {
        var bossZombieBird = bossZombieBirds.create(x, y, 'zombieBird');
        bossZombieBird.health = baddieHpAdjuster * 400;
        bossZombieBird.maxHealth = baddieHpAdjuster * 400;
        bossZombieBird.damageTimer = 0;
        bossZombieBird.createMiniTimer = 0;
        bossZombieBird.isAlive = true;
        //  enable physics
        game.physics.arcade.enable(bossZombieBird);
        bossZombieBird.body.collideWorldBounds = true;
        
        bossZombieBird.healthBarBack = bossZombieBird.addChild(game.add.graphics(0, 0));
        bossZombieBird.healthBarBack.lineStyle(3, 0xba3500, 1);
        bossZombieBird.healthBarBack.moveTo(0, 0);
        bossZombieBird.healthBarBack.lineTo(20, 0);
        bossZombieBird.healthBar = bossZombieBird.addChild(game.add.graphics(0, 0));
        bossZombieBird.healthBar.lineStyle(3, 0xffd900, 1);
        bossZombieBird.healthBar.moveTo(0, 0);
        bossZombieBird.healthBar.lineTo(20*(bossZombieBird.health/bossZombieBird.maxHealth), 0);
        
        bossZombieBird.healthBarBack.visible = false;
        bossZombieBird.healthBar.visible = false;
        //  animations.
        bossZombieBird.animations.add('bossZombieBirdLeft', [0, 1, 2, 3], 10, true);
        bossZombieBird.animations.add('bossZombieBirdRight', [4, 5, 6, 7], 10, true); 
    },
    bossZombieBirdUpdate: function() {
        var self = this;
        bossZombieBirds.forEach(function(bossZombieBird) {
            bossZombieBird.body.velocity.x = 0;
            bossZombieBird.body.velocity.y = 0;
            
            game.physics.arcade.collide(bossZombieBird, platforms);
            game.physics.arcade.moveToObject(bossZombieBird, player, baddieSpeedAdjuster*150-(bossZombieBird.health*0.1/baddieHpAdjuster));
            if (player.body.x < bossZombieBird.body.x) {
                    bossZombieBird.animations.play('bossZombieBirdLeft');
            }
            else {
                    bossZombieBird.animations.play('bossZombieBirdRight');
            }
            if (game.time.now>bossZombieBird.createMiniTimer && bossZombieBird.isAlive) {
                self.miniZombieBirdCreate(bossZombieBird.x, bossZombieBird.y);
                bossZombieBird.createMiniTimer = game.time.now + 3000;
                baddieCount += 2;
            }
        });
    }, 
    bossZombieBirdSmash: function(bossZombieBird, platforms) {
        platforms.destroy(); 
        var woodSmash = game.add.audio('woodSmash'); 
        woodSmash.play(); 
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 0.6, function () { self.rubbleCreate(platforms.x, platforms.y); });
    },
    bossMummyCreate: function(x, y) {
        var bossMummy = bossMummies.create(x, y, 'mummy');
        bossMummy.health = baddieHpAdjuster * 750;
        bossMummy.maxHealth = baddieHpAdjuster * 750;
        bossMummy.scale.x = 2;
        bossMummy.scale.y = 2;
        bossMummy.damageTimer = 0;
        bossMummy.summonTimer = game.time.now + 1000;
        bossMummy.isAlive = true;
        //  enable physics
        game.physics.arcade.enable(bossMummy);
        bossMummy.body.collideWorldBounds = true;
        
        bossMummy.healthBarBack = bossMummy.addChild(game.add.graphics(0, 0));
        bossMummy.healthBarBack.lineStyle(3, 0xba3500, 1);
        bossMummy.healthBarBack.moveTo(0, 0);
        bossMummy.healthBarBack.lineTo(20, 0);
        bossMummy.healthBar = bossMummy.addChild(game.add.graphics(0, 0));
        bossMummy.healthBar.lineStyle(3, 0xffd900, 1);
        bossMummy.healthBar.moveTo(0, 0);
        bossMummy.healthBar.lineTo(20*(bossMummy.health/bossMummy.maxHealth), 0);
        
        bossMummy.healthBarBack.visible = false;
        bossMummy.healthBar.visible = false;
        //  animations.
        bossMummy.animations.add('bossMummyLeft', [9, 10, 11], 10, true);
        bossMummy.animations.add('bossMummyRight', [3, 4, 5], 10, true); 
        bossMummy.animations.add('bossMummySummon', [7, 12, 12, 7, 12, 12, 7, 12, 12, 12, 12], 22, true); 
    },
    bossMummyUpdate: function() {
        var self = this;
        bossMummies.forEach(function(bossMummy) {
            bossMummy.body.velocity.x = 0;
            bossMummy.body.velocity.y = 0;
            
            game.physics.arcade.collide(bossMummy, platforms);
            if (game.time.now>bossMummy.summonTimer && bossMummy.isAlive && player.isAlive) {
                bossMummy.summon = true;
                self.risenZombieCreate(0, 0);
                self.risenZombieCreate(200, 0);
                self.risenZombieCreate(400, 0);
                self.risenZombieCreate(600, 0);
                self.risenZombieCreate(800, 0);
                self.risenZombieCreate(0, 600);
                self.risenZombieCreate(200, 600);
                self.risenZombieCreate(400, 600);
                self.risenZombieCreate(600, 600);
                self.risenZombieCreate(800, 600);
                bossMummy.summonTimer = game.time.now + 7500; 
                game.time.events.add(Phaser.Timer.SECOND * 0.5, function () { bossMummy.summon = false; });
            }
            if (bossMummy.summon==false) {
                game.physics.arcade.moveToObject(bossMummy, player, baddieSpeedAdjuster*185-(bossMummy.health*0.1/baddieHpAdjuster));
                if (player.body.x < bossMummy.body.x) {
                    bossMummy.animations.play('bossMummyLeft');
                }
                else {
                    bossMummy.animations.play('bossMummyRight');
                }
            }
            else {
                bossMummy.animations.play('bossMummySummon');
            }
        });
    }, 
    bossMummySmash: function(bossMummy, platforms) {
        platforms.destroy(); 
        var woodSmash = game.add.audio('woodSmash'); 
        woodSmash.play(); 
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 0.6, function () { self.rubbleCreate(platforms.x, platforms.y); });
    },
    risenZombieCreate: function(x, y) {
        var risenZombie = game.add.sprite(x, y, 'zombieRising');
        risenZombie.animations.add('rise', [3, 4, 5], 3, false);
        risenZombie.animations.play('rise');
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND *1, function () { self.zombieRisingSFX(); self.baddieCreate(risenZombie.x, risenZombie.y, "red"); risenZombie.destroy(); baddieCount ++; });
    },
    vampireCreate: function(x, y) {
        var vampire = vampires.create(x, y, 'vampire');
        vampire.health = baddieHpAdjuster * 44;
        vampire.maxHealth = baddieHpAdjuster * 44;
        
        //  enable physics on the vampire
        game.physics.arcade.enable(vampire);
        vampire.body.collideWorldBounds = true;
        vampire.visible = true;
        vampire.healthBarBack = vampire.addChild(game.add.graphics(0, 0));
        vampire.healthBarBack.lineStyle(3, 0xba3500, 1);
        vampire.healthBarBack.moveTo(0, 0);
        vampire.healthBarBack.lineTo(20, 0);
        vampire.healthBar = vampire.addChild(game.add.graphics(0, 0));
        vampire.healthBar.lineStyle(3, 0xffd900, 1);
        vampire.healthBar.moveTo(0, 0);
        vampire.healthBar.lineTo(20*(vampire.health/vampire.maxHealth), 0);
        
        vampire.healthBarBack.visible = false;
        vampire.healthBar.visible = false;
        //  Our two animations, walking left and right.
        vampire.animations.add('vampireLeft', [9, 10, 11], 15, true);
        vampire.animations.add('vampireRight', [3, 4, 5], 15, true);
    },
    vampireUpdate: function() {
        vampires.forEach(function(vampire) {
            vampire.body.velocity.x = 0;
            vampire.body.velocity.y = 0;
        
            game.physics.arcade.collide(vampire, platforms);
            
            game.physics.arcade.moveToObject(vampire, player, baddieSpeedAdjuster*155);
                
            if (player.body.x < vampire.body.x) {
                vampire.animations.play('vampireLeft');
            }
            else {
                vampire.animations.play('vampireRight');
            }
        });
    },
    vampireEvade: function() {
        var self = this;
        vampires.forEach(function(vampire) {
            vampire.visible = false;
            var smoke = game.add.sprite(vampire.x, vampire.y, 'smokeAnimation');
            smoke.animations.add('disperse', [0, 1, 2, 3], 16, true);
            smoke.animations.play('disperse');
            if (player.x<600) {
                var vampireOffsetX = 75*(1+Math.random());
            }
            else {
                vampireOffsetX = -75*(1+Math.random());
            }
            if (player.y<450) {
                var vampireOffsetY = 75*(1+Math.random());
            }
            else {
                vampireOffsetY = -75*(1+Math.random());
            }
            
            game.time.events.add(Phaser.Timer.SECOND * 0.25, function () {  smoke.destroy(); 
                                                                            smoke = game.add.sprite(player.x+vampireOffsetX, player.y+vampireOffsetY, 'smokeAnimation');
                                                                            smoke.animations.add('disperse', [0, 1, 2, 3], 16, true);
                                                                            smoke.animations.play('disperse');
                                                                            self.decoyCreate(smoke.x+(vampireOffsetX*0.5), smoke.y-(vampireOffsetY*0.5));
                                                                            self.decoyCreate(smoke.x-(vampireOffsetX*0.5), smoke.y+(vampireOffsetY*0.5));
                                                                         });
            game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {   smoke.destroy(); 
                                                                            vampire.visible = true;
                                                                            vampire.x = smoke.x;
                                                                            vampire.y = smoke.y;
                                                                        });
        });
    },
    decoyCreate: function(x, y) {
        var decoySmoke = game.add.sprite(x, y, 'smokeAnimation');
        decoySmoke.animations.add('disperse', [0, 1, 2, 3], 16, true);
        decoySmoke.animations.play('disperse');
        game.time.events.add(Phaser.Timer.SECOND * 0.25, function () {  decoySmoke.destroy();
                                                                        var decoy = decoys.create(x, y, 'vampire');
                                                                        //  enable physics on the decoy
                                                                        game.physics.arcade.enable(decoy);
                                                                        decoy.body.collideWorldBounds = true;
                                                                        decoy.visible = true;
                                                                        //  Our two animations, walking left and right.
                                                                        decoy.animations.add('decoyLeft', [9, 10, 11], 15, true);
                                                                        decoy.animations.add('decoyRight', [3, 4, 5], 15, true);
                                                                     });
    },
    decoyUpdate: function() {
        decoys.forEach(function(decoy) {
            decoy.body.velocity.x = 0;
            decoy.body.velocity.y = 0;
        
            game.physics.arcade.collide(decoy, platforms);
            
            game.physics.arcade.moveToObject(decoy, player, baddieSpeedAdjuster*155);
                
            if (player.body.x < decoy.body.x) {
                decoy.animations.play('decoyLeft');
            }
            else {
                decoy.animations.play('decoyRight');
            }
        });
    },
    bossFinalCreate: function(x, y) {
        var bossFinal = bossFinals.create(x, y, 'evilWizard');
        bossFinal.health = baddieHpAdjuster * 999;
        bossFinal.maxHealth = baddieHpAdjuster * 999;
        //  We need to enable physics on the Final Boss
        game.physics.arcade.enable(bossFinal);
        bossFinal.body.collideWorldBounds = true;
        bossFinal.timer = game.time.now;
        bossFinal.chargeTimer = game.time.now + 1000;
        bossFinal.shotTimer = game.time.now + 3000;
        bossFinal.sfxTimer = bossFinal.shotTimer;
        bossFinal.stopTimer = game.time.now + 7000;
        bossFinal.summonTimer = game.time.now + 8000;
        bossFinal.damageTimer = 0;
        bossFinal.summoned = false;
        bossFinal.isAlive = true;
        
        bossFinal.scale.x = 2;
        bossFinal.scale.y = 2;
        
        bossFinal.healthBarBack = bossFinal.addChild(game.add.graphics(0, 0));
        bossFinal.healthBarBack.lineStyle(3, 0xba3500, 1);
        bossFinal.healthBarBack.moveTo(0, 0);
        bossFinal.healthBarBack.lineTo(20, 0);
        bossFinal.healthBar = bossFinal.addChild(game.add.graphics(0, 0));
        bossFinal.healthBar.lineStyle(3, 0xffd900, 1);
        bossFinal.healthBar.moveTo(0, 0);
        bossFinal.healthBar.lineTo(20*(bossFinal.health/bossFinal.maxHealth), 0);
        
        bossFinal.healthBarBack.visible = false;
        bossFinal.healthBar.visible = false;
        //  Our animations.
        bossFinal.animations.add('bossFinalLeft', [3, 4, 5], 10, true);
        bossFinal.animations.add('bossFinalRight', [6, 7, 8], 10, true);
        bossFinal.animations.add('bossFinalSummonLeft', [17, 16, 18, 19], 16, false);
        bossFinal.animations.add('bossFinalSummonRight', [12, 13, 14, 15], 16, false);
    },
    bossFinalUpdate: function() {
        var self = this;
        bossFinals.forEach(function(bossFinal) {
            bossFinal.body.velocity.x = 0;
            bossFinal.body.velocity.y = 0;
        
            game.physics.arcade.collide(bossFinal, platforms);
            
            var x = 0;
            var y = 0;
            
            if (player.x < 400) {
                x = player.x + 100;
            }
            else {
                x = player.x - 100;
            }
            if (player.y < 300) {
                y = player.y + 100;
            }
            else {
                y = player.y - 100;
            }
            if (game.time.now > bossFinal.timer && bossFinal.isAlive) {
                var teleport = game.add.audio('teleport');
                teleport.play();
                bossFinal.x = x;
                bossFinal.y = y;
                bossFinal.timer = game.time.now + 10000;
            }
            if (game.time.now > bossFinal.chargeTimer && bossFinal.isAlive) {
                if (bossFinal.frame==4) {
                    var charge = game.add.sprite(16, 18, 'blueCharge');//charges.getFirstExists(false);
                }
                else {
                    charge = game.add.sprite(0, 18, 'blueCharge');
                }
                //charge.reset(16, 20);
                charge.animations.add('chargeUp', [0, 1, 2, 3, 4, 4], 2, false);
                charge.animations.play('chargeUp');
                bossFinal.addChild(charge);
                bossFinal.chargeTimer = game.time.now + 10000;
                game.time.events.add(Phaser.Timer.SECOND * 3, function() {  bossFinal.removeChild(charge); charge.destroy(); });
            }
            if (game.time.now > bossFinal.sfxTimer && bossFinal.isAlive) {
                beamSFX.play();
                bossFinal.sfxTimer = game.time.now + 10000;
            }
            if (game.time.now > bossFinal.shotTimer && bossFinal.isAlive) {
                var iceBeam = iceBeams.getFirstExists(false);//iceBeams.create(bossFinal.x + 16, bossFinal.y + 24, 'iceBeamMini');
                if (bossFinal.frame==12 || bossFinal.frame==4) { //face right
                    iceBeam.reset(bossFinal.x + 42, bossFinal.y + 36);
                }
                else {
                    iceBeam.reset(bossFinal.x + 10, bossFinal.y + 56);
                }
                iceBeam.pivot.setTo(0.25, 0.5);
                //iceBeam.scale.x = 1.4;
                iceBeam.animations.add('beam', [0, 1, 2, 3], 4, false);
                game.physics.arcade.moveToXY(iceBeam, player.x, player.y, 600);
                iceBeam.rotation = game.physics.arcade.moveToXY(iceBeam, player.x, player.y, 600);
                iceBeam.lifespan = 1650;
                //iceBeam.frame = 0;
                iceBeam.animations.play('beam');
                bossFinal.shotTimer = game.time.now + 120;
                game.time.events.add(Phaser.Timer.SECOND * 4, function() { 
                                                                iceBeams.forEach(function(iceBeam) { 
                                                                    iceBeam.kill(); 
                                                                } 
                                                              );});
            }
            if (game.time.now > bossFinal.summonTimer && bossFinal.isAlive) {
                if (bossFinal.summoned==false) {
                    if (player.body.x < bossFinal.body.x) {
                        bossFinal.animations.play('bossFinalSummonLeft');
                    }
                    else {
                        bossFinal.animations.play('bossFinalSummonRight');
                    }
                    bossFinal.summoned = true;
                    game.time.events.add(Phaser.Timer.SECOND * 0.25, function() { self.bossFinalSummon(); bossFinal.summonTimer = game.time.now+9750; bossFinal.summoned = false;});
                }
            }
            if (game.time.now > bossFinal.stopTimer) {
                bossFinal.shotTimer = game.time.now + 6000;
                //beamSFX.destroy();
                bossFinal.sfxTimer = bossFinal.shotTimer;
                bossFinal.stopTimer = game.time.now + 10000;
            }
            if (player.body.x < bossFinal.body.x && bossFinal.summoned==false) {
                if (bossFinal.shotTimer<game.time.now + 121) {
                    bossFinal.frame = 17;
                }
                else {
                    bossFinal.frame = 10;
                }
            }
            else if (player.body.x > bossFinal.body.x && bossFinal.summoned==false) {
                if (bossFinal.shotTimer<game.time.now + 121) {
                    bossFinal.frame = 12;
                }
                else {
                    bossFinal.frame = 4;
                }
            }
        });
    },
    bossFinalSummon: function() {
        if (Math.random()>0.66) {
            this.mummyCreate(400, 0);
            this.skeletonCreate(400, 580, 'grey');
            this.swordZombieCreate(780, 300, 'green');
            baddieCount += 16;
        }
        else if (Math.random()>0.33) {
            this.baddieCreate(400, 0, 'red');
            this.skeletonCreate(400, 580, 'red');
            this.swordZombieCreate(780, 300, 'red');
            baddieCount += 10;
        }
        else {
            this.mummyCreate(400, 0); 
            this.mummyCreate(400, 580); 
            baddieCount += 14;
        }
    },
    coinCreate: function(x, y, colour) {
        var star;
        if (colour=="red") {
            star = stars.create(x, y, 'ChestRed');
            star.contents = 2;
        }
        else if (colour=="blue") {
            star = stars.create(x, y, 'ChestBlue');
            star.contents = 5;
        }
        else if (colour=="green") {
            star = stars.create(x, y, 'ChestGreen');
            star.contents = 10;
        }
        else if (colour=="yellow") {
            star = stars.create(x, y, 'ChestYellow');
            star.contents = 25;
        }
        //
    },
    collectStar: function(player, star) {
        // Removes the item from the screen
        collectSFX.play();
        //  Add and update the items
        var chance = 1 + Math.random()*5;
        var coinAmount = Math.round(star.contents + (chance*star.contents));
        var coin = game.add.sprite(star.x, star.y, 'coin');
        coin.animations.add('rotate', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
        coin.animations.play('rotate');
        var coinText = game.add.bitmapText(coin.x+6, coin.y+8, 'font', '', 12);
        coinText.text = coinAmount;
        coinText.tint = 'black';
        game.time.events.add(Phaser.Timer.SECOND * 1, function () {
            coin.destroy();
            coinText.destroy();
            if (chance>1.24) { }
            else if (chance<=1.06) {
               var wand = game.add.sprite(coin.x, coin.y, 'wand');
               var wandText = game.add.bitmapText(wand.x-6, wand.y+12, 'fontBorder', '', 13);
               wandText.text = "Weaponsmith +";
               //wandText.tint = 000000;
               weaponsmithDropReward += weaponsmithDRBoost;
               game.time.events.add(Phaser.Timer.SECOND * 1, function () { wand.destroy(); wandText.text = ""; });
            }
            else if (chance<=1.12) {
               var armour = game.add.sprite(coin.x, coin.y, 'armour');
               var armourText = game.add.bitmapText(armour.x, armour.y+12, 'fontBorder', '', 13);
               armourText.text = "Armourer +";
               //armourText.tint = 000000;
               armourerDropReward += armourerDRBoost;
               game.time.events.add(Phaser.Timer.SECOND * 1, function () { armour.destroy(); armourText.text = ""; });
            }
            else if (chance<=1.18) {
               var ring = game.add.sprite(coin.x, coin.y, 'ring');
               var ringText = game.add.bitmapText(ring.x-2, ring.y+12, 'fontBorder', '', 13);
               ringText.text = "Enchanter +";
               //ringText.tint = 000000;
               enchanterDropReward += enchanterDRBoost;
               game.time.events.add(Phaser.Timer.SECOND * 1, function () { ring.destroy(); ringText.text = ""; });
            }
            else if (chance<=1.24) {
               var buff = game.add.sprite(coin.x, coin.y, 'buff');
               var buffText = game.add.bitmapText(buff.x+4, buff.y+12, 'fontBorder', '', 13);
               buffText.text = "Trainer +";
               //buffText.tint = 000000;
               trainerDropReward += trainerDRBoost;
               game.time.events.add(Phaser.Timer.SECOND * 1, function () { buff.destroy(); buffText.text = ""; });
            }
        });
        coins += coinAmount;
        if (coins>=1000000) {
            coinsText.text = (Math.round(coins/1000))/1000 + "M";
        }
        else {
            coinsText.text = coins;
        }
        mana ++;
        manaText.text = "MP: " + mana + "/" + maxMana;
        manaCrop.x = (1-(mana/maxMana))*80;
        manaBar.updateCrop();
        star.destroy();
    },
    badTouch: function() {
        if (spinning==false) {
            var damage = Math.floor((1 + stage/32)*baddieDamageAdjuster);
            //console.log(damage);
            if (health>damage) {
                health -= damage;
                hpCrop.x = (1-(health/maxHealth))*80;
                hpBar.updateCrop();
                var grunt = game.add.audio('grunt');
                grunt.play();
                healthText.text = 'HP: ' + health + '/' + maxHealth;
                invulnerableTimer = game.time.now + invulnerableSpacing;
            }
            else {
                this.playerDeath();
            }
        }
    },
    badTouchTwo: function() {
        if (spinning==false) {
            var damage = Math.floor((2 + stage*0.04)*baddieDamageAdjuster);
            //console.log(damage);
            if (health>damage) {
                health -= damage;
                hpCrop.x = (1-(health/maxHealth))*80;
                hpBar.updateCrop();
                var grunt = game.add.audio('grunt');
                grunt.play();
                healthText.text = 'HP: ' + health + '/' + maxHealth;
                invulnerableTimer = game.time.now + invulnerableSpacing;
                if (stage==50 && bossZombieKilled==false) {
                    this.badTouch();
                }
            }
            else {
                this.playerDeath();
            }
        }
    },
    freeze: function() {
        if (game.time.now>freezeTimer) {
            //console.log(runSpeed);
            runSpeed = 2*(runSpeed/3);
            //console.log(runSpeed);
            freezeTimer = game.time.now + 4000;
            game.time.events.add(Phaser.Timer.SECOND * 3, function() { runSpeed = runSpeed*1.5; /*console.log(runSpeed);*/});
            }
    },
    moveStar: function(x, star) {
        star.y += 50;
    },
    moveEvilWizard: function(x, evilwizard) {
        evilwizard.x += 20;
    },
    /*moveFlame: function(x, flame) {
        flame.x += 20;
    },
    rockKill: function(rock) {
        rock.kill();
    },*/
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
        pewSound.play();
        bulletTimer = game.time.now + bulletSpacing;
    },
    sizzleSFX: function() {
        var sizzle = game.add.audio('sizzle');
        sizzle.play();
    },
    skeletonDeathSFX: function() {
        var skeletonDeath = game.add.audio('skeletonDeath');
        skeletonDeath.play();
    },
    spiderDeathSFX: function() {
        var spiderDeath = game.add.audio('spiderDeath');
        spiderDeath.play();
    },
    mummyDeathSFX: function() {
        var mummyDeath = game.add.audio('mummyDeath');
        mummyDeath.play();
    },
    zombieRisingSFX: function() {
        var zombieRising = game.add.audio('zombieRising');
        zombieRising.play();
    },
    maleDeathSFX: function() {
        var maleDeath = game.add.audio('maleDeath');
        maleDeath.play();
    },
    birdDeathSFX: function() {
        var birdDeath = game.add.audio('birdDeath');
        birdDeath.play();
    },
    woodSmashSFX: function() {
        var woodSmash = game.add.audio('woodSmash');
        woodSmash.play();
    },
    smallExplosion: function(x, y) {
        var explode = game.add.sprite(x, y, 'explosionMini');
        explode.animations.add('explosion', [0, 1, 2, 3], 30, false);
        explode.animations.play('explosion');
        shortExplodeSFX.play();
        game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {   explode.destroy();  });
    },
    bulletKill: function(bullet) {
        bullet.kill();
    },
    badKill: function(bullet, baddie) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.66) {
            if (bullet.travel == 'left') {
                baddie.x -= knockback;
            }
            else if (bullet.travel == 'right') {
                baddie.x += knockback;
            }
            else if (bullet.travel == 'up') {
                baddie.y -= knockback;
            }
            else if (bullet.travel == 'down') {
                baddie.y += knockback;
            }
        }
        bullet.kill();
        if (baddie.health <= shotPower) {
            if (Math.random()>0.85 && baddie.colour=="red") {
               this.coinCreate(baddie.x+5, baddie.y+5, "blue"); 
            }
            else if (Math.random()>0.9) {
               this.coinCreate(baddie.x+5, baddie.y+5, "blue"); 
            }
            else {
               this.coinCreate(baddie.x, baddie.y, "red"); 
            }
            if (Math.random()>0.8) {
                var risenZombie = game.add.sprite(baddie.x, baddie.y, 'zombieRising');
                risenZombie.animations.add('rise', [0, 1, 2], 3, false);
                risenZombie.animations.play('rise');
                var self = this;
                game.time.events.add(Phaser.Timer.SECOND *1, function () { risenZombie.destroy(); self.zombieRisingSFX(); self.baddieCreate(baddie.x, baddie.y, "green"); baddieCount ++; });
            }
            baddie.destroy();
            totalMonstersKilled+= (0+1);
            //console.log('totalMonstersKilled:' + totalMonstersKilled);
            zombieDeathSFX.play();
            var death = game.add.sprite(baddie.x, baddie.y, 'deathSheet');
            if (baddie.colour=="red") {
                xp += Math.floor(baddieXpAdjuster*4);
                death.frame = 11;
            }
            else {
                xp += Math.floor(baddieXpAdjuster*3);
                death.frame = 10;
            }
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
            this.xpDisplayConvert();
            baddieCount --;
            this.checkLevelUp();
            this.checkStageComplete();
        }
        else {
            baddie.health -= shotPower;
            baddie.healthBarBack.visible = true;
            baddie.healthBar.visible = true;
            baddie.healthBar.clear();
            baddie.healthBar.lineStyle(3, 0xffd900, 1);
            baddie.healthBar.moveTo(0, 0);
            baddie.healthBar.lineTo(20*(baddie.health/baddie.maxHealth), 0);
        }
    },
    bossZombieKill: function(bullet, bossZombie) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.66) {
            if (bullet.travel == 'left') {
                bossZombie.x -= knockback*0.1;
            }
            else if (bullet.travel == 'right') {
                bossZombie.x += knockback*0.1;
            }
            else if (bullet.travel == 'up') {
                bossZombie.y -= knockback*0.1;
            }
            else if (bullet.travel == 'down') {
                bossZombie.y += knockback*0.1;
            }
        }
        bullet.kill();
        if (game.time.now>bossZombie.damageTimer) {
            bossZombie.damageTimer = game.time.now>bossZombie+400;
            if (bossZombie.health <= shotPower) {
                this.coinCreate(bossZombie.x, bossZombie.y, "yellow");
                this.coinCreate(bossZombie.x+15, bossZombie.y-2, "yellow");
                this.coinCreate(bossZombie.x-15, bossZombie.y+2, "yellow");
                var wand = game.add.sprite(bossZombie.x-10, bossZombie.y+10, 'wand');
                weaponsmithDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { wand.destroy(); });
                var armour = game.add.sprite(bossZombie.x+10, bossZombie.y+10, 'armour');
                armourerDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { armour.destroy(); });
                var ring = game.add.sprite(bossZombie.x+10, bossZombie.y-10, 'ring');
                enchanterDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { ring.destroy(); });
                var buff = game.add.sprite(bossZombie.x-10, bossZombie.y-10, 'buff');
                trainerDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { buff.destroy(); });
                if (Math.random()>0.8 && bossZombie.colour=="red") {
                   this.coinCreate(bossZombie.x+5, bossZombie.y+5, "yellow"); 
                   this.coinCreate(bossZombie.x-5, bossZombie.y-5, "yellow"); 
                }
                else if (Math.random()>0.9) {
                   this.coinCreate(bossZombie.x+5, bossZombie.y+5, "green"); 
                   this.coinCreate(bossZombie.x-5, bossZombie.y-5, "green"); 
                }
                if (Math.random()>0.8) {
                    this.baddieCreate(bossZombie.x, bossZombie.y, "red");
                    baddieCount ++;
                }
                bossZombie.destroy();
                bossZombieKilled = true;
                zombieDeathSFX.play();
                totalMonstersKilled+= (0+1);
                var death = game.add.sprite(bossZombie.x, bossZombie.y, 'deathSheet');
                if (bossZombie.colour=="red") {
                    xp += Math.floor(baddieXpAdjuster*330);
                    death.frame = 11;
                }
                else {
                    xp += Math.floor(baddieXpAdjuster*220);
                    death.frame = 10;
                }
                death.scale.x = 2.5;
                death.scale.y = 2.5;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
                this.xpDisplayConvert();
                baddieCount -= (stageMilestone*0.1) + 57;
                this.checkLevelUp();
                this.checkStageComplete();
            }
            else {
                bossZombie.health -= shotPower;
                //var self = this;
                if (bossZombie.timer+bossZombie.interval<=game.time.now) {
                    this.baddieCreate(bossZombie.x, bossZombie.y, "red");
                    bossZombie.timer = game.time.now;
                    baddieCount ++;
                }
                bossZombie.healthBarBack.visible = true;
                bossZombie.healthBar.visible = true;
                bossZombie.healthBar.clear();
                bossZombie.healthBar.lineStyle(3, 0xffd900, 1);
                bossZombie.healthBar.moveTo(0, 0);
                bossZombie.healthBar.lineTo(20*(bossZombie.health/bossZombie.maxHealth), 0);
            }
        }
    },
    bossZombieBirdKill: function(bullet, bossZombieBird) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.66) {
            if (bullet.travel == 'left') {
                bossZombieBird.x -= knockback*0.1;
            }
            else if (bullet.travel == 'right') {
                bossZombieBird.x += knockback*0.1;
            }
            else if (bullet.travel == 'up') {
                bossZombieBird.y -= knockback*0.1;
            }
            else if (bullet.travel == 'down') {
                bossZombieBird.y += knockback*0.1;
            }
        }
        bullet.kill();
        if (game.time.now>bossZombieBird.damageTimer) {
            bossZombieBird.damageTimer = game.time.now>bossZombieBird+400;
            if (bossZombieBird.health <= shotPower) {
                this.coinCreate(bossZombieBird.x, bossZombieBird.y, "yellow");
                this.coinCreate(bossZombieBird.x+15, bossZombieBird.y-2, "yellow");
                this.coinCreate(bossZombieBird.x-15, bossZombieBird.y+2, "yellow");
                this.coinCreate(bossZombieBird.x+5, bossZombieBird.y+5, "yellow"); 
                this.coinCreate(bossZombieBird.x-5, bossZombieBird.y-5, "yellow"); 
                var wand = game.add.sprite(bossZombieBird.x-10, bossZombieBird.y+10, 'wand');
                weaponsmithDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { wand.destroy(); });
                var armour = game.add.sprite(bossZombieBird.x+10, bossZombieBird.y+10, 'armour');
                armourerDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { armour.destroy(); });
                var ring = game.add.sprite(bossZombieBird.x+10, bossZombieBird.y-10, 'ring');
                enchanterDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { ring.destroy(); });
                var buff = game.add.sprite(bossZombieBird.x-10, bossZombieBird.y-10, 'buff');
                trainerDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { buff.destroy(); });
                if (Math.random()>0.5) {
                   this.coinCreate(bossZombieBird.x+15, bossZombieBird.y+5, "yellow"); 
                   this.coinCreate(bossZombieBird.x-5, bossZombieBird.y-15, "yellow"); 
                }
                bossZombieBird.destroy();
                bossZombieBird.isAlive = false;
                this.birdDeathSFX();
                totalMonstersKilled+= (0+1);
                var death = game.add.sprite(bossZombieBird.x, bossZombieBird.y, 'deathSheet');
                xp += Math.floor(baddieXpAdjuster*450);
                death.frame = 12;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
                this.xpDisplayConvert();
                baddieCount -= (stageMilestone*0.1) + 45;
                this.checkLevelUp();
                this.zombieBirdCreate(bossZombieBird.x, bossZombieBird.y);
                this.zombieBirdCreate(bossZombieBird.x+30, bossZombieBird.y);
                this.zombieBirdCreate(bossZombieBird.x, bossZombieBird.y+30);
                this.zombieBirdCreate(bossZombieBird.x+30, bossZombieBird.y+30);
                this.miniZombieBirdCreate(bossZombieBird.x, bossZombieBird.y);
                this.miniZombieBirdCreate(bossZombieBird.x+20, bossZombieBird.y);
                this.miniZombieBirdCreate(bossZombieBird.x+40, bossZombieBird.y);
                this.miniZombieBirdCreate(bossZombieBird.x, bossZombieBird.y+20);
                this.miniZombieBirdCreate(bossZombieBird.x+30, bossZombieBird.y+20);
            }
            else {
                bossZombieBird.health -= shotPower;
                bossZombieBird.healthBarBack.visible = true;
                bossZombieBird.healthBar.visible = true;
                bossZombieBird.healthBar.clear();
                bossZombieBird.healthBar.lineStyle(3, 0xffd900, 1);
                bossZombieBird.healthBar.moveTo(0, 0);
                bossZombieBird.healthBar.lineTo(20*(bossZombieBird.health/bossZombieBird.maxHealth), 0);
            }
        }
    },
    bossMummyKill: function(bullet, bossMummy) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.66) {
            if (bullet.travel == 'left') {
                bossMummy.x -= knockback*0.1;
            }
            else if (bullet.travel == 'right') {
                bossMummy.x += knockback*0.1;
            }
            else if (bullet.travel == 'up') {
                bossMummy.y -= knockback*0.1;
            }
            else if (bullet.travel == 'down') {
                bossMummy.y += knockback*0.1;
            }
        }
        bullet.kill();
        if (game.time.now>bossMummy.damageTimer) {
            bossMummy.damageTimer = game.time.now>bossMummy+400;
            if (bossMummy.health <= shotPower) {
                this.coinCreate(bossMummy.x, bossMummy.y, "yellow");
                this.coinCreate(bossMummy.x+15, bossMummy.y-2, "yellow");
                this.coinCreate(bossMummy.x-15, bossMummy.y+2, "yellow");
                this.coinCreate(bossMummy.x+5, bossMummy.y+5, "yellow"); 
                this.coinCreate(bossMummy.x-5, bossMummy.y-5, "yellow"); 
                this.coinCreate(bossMummy.x-5, bossMummy.y, "yellow"); 
                var wand = game.add.sprite(bossMummy.x-10, bossMummy.y+10, 'wand');
                weaponsmithDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { wand.destroy(); });
                var armour = game.add.sprite(bossMummy.x+10, bossMummy.y+10, 'armour');
                armourerDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { armour.destroy(); });
                var ring = game.add.sprite(bossMummy.x+10, bossMummy.y-10, 'ring');
                enchanterDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { ring.destroy(); });
                var buff = game.add.sprite(bossMummy.x-10, bossMummy.y-10, 'buff');
                trainerDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { buff.destroy(); });
                if (Math.random()>0.5) {
                   this.coinCreate(bossMummy.x+15, bossMummy.y+5, "yellow"); 
                   this.coinCreate(bossMummy.x-5, bossMummy.y-15, "yellow"); 
                   this.coinCreate(bossMummy.x-15, bossMummy.y-15, "yellow"); 
                }
                bossMummy.destroy();
                bossMummy.isAlive = false;
                bossMummyKilled = true;
                this.mummyDeathSFX();
                totalMonstersKilled+= (0+1);
                var death = game.add.sprite(bossMummy.x, bossMummy.y, 'deathSheet');
                xp += Math.floor(baddieXpAdjuster*650);
                death.frame = 5;
                death.scale.x = 2;
                death.scale.y = 2;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
                this.xpDisplayConvert();
                baddieCount -= (stageMilestone*0.1) + 97;
                this.checkLevelUp();
                this.checkStageComplete();
            }
            else {
                bossMummy.health -= shotPower;
                bossMummy.healthBarBack.visible = true;
                bossMummy.healthBar.visible = true;
                bossMummy.healthBar.clear();
                bossMummy.healthBar.lineStyle(3, 0xffd900, 1);
                bossMummy.healthBar.moveTo(0, 0);
                bossMummy.healthBar.lineTo(20*(bossMummy.health/bossMummy.maxHealth), 0);
            }
        }
    },
    bossFinalKill: function(bullet, bossFinal) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.66) {
            if (bullet.travel == 'left') {
                bossFinal.x -= knockback*0.1;
            }
            else if (bullet.travel == 'right') {
                bossFinal.x += knockback*0.1;
            }
            else if (bullet.travel == 'up') {
                bossFinal.y -= knockback*0.1;
            }
            else if (bullet.travel == 'down') {
                bossFinal.y += knockback*0.1;
            }
        }
        bullet.kill();
        if (game.time.now>bossFinal.damageTimer) {
            bossFinal.damageTimer = game.time.now>bossFinal+400;
            if (bossFinal.health <= shotPower) {
                this.coinCreate(bossFinal.x, bossFinal.y, "yellow");
                this.coinCreate(bossFinal.x+15, bossFinal.y-2, "yellow");
                this.coinCreate(bossFinal.x-15, bossFinal.y+2, "yellow");
                this.coinCreate(bossFinal.x+5, bossFinal.y+5, "yellow"); 
                this.coinCreate(bossFinal.x-5, bossFinal.y-5, "yellow"); 
                this.coinCreate(bossFinal.x-5, bossFinal.y, "yellow"); 
                this.coinCreate(bossFinal.x-15, bossFinal.y-15, "yellow"); 
                this.coinCreate(bossFinal.x-5, bossFinal.y-15, "yellow"); 
                var wand = game.add.sprite(bossFinal.x-10, bossFinal.y+10, 'wand');
                weaponsmithDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { wand.destroy(); });
                var armour = game.add.sprite(bossFinal.x+10, bossFinal.y+10, 'armour');
                armourerDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { armour.destroy(); });
                var ring = game.add.sprite(bossFinal.x+10, bossFinal.y-10, 'ring');
                enchanterDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { ring.destroy(); });
                var buff = game.add.sprite(bossFinal.x-10, bossFinal.y-10, 'buff');
                trainerDropReward ++;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () { buff.destroy(); });
                if (Math.random()>0.5) {
                   this.coinCreate(bossFinal.x+15, bossFinal.y+5, "yellow"); 
                   this.coinCreate(bossFinal.x-5, bossFinal.y-15, "yellow"); 
                   this.coinCreate(bossFinal.x-15, bossFinal.y-15, "yellow"); 
                   this.coinCreate(bossFinal.x-5, bossFinal.y+10, "yellow"); 
                }
                bossFinal.destroy();
                bossFinal.isAlive = false;
                bossFinalKilled = true;
                this.maleDeathSFX();
                totalMonstersKilled+= (0+1);
                var death = game.add.sprite(bossFinal.x, bossFinal.y, 'deathSheet');
                xp += Math.floor(baddieXpAdjuster*900);
                death.frame = 3;
                death.scale.x = 2;
                death.scale.y = 2;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
                this.xpDisplayConvert();
                baddieCount -= 100;
                this.checkLevelUp();
                this.checkStageComplete();
            }
            else {
                bossFinal.health -= shotPower;
                bossFinal.healthBarBack.visible = true;
                bossFinal.healthBar.visible = true;
                bossFinal.healthBar.clear();
                bossFinal.healthBar.lineStyle(3, 0xffd900, 1);
                bossFinal.healthBar.moveTo(0, 0);
                bossFinal.healthBar.lineTo(20*(bossFinal.health/bossFinal.maxHealth), 0);
            }
        }
    },
    spiderKill: function(bullet, spider) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.66) {
            if (bullet.travel == 'left') {
                spider.x -= knockback;
            }
            else if (bullet.travel == 'right') {
                spider.x += knockback;
            }
            else if (bullet.travel == 'up') {
                spider.y -= knockback;
            }
            else if (bullet.travel == 'down') {
                spider.y += knockback;
            }
        }
        bullet.kill();
        if (spider.health <= shotPower) {
            if (Math.random()>0.85) {
               this.coinCreate(spider.x+5, spider.y+5, "blue"); 
            }
            else {
               this.coinCreate(spider.x, spider.y, "red"); 
            }
            spider.kill();
            totalMonstersKilled+= (0+1);
            var death = game.add.sprite(spider.x, spider.y, 'deathSheet');
            death.frame = 7;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
            this.spiderDeathSFX();
            xp += Math.floor(baddieXpAdjuster*5);
            this.xpDisplayConvert();
            baddieCount -= 3;
            this.checkLevelUp();
            this.checkStageComplete();
        }
        else {
            spider.health -= shotPower;
            spider.healthBarBack.visible = true;
            spider.healthBar.visible = true;
            spider.healthBar.clear();
            spider.healthBar.lineStyle(3, 0xffd900, 1);
            spider.healthBar.moveTo(0, 0);
            spider.healthBar.lineTo(20*(spider.health/spider.maxHealth), 0);
        }
    },
    swordZombieKill: function(bullet, swordZombie) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.66) {
            if (bullet.travel == 'left') {
                swordZombie.x -= knockback;
            }
            else if (bullet.travel == 'right') {
                swordZombie.x += knockback;
            }
            else if (bullet.travel == 'up') {
                swordZombie.y -= knockback;
            }
            else if (bullet.travel == 'down') {
                swordZombie.y += knockback;
            }
        }
        bullet.kill();
        if (swordZombie.health <= shotPower) {
            if (Math.random()>0.7 || swordZombie.colour=="red") {
               this.coinCreate(swordZombie.x+5, swordZombie.y+5, "blue"); 
            }
            else {
               this.coinCreate(swordZombie.x, swordZombie.y, "red"); 
            }
            swordZombie.kill();
            swordZombie.isAlive = false;
            totalMonstersKilled+= (0+1);
            var death = game.add.sprite(swordZombie.x, swordZombie.y, 'deathSheet');
            
            if (swordZombie.colour=="red") {
               death.frame = 16;
               xp += Math.floor(baddieXpAdjuster*9);
            }
            else {
               death.frame = 14;
               xp += Math.floor(baddieXpAdjuster*6); 
            }
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
            zombieDeathSFX.play();
            this.xpDisplayConvert();
            baddieCount -= 4;
            this.checkLevelUp();
            this.checkStageComplete();
        }
        else {
            swordZombie.health -= shotPower;
            swordZombie.healthBarBack.visible = true;
            swordZombie.healthBar.visible = true;
            swordZombie.healthBar.clear();
            swordZombie.healthBar.lineStyle(3, 0xffd900, 1);
            swordZombie.healthBar.moveTo(0, 0);
            swordZombie.healthBar.lineTo(20*(swordZombie.health/swordZombie.maxHealth), 0);
        }
    },
    skeletonKill: function(bullet, skeleton) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.66) {
            if (bullet.travel == 'left') {
                skeleton.x -= knockback;
            }
            else if (bullet.travel == 'right') {
                skeleton.x += knockback;
            }
            else if (bullet.travel == 'up') {
                skeleton.y -= knockback;
            }
            else if (bullet.travel == 'down') {
                skeleton.y += knockback;
            }
        }
        bullet.kill();
        if (skeleton.colour!="redBoss" || game.time.now>skeleton.bossDamageTimer) {
            if (skeleton.colour=="redBoss") {
                skeleton.bossDamageTimer = game.time.now+400;
            }
            if (skeleton.health <= shotPower) {
                this.coinCreate(skeleton.x, skeleton.y, "blue");
                if (Math.random()>0.7 && skeleton.colour=="grey") {
                   this.coinCreate(skeleton.x+5, skeleton.y+5, "red"); 
                }
                else if (Math.random()>0.6 && skeleton.colour=="red") {
                   this.coinCreate(skeleton.x+5, skeleton.y+5, "blue"); 
                }
                else if (skeleton.colour=="redBoss") {
                    this.coinCreate(skeleton.x+5, skeleton.y+5, "yellow");
                    this.coinCreate(skeleton.x-5, skeleton.y-5, "yellow");
                    this.coinCreate(skeleton.x+15, skeleton.y-2, "yellow");
                    this.coinCreate(skeleton.x-15, skeleton.y+2, "yellow");
                    var wand = game.add.sprite(skeleton.x-10, skeleton.y+10, 'wand');
                    weaponsmithDropReward ++;
                    game.time.events.add(Phaser.Timer.SECOND * 1, function () { wand.destroy(); });
                    var armour = game.add.sprite(skeleton.x+10, skeleton.y+10, 'armour');
                    armourerDropReward ++;
                    game.time.events.add(Phaser.Timer.SECOND * 1, function () { armour.destroy(); });
                    var ring = game.add.sprite(skeleton.x+10, skeleton.y-10, 'ring');
                    enchanterDropReward ++;
                    game.time.events.add(Phaser.Timer.SECOND * 1, function () { ring.destroy(); });
                    var buff = game.add.sprite(skeleton.x-10, skeleton.y-10, 'buff');
                    trainerDropReward ++;
                    game.time.events.add(Phaser.Timer.SECOND * 1, function () { buff.destroy(); });
                }
                skeleton.destroy();
                totalMonstersKilled+= (0+1);
                var death = game.add.sprite(skeleton.x, skeleton.y, 'deathSheet');
                death.frame = 6;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
                this.skeletonDeathSFX();
                if (skeleton.colour=="red") {
                    xp += Math.floor(baddieXpAdjuster*8);
                    death.tint = 0xba3500;
                }
                else if (skeleton.colour=="redBoss") {
                    skeleton.isAlive = false;
                    xp += Math.floor(baddieXpAdjuster*325);
                    death.tint = 0xba3500;
                    death.scale.x = 2.5;
                    death.scale.y = 2.5;
                    bossSkeletonKilled = true;
                }
                else {
                    xp += Math.floor(baddieXpAdjuster*6);
                }
                this.xpDisplayConvert();
                if (skeleton.colour=="redBoss") {
                    baddieCount -= (stageMilestone*0.1) + 77;
                }
                else {
                    baddieCount -= 5;
                }
                this.checkLevelUp();
                this.checkStageComplete();
            }
            else {
                skeleton.health -= shotPower;
                skeleton.healthBarBack.visible = true;
                skeleton.healthBar.visible = true;
                skeleton.healthBar.clear();
                skeleton.healthBar.lineStyle(3, 0xffd900, 1);
                skeleton.healthBar.moveTo(0, 0);
                skeleton.healthBar.lineTo(20*(skeleton.health/skeleton.maxHealth), 0);
            }
        }
    },
    flameKill: function(bullet, flame) {
        this.smallExplosion(bullet.x, bullet.y);
        bullet.kill();
        if (flame.health <= shotPower) {
            if (Math.random()>0.65) {
               this.coinCreate(flame.x+5, flame.y+5, "blue"); 
            }
            else {
               this.coinCreate(flame.x, flame.y, "red"); 
            }
            flame.destroy();
            flame.isAlive = false;
            this.sizzleSFX();
            xp += Math.floor(baddieXpAdjuster*8);
            this.xpDisplayConvert();
            baddieCount -= 6;
            this.checkLevelUp();
            this.checkStageComplete();
            if (stage==70) {
                flameCount--;
            }
        }
        else {
            flame.health -= shotPower;
            flame.healthBarBack.visible = true;
            flame.healthBar.visible = true;
            flame.healthBar.clear();
            flame.healthBar.lineStyle(3, 0xffd900, 1);
            flame.healthBar.moveTo(0, 0);
            flame.healthBar.lineTo(20*(flame.health/flame.maxHealth), 0);
        }
        
    },
    mummyKill: function(bullet, mummy) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.75) {
            if (bullet.travel == 'left') {
                mummy.x -= knockback;
            }
            else if (bullet.travel == 'right') {
                mummy.x += knockback;
            }
            else if (bullet.travel == 'up') {
                mummy.y -= knockback;
            }
            else if (bullet.travel == 'down') {
                mummy.y += knockback;
            }
        }
        bullet.kill();
        if (mummy.health <= shotPower) {
            if (Math.random()>0.67) {
               this.coinCreate(mummy.x+5, mummy.y+5, "green"); 
            }
            else {
               this.coinCreate(mummy.x, mummy.y, "blue"); 
            }
            mummy.destroy();
            totalMonstersKilled+= (0+1);
            if (backgroundScene=="wasteland") {
                var death = game.add.sprite(mummy.x, mummy.y, 'deathSheet');
                death.frame = 5;
            }
            else {
                var death = game.add.sprite(mummy.x, mummy.y, 'golem');
                death.frame = 14;
            }
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
            this.mummyDeathSFX();
            xp += Math.floor(baddieXpAdjuster*9);
            this.xpDisplayConvert();
            baddieCount -= 7;
            this.checkLevelUp();
            this.checkStageComplete();
        }
        else {
            mummy.health -= shotPower;
            mummy.healthBarBack.visible = true;
            mummy.healthBar.visible = true;
            mummy.healthBar.clear();
            mummy.healthBar.lineStyle(3, 0xffd900, 1);
            mummy.healthBar.moveTo(0, 0);
            mummy.healthBar.lineTo(20*(mummy.health/mummy.maxHealth), 0);
        }
    },
    zombieBirdKill: function(bullet, zombieBird) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.5) {
            if (bullet.travel == 'left') {
                zombieBird.x -= knockback;
            }
            else if (bullet.travel == 'right') {
                zombieBird.x += knockback;
            }
            else if (bullet.travel == 'up') {
                zombieBird.y -= knockback;
            }
            else if (bullet.travel == 'down') {
                zombieBird.y += knockback;
            }
        }
        bullet.kill();
        if (zombieBird.health <= shotPower) {
            this.miniZombieBirdCreate(zombieBird.x, zombieBird.y+50);
            this.miniZombieBirdCreate(zombieBird.x, zombieBird.y-50);
            if (player.x < zombieBird.x) {
               this.miniZombieBirdCreate(zombieBird.x+50, zombieBird.y); 
            }
            else {
               this.miniZombieBirdCreate(zombieBird.x-50, zombieBird.y); 
            }
            if (Math.random()>0.7) {
               this.coinCreate(zombieBird.x+5, zombieBird.y+5, "green"); 
            }
            else {
                this.coinCreate(zombieBird.x, zombieBird.y, "blue");
            }
            zombieBird.destroy();
            totalMonstersKilled+= (0+1);
            var death = game.add.sprite(zombieBird.x, zombieBird.y, 'deathSheet');
            death.frame = 12;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
            this.birdDeathSFX();
            xp += Math.floor(baddieXpAdjuster*8);
            this.xpDisplayConvert();
            baddieCount -=2;
            this.checkLevelUp();
            this.checkStageComplete();
        }
        else {
            zombieBird.health -= shotPower;
            zombieBird.healthBarBack.visible = true;
            zombieBird.healthBar.visible = true;
            zombieBird.healthBar.clear();
            zombieBird.healthBar.lineStyle(3, 0xffd900, 1);
            zombieBird.healthBar.moveTo(0, 0);
            zombieBird.healthBar.lineTo(20*(zombieBird.health/zombieBird.maxHealth), 0);
        }
    },
    miniZombieBirdKill: function(bullet, miniZombieBird) {
        this.smallExplosion(bullet.x, bullet.y);
        if (Math.random()>0.4) {
            if (bullet.travel == 'left') {
                miniZombieBird.x -= knockback;
            }
            else if (bullet.travel == 'right') {
                miniZombieBird.x += knockback;
            }
            else if (bullet.travel == 'up') {
                miniZombieBird.y -= knockback;
            }
            else if (bullet.travel == 'down') {
                miniZombieBird.y += knockback;
            }
        }
        bullet.kill();
        if (miniZombieBird.health <= shotPower) {
            if (Math.random()>0.75) {
               this.coinCreate(miniZombieBird.x+5, miniZombieBird.y+5, "green"); 
            }
            else {
               this.coinCreate(miniZombieBird.x, miniZombieBird.y, "blue"); 
            }
            miniZombieBird.kill();
            miniZombieBird.healthBar.destroy();
            miniZombieBird.healthBarBack.destroy();
            totalMonstersKilled+= (0+1);
            var death = game.add.sprite(miniZombieBird.x, miniZombieBird.y, 'deathSheet');
            death.frame = 4;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
            this.birdDeathSFX();
            xp += Math.floor(baddieXpAdjuster*6);
            this.xpDisplayConvert();
            baddieCount -= 2;
            this.checkLevelUp();
            this.checkStageComplete();
        }
        else {
            miniZombieBird.health -= shotPower;
            miniZombieBird.healthBarBack.visible = true;
            miniZombieBird.healthBar.visible = true;
            if (miniZombieBird.children.length>0) {
                miniZombieBird.healthBar.clear();
                miniZombieBird.healthBar.lineStyle(3, 0xffd900, 1);
                miniZombieBird.healthBar.moveTo(0, 0);
                miniZombieBird.healthBar.lineTo(20*(miniZombieBird.health/miniZombieBird.maxHealth), 0);
            }
        }
    },
    swampCreatureKill: function(bullet, swampCreature) {
        this.smallExplosion(bullet.x, bullet.y);
        bullet.kill();
        if (swampCreature.health <= shotPower) {
            this.coinCreate(swampCreature.x, swampCreature.y, "green");
            if (Math.random()>0.5) {
               this.coinCreate(swampCreature.x+5, swampCreature.y+5, "blue"); 
            }
            swampCreature.destroy();
            totalMonstersKilled+= (0+1);
            var death = game.add.sprite(swampCreature.x, swampCreature.y, 'deathSheet');
            death.frame = 13;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
            var swampCreatureDeathSFX = game.add.audio('swampCreatureDeath');
            swampCreatureDeathSFX.play();
            swampCreature.isAlive = false;
            xp += Math.floor(baddieXpAdjuster*14);
            this.xpDisplayConvert();
            baddieCount -= 9;
            this.checkLevelUp();
            this.checkStageComplete();
        }
        else {
            swampCreature.health -= shotPower;
            swampCreature.healthBarBack.visible = true;
            swampCreature.healthBar.visible = true;
            swampCreature.healthBar.clear();
            swampCreature.healthBar.lineStyle(3, 0xffd900, 1);
            swampCreature.healthBar.moveTo(0, 0);
            swampCreature.healthBar.lineTo(20*(swampCreature.health/swampCreature.maxHealth), 0);
        }
    },
    treeBeastKill: function(bullet, treeBeast) {
        this.smallExplosion(bullet.x, bullet.y);
        bullet.kill();
        if (treeBeast.health <= shotPower) {
            this.coinCreate(treeBeast.x, treeBeast.y, "green");
            if (Math.random()>0.5) {
               this.coinCreate(treeBeast.x+5, treeBeast.y+5, "blue"); 
            }
            treeBeast.destroy();
            treeBeast.isAlive = false;
            this.woodSmashSFX();
            xp += Math.floor(baddieXpAdjuster*14);
            this.xpDisplayConvert();
            if (stage==60 && bossTreeBeastKilled==false) {
                baddieCount -= 4.8;
            }
            else {
                baddieCount -= 9;
            }
            this.checkLevelUp();
            this.checkStageComplete();
        }
        else {
            treeBeast.health -= shotPower;
            treeBeast.healthBarBack.visible = true;
            treeBeast.healthBar.visible = true;
            treeBeast.healthBar.clear();
            treeBeast.healthBar.lineStyle(3, 0xffd900, 1);
            treeBeast.healthBar.moveTo(0, 0);
            treeBeast.healthBar.lineTo(20*(treeBeast.health/treeBeast.maxHealth), 0);
        }
    },
    evilwizardKill: function(bullet, evilwizard) {
        this.smallExplosion(bullet.x, bullet.y);
        bullet.kill();
        if (evilwizard.health <= shotPower) {
            this.coinCreate(evilwizard.x, evilwizard.y, "yellow");
            if (Math.random()>0.5) {
               this.coinCreate(evilwizard.x+5, evilwizard.y+5, "green"); 
            }
            evilwizard.destroy();
            totalMonstersKilled+= (0+1);
            var death = game.add.sprite(evilwizard.x, evilwizard.y, 'deathSheet');
            death.frame = 3;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
            this.maleDeathSFX();
            evilwizard.isAlive = false;
            xp += Math.floor(baddieXpAdjuster*19);
            this.xpDisplayConvert();
            baddieCount -= 10;
            this.checkLevelUp();
            this.checkStageComplete();
        }
        else {
            evilwizard.health -= shotPower;
            evilwizard.healthBarBack.visible = true;
            evilwizard.healthBar.visible = true;
            evilwizard.healthBar.clear();
            evilwizard.healthBar.lineStyle(3, 0xffd900, 1);
            evilwizard.healthBar.moveTo(0, 0);
            evilwizard.healthBar.lineTo(20*(evilwizard.health/evilwizard.maxHealth), 0);
        }
    },
    vampireKill: function(bullet, vampire) {
        this.smallExplosion(bullet.x, bullet.y);
        bullet.kill();
        if (vampire.visible) {
            if (vampire.health <= shotPower) {
                this.coinCreate(vampire.x-5, vampire.y-5, "green");
                this.coinCreate(vampire.x, vampire.y, "yellow");
                if (Math.random()>0.4) {
                   this.coinCreate(vampire.x+5, vampire.y+5, "yellow"); 
                }
                vampire.destroy();
                totalMonstersKilled+= (0+1);
                var death = game.add.sprite(vampire.x, vampire.y, 'deathSheet');
                death.frame = 15;
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); });
                this.maleDeathSFX();
                vampire.isAlive = false;
                xp += Math.floor(baddieXpAdjuster*25);
                this.xpDisplayConvert();
                baddieCount -= 11;
                this.checkLevelUp();
                this.checkStageComplete();
            }
            else {
                vampire.health -= shotPower;
                this.vampireEvade();
                vampire.healthBarBack.visible = true;
                vampire.healthBar.visible = true;
                vampire.healthBar.clear();
                vampire.healthBar.lineStyle(3, 0xffd900, 1);
                vampire.healthBar.moveTo(0, 0);
                vampire.healthBar.lineTo(20*(vampire.health/vampire.maxHealth), 0);
            }
        }
    },
    decoyKill: function(bullet, decoy) {
        decoy.destroy();
    },
    checkStageComplete: function() {
        var finalBossShown = false;
        if (baddieCount <= 0 && stage%100==0 && bossFinalKilled==false && finalBossShown==false) {
            this.finalBossIntro();
            finalBossShown = true;
        }
        else if (baddieCount <= 0 && doorAvailable==false) {
            if (player.x < 150 && player.y < 250) {
                game.add.sprite(750, 70, 'doorway');
                door = game.add.sprite(750, 70, 'animateddoor');
            }
            else {
                game.add.sprite(5, 70, 'doorway');
                door = game.add.sprite(5, 70, 'animateddoor');
            }
            doorAvailable = true;
            manaRegenEndLevelAdjust = 250;
            runSpeedEndLevelAdjust = 100;
            door.animations.add('openDoor', [0, 1, 2, 3], 4, false);
            game.physics.arcade.enable(door);
            door.body.immovable = true;
            if (stage-(Math.floor(stage/100)*100)==60) {
                bossTreeBeastKilled = true;
            }
            if (stage-(Math.floor(stage/100)*100)==80) {
                bossZombieBirdKilled = true;
            }
            if (stage%100==0) {
                finalBossShown = false;
            }
        }
    },
    finalBossIntro: function() {
        beamSFX = game.add.audio('shotSFX');
        var fakeDoor = game.add.sprite(750, 70, 'animateddoor');
        flameShot = game.add.audio('flameShot');
        var doorFire;
        var doorFire2;
        game.time.events.add(Phaser.Timer.SECOND * 1, function () {   
            doorFire = game.add.sprite(750, 115, 'flame');
            doorFire.scale.x = 2;
            doorFire.scale.y = 1.5;
            doorFire.animations.add('flicker', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
            doorFire.animations.play('flicker');
            doorFire2 = game.add.sprite(785, 115, 'flame');
            doorFire2.scale.x = 2;
            doorFire2.scale.y = 1.5;
            doorFire2.animations.add('flicker', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
            doorFire2.animations.play('flicker');
            flameShot.play();
        });
        game.time.events.add(Phaser.Timer.SECOND * 3, function () {   
            fakeDoor.kill();
        });
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 4, function () {   
            doorFire.kill();
            doorFire2.kill();
            self.bossFinalCreate(832-player.x, 640-player.y);
            baddieCount += 100;
        });
        
    },
    doorOpen: function() {
        door.animations.play('openDoor');
        var doorOpenSFX = game.add.audio('creakylightwoodendoor1');
        doorOpenSFX.play();
        manaRegenEndLevelAdjust = 0;
        runSpeedEndLevelAdjust = 0;
        player.kill();
        door.destroy();
        doorAvailable = false;
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 2, function () {   self.startNextLevel();  });
    },
    manaRegen: function() {
        if (game.time.now>manaRegenTimer && mana<maxMana) {
            mana++;
            manaRegenTimer = game.time.now + manaRegenInterval;
            manaText.text = "MP: " + mana + "/" + maxMana;
            manaCrop.x = (1-(mana/maxMana))*80;
            manaBar.updateCrop();
        }
    },
    questComplete: function() {
        questEndTime = game.time.now;
        if (timerMana!=null && timerMana.running) {
            timerMana.stop();
        }
        if (timerBeam!=null && timerBeam.running) {
            timerBeam.stop();
        }
        if (kongregate!=null) {
            kongregate.stats.submit('Player Level', playerLevel);
            kongregate.stats.submit('Highest Stage', bestStage);
            kongregate.stats.submit('Total Monsters Killed', totalMonstersKilled);
        }
        gameMusic.destroy();
        game.world.removeAll();
        game.state.start('city');
    },
    checkLevelUp: function() {
        while (xp >= nextLevelXp) {
            levelUpImage = game.add.sprite(132, 15, 'levelUp');
            levelUpImage.animations.add('flash', [0, 1, 2], 6, true);
            levelUpImage.animations.play('flash');
            var levelUpSFX = game.add.audio('levelUpSound');
            levelUpSFX.play();
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {   levelUpImage.destroy();  });
            xp -= nextLevelXp;
            nextLevelXp += Math.round(8 + playerLevel*0.7);
            maxHealth ++;
            maxMana ++;
            shotPower += 0.05;
            health++;
            hpCrop.x = (1-(health/maxHealth))*80;
            hpBar.updateCrop();
            mana = maxMana;
            manaCrop.x = (1-(mana/maxMana))*80;
            manaBar.updateCrop();
            playerLevel ++;
            this.xpDisplayConvert();
            manaText.text = "MP: " + mana + "/" + maxMana;
            healthText.text = 'HP: ' + health + "/" + maxHealth;
            playerLevelText.text = playerLevel;
        }
    },
    startNextLevel: function() {
        gameMusic.destroy();
        if (stage%100==0) {
            baddieAdjuster += 90;
            baddieTotal -= baddieAdjuster;
            baddieDamageAdjuster++;
            baddieHpAdjuster++;
            baddieXpAdjuster += 0.5;
            baddieSpeedAdjuster += 0.1;
            bossZombieKilled = false;
            bossTreeBeastKilled = false;
            bossSkeletonKilled = false;
            bossZombieBirdKilled = false;
            bossMummyKilled = false;
            bossFinalKilled = false;
        }
        stage ++;
        starTotal += 0.8;
        baddieTotal ++;
        baddieCount = baddieTotal;
        baddieCreated = 0;
        chestCreated = 0;
        flameCount = 0;
        evilwizardCount = 0;
        zombieBirdCount = 0;
        swampCreatureCount = 0;
        game.world.removeAll();
        array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
             23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
             43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
             63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
             83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101,
             102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
             118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130];
        sceneryCount = 0;
        invulnerableTimer = game.time.now + 50;
        this.create();
    },
    playerDeath: function() {
        // Removes the player from the screen
        player.kill();
        playerLegs.kill();
        gameMusic.destroy();
        this.maleDeathSFX();
        var death = game.add.sprite(player.x, player.y, 'deathSheet');
        death.frame = 0;
        var teleportSFX = game.add.audio('teleport');
        game.time.events.add(Phaser.Timer.SECOND * 1, function () {  death.destroy(); 
                                                                     var playerTeleport = game.add.sprite(death.x+5, death.y+5, 'playerTeleport');
                                                                     playerTeleport.animations.add('teleport', [0, 1, 2, 3], 8, false);
                                                                     playerTeleport.animations.play('teleport');
                                                                     teleportSFX.play();
                                                                     game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {  playerTeleport.destroy(); });
                                                                     });
        player.isAlive = false;
        healthText.text = "HP: 0/" + maxHealth;
        if (stage>bestStage) {
            while (stage>bestStage) {
                bestStage++;
                reward += bestStage;
            }
            if (stage<50) {
                reward = reward*1.1;
            }
            else {
                reward = reward*(0.15+((500-stage)/500));
            }
            levelRecordBackground.x = 96;
            levelRecord.text = "Congratulations!";
            levelRecord2.text = "New Highest Stage Record!";
            levelRecord3.text = "          You receive " + Math.floor(reward*10) + " XP and " + Math.floor(reward*15) + " Coins!";
            //xp += Math.floor(reward*10);
            var self = this;
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {self.xpCountdown(Math.floor(reward*10), Math.floor(reward*15)); reward = 0; });
            this.xpDisplayConvert();
            this.checkLevelUp();
            coins += Math.floor(reward*15);
            if (coins>=1000000) {
                coinsText.text = (Math.round(coins/1000))/1000 + "M";;
            }
            else {
                coinsText.text = coins;
            }
        }
        questEndCoins = coins;
        questTotalCoins = questEndCoins - questStartCoins;
        resultBackground.x = 96;
        resultText.text = ' Your Majesty, it is time to come home!';
        resultText2.text = ' You found ' + questTotalCoins + ' coins on your quest.'
        //resultText3.text = "   The Merchant Guild will double your coins for a minute of your time."
        var addStartButton = game.add.button(300, 250, 'blankButton', this.questComplete, this);
        var addStartText = game.add.bitmapText(340, 280, 'font', 'Yes, return home', 16);
        //var endLevelButton = game.add.button(410, 250, 'blankButton', this.questComplete, this);
        //var endLevelText = game.add.bitmapText(450, 280, 'font', 'No, return to my City', 16);
        if (first==true) {
            assistant = "welcomeBack";
            first = false;
        }
    },
    xpCountdown: function(amount, coinsAmount) {
        /*console.log(amount + "/" + game.time.now);
        //var xpCounter = game.time.create(false);
        //xpCounter.start();*/
        var self = this;
        if (amount<19) {
            var delayFactor = 18;
        }
        else {
            delayFactor = 90;
        }
        if (amount%2==0) {
            collectSFX.play();
        }
        this.xpPlus(amount, coinsAmount);
        if (amount>0) {
            if (amount>500) {
                amount-=15;
            }
            else if (amount>75) {
                amount-=3;
            }
            else {
                amount--;
            }
            game.time.events.add(Phaser.Timer.SECOND/delayFactor, function () {self.xpCountdown(amount, coinsAmount); });
        }
    },
    xpPlus: function(amount, coinsAmount) {
        if (amount>500) {
            xp+=15;
        }
        else if (amount>75) {
            xp+=3;
        }
        else {
            xp++;
        }
        this.xpDisplayConvert();
        this.checkLevelUp();
        levelRecord3.text = "          You receive " + amount + " XP and " + coinsAmount + " Coins!";
    },
    /*adWatch: function() {
        advertImage = game.add.sprite(185, 89, 'advertImage');
        adStopTime = game.time.now + 14000;
        var style = { font:'21px sans-serif bold' };
        adTimeText = game.add.text(619, 92, '', style);
        //adTimeText = game.add.bitmapText(618, 93, 'fontWhite', '', 21);
        //adTimeText.tint = 000000;
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 14, function () {   game.add.button(618, 89, 'closeButton', self.adClose, this) });
    },
    adTimeUpdate: function() {
        if (adTimeText!=null) {
            if (adStopTime - game.time.now<9500  && adStopTime>game.time.now) {
                adTimeText.text = "0" + Math.round((adStopTime - game.time.now)*0.001);
            }
            else if (adStopTime>game.time.now) {
                adTimeText.text = Math.round((adStopTime - game.time.now)*0.001);
            }
            else {
                adTimeText.text = "";
            }
            
        }
    },
    adClose: function() {
        coins += questTotalCoins;
        questEndTime = game.time.now;
        if (timerMana!=null && timerMana.running) {
            timerMana.stop();
        }
        if (timerBeam!=null && timerBeam.running) {
            timerBeam.stop();
        }
        game.world.removeAll();
        game.state.start('city');
    },*/
    beamWeaponActivate: function() {
        manaCost = 1;
        bulletSpacing = bulletSpacing/13.5;
        shotPower += shotSpeed*0.002
        beamWeapon = false;
        beamSprite.frame = 0;
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 4, function () {   manaCost = 4; bulletSpacing = bulletSpacing*13.5; shotPower -= shotSpeed*0.002; self.beamWeaponTimer(); });
    },
    beamWeaponTimer: function() {
        timerBeam = game.time.create();
        // Create a delayed event 5m from now
        timerBeamEvent = timerBeam.add(Phaser.Timer.MINUTE * 5, this.endBeamTimer, this);
        timerBeam.start();
        timerBeam.updateTimer = 0;
    },
    beamTimerUpdate: function() {
        if (timerBeam!=null && timerBeam.running && game.time.now>timerBeam.updateTimer) {
            beamSprite.frame = 0;
            //beamText.fontSize = 16;
            var style = {font:'21px courier bolder', fill: '#f99a08', stroke: 'black', strokeThickness: 1.5};
            beamText.setStyle(style);
            beamText.x = 234;
            beamText.y = 602;
            beamText.text = this.formatTime(Math.round((timerBeamEvent.delay - timerBeam.ms) *0.001));
            timerBeam.updateTimer = game.time.now + 1000;
        }
    },
    endBeamTimer: function() {
        // Stop the timer when the delayed event triggers
        timerBeam.stop();
        beamWeapon = true;
        beamSprite.frame = 1;
        //beamText.fontSize = 16;
        var style = {font:'18px courier bolder', fill: '#f99a08', stroke: 'black', strokeThickness: 1.5};
        beamText.setStyle(style);
        beamText.x = 230;
        beamText.y = 604;
        beamText.text = '  E';
        timerBeam.updateTimer = 0;
    },
    manaRefillActivate: function() {
        mana = maxMana;
        manaRefillAvailable = false;
        bottleSprite.frame = 0;
        bottleText.text = '';
        this.manaRefillTimer();
    },
    manaRefillTimer: function() {
        timerMana = game.time.create();
        // Create a delayed event 5m from now
        timerManaEvent = timerMana.add(Phaser.Timer.MINUTE * 5, this.endManaRefillTimer, this);
        timerMana.start();
        timerMana.updateTimer = 0;
    },
    manaRefillTimerUpdate: function() {
        if (timerMana!=null && timerMana.running && game.time.now>timerMana.updateTimer) {
            bottleSprite.frame = 0;
            bottleText.x = 532;
            bottleText.y = 603;
            //bottleText.fontSize = 16;
            var style = {font:'18px courier bolder', fill: '#f99a08', stroke: 'black', strokeThickness: 1.5};
            bottleText.setStyle(style);
            bottleText.text = this.formatTime(Math.round((timerManaEvent.delay - timerMana.ms) *0.001));
            timerMana.updateTimer = game.time.now + 1000;
        }
    },
    endManaRefillTimer: function() {
        // Stop the timer when the delayed event triggers
        timerMana.stop();
        manaRefillAvailable = true;
        bottleSprite.frame = 1;
        bottleText.x = 543;
        bottleText.y = 601;
        //bottleText.fontSize = 24;
        var style = {font:'24px courier bolder', fill: '#f99a08', stroke: 'black', strokeThickness: 1.5};
        bottleText.setStyle(style);
        bottleText.text = 'Q';
        timerMana.updateTimer = 0;
    },
    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    },
    treeCreate: function(x, y) {
        var tree = platforms.create(x, y, 'tree');
        tree.body.setSize(35, 20, 0, 33);
        tree.body.immovable = true;
        tree.Shadow = tree.addChild(game.add.sprite(-18, 11, 'treeShadow'));
        tree.Shadow.alpha = 0.35;
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
        xpCrop.x = (1-(xp/nextLevelXp))*80;
        xpBar.updateCrop();
    },
    manaWarnHighlightShow: function() {
        if (manaWarn==false) {
            var manaWarnHighlight = game.add.sprite(0, 0, 'hudManaWarning');
            manaWarnHighlight.scale.setTo(1.1, 1.1);
            manaWarn = true;
            manaWarnHighlight.alpha = 0.1;
            game.add.tween(manaWarnHighlight).to( { alpha: 1 }, 100, Phaser.Easing.Quadratic.In, true, 0, Number.MAX_VALUE, true);
            game.time.events.add(Phaser.Timer.SECOND * 0.25, function () {   manaWarnHighlight.kill(); manaWarn = false; });
        }
    },
    gofull: function() {
        game.scale.startFullScreen(false);
    },
    dummyPlayerShow: function(player, platforms) {
        if (player.body.y+25>(platforms.y+platforms.height)) {
            dummyPlayer.alpha = 1;
            //console.log('Platform.y/height/player.y:' + platforms.y + '/' + platforms.height + '/' + player.body.y);
            game.time.events.add(Phaser.Timer.SECOND * 0.1, function () {   dummyPlayer.alpha = 0; });
        }
    },
    dummyPlayerUpdate: function() {
        dummyPlayer.x = player.body.x-1;
        dummyPlayer.y = player.body.y-22;
        dummyPlayer.frame = player.frame;
    }
};