const HELP = 9;
var help = [];
var helpPageIndex = 0;
var helpFromGameplay = false;

var helpPages = [];

var helpButtons = [];

function helpSetup() {
    var fontStr = ((isMobile() ? 24 : 14) * pixelSize).toString() + "px " + uiContext.fontFamily;

    var helpOffset = isMobile() ? vec2(10 * pixelSize, 20 * pixelSize) : vec2(gameWidth / 4, 20 * pixelSize);
    var helpSize = isMobile() ? vec2(gameWidth - (20 * pixelSize), gameHeight - (80 * pixelSize)) : vec2(gameWidth / 2, gameHeight - (80 * pixelSize));

    helpMain =          new SubState(tr(), []);
    helpBuildings =     new SubState(tr(), []);
    helpRifleMech =     new SubState(tr(), []);
    helpCannonMech =    new SubState(tr(), []);
    helpArtilleryMech = new SubState(tr(), []);
    helpSupportMech =   new SubState(tr(), []);
    helpTeleportMech =  new SubState(tr(), []);
    helpZareemCO =      new SubState(tr(), []);
    helpTajaCO =        new SubState(tr(), []);
    helpGuruCO =        new SubState(tr(), []);
    helpHuluCO =        new SubState(tr(), []);
    helpJonahCO =       new SubState(tr(), []);

    var yOffset = 20 * pixelSize;
    helpMain.uiObjects.push(new Paragraph(tr(helpOffset, helpSize),
    "Flick Tactics is a Turn Based Strategy Game where you need to strategically battle against your opponent using your units.%%There are 2 types of units: Buildings and Mechs.%When you use a Mech, action points or APs are consumed.%%In other words, player can only do a limited number of actions per turn and once AP gets to zero, you have to end your turn.%%Upon ending the turn, the opponent team gets the turn and fights against you using their units.%%This keeps going until a team destroys the other team's HQ Building.%Once a team loses its HQ Building, they loses the battle and all their remaining units gets destroyed or vanished from the map.",
    '%', fontStr, undefined, 1.6, isMobile() ? pixelSize * 0.54 : pixelSize * 0.82));
    
    helpBuildings.uiObjects.push(new ImageUI(tr(vec2((gameWidth/9) - (gameWidth/18), (gameHeight/2) - (64 * pixelSize) - (gameHeight/4)), toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2((64+4)*4, (48+3)*4), toVec2(64)));
    helpBuildings.uiObjects.push(new Paragraph(tr(vec2((gameWidth/9) - (gameWidth/18), (gameHeight/2) - (64 * pixelSize)), vec2(gameWidth/3, gameHeight/4)),
    "This is called HQ Building.%%Each team only has one such building.%%Each team must defend their HQ building at all costs!%Upon destruction of this building, the team loses.%%Player wins when all other HQ buildings are destroyed.",
    '%', fontStr, undefined, 1.6, 0.5));

    helpBuildings.uiObjects.push(new ImageUI(tr(vec2(((gameWidth/9)*4) - (gameWidth/18), (gameHeight/2) - (64 * pixelSize) - (gameHeight/4)), toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2((0+0)*4, (48+3)*4), toVec2(64)));
    helpBuildings.uiObjects.push(new Paragraph(tr(vec2(((gameWidth/9)*4) - (gameWidth/18), (gameHeight/2) - (64 * pixelSize)), vec2(gameWidth/3, gameHeight/4)),
    "This is called City Building.%%A full HP city building generates an income of 1000 per turn.%City building with less HP decreases income generation.%%This income can be used to deploy new mechs.%New mechs can be deployed via war buildings.",
    '%', fontStr, undefined, 1.6, 0.5));

    helpBuildings.uiObjects.push(new ImageUI(tr(vec2(((gameWidth/9)*7) - (gameWidth/18), (gameHeight/2) - (64 * pixelSize) - (gameHeight/4)), toVec2(96 * pixelSize)), gameSheet.imageObject.image, vec2(((64+4)*2)*4, (48+3)*4), toVec2(64)));
    helpBuildings.uiObjects.push(new Paragraph(tr(vec2(((gameWidth/9)*7) - (gameWidth/18), (gameHeight/2) - (64 * pixelSize)), vec2(gameWidth/3, gameHeight/4)),
    "This is called War Building.%%This is probably the most useful building.%It is used to deploy new mechs.%%There are a total of 5 types of mechs:%(Attack Mechs) Rifle, Cannon and Artillery Mech%(Ability Mechs) Support and Teleport Mech",
    '%', fontStr, undefined, 1.6, 0.5));

    helpRifleMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2((0+0)*4, (80+5)*4), toVec2(64)));
    helpCannonMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2((64+4)*4, (80+5)*4), toVec2(64)));
    helpArtilleryMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2(((64+4)*2)*4, (80+5)*4), toVec2(64)));
    helpSupportMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2(((64+4)*3)*4, (80+5)*4), toVec2(64)));
    helpTeleportMech.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), gameSheet.imageObject.image, vec2(((64+4)*4)*4, (80+5)*4), toVec2(64)));

    helpZareemCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*1*4, 0), toVec2(1024)));
    helpTajaCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*2*4, 0), toVec2(1024)));
    helpGuruCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*0*4, 0), toVec2(1024)));
    helpHuluCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*3*4, 0), toVec2(1024)));
    helpJonahCO.uiObjects.push(new ImageUI(tr(vec2(100,100), vec2(124,124)), bodyNFacesSheet.imageObject.image, vec2(256*4*4, 0), toVec2(1024)));

    helpPages.push(helpMain);
    helpPages.push(helpBuildings);
    helpPages.push(helpRifleMech);
    helpPages.push(helpCannonMech);
    helpPages.push(helpArtilleryMech);
    helpPages.push(helpSupportMech);
    helpPages.push(helpTeleportMech);
    helpPages.push(helpZareemCO);
    helpPages.push(helpTajaCO);
    helpPages.push(helpGuruCO);
    helpPages.push(helpHuluCO);
    helpPages.push(helpJonahCO);
    
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