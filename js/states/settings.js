
function uiInit() {
    updateTileSizes();
    uiContext.set(renderer, 0, "OrangeKid", 12 * pixelSize);
    startscreenSetup();
    gameplaySetup();
    aboutSetup();
    battlescreenSetup();
    powerscreenSetup();
    worldmapSetup();
    versusSetup();
    editorSetup();
    endscreenSetup();

    uistates = [];
    uistates.push(new UIState(startscreen));
    uistates.push(new UIState(gameplay));
    uistates.push(new UIState(about));
    uistates.push(new UIState(battlescreen));
    uistates.push(new UIState(powerscreen));
    uistates.push(new UIState(worldmap));
    uistates.push(new UIState(versus));
    uistates.push(new UIState(editor));
    uistates.push(new UIState(endscreen));
    ui = new UI(uistates, STARTSCREEN);
}

function resizeGame() {
    screenSizeCalculation();
    updateTileSizes();

    uiContext.set(renderer, 0, "OrangeKid", 12 * pixelSize);
    switch (ui.stateIndex) {
        case STARTSCREEN: startscreenResize(); break;
        case GAMEPLAY: gameplayResize(); break;
        case ABOUT: aboutResize(); break;
        case BATTLESCREEN: battlescreenResize(); break;
        case POWERSCREEN: powerscreenResize(); break;
        case WORLDMAP: worldmapResize(); break;
        case VERSUS: versusResize(); break;
        case EDITOR: editorResize(); break;
        case POWERSCREEN: endscreenResize(); break;
    }

    prevPixelSize = pixelSize;
    prevGameWidth = gameWidth;
    prevGameHeight = gameHeight;
}