const STARTSCREEN = 0;
var startscreen = [];

function startscreenSetup() {
    var fontSize = 18.0 * pixelSize;

    titleSprite = new Sprite(tr(), new ImageObject("images/title.png"));
    titleSprite.transform.scale = vec2((sizeFactor / 1.8) / titleSprite.imageObject.image.width, (sizeFactor / 4) / titleSprite.imageObject.image.height);
    titleSprite.transform.position = vec2(gameWidth / 2, gameHeight / 4);

    menuUI = [];
    playButton = new TextButton(tr(),
        new Label(tr(), "PLAY",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    menuUI.push(playButton);
    aboutButton = new TextButton(tr(),
        new Label(tr(), "CREDITS",
            fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00006666", "#FFFFFFFF", "#002299FF"), "");
    menuUI.push(aboutButton);

    startscreen.push(new FlexGroup(tr(vec2((gameWidth / 2) - (gameWidth / 6), gameHeight / 2), vec2(gameWidth / 3, gameHeight / 3)),
        new SubState(tr(), menuUI), false, vec2(0, sizeFactor * 0.05), vec2(1, 3), true));
}

function startscreenResize() {
    var fontSize = 18.0 * pixelSize;

    titleSprite.transform.scale = vec2((sizeFactor / 1.8) / titleSprite.imageObject.image.width, (sizeFactor / 4) / titleSprite.imageObject.image.height);
    titleSprite.transform.position = vec2(gameWidth / 2, gameHeight / 4);

    playButton.label.font = aboutButton.label.font = fontSize.toString() + "px " + uiContext.fontFamily;

    startscreen[0].transform.position = vec2((gameWidth / 2) - (gameWidth / 6), gameHeight / 2);
    startscreen[0].transform.scale = vec2(gameWidth / 3, gameHeight / 3);
    startscreen[0].gridSpace = vec2(0, sizeFactor * 0.05);
    startscreen[0].updateCellSize();
}

function startscreenDraw(deltaTime) {
    titleSprite.drawSc();
}

function startscreenUpdate(deltaTime) {
}

function startscreenEvent(deltaTime) {
    if (playButton.button.output == UIOUTPUT_SELECT) {
        ui.stateIndex = GAMEPLAY;
        playButton.button.resetOutput();
    }
    else if (aboutButton.button.output == UIOUTPUT_SELECT) {
        ui.stateIndex = ABOUT;
        aboutButton.button.resetOutput();
    }
}