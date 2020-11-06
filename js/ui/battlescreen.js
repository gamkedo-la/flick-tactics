const BATTLESCREEN = 3;
var battlescreen = [];

var battlescreenDelay = 1500;
var battlescreenTimer = 0;

var activeMapUnit = undefined;
var passiveMapUnit = undefined;

function battlescreenSetup() {
    battlescreenTimer = battlescreenDelay;
}

function battlescreenResize() {
}

function battlescreenDraw(deltaTime) {
    map.draw(cam);
    manager.draw(cam);

    spritesRenderer.globalAlpha = 0.6;
    drawRect(spritesRenderer, vec2(0, 0), vec2(gameWidth, gameHeight), true, "black");
    spritesRenderer.globalAlpha = 1.0;
}

function battlescreenUpdate(deltaTime) {
    if (battlescreenTimer > 0) {
        battlescreenTimer -= deltaTime;
    }
    else {
        battlescreenTimer = battlescreenDelay;
        ui.stateIndex = GAMEPLAY;
    }
}

function battlescreenEvent(deltaTime) {
}