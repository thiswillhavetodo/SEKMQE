var titlePlayer;
var themeSound;
var currentTimeHolder;
var previousTime;
var weaponsmithTimerHolder;
var wandTimerHolder;
var shieldTimerHolder;
var armourerTimerHolder;
var armourTimerHolder;
var hatTimerHolder;
var bootTimerHolder;
var enchanterTimerHolder;
var ringTimerHolder;
var amuletTimerHolder;
var trainerTimerHolder;
var enduranceTimerHolder;
var skillTimerHolder;
var weaponsmithAdTimerHolder;
var armourerAdTimerHolder;
var enchanterAdTimerHolder;
var trainerAdTimerHolder;
/* global canvasElement*/
var menuBackground;
var loggedIn = false;

/*global game*/

var menuState = {
    create: function() {
        menuBackground = game.add.sprite(0, 0, 'menuBackground');
        menuBackground.scale.x = 0.356;
        menuBackground.scale.y = 0.376;
        //game.add.sprite(66, 40, 'titleBack');
        //game.add.sprite(146, 50, 'title');
        //game.stage.backgroundColor = '#3b5998';
        game.add.bitmapText(5, 620, 'fontWhite', "version k0.5", 16);
        var creditsButton = game.add.button(0, 0, 'creditsButton', this.credits, this);
        var startButton = game.add.button(180, 400, 'startButton', this.start, this);
        var loadButton = game.add.button(450, 400, 'loadButton', this.loadSave, this);
        loadButton.scale.setTo(0.9, 0.9);
        /*game.add.sprite(60, 394, 'castle');
        titlePlayer = game.add.sprite(600, 570, 'dude');
        game.physics.arcade.enable(titlePlayer);
        titlePlayer.animations.add('left', [9, 10, 11], 10, true);*/
        themeSound = game.add.audio('titleTheme');
        //console.log(loggedIn);
        //if (loggedIn) {
        themeSound.play();
        //}
    }, 
    /*update: function() {
        titlePlayer.body.velocity.x = -100;
        titlePlayer.animations.play('left');
        if (titlePlayer.x < 0) {
            titlePlayer.x = 900;
        }
    },*/
    start: function() {
        game.world.removeAll();
        if (!game.device.desktop) { 
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //game.scale.pageAlignHorizontally = true;
            //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            //game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //game.input.onDown.add(this.gofull, this);
            canvasElement.style.top = '0vh';
        }
        game.state.start('intro');
        themeSound.stop();
    },
    credits: function() {
        game.world.removeAll();
        game.state.start('credits');
        themeSound.stop();
    },
    loadSave: function() {
        /*var i;
        console.log("local storage");
        for (i = 0; i < localStorage.length; i++)   {
            console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
        }*/
        var save = localStorage.getItem("save");
        saveObject = JSON.parse(save);
        previousTime = saveObject.time;
        playerLevel = saveObject.playerLevel;
        bulletSpacing = saveObject.bulletSpacing;
        invulnerableSpacing = saveObject.invulnerableSpacing;
        shotSpeed = saveObject.shotSpeed;
        manaRegenHolder = saveObject.manaRegenHolder;
        bossZombieKilled = saveObject.bossZombieKilled;
        bossTreeBeastKilled = saveObject.bossTreeBeastKilled;
        bossSkeletonKilled = saveObject.bossSkeletonKilled;
        bossZombieBirdKilled = saveObject.bossZombieBirdKilled;
        bossMummyKilled = saveObject.bossMummyKilled;
        coins = saveObject.coins;
        stage = saveObject.stage;
        bestStage = saveObject.bestStage;
        xp = saveObject.xp;
        nextLevelXp = saveObject.nextLevelXp;
        maxHealth = saveObject.maxHealth;
        maxMana = saveObject.maxMana;
        shotPower = saveObject.shotPower;
        knockback = saveObject.knockback;
        runSpeed = saveObject.runSpeed;
        currentTimeHolder = saveObject.currentTime;
        currentTime = currentTimeHolder - previousTime;
        year = saveObject.year;
        population = saveObject.population;
        happiness = saveObject.happiness;
        popScore = saveObject.popScore;
        housing = saveObject.housing;
        commercial = saveObject.commercial;
        industrial = saveObject.industrial;
        education = saveObject.education;
        popHealth = saveObject.popHealth;
        justice = saveObject.justice;
        defence = saveObject.defence;
        utilities = saveObject.utilities;
        weaponsmith = saveObject.weaponsmith;
        armourer = saveObject.armourer;
        enchanter = saveObject.enchanter;
        trainer = saveObject.trainer;
        tax = saveObject.tax;
        income = saveObject.income;
        expenditure = saveObject.expenditure;
        totalFunding = saveObject.totalFunding ;
        netIncome = saveObject.netIncome;
        defending = saveObject.defending;
        defenceChance = saveObject.defenceChance;
        assistant = saveObject.assistant;
        tutorial = saveObject.tutorial;
        tutorialDefence = saveObject.tutorialDefence;
        first = saveObject.first;
        housingFunding = saveObject.housingFunding;
        commercialFunding = saveObject.commercialFunding;
        industrialFunding = saveObject.industrialFunding;
        educationFunding = saveObject.educationFunding;
        healthFunding = saveObject.healthFunding;
        justiceFunding = saveObject.justiceFunding;
        defenceFunding = saveObject.defenceFunding;
        utilitiesFunding = saveObject.utilitiesFunding;
        weaponsmithFunding = saveObject.weaponsmithFunding;
        armourerFunding = saveObject.armourerFunding;
        enchanterFunding = saveObject.enchanterFunding;
        trainerFunding = saveObject.trainerFunding;
        averageFunding = saveObject.averageFunding;
        weaponsmithDropReward = saveObject.weaponsmithDropReward;
        weaponsmithTimerHolder = saveObject.weaponsmithTimer;
        weaponsmithTimer = weaponsmithTimerHolder - previousTime;
        wandTimerHolder = saveObject.wandTimer;
        wandTimer = wandTimerHolder - previousTime;
        wandShotPower = saveObject.wandShotPower;
        wandShotSpeed = saveObject.wandShotSpeed;
        wandBulletSpacing = saveObject.wandBulletSpacing;
        shieldTimerHolder = saveObject.shieldTimer;
        shieldTimer = shieldTimerHolder - previousTime;
        shieldKnockback = saveObject.shieldKnockback;
        shieldMaxHealth = saveObject.shieldMaxHealth;
        shieldInvulnerableSpacing = saveObject.shieldInvulnerableSpacing;
        armourerDropReward = saveObject.armourerDropReward;
        armourerTimerHolder = saveObject.armourerTimer;
        armourerTimer = armourerTimerHolder - previousTime;
        armourTimerHolder = saveObject.armourTimer;
        armourTimer = armourTimerHolder - previousTime;
        armourMaxHealth = saveObject.armourMaxHealth;
        armourManaRegenInterval = saveObject.armourManaRegenInterval;
        armourInvulnerableSpacing = saveObject.armourInvulnerableSpacing;
        hatTimerHolder = saveObject.hatTimer;
        hatTimer = hatTimerHolder - previousTime;
        hatMaxHealth = saveObject.hatMaxHealth;
        hatManaRegenInterval = saveObject.hatManaRegenInterval;
        hatMaxMana = saveObject.hatMaxMana;
        bootTimerHolder = saveObject.bootTimer;
        bootTimer = bootTimerHolder - previousTime;
        bootRunSpeed = saveObject.bootRunSpeed;
        bootManaRegenInterval = saveObject.bootManaRegenInterval;
        bootInvulnerableSpacing = saveObject.bootInvulnerableSpacing;
        enchanterDropReward = saveObject.enchanterDropReward;
        enchanterTimerHolder = saveObject.enchanterTimer;
        enchanterTimer = enchanterTimerHolder - previousTime;
        ringTimerHolder = saveObject.ringTimer;
        ringTimer = ringTimerHolder - previousTime;
        ringShotPower = saveObject.ringShotPower;
        ringMaxMana = saveObject.ringMaxMana;
        ringKnockback = saveObject.ringKnockback;
        amuletTimerHolder = saveObject.amuletTimer;
        amuletTimer = amuletTimerHolder - previousTime;
        amuletRunSpeed = saveObject.amuletRunSpeed;
        amuletShotSpeed = saveObject.amuletShotSpeed;
        amuletBulletSpacing = saveObject.amuletBulletSpacing;
        trainerDropReward = saveObject.trainerDropReward;
        trainerTimerHolder = saveObject.trainerTimer;
        trainerTimer = trainerTimerHolder - previousTime;
        skillTimerHolder = saveObject.skillTimer;
        skillTimer = skillTimerHolder - previousTime;
        skillShotPower = saveObject.skillShotPower;
        skillMaxMana = saveObject.skillMaxMana;
        skillKnockback = saveObject.skillKnockback;
        enduranceTimerHolder = saveObject.enduranceTimer;
        enduranceTimer = enduranceTimerHolder - previousTime;
        enduranceRunSpeed = saveObject.enduranceRunSpeed;
        enduranceShotSpeed = saveObject.enduranceShotSpeed;
        enduranceBulletSpacing = saveObject.enduranceBulletSpacing;
        attackStrength = saveObject.attackStrength;
        tutorialDefence = saveObject.tutorialDefence;
        weaponsmithUpgradeCost = saveObject.weaponsmithUpgradeCost;
        armourerUpgradeCost = saveObject.armourerUpgradeCost;
        enchanterUpgradeCost = saveObject.enchanterUpgradeCost;
        trainerUpgradeCost = saveObject.trainerUpgradeCost;
        previousPopulation = saveObject.previousPopulation;
        previousEconomyMod = saveObject.previousEconomyMod;
        previousIncome = saveObject.previousIncome;
        previousExpenditure = saveObject.previousExpenditure;
        previousNetIncome = saveObject.previousNetIncome;
        previousCoins = saveObject.previousCoins;
        startingGoldIncrease = saveObject.startingGoldIncrease;
        startingPopIncrease = saveObject.startingPopIncrease;
        deptEffectIncrease = saveObject.deptEffectIncrease;
        beamUnlockShown = saveObject.beamUnlockShown;
        manaRefillUnlockShown = saveObject.manaRefillUnlockShown;
        weaponsmithAdTimerHolder = saveObject.weaponsmithAdTimer;
        armourerAdTimerHolder = saveObject.armourerAdTimer;
        enchanterAdTimerHolder = saveObject.enchanterAdTimer;
        trainerAdTimerHolder = saveObject.trainerAdTimer;
        weaponsmithAdTimer = weaponsmithAdTimerHolder - previousTime;
        armourerAdTimer = armourerAdTimerHolder - previousTime;
        enchanterAdTimer = enchanterAdTimerHolder - previousTime;
        trainerAdTimer = trainerAdTimerHolder - previousTime;
        baddieAdjuster = saveObject.baddieAdjuster;
        baddieDamageAdjuster = saveObject.baddieDamageAdjuster;
        baddieHpAdjuster = saveObject.baddieHpAdjuster;
        baddieXpAdjuster = saveObject.baddieXpAdjuster;
        baddieSpeedAdjuster = saveObject.baddieSpeedAdjuster;
        stageMilestone = saveObject.stageMilestone;
        bossFinalKilled = saveObject.bossFinalKilled;
        weaponsmithPerkAnnounced = saveObject.weaponsmithPerkAnnounced;
        armourerPerkAnnounced = saveObject.armourerPerkAnnounced;
        enchanterPerkAnnounced = saveObject.enchanterPerkAnnounced;
        trainerPerkAnnounced = saveObject.trainerPerkAnnounced;
        troopNumber = saveObject.troopNumber;
        previousTroopNumber = saveObject.previousTroopNumber;
        previousHappiness = saveObject.previousHappiness;
        totalMonstersKilled = saveObject.totalMonstersKilled;
        game.world.removeAll();
        if (!game.device.desktop) { 
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //game.scale.pageAlignHorizontally = true;
            //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            //game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //game.input.onDown.add(this.gofull, this); 
            canvasElement.style.top = '0vh';
        }
        game.state.start('city');
        themeSound.stop();
    },
};

