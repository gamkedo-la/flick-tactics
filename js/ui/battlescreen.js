const BATTLESCREEN = 3;
var battlescreen = [];

var battlescreenDelay = 2500;
var battlescreenTimer = 0;
var battlescreenOpacity = 0.0;
var battlescreenMaxBlack = 0.7;
var battlescreenSwitcherTime = 1000;
var battlescreenCharacterDisplaySize = 80;
var battlescreenHealthBarSize = vec2(204, 60);
var battlescreenSingleBarSize = vec2(18, 56);
var battlescreenGapBetweenBar = 4;
var battlescreenStartUnitX = 400;
var battlescreenActiveUnitX = 0;
var battlescreenPassiveUnitX = 0;

var activeTeamID = -1;
var activeMapUnit = undefined;
var passiveTeamID = -1;
var passiveMapUnit = undefined;

function battlescreenSetup() {
    battlescreenTimer = battlescreenDelay;
    battlescreenActiveUnitX = -battlescreenStartUnitX * pixelSize;
    battlescreenPassiveUnitX = battlescreenStartUnitX * pixelSize;
}

function battlescreenResize() {
}

function battlescreenDraw(deltaTime) {
    map.draw(cam);
    manager.draw(cam);

    if (battlescreenTimer > battlescreenSwitcherTime) {
        battlescreenOpacity = lerp(battlescreenOpacity, 1.0, deltaTime / 120);
        battlescreenActiveUnitX = lerp(battlescreenActiveUnitX, 0.0, deltaTime / 120);
        battlescreenPassiveUnitX = lerp(battlescreenPassiveUnitX, 0.0, deltaTime / 120);
    }

    //Black BG
    spritesRenderer.globalAlpha = battlescreenOpacity * battlescreenMaxBlack;
    drawRect(spritesRenderer, vec2(0, 0), vec2(gameWidth, gameHeight), true, "black");
    spritesRenderer.globalAlpha = battlescreenOpacity;

    //Characters
    drawRect(spritesRenderer, vec2(0, 0),
        vec2(battlescreenCharacterDisplaySize * pixelSize, battlescreenCharacterDisplaySize * pixelSize), true, "white");
    drawRect(spritesRenderer, vec2(gameWidth - (battlescreenCharacterDisplaySize * pixelSize), gameHeight - (battlescreenCharacterDisplaySize * pixelSize)),
        vec2(battlescreenCharacterDisplaySize * pixelSize, battlescreenCharacterDisplaySize * pixelSize), true, "white");

    //Unit Health Bars
    drawRect(spritesRenderer, vec2(battlescreenCharacterDisplaySize * pixelSize, 0),
        vec2(battlescreenHealthBarSize.x * pixelSize, battlescreenHealthBarSize.y * pixelSize), true, "red");
    drawRect(spritesRenderer, vec2(gameWidth - (battlescreenHealthBarSize.x * pixelSize) - (battlescreenCharacterDisplaySize * pixelSize), gameHeight - (battlescreenHealthBarSize.y * pixelSize)),
        vec2(battlescreenHealthBarSize.x * pixelSize, battlescreenHealthBarSize.y * pixelSize), true, "red");
    for (let i = 0; i < activeMapUnit.hp; i++) {
        drawRect(spritesRenderer, vec2((battlescreenCharacterDisplaySize * pixelSize) + (battlescreenSingleBarSize.x * pixelSize * i) + ((i + 1) * battlescreenGapBetweenBar),
            battlescreenGapBetweenBar),
            vec2(battlescreenSingleBarSize.x * pixelSize, battlescreenSingleBarSize.y * pixelSize), true, "green");
    }
    for (let i = 9; i > 9 - passiveMapUnit.hp; i--) {
        drawRect(spritesRenderer, vec2(gameWidth - (battlescreenHealthBarSize.x * pixelSize) - (battlescreenCharacterDisplaySize * pixelSize) + (battlescreenSingleBarSize.x * pixelSize * i) + ((i + 1) * battlescreenGapBetweenBar),
            gameHeight - (battlescreenHealthBarSize.y * pixelSize) + battlescreenGapBetweenBar),
            vec2(battlescreenSingleBarSize.x * pixelSize, battlescreenSingleBarSize.y * pixelSize), true, "green");
    }

    //Units
    var prevActiveMapUnitPosition = vec2(activeMapUnit.unit.position.x, activeMapUnit.unit.position.y);
    activeMapUnit.unit.position = vec2(battlescreenActiveUnitX, 0);
    for (let i = 0; i < 3; i++)
        activeMapUnit.unit.draw(activeTeamID, vec2(200 * pixelSize, (150 * pixelSize) + (100 * pixelSize * i)),
            vec2(pixelSize, pixelSize));
    for (let i = 0; i < 2; i++)
        activeMapUnit.unit.draw(activeTeamID, vec2(300 * pixelSize, (200 * pixelSize) + (100 * pixelSize * i)),
            vec2(pixelSize, pixelSize));
    activeMapUnit.unit.position = vec2(prevActiveMapUnitPosition.x, prevActiveMapUnitPosition.y);

    var prevPassiveMapUnitPosition = vec2(passiveMapUnit.unit.position.x, passiveMapUnit.unit.position.y);
    passiveMapUnit.unit.position = vec2(battlescreenPassiveUnitX, 0);
    for (let i = 0; i < 3; i++)
        passiveMapUnit.unit.draw(passiveTeamID, vec2(gameWidth - (200 * pixelSize), (150 * pixelSize) + (100 * pixelSize * i)),
            vec2(pixelSize, pixelSize));
    for (let i = 0; i < 2; i++)
        passiveMapUnit.unit.draw(passiveTeamID, vec2(gameWidth - (300 * pixelSize), (200 * pixelSize) + (100 * pixelSize * i)),
            vec2(pixelSize, pixelSize));
    passiveMapUnit.unit.position = vec2(prevPassiveMapUnitPosition.x, prevPassiveMapUnitPosition.y);

    spritesRenderer.globalAlpha = 1.0;
}

function battlescreenUpdate(deltaTime) {
    if (battlescreenTimer > 0) {
        battlescreenTimer -= deltaTime;

        if (battlescreenTimer < battlescreenSwitcherTime) {
            battlescreenOpacity = lerp(battlescreenOpacity, 0.0, deltaTime / 120);
            battlescreenActiveUnitX = lerp(battlescreenActiveUnitX, -battlescreenStartUnitX * pixelSize, deltaTime / 120);
            battlescreenPassiveUnitX = lerp(battlescreenPassiveUnitX, battlescreenStartUnitX * pixelSize, deltaTime / 120);
        }
    }
    else {
        battlescreenTimer = battlescreenDelay;
        battlescreenOpacity = 0.0;
        battlescreenActiveUnitX = -battlescreenStartUnitX * pixelSize;
        battlescreenPassiveUnitX = battlescreenStartUnitX * pixelSize;
        ui.stateIndex = GAMEPLAY;
    }
}

function battlescreenEvent(deltaTime) {
}