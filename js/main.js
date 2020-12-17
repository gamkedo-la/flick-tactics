

var gameTime = 0;

//making these stat variables global for right now, but I guess they should live elsewhere
let totalPlayerUnits = 0;

window.onload = function () {
    init();
    audioSetup();
    frame();
};

function event(deltaTime) {
    switch (ui.stateIndex) {
        case STARTSCREEN: startscreenEvent(deltaTime); break;
        case GAMEPLAY: gameplayEvent(deltaTime); break;
        case ABOUT: aboutEvent(deltaTime); break;
        case BATTLESCREEN: battlescreenEvent(deltaTime); break;
        case WORLDMAP: worldmapEvent(deltaTime); break;
        case VERSUS: versusEvent(deltaTime); break;
        case EDITOR: editorEvent(deltaTime); break;
    }
    ui.event();
}

function update(deltaTime) {
    switch (ui.stateIndex) {
        case STARTSCREEN: startscreenUpdate(deltaTime); break;
        case GAMEPLAY: gameplayUpdate(deltaTime); break;
        case ABOUT: aboutUpdate(deltaTime); break;
        case BATTLESCREEN: battlescreenUpdate(deltaTime); break;
        case WORLDMAP: worldmapUpdate(deltaTime); break;
        case VERSUS: versusUpdate(deltaTime); break;
        case EDITOR: editorUpdate(deltaTime); break;
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
        case ABOUT:aboutDraw(deltaTime); break;
        case BATTLESCREEN: battlescreenDraw(deltaTime); break;
        case WORLDMAP: worldmapDraw(deltaTime); break;
        case VERSUS: versusDraw(deltaTime); break;
        case EDITOR: editorDraw(deltaTime); break;
    }
    ui.draw();
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
        if(ui.stateIndex != EDITOR) isTouched = false;
    }
    setTimeout(frame, 15);
}