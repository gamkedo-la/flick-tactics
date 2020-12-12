const VERSUS = 5;
var versus = [];

var versusMapString = "";
var defaultVersusMapString = "4_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.3_0_0.3_0_0.0_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.4_0_0.4_0_0.4_0_0.4_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.3_0_0.0_7_0.1_0_0.0_0_0.3_0_0.3_0_0.0_0_0.2_0_0.2_0_0.2_0_0.4_0_0.4_0_0.2_0_0.2_0_0.2_0_0.0_0_0.3_0_0.3_0_0.0_0_0.1_0_0.0_7_2.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.3_0_0.3_0_0.0_6_0.0_0_0.0_7_0.0_0_0.0_0_0.0_0_0.0_0_0.3_0_0.2_0_0.2_0_0.4_0_0.4_0_0.2_0_0.2_0_0.3_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_7_2.0_0_0.0_6_2.3_0_0.3_0_0.4_0_0.3_0_0.3_0_0.1_7_0.0_0_0.0_8_0.0_0_0.1_0_0.0_0_0.3_0_0.3_0_0.3_0_0.3_0_0.2_0_0.4_0_0.4_0_0.2_0_0.3_0_0.3_0_0.3_0_0.3_0_0.0_0_0.1_0_0.0_0_0.0_8_2.0_0_0.1_7_2.3_0_0.3_0_0.3_0_0.3_0_0.0_0_0.0_7_0.1_0_0.0_0_0.0_0_0.0_0_0.4_0_0.3_0_0.3_0_0.0_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.3_0_0.3_0_0.4_0_0.0_0_0.0_0_0.0_0_0.1_0_0.0_7_2.0_0_0.3_0_0.3_0_0.3_0_0.4_0_0.3_0_0.0_0_0.0_0_0.3_0_0.3_0_0.4_0_0.4_0_0.3_0_0.0_0_0.1_0_0.1_0_0.2_0_0.2_0_0.1_0_0.1_0_0.0_0_0.3_0_0.4_0_0.4_0_0.3_0_0.3_0_0.0_0_0.0_0_0.3_0_0.4_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.0_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.0_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.4_0_0.3_0_0.0_0_0.0_0_0.3_0_0.3_0_0.4_0_0.4_0_0.3_0_0.0_0_0.1_0_0.1_0_0.2_0_0.2_0_0.1_0_0.1_0_0.0_0_0.3_0_0.4_0_0.4_0_0.3_0_0.3_0_0.0_0_0.0_0_0.3_0_0.4_0_0.3_0_0.3_0_0.3_0_0.0_0_0.0_7_1.1_0_0.0_0_0.0_0_0.0_0_0.4_0_0.3_0_0.3_0_0.0_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.3_0_0.3_0_0.4_0_0.0_0_0.0_0_0.0_0_0.1_0_0.0_7_3.0_0_0.3_0_0.3_0_0.3_0_0.3_0_0.1_7_1.0_0_0.0_8_1.0_0_0.1_0_0.0_0_0.3_0_0.3_0_0.3_0_0.3_0_0.2_0_0.4_0_0.4_0_0.2_0_0.3_0_0.3_0_0.3_0_0.3_0_0.0_0_0.1_0_0.0_0_0.0_8_3.0_0_0.1_7_3.3_0_0.3_0_0.4_0_0.3_0_0.3_0_0.0_6_1.0_0_0.0_7_1.0_0_0.0_0_0.0_0_0.0_0_0.3_0_0.2_0_0.2_0_0.4_0_0.4_0_0.2_0_0.2_0_0.3_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_7_3.0_0_0.0_6_3.3_0_0.3_0_0.4_0_0.4_0_0.3_0_0.3_0_0.3_0_0.0_7_1.1_0_0.0_0_0.3_0_0.3_0_0.0_0_0.2_0_0.2_0_0.2_0_0.4_0_0.4_0_0.2_0_0.2_0_0.2_0_0.0_0_0.3_0_0.3_0_0.0_0_0.1_0_0.0_7_3.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.3_0_0.3_0_0.0_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.4_0_0.4_0_0.4_0_0.4_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.4_0_0.";

function versusSetup() {
    versusLoadBtn = document.getElementById('file-input2');
    versusLoadBtn.onchange = e => {
        let reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.addEventListener('load', e => {
            versusMapString = e.target.result;
            versusMap = new GameMap(versusMapString);
            versusManager = new PlayerManager(versusMap);
            versusLoadBtn = document.getElementById('file-input2');
        });
    }

    versusMapString = defaultVersusMapString;
    versusMap = new GameMap(defaultVersusMapString);
    versusManager = new PlayerManager(versusMap);

    var fontSize = 18.0 * pixelSize;

    versusTopRightUI = [];
    versusTopRightUI.push(new Label(tr()));
    versusTopRightUI.push(new Label(tr()));
    versusLoadMapBtn = new TextButton(tr(),
        new Label(tr(), "LOAD MAP",
    fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    versusTopRightUI.push(versusLoadMapBtn);
    versusResetOptionsBtn = new TextButton(tr(),
        new Label(tr(), "RESET OPTIONS",
        fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    versusTopRightUI.push(versusResetOptionsBtn);

    versus.push(new FlexGroup(tr(vec2((gameWidth / 2), 0.0), vec2(gameWidth / 2, ((gameWidth/2)*(MAP_SIZE.y/MAP_SIZE.x)))),
        new SubState(tr(), versusTopRightUI), false, vec2(0.001, 0.001), vec2(2, 3), true));

    versusBottomMiddleUI = [];
    versusPlayMapBtn = new TextButton(tr(),
        new Label(tr(), "PLAY",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    versusBottomMiddleUI.push(versusPlayMapBtn);
    versusToMenuBtn = new TextButton(tr(),
        new Label(tr(), "BACK",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    versusBottomMiddleUI.push(versusToMenuBtn);

    versus.push(new FlexGroup(tr(vec2((gameWidth / 4), ((gameWidth/2)*(MAP_SIZE.y/MAP_SIZE.x))), vec2(gameWidth / 2, gameHeight - ((gameWidth/2)*(MAP_SIZE.y/MAP_SIZE.x)))),
        new SubState(tr(), versusBottomMiddleUI), false, vec2(0.001, 0.001), vec2(1, 5), true));
}

function versusResize() {
}

function versusDraw(deltaTime) {
    drawWorldMapBG("#116611DD");
    drawPerspectiveUnitsBG(RUIN_BUILDING, TELEPORT_MECH, ARTILLERY_MECH, BLACK_TEAM);
    drawRect(renderer, vec2(), vec2(gameWidth, gameHeight), true, "#00000088");

    if(ui.transitionToState != GAMEPLAY)
    {
        versusMap.drawInRect(toVec2((gameWidth/4)/MAP_SIZE.x), toVec2(gameWidth/2));
        versusManager.drawInRect(toVec2((gameWidth/4)/MAP_SIZE.x), toVec2(gameWidth/2));
    }
}

function versusUpdate(deltaTime) {
}

function versusEvent(deltaTime) {

    switch (versusLoadMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusLoadMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusLoadMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            versusLoadBtn.click();
            versusLoadMapBtn.button.resetOutput();
    }

    switch (versusPlayMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusPlayMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusPlayMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            map = new GameMap(versusMapString);
            manager = new PlayerManager(map);
            ui.transitionToState = GAMEPLAY;
            maxDisplayTilesPerRow = defaultTilesPerRow;
            updateTileSizes();
            versusPlayMapBtn.button.resetOutput();
    }

    switch (versusToMenuBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(versusToMenuBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                versusToMenuBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            maxDisplayTilesPerRow = defaultTilesPerRow;
            updateTileSizes();
            ui.transitionToState = STARTSCREEN;
            versusToMenuBtn.button.resetOutput();
    }
}