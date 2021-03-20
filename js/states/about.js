const ABOUT = 2;
var about = [];

var creditsList = [
"Developed by Members of HomeTeam GameDev (Outpost)",
"",
"Bilal A. Cheema:  Project lead, core gameplay, building and tile art, logo, palette, battle screen, mechs art, zoom functionality, pathfinding, map art, audio integration,",
"dialog system, map editor, power meter, enemy AI, particles, save and load, Zareem and Guru body, Taja faces, assorted improvements and fixes",
"",
"Kyle Knutson:  Concept art, body and faces for Hulu, Jonah, and generic soldier, additional Guru and Zareem faces, level design (Great Divide)",
"",
"Ryan Young:  Level design (maps 4, 5, 6, 7, two faction)",
"",
"Roc Lee:  World music, main menu music, UI sounds, action sounds",
"",
"Ashleigh M.:  Zareem concept art and mock ups, stats screen flow, building and player count",
"",
"Justin Chin:  Level design (tutorial map 1, map 2, map 3), writing (level 1 tutorial, character power, win, lose)",
"",
"Alan Zaring:  Music loop for player CO",
"",
"Gonzalo Delgado:  Rifle mech idle animation, case-sensitive fix",
"",
"Rutger McKenna:  Soldier sprites with walk and fly animations",
"",
"Allan Regush:  Help menu, button event support, skip to gameplay debug feature",
"",
"Jonathan Peterson:  Audio on/off mute toggle buttons, additional case-sensitive fix",
"",
"H Trayford:  Question mark animation, improved handling of undefined errors",
"",
"Philip Greene:  Handle mech HP reaching zero"
];

function aboutSetup() {
    htgdLogo = new Sprite(tr(vec2(gameWidth / 2, gameHeight - (gameHeight / 4))), new ImageObject("images/htgd.png"));
    htgdLogo.transform.scale = vec2((sizeFactor / 4) / htgdLogo.imageObject.image.width, (sizeFactor / 4) / htgdLogo.imageObject.image.height);

    var fontStr = (12 * pixelSize).toString() + "px " + uiContext.fontFamily;

    labelGroup = [];
    for(var i=0;i<creditsList.length;i++) {
        labelGroup.push(new Label(tr(), creditsList[i], fontStr, i==0?"cyan":"white"));
    }

    about.push(new FlexGroup(tr(vec2(0, 20 * pixelSize), vec2(gameWidth, gameHeight / 2)),
        new SubState(tr(), labelGroup), false, vec2(), vec2(1, creditsList.length), true));

    aboutToStartButton = new TextButton(tr(vec2(gameWidth - (80 * pixelSize), gameHeight - (40 * pixelSize)), vec2(80 * pixelSize, 40 * pixelSize)),
        new Label(tr(), "BACK", fontStr, "lightblue"),
        new Button(tr(), "#000066CC", "#FFFFFFFF", "#002299FF"));
    about.push(aboutToStartButton);
}

function aboutResize() {
    var fontStr = (12 * pixelSize).toString() + "px " + uiContext.fontFamily;

    for (let i = 0; i < labelGroup.length; i++) {
        labelGroup[i].font = fontStr;
    }
    aboutToStartButton.label.font = fontStr;

    about[0].transform.position = vec2(0, 20 * pixelSize);
    about[0].transform.scale = vec2(gameWidth, gameHeight / 2);

    htgdLogo.transform.position = vec2(gameWidth / 2, gameHeight - (gameHeight / 4));
    htgdLogo.transform.scale = vec2((sizeFactor / 4) / htgdLogo.imageObject.image.width, (sizeFactor / 4) / htgdLogo.imageObject.image.height);

    aboutToStartButton.transform.position = vec2(gameWidth - (80 * pixelSize), gameHeight - (20 * pixelSize));
    aboutToStartButton.transform.scale = vec2(80 * pixelSize, 20 * pixelSize);
}

function aboutDraw(deltaTime) {
    drawWorldMapBG("#221111EE");
    drawPerspectiveUnitsBG(WAR_BUILDING, CITY_BUILDING, SUPPORT_MECH, BLUE_TEAM);
    htgdLogo.drawSc();
}

function aboutUpdate(deltaTime) {
}

function aboutEvent(deltaTime) {
    switch (aboutToStartButton.button.output)
    {
        case UIOUTPUT_HOVER:
            if(aboutToStartButton.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                aboutToStartButton.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = STARTSCREEN;
            aboutToStartButton.button.resetOutput();
    }
}