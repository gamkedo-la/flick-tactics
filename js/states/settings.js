
function uiInit() {
    updateTileSizes();
    uiContext.set(renderer, 0, "OrangeKid", 12 * pixelSize);
    startscreenSetup();
    gameplaySetup();
    aboutSetup();
    battlescreenSetup();
    worldmapSetup();
    versusSetup();
    editorSetup();

    uistates = [];
    uistates.push(new UIState(startscreen));
    uistates.push(new UIState(gameplay));
    uistates.push(new UIState(about));
    uistates.push(new UIState(battlescreen));
    uistates.push(new UIState(worldmap));
    uistates.push(new UIState(versus));
    uistates.push(new UIState(editor));
    ui = new UI(uistates, STARTSCREEN);
}

function resizeGame() {
    screenSizeCalculation();
    updateTileSizes();

    uiContext.set(renderer, 0, "OrangeKid", 12 * pixelSize);
    startscreenResize();
    gameplayResize();
    aboutResize();
    battlescreenResize();
    worldmapResize();
    versusResize();
    editorResize();

    prevPixelSize = pixelSize;
    prevGameWidth = gameWidth;
    prevGameHeight = gameHeight;
}