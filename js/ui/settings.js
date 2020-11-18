
function uiInit() {
    updateTileSizes();
    uiContext.set(renderer, 0, "OrangeKid", 12 * pixelSize);
    startscreenSetup();
    gameplaySetup();
    aboutSetup();
    battlescreenSetup();
    worldmapSetup();

    uistates = [];
    uistates.push(new UIState(startscreen));
    uistates.push(new UIState(gameplay));
    uistates.push(new UIState(about));
    uistates.push(new UIState(battlescreen));
    uistates.push(new UIState(worldmap));
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

    prevPixelSize = pixelSize;
    prevGameWidth = gameWidth;
    prevGameHeight = gameHeight;
}