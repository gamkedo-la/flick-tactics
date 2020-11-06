
function uiInit() {
    uiContext.set(renderer, 0, "Lucida, sans-serif", 11 * pixelSize);

    startscreenSetup();
    gameplaySetup();
    aboutSetup();

    uistates = [];
    uistates.push(new UIState(startscreen));
    uistates.push(new UIState(gameplay));
    uistates.push(new UIState(about));
    ui = new UI(uistates, STARTSCREEN);
}

function resizeGame() {
    screenSizeCalculation();

    uiContext.set(renderer, 0, "Lucida, sans-serif", 11 * pixelSize);
    startscreenResize();
    gameplayResize();
    aboutResize();

    prevPixelSize = pixelSize;
    prevGameWidth = gameWidth;
    prevGameHeight = gameHeight;
}