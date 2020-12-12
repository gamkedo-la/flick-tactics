const ABOUT = 2;
var about = [];

function aboutSetup() {
    htgdLogo = new Sprite(tr(vec2(gameWidth / 2, gameHeight - (gameHeight / 4))), new ImageObject("images/htgd.png"));
    htgdLogo.transform.scale = vec2((sizeFactor / 4) / htgdLogo.imageObject.image.width, (sizeFactor / 4) / htgdLogo.imageObject.image.height);

    var fontStr = (18 * pixelSize).toString() + "px " + uiContext.fontFamily;

    labelGroup = [];
    labelGroup.push(new Label(tr(), "Developed by Members of HomeTeam GameDev", fontStr));
    labelGroup.push(new Label(tr(), "", fontStr));
    labelGroup.push(new Label(tr(), "Bilal A. Cheema: Team Lead", fontStr));
    labelGroup.push(new Label(tr(), "", fontStr));
    labelGroup.push(new Label(tr(), "YOUR NAME WOULD BE MENTIONED HERE", fontStr));
    labelGroup.push(new Label(tr(), "IF YOU COMMIT TO THIS PROJECT JUST ONCE!", fontStr));

    about.push(new FlexGroup(tr(vec2(0, 20 * pixelSize), vec2(gameWidth, gameHeight / 2)),
        new SubState(tr(), labelGroup), false, vec2(0, 20), vec2(1, 7), true));

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

    aboutToStartButton.transform.position = vec2(gameWidth - (80 * pixelSize), gameHeight - (40 * pixelSize));
    aboutToStartButton.transform.scale = vec2(80 * pixelSize, 40 * pixelSize);
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