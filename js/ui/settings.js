
function uiInit() {
    updateTileSizes();
    uiContext.set(renderer, 0, "OrangeKid", 12 * pixelSize);
    startscreenSetup();
    gameplaySetup();
    aboutSetup();
    battlescreenSetup();

    uistates = [];
    uistates.push(new UIState(startscreen));
    uistates.push(new UIState(gameplay));
    uistates.push(new UIState(about));
    uistates.push(new UIState(battlescreen));
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

    prevPixelSize = pixelSize;
    prevGameWidth = gameWidth;
    prevGameHeight = gameHeight;
}