const POWERSCREEN = 4;
var powerscreen = [];

var powerscreenDelay = 2500;
var powerscreenTimer = 0;
var powerscreenOpacity = 0.0;
var powerscreenMaxBlack = 0.7;
var powerscreenSwitcherTime = 500;

var powerscreenTotalRects = 800;
var powerscreenRects = [];

function activatePower() {
    ui.stateIndex = POWERSCREEN;
    for(let i = 0; i < powerscreenTotalRects; i++)
    {
        powerscreenRects.push({
            pos: vec2((Math.random() * (gameWidth*2)) - gameWidth,
            Math.random() * gameHeight),
            sc: vec2((Math.random() * (40 * pixelSize)) + (80 * pixelSize),
            (Math.random() * (1 * pixelSize)) + (2 * pixelSize)),
            spd: Math.random() * 80.0,
            color: rgb(255, Math.floor(Math.random()*100), Math.floor(Math.random()*100))
        });
    }
}

function powerscreenSetup() {
    powerscreenTimer = powerscreenDelay;

    powerscreen.push(new Label(tr(), "POWER!"));
}

function powerscreenResize() {
}

function powerscreenDraw(deltaTime) {
    map.draw(cam);
    manager.draw(cam);

    if (powerscreenTimer > powerscreenSwitcherTime) {
        powerscreenOpacity = lerp(powerscreenOpacity, 1.0, deltaTime / 120);
    }

    //Black BG
    spritesRenderer.globalAlpha = powerscreenOpacity * powerscreenMaxBlack;
    drawRect(spritesRenderer, vec2(0, 0), vec2(gameWidth, gameHeight), true, "#660000");
    spritesRenderer.globalAlpha = powerscreenOpacity;

    //Particles
    for(let i = 0; i < powerscreenTotalRects; i++) {
        powerscreenRects[i].spd += 10.0 + (Math.random() * 20.0);
        powerscreenRects[i].pos.x += powerscreenRects[i].spd * deltaTime/120.0;
        drawRect(spritesRenderer, powerscreenRects[i].pos, powerscreenRects[i].sc, true, powerscreenRects[i].color);
        if(powerscreenRects[i].pos.x > gameWidth + powerscreenRects[i].sc.x)
            powerscreenRects[i].pos.x *= -1;
    }

    spritesRenderer.globalAlpha = 1.0;
}

function powerscreenUpdate(deltaTime) {
    if (powerscreenTimer > 0) {
        powerscreenTimer -= deltaTime;

        if (powerscreenTimer < powerscreenSwitcherTime) {
            powerscreenOpacity = lerp(powerscreenOpacity, 0.0, deltaTime / 120);
        }
    }
    else {
        powerscreenTimer = powerscreenDelay;
        powerscreenOpacity = 0.0;
        powerscreenRects.length = 0;
        ui.stateIndex = GAMEPLAY;
    }
}

function powerscreenEvent(deltaTime) {
}