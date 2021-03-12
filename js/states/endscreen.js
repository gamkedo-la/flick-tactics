const ENDSCREEN = 8;
var endscreen = [];

var endscreenFontSize;
var endscreenCO = -1;

function lose(co) {
    dialogues.push(loseDialogues[(co * 4) + Math.floor(Math.random() * 4)]);
    afterDialoguesEvent = function() {};
}

function win(co, playerWin) {
    endscreenCO = co;
    gameplaySilence = true;
    dialogues.push(winDialogues[(co * 4) + Math.floor(Math.random() * 4)]);
    afterDialoguesEvent = function() {
        ui.transitionToState = ENDSCREEN;
        gameplaySilence = false;
        endscreen[0].text = COSPECIFICS[co].name + " WINS! " + (playerWin ? "Player wins!" : "AI wins!");
    }
}

function endscreenSetup() {
    endscreenFontSize = 72.0 * pixelSize;
    endscreen.push(new Label(tr(vec2(0, gameHeight - (gameHeight / 3)), vec2(gameWidth, gameHeight / 8)),
        "WINS!", endscreenFontSize.toString() + "px " + uiContext.fontFamily));
    endscreen.push(new TextButton(tr(vec2((gameWidth / 2) - (gameWidth / 8), gameHeight - (gameHeight / 6)), vec2(gameWidth / 4, gameWidth / 16)),
        new Label(tr(), "Back to Menu", (endscreenFontSize/4.0).toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#000066BB", "#FFFFFFFF", "#002299FF"), ""));
}

function endscreenResize() {
}

function endscreenDraw(deltaTime) {
    drawWorldMapBG(getTeamColor(endscreenCO) + "DD");
    bodyNFacesSheet.transform.position = vec2(gameWidth/2, gameHeight/2);
    bodyNFacesSheet.transform.scale = toVec2(pixelSize/2)
    bodyNFacesSheet.drawScIn(vec2(1024 * endscreenCO), toVec2(1024));
    drawRect(renderer, vec2(0, gameHeight - (gameHeight / 3)), vec2(gameWidth, gameHeight / 8), true, "#000000BB");
}

function endscreenUpdate(deltaTime) {
}

function endscreenEvent(deltaTime) {
    switch (endscreen[1].button.output)
    {
        case UIOUTPUT_HOVER:
            if(endscreen[1].button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                endscreen[1].button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            dialogues = [];
            ui.transitionToState = STARTSCREEN;
            endscreen[1].button.resetOutput();
    }
}