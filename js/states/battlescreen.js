const BATTLESCREEN = 3;
var battlescreen = [];

var battlescreenDelay = 3000;
var battlescreenTimer = 0;
var battlescreenOpacity = 0.0;
var battlescreenMaxBlack = 0.7;
var battlescreenSwitcherLowTime = 400;
var battlescreenSwitcherHighTime = 1200;
var battlescreenCharacterDisplaySize = 80;
var battlescreenHealthBarSize = vec2(204, 60);
var battlescreenSingleBarSize = vec2(18, 56);
var battlescreenGapBetweenBar = 4;
var battlescreenStartUnitX = 400;
var battlescreenActiveUnitX = 0;
var battlescreenPassiveUnitX = 0;
var battlescreenTileSize = 1.4;
var battlescreenTileOffset = 24;

var muzzleIndex = 0;
var recoilPositionOffset = 0;
var rifleMuzzles = [13, 14, 15];
var cannonMuzzles = [33, 34, 35];
var artilleryMuzzles = [53, 54, 55];

var activeTeamID = -1;
var activeMUnit = undefined;
var passiveTeamID = -1;
var passiveMUnit = undefined;
var passiveMUnitPrevHP = 10;
var passiveMUnitHp = -1;

var destroyParticles = [];

function battlescreenSetup() {
    battlescreenTimer = battlescreenDelay;
    battlescreenActiveUnitX = -battlescreenStartUnitX * pixelSize;
    battlescreenPassiveUnitX = battlescreenStartUnitX * pixelSize;
}

function battlescreenResize() {
}

function battlescreenDraw(deltaTime) {

    if(passiveMUnitHp <= -1) {
        passiveMUnitHp = passiveMUnit.hp;
        passiveMUnit.hp = passiveMUnitPrevHP;
    }

    map.draw(cam);
    manager.draw(cam);

    var prevHp = passiveMUnit.hp;
    if (battlescreenTimer > battlescreenSwitcherHighTime) {
        battlescreenOpacity = lerp(battlescreenOpacity, 1.0, deltaTime / 120);
        battlescreenActiveUnitX = lerp(battlescreenActiveUnitX, 0.0, deltaTime / 120);
        battlescreenPassiveUnitX = lerp(battlescreenPassiveUnitX, 0.0, deltaTime / 120);
    } else {
        passiveMUnit.hp = passiveMUnitHp;
    }

    //Black BG
    spritesRenderer.globalAlpha = battlescreenOpacity * battlescreenMaxBlack;
    drawRect(spritesRenderer, vec2(0, 0), vec2(gameWidth, gameHeight), true, "black");
    spritesRenderer.globalAlpha = battlescreenOpacity;

    //Character Faces
    drawRect(spritesRenderer, vec2(0, 0),
        vec2(battlescreenCharacterDisplaySize * pixelSize, battlescreenCharacterDisplaySize * pixelSize), true, "white");
    drawRect(spritesRenderer, vec2(gameWidth - (battlescreenCharacterDisplaySize * pixelSize), gameHeight - (battlescreenCharacterDisplaySize * pixelSize)),
        vec2(battlescreenCharacterDisplaySize * pixelSize, battlescreenCharacterDisplaySize * pixelSize), true, "white");
    bodyNFacesSheet.transform.scale = vec2(pixelSize * (battlescreenCharacterDisplaySize/256.0), pixelSize * (battlescreenCharacterDisplaySize/256.0));
    bodyNFacesSheet.transform.position = toVec2(battlescreenCharacterDisplaySize * pixelSize / 2.0);
    bodyNFacesSheet.drawScIn(facePositions[battlescreenTimer > battlescreenSwitcherHighTime ? FACE_NEUTRAL : FACE_HAPPY].add(vec2(1024 * getPlayer().CO)), toVec2(256));
    bodyNFacesSheet.transform.position = vec2(gameWidth - (battlescreenCharacterDisplaySize * pixelSize / 2), gameHeight - (battlescreenCharacterDisplaySize * pixelSize / 2));
    bodyNFacesSheet.drawScIn(facePositions[battlescreenTimer > battlescreenSwitcherHighTime ? FACE_UPSET : FACE_SAD].add(vec2(1024 * (getPlayerI(getIndexPair(passiveMUnit.mapPosition))).CO)), toVec2(256));

    //Unit Health Bars
    drawRect(spritesRenderer, vec2(battlescreenCharacterDisplaySize * pixelSize, 0),
        vec2(battlescreenHealthBarSize.x * pixelSize, battlescreenHealthBarSize.y * pixelSize), true, "red");
    drawRect(spritesRenderer, vec2(gameWidth - (battlescreenHealthBarSize.x * pixelSize) - (battlescreenCharacterDisplaySize * pixelSize), gameHeight - (battlescreenHealthBarSize.y * pixelSize)),
        vec2(battlescreenHealthBarSize.x * pixelSize, battlescreenHealthBarSize.y * pixelSize), true, "red");
    for (let i = 0; i < activeMUnit.hp; i++) {
        drawRect(spritesRenderer, vec2((battlescreenCharacterDisplaySize * pixelSize) + (battlescreenSingleBarSize.x * pixelSize * i) + ((i + 1) * battlescreenGapBetweenBar),
            battlescreenGapBetweenBar),
            vec2(battlescreenSingleBarSize.x * pixelSize, battlescreenSingleBarSize.y * pixelSize), true, "green");
    }
    for (let i = 9; i > 9 - passiveMUnit.hp; i--) {
        drawRect(spritesRenderer, vec2(gameWidth - (battlescreenHealthBarSize.x * pixelSize) - (battlescreenCharacterDisplaySize * pixelSize) + (battlescreenSingleBarSize.x * pixelSize * i) + ((i + 1) * battlescreenGapBetweenBar),
            gameHeight - (battlescreenHealthBarSize.y * pixelSize) + battlescreenGapBetweenBar),
            vec2(battlescreenSingleBarSize.x * pixelSize, battlescreenSingleBarSize.y * pixelSize), true, "green");
    }

    //Units and Map Tiles
    var prevActiveMUnitPosition = vec2(activeMUnit.unit.position.x, activeMUnit.unit.position.y);
    activeMUnit.unit.position = vec2(battlescreenActiveUnitX, 0);

    var tileSc = vec2(battlescreenTileSize * pixelSize, battlescreenTileSize * pixelSize);
    for (let i = 0; i < 3; i++) {
        drawSheet(map.getTileTypeFromPosition(activeMUnit.mapPosition), vec2(200 * pixelSize, (150 * pixelSize) + (100 * pixelSize * i) + (battlescreenTileOffset * pixelSize)), tileSc);
    }
    for (let i = 0; i < 2; i++) {
        drawSheet(map.getTileTypeFromPosition(activeMUnit.mapPosition), vec2(300 * pixelSize, (200 * pixelSize) + (100 * pixelSize * i) + (battlescreenTileOffset * pixelSize)), tileSc);
    }

    var activeTHp = activeMUnit.hp;
    var muzzleSpace = 64 * pixelSize;
    for (let i = 0; i < 3; i++, activeTHp -= 2) {
        if (activeTHp > 0)
        {
            activeMUnit.unit.draw(activeTeamID, vec2((200 * pixelSize) - recoilPositionOffset, (150 * pixelSize) + (100 * pixelSize * i)),
                vec2(pixelSize, pixelSize));

            if(activeMUnit.unit.type == RIFLE_MECH) {
                if(battlescreenTimer < battlescreenDelay/1.25 && battlescreenTimer > battlescreenSwitcherHighTime && gameTime % 160 < 80) {
                    drawSheet(rifleMuzzles[muzzleIndex], activeMUnit.unit.position.add(vec2((200 * pixelSize) + muzzleSpace, (150 * pixelSize) + (100 * pixelSize * i))),
                        vec2(pixelSize, pixelSize));
                    recoilPositionOffset = lerp(recoilPositionOffset, 0.0, 0.75);
                } else {
                    muzzleIndex = Math.floor(Math.random() * 3);
                    recoilPositionOffset = (4.0 * pixelSize) + (Math.random() * (4.0 * pixelSize));
                }
            } else if (activeMUnit.unit.type == CANNON_MECH) {
                if(battlescreenTimer < battlescreenDelay/1.25 && battlescreenTimer > battlescreenSwitcherHighTime) {
                    muzzleIndex += 0.0015 * deltaTime;
                    if(muzzleIndex > 1 && muzzleIndex < 2)
                        recoilPositionOffset = muzzleIndex * pixelSize * 15.0;
                    else
                        recoilPositionOffset = lerp(recoilPositionOffset, 0.0, 0.25);
                    drawSheet(cannonMuzzles[Math.floor(muzzleIndex)], activeMUnit.unit.position.add(vec2((200 * pixelSize) + muzzleSpace, (150 * pixelSize) + (100 * pixelSize * i))),
                        vec2(pixelSize, pixelSize));
                }
            } else if (activeMUnit.unit.type == ARTILLERY_MECH) {
                if(battlescreenTimer < battlescreenDelay/1.25 && battlescreenTimer > battlescreenSwitcherHighTime) {
                    muzzleIndex += 0.0015 * deltaTime;
                    if(muzzleIndex > 1 && muzzleIndex < 2)
                        recoilPositionOffset = muzzleIndex * pixelSize * 15.0;
                    else
                        recoilPositionOffset = lerp(recoilPositionOffset, 0.0, 0.25);
                    drawSheet(artilleryMuzzles[Math.floor(muzzleIndex)], activeMUnit.unit.position.add(vec2((200 * pixelSize) + (muzzleSpace/1.5), (150 * pixelSize) + (100 * pixelSize * i) - (muzzleSpace/1.5))),
                        vec2(pixelSize, pixelSize));
                }
            }
        }
    }
    for (let i = 0; i < 2; i++, activeTHp -= 2) {
        if (activeTHp > 0)
        {
            activeMUnit.unit.draw(activeTeamID, vec2((300 * pixelSize) - recoilPositionOffset, (200 * pixelSize) + (100 * pixelSize * i)),
                vec2(pixelSize, pixelSize));

            if(activeMUnit.unit.type == RIFLE_MECH) {
                if(battlescreenTimer < battlescreenDelay/1.25 && battlescreenTimer > battlescreenSwitcherHighTime && gameTime % 160 < 80) {
                    drawSheet(rifleMuzzles[muzzleIndex], activeMUnit.unit.position.add(vec2((300 * pixelSize) + muzzleSpace + recoilPositionOffset, (200 * pixelSize) + (100 * pixelSize * i))),
                        vec2(pixelSize, pixelSize));
                    recoilPositionOffset = lerp(recoilPositionOffset, 0.0, 0.75);
                } else {
                    muzzleIndex = Math.floor(Math.random() * 3);
                    recoilPositionOffset = (4.0 * pixelSize) + (Math.random() * (4.0 * pixelSize));
                }
            } else if (activeMUnit.unit.type == CANNON_MECH) {
                if(battlescreenTimer < battlescreenDelay/1.25 && battlescreenTimer > battlescreenSwitcherHighTime) {
                    muzzleIndex += 0.0015 * deltaTime;
                    if(muzzleIndex > 1 && muzzleIndex < 2)
                        recoilPositionOffset = muzzleIndex * pixelSize * 15.0;
                    else
                        recoilPositionOffset = lerp(recoilPositionOffset, 0.0, 0.25);
                    drawSheet(cannonMuzzles[Math.floor(muzzleIndex)], activeMUnit.unit.position.add(vec2((300 * pixelSize) + muzzleSpace, (200 * pixelSize) + (100 * pixelSize * i))),
                        vec2(pixelSize, pixelSize));
                }
            } else if (activeMUnit.unit.type == ARTILLERY_MECH) {
                if(battlescreenTimer < battlescreenDelay/1.25 && battlescreenTimer > battlescreenSwitcherHighTime) {
                    muzzleIndex += 0.0015 * deltaTime;
                    if(muzzleIndex > 1 && muzzleIndex < 2)
                        recoilPositionOffset = muzzleIndex * pixelSize * 15.0;
                    else
                        recoilPositionOffset = lerp(recoilPositionOffset, 0.0, 0.25);
                    drawSheet(artilleryMuzzles[Math.floor(muzzleIndex)], activeMUnit.unit.position.add(vec2((300 * pixelSize) + (muzzleSpace/1.5), (200 * pixelSize) + (100 * pixelSize * i) - (muzzleSpace/1.5))),
                        vec2(pixelSize, pixelSize));
                }
            }
        }
    }

    activeMUnit.unit.position = vec2(prevActiveMUnitPosition.x, prevActiveMUnitPosition.y);

    var prevPassiveMUnitPosition = vec2(passiveMUnit.unit.position.x, passiveMUnit.unit.position.y);
    passiveMUnit.unit.position = vec2(battlescreenPassiveUnitX, 0);

    for (let i = 0; i < 3; i++) {
        drawSheet(map.getTileTypeFromPosition(passiveMUnit.mapPosition), vec2(gameWidth - (200 * pixelSize), (150 * pixelSize) + (100 * pixelSize * i) + (battlescreenTileOffset * pixelSize)),
            vec2(battlescreenTileSize * pixelSize, battlescreenTileSize * pixelSize));

        if((prevHp >= 4 && passiveMUnit.hp < 4 && i == 2) || (prevHp >= 2 && passiveMUnit.hp < 2 && i == 1) || (prevHp > 0 && passiveMUnit.hp <= 0 && i == 0))
            destroyParticles.push(new TileParticle(vec2(gameWidth - (200 * pixelSize), (150 * pixelSize) + (100 * pixelSize * i) + (battlescreenTileOffset * pixelSize)), unitDestroySequence, null, false));
    }
    for (let i = 0; i < 2; i++) {
        drawSheet(map.getTileTypeFromPosition(passiveMUnit.mapPosition), vec2(gameWidth - (300 * pixelSize), (200 * pixelSize) + (100 * pixelSize * i) + (battlescreenTileOffset * pixelSize)),
            vec2(battlescreenTileSize * pixelSize, battlescreenTileSize * pixelSize));

        if((prevHp >= 8 && passiveMUnit.hp < 8 && i == 1) || (prevHp >= 6 && passiveMUnit.hp < 6 && i == 0))
            destroyParticles.push(new TileParticle(vec2(gameWidth - (300 * pixelSize), (200 * pixelSize) + (100 * pixelSize * i) + (battlescreenTileOffset * pixelSize)), unitDestroySequence, null, false));
    }

    var passiveTHp = passiveMUnit.hp;
    for (let i = 0; i < 3; i++, passiveTHp -= 2) {
        if (passiveTHp > 0)
            passiveMUnit.unit.draw(passiveTeamID, vec2(gameWidth - (200 * pixelSize), (150 * pixelSize) + (100 * pixelSize * i)),
                vec2(pixelSize, pixelSize), true);
    }
    for (let i = 0; i < 2; i++, passiveTHp -= 2) {
        if (passiveTHp > 0)
            passiveMUnit.unit.draw(passiveTeamID, vec2(gameWidth - (300 * pixelSize), (200 * pixelSize) + (100 * pixelSize * i)),
                vec2(pixelSize, pixelSize), true);
    }
    passiveMUnit.unit.position = vec2(prevPassiveMUnitPosition.x, prevPassiveMUnitPosition.y);

    for(let i = 0; i < destroyParticles.length; i++) {
        if(!destroyParticles[i].drawIsolate(deltaTime, vec2(0, -32 * pixelSize), tileSc)) {
            destroyParticles.splice(i, 1);
            i--;
        }
    }

    spritesRenderer.globalAlpha = 1.0;
}

function battlescreenUpdate(deltaTime) {
    if (battlescreenTimer > 0) {
        battlescreenTimer -= deltaTime;

        if (battlescreenTimer < battlescreenSwitcherLowTime) {
            battlescreenOpacity = lerp(battlescreenOpacity, 0.0, deltaTime / 120);
            battlescreenActiveUnitX = lerp(battlescreenActiveUnitX, -battlescreenStartUnitX * pixelSize, deltaTime / 120);
            battlescreenPassiveUnitX = lerp(battlescreenPassiveUnitX, battlescreenStartUnitX * pixelSize, deltaTime / 120);
        }
    }
    else {
        passiveMUnitHp = -1;
        destroyParticles = [];
        battlescreenTimer = battlescreenDelay;
        battlescreenOpacity = 0.0;
        battlescreenActiveUnitX = -battlescreenStartUnitX * pixelSize;
        battlescreenPassiveUnitX = battlescreenStartUnitX * pixelSize;
        muzzleIndex = 0;
        recoilPositionOffset = 0;
        ui.stateIndex = GAMEPLAY;
    }
}

function battlescreenEvent(deltaTime) {
}