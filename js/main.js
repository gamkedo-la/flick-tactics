
var gameTime = 0;

window.onload = function () {
    init();
    audioSetup();
    frame();
};

function event(deltaTime) {
    ui.event();
    switch (ui.stateIndex) {
        case STARTSCREEN: startscreenEvent(deltaTime); break;
        case GAMEPLAY: gameplayEvent(deltaTime); break;
        case ABOUT: aboutEvent(deltaTime); break;
        case BATTLESCREEN: battlescreenEvent(deltaTime); break;
        case POWERSCREEN: powerscreenEvent(deltaTime); break;
        case WORLDMAP: worldmapEvent(deltaTime); break;
        case VERSUS: versusEvent(deltaTime); break;
        case EDITOR: editorEvent(deltaTime); break;
        case ENDSCREEN: endscreenEvent(deltaTime); break;
        case HELP: helpEvent(deltaTime); break;
    }
}

function update(deltaTime) {
    switch (ui.stateIndex) {
        case STARTSCREEN: startscreenUpdate(deltaTime); break;
        case GAMEPLAY: gameplayUpdate(deltaTime); break;
        case ABOUT: aboutUpdate(deltaTime); break;
        case BATTLESCREEN: battlescreenUpdate(deltaTime); break;
        case POWERSCREEN: powerscreenUpdate(deltaTime); break;
        case WORLDMAP: worldmapUpdate(deltaTime); break;
        case VERSUS: versusUpdate(deltaTime); break;
        case EDITOR: editorUpdate(deltaTime); break;
        case ENDSCREEN: endscreenUpdate(deltaTime); break;
        case HELP: helpUpdate(deltaTime); break;
    }
    audioUpdate();
    ui.update(deltaTime);
}

function draw(deltaTime) {
    renderer.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawRect(renderer, vec2(0, 0), vec2(window.innerWidth, window.innerHeight), true, "black");
    switch (ui.stateIndex) {
        case STARTSCREEN: startscreenDraw(deltaTime); break;
        case GAMEPLAY:
            drawRect(renderer, vec2(0, 0), vec2(window.innerWidth, window.innerHeight), true, getActiveTeamColor() + "66");
            gameplayDraw(deltaTime);
            break;
        case ABOUT: aboutDraw(deltaTime); break;
        case BATTLESCREEN: battlescreenDraw(deltaTime); break;
        case POWERSCREEN: powerscreenDraw(deltaTime); break;
        case WORLDMAP: worldmapDraw(deltaTime); break;
        case VERSUS: versusDraw(deltaTime); break;
        case EDITOR: editorDraw(deltaTime); break;
        case ENDSCREEN: endscreenDraw(deltaTime); break;
        case HELP: helpDraw(deltaTime); break;
    }
    ui.draw();
    if(ui.stateIndex == GAMEPLAY && ui.transitionToState == -1) {
        quickStatsUIDraw();
        buildingPanelDraw();
    }
    //ui.debugDraw("green");
}

function frame() {
    var deltaTime = getDeltaTime();
    if (ImageObject.areAllLoaded()) {
        event(deltaTime);
        update(deltaTime);
        draw(deltaTime);
        inputTimer -= deltaTime;
        gameTime += deltaTime;
        if(!isMobile() && ui.stateIndex != EDITOR) touched = false;
        isRightClick = false;
    }
    setTimeout(frame, 15);
}