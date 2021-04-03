const HELP = 9;
var help = [];
var helpPageIndex = 0;
var helpFromGameplay = false;

var helpPages = [];

var helpButtons = [];

function helpSetup() {
    var fontStr = ((isMobile() ? 20 : 14) * pixelSize).toString() + "px " + uiContext.fontFamily;

    var helpOffset = isMobile() ? vec2(10 * pixelSize, 20 * pixelSize) : vec2(gameWidth / 4, 20 * pixelSize);
    var helpSize = isMobile() ? vec2(gameWidth - (20 * pixelSize), gameHeight - (80 * pixelSize)) : vec2(gameWidth / 2, gameHeight - (80 * pixelSize));

    helpMain =          new SubState(tr(), []);
    helpBuildings =     new SubState(tr(), []);
    helpAttackMechs =    new SubState(tr(), []);
    helpAbilityMechs =   new SubState(tr(), []);

    helpMain.uiObjects.push(new Paragraph(tr(helpOffset, helpSize),

    "Flick Tactics is a Turn Based Strategy Game where you need to strategically battle against your opponent using your units." +
    "%%There are 2 types of units: Buildings and Mechs." +
    "%When you use a Mech, action points or APs are consumed." +
    "%%In other words, player can only do a limited number of actions per turn and once AP gets to zero, you have to end your turn." +
    "%%Upon ending the turn, the opponent team gets the turn and fights against you using their units." +
    "%%This keeps going until a team destroys the other team's HQ Building." +
    "%Once a team loses its HQ Building, they loses the battle and all their remaining units gets destroyed or vanished from the map." +
    "%%There are specific commanders/COs associated with each team color." +
    "%Red: Zareem,   Blue: Taja,   Green: Guru,   Grey/Black: Hulu (and sometimes, Jonah)" +
    "%Each CO has a special power to help their units during the battle." +
    "%This power can only be unleashed when the power meter is completely filled.",

    '%', fontStr, undefined, 1.6, isMobile() ? pixelSize * 0.54 : pixelSize * 0.82));
    
    helpBuildings.uiObjects.push(new ImageUI(tr(helpOffset, toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2((0+0)*4, (48+3)*4), toVec2(64)));
    helpBuildings.uiObjects.push(new ImageUI(tr(helpOffset.add(isMobile() ? vec2(0, ((96*2) + 32) * pixelSize) : vec2(0, (96 + 32) * pixelSize)), toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2((64+4)*4, (48+3)*4), toVec2(64)));
    helpBuildings.uiObjects.push(new ImageUI(tr(helpOffset.add(isMobile() ? vec2(0, ((96*2) + 32 + (96*2) + 32) * pixelSize) : vec2(0, (96 + 32 + 96 + 32) * pixelSize)), toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2(((64+4)*2)*4, (48+3)*4), toVec2(64)));
    helpBuildings.uiObjects.push(new Paragraph(tr(helpOffset.add(vec2((96 + 16) * pixelSize)), helpSize),

    "This is called HQ Building." +
    "%%Each team only has one such building." +
    "%%Each team must defend their HQ at all costs!" +
    "%Upon destruction of their HQ, the team loses." +
    "%%Player wins when all other HQs are destroyed." +
    
    "%%%This is called City Building." +
    "%%A city building can generate 1K income per turn." +
    "%City building with less HP means less income." +
    "%%This income can be used to deploy new mechs." +
    "%New mechs can be deployed via war buildings." +
    
    "%%%This is called War Building." +
    "%%This is probably the most useful building." +
    "%It is used to deploy new mechs." +
    "%%There are a total of 5 types of mechs:" +
    "%(Attack Mechs) Rifle, Cannon and Artillery" +
    "%(Ability Mechs) Support and Teleport",

    '%', fontStr, undefined, 1.6, 0.5));

    helpAttackMechs.uiObjects.push(new ImageUI(tr(helpOffset, toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2((0+0)*4, (80+5)*4), toVec2(64)));
    helpAttackMechs.uiObjects.push(new ImageUI(tr(helpOffset.add(isMobile() ? vec2(0, ((96*2) + 32) * pixelSize) : vec2(0, (96 + 32) * pixelSize)), toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2((64+4)*4, (80+5)*4), toVec2(64)));
    helpAttackMechs.uiObjects.push(new ImageUI(tr(helpOffset.add(isMobile() ? vec2(0, ((96*2) + 32 + (96*2) + 32) * pixelSize) : vec2(0, (96 + 32 + 96 + 32) * pixelSize)), toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2(((64+4)*2)*4, (80+5)*4), toVec2(64)));
    helpAttackMechs.uiObjects.push(new Paragraph(tr(helpOffset.add(vec2((96 + 16) * pixelSize)), helpSize),
    
    "This is called Rifle Mech." +
    "%%Deploy cost: " + MECHCOST[RIFLE_MECH].toString() + "$, Movement: 3, Attack: Low." +
    "%Repairs quickly, has good amount of ammo." +
    "%Effective against Teleport and Artillery Mechs." +
    "%Ineffective against Cannon Mechs and Buildings." +
    "%It gets super effective when on mountains." +
    "%Its 1-time smoke ability can be really useful." +
    
    "%%%This is called Cannon Mech." +
    "%%Deploy cost: " + MECHCOST[CANNON_MECH].toString() + "$, Movement: 2, Attack: High." +
    "%Repairs slowly, very limited ammo." +
    "%Effective against all Mechs including Buildings." +
    "%Boost doubles the movement for a turn." +
    "%But it follows a 5 turns cooldown period." +
    
    "%%%This is called Artillery Mech." +
    "%%Deploy cost: " + MECHCOST[ARTILLERY_MECH].toString() + "$, Movement: 2, Attack: High." +
    "%Repairs slowly, very limited ammo." +
    "%Effective against all Mechs accept Teleport ones." +
    "%It attacks from a distance. (skips 2, range 3-4)" +
    "%Its 1-time smoke ability can be really useful.",

    '%', fontStr, undefined, 1.6, 0.5));

    helpAbilityMechs.uiObjects.push(new ImageUI(tr(helpOffset, toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2(((64+4)*3)*4, (80+5)*4), toVec2(64)));
    helpAbilityMechs.uiObjects.push(new ImageUI(tr(helpOffset.add(isMobile() ? vec2(0, ((96*2) + 32) * pixelSize) : vec2(0, (96 + 32) * pixelSize)), toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2(((64+4)*4)*4, (80+5)*4), toVec2(64)));
    helpAbilityMechs.uiObjects.push(new Paragraph(tr(helpOffset.add(vec2((96 + 16) * pixelSize)), helpSize),

    "This is called Support Mech." +
    "%%Deploy cost: " + MECHCOST[SUPPORT_MECH].toString() + "$, Movement: 5, Attack: None." +
    "%Repair other units, replenishes ammo and smoke." +
    "%Effective against Teleport and Artillery Mechs." +
    "%Ineffective against Cannon Mechs and Buildings." +
    "%It gets super effective when on mountains." +
    "%Its 1-time smoke ability can be really useful." +
    
    "%%%This is called Teleport Mech." +
    "%%Deploy cost: " + MECHCOST[TELEPORT_MECH].toString() + "$, Movement: 3, TP-Ammo: 5." +
    "%Teleportation ability, can swap with another mech." +
    "%Basic Teleportation uses 1 TP-Ammo." +
    "%Swap Teleportation uses 2 TP-Ammo." +
    "%TP range decreases when TP-Ammo decreases." +
    "%It can also self-destruct to cause damage." +
    
    "%%%Other things to keep in mind!" +
    "%%Mech can not attack when inside smoke." +
    "%Mech receives damage per turn when on fire or toxic." +
    "%Artillery and Teleport Mechs can push other mechs." +
    "%Pushing the Mechs can result in damage." +
    "%Or simply, changing the their position.",

    '%', fontStr, undefined, 1.6, 0.5));

    helpPages.push(helpMain);
    helpPages.push(helpBuildings);
    helpPages.push(helpAttackMechs);
    helpPages.push(helpAbilityMechs);
    
    var fontStr = ((isMobile() ? 26 : 14) * pixelSize).toString() + "px " + uiContext.fontFamily;
    helpPrevButton = new TextButton(tr(), new Label(tr(), "PREV.", fontStr, "white"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    helpButtons.push(helpPrevButton);
    helpPageLabel = new Label( tr(), (helpPageIndex + 1).toString() + "/" + helpPages.length.toString(), fontStr, "white");
    helpButtons.push(helpPageLabel);
    helpToStartButton = new TextButton(tr(), new Label(tr(), "MENU", fontStr, "white"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    helpButtons.push(helpToStartButton);
    helpNextButton = new TextButton(tr(), new Label(tr(), "NEXT", fontStr, "white"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    helpButtons.push(helpNextButton);
    help.push(new FlexGroup(isMobile() ?
        tr(vec2(8 * pixelSize, gameHeight - (100 * pixelSize)), vec2(gameWidth, 66 * pixelSize))
        : tr(vec2((gameWidth / 4) - (8 * pixelSize), gameHeight - (40 * pixelSize)), vec2(gameWidth / 2, 32 * pixelSize)),
        new SubState(tr(), helpButtons), false, vec2(8 * pixelSize, 0), vec2(4, 1), true))

    for(let i = 0; i < helpPages.length; i++)
        help.push(helpPages[i]);

    for(let i = 0; i < helpPages.length; i++)
        helpPages[i].enabled = false;
    helpPages[helpPageIndex].enabled = true;
}

function helpResize() {
}

function helpDraw(deltaTime) {
    drawWorldMapBG("#000000EE");
}

function helpUpdate(deltaTime) {
}

function helpEvent(deltaTime) {
    switch (helpPrevButton.button.output) {
        case UIOUTPUT_HOVER:
            if(helpPrevButton.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                helpPrevButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            helpPageIndex--;
            if(helpPageIndex < 0) helpPageIndex = helpPages.length - 1;
            helpPageLabel.text = (helpPageIndex + 1).toString() + "/" + helpPages.length.toString();
            for(let i = 0; i < helpPages.length; i++)
                helpPages[i].enabled = false;
            helpPages[helpPageIndex].enabled = true;
            helpPrevButton.button.resetOutput();
    }

    switch (helpNextButton.button.output) {
        case UIOUTPUT_HOVER:
            if(helpNextButton.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                helpNextButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            helpPageIndex++;
            if(helpPageIndex >= helpPages.length) helpPageIndex = 0;
            helpPageLabel.text = (helpPageIndex + 1).toString() + "/" + helpPages.length.toString();
            for(let i = 0; i < helpPages.length; i++)
                helpPages[i].enabled = false;
            helpPages[helpPageIndex].enabled = true;
            helpNextButton.button.resetOutput();
    }

    switch (helpToStartButton.button.output) {
        case UIOUTPUT_HOVER:
            if(helpToStartButton.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                helpToStartButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = helpFromGameplay ? GAMEPLAY : STARTSCREEN;
            helpFromGameplay = false;

            helpPageIndex = 0;
            helpPageLabel.text = (helpPageIndex + 1).toString() + "/" + helpPages.length.toString();
            for(let i = 0; i < helpPages.length; i++)
                helpPages[i].enabled = false;
            helpPages[helpPageIndex].enabled = true;
            helpToStartButton.button.resetOutput();
    }
}