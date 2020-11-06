
function uiInit() {
    uiContext.set(renderer, 0, "Lucida, sans-serif", 11 * pixelSize);

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

    uiContext.set(renderer, 0, "Lucida, sans-serif", 11 * pixelSize);
    startscreenResize();
    gameplayResize();
    aboutResize();
    battlescreenResize();

    prevPixelSize = pixelSize;
    prevGameWidth = gameWidth;
    prevGameHeight = gameHeight;
}