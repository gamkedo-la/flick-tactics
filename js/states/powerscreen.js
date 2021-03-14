const POWERSCREEN = 4;
var powerscreen = [];

var powerscreenDelay = 5000;
var powerscreenTimer = 0;
var powerscreenOpacity = 0.0;
var powerscreenMaxBlack = 0.7;
var powerscreenSwitcherTime = 1000;
var powerscreenFontSize;

var powerscreenTotalRects = 800;
var powerscreenRects = [];

function activatePower() {
    gameplaySilence = true;
    dialogues.push(powerDialogues[(getPlayer().CO * 4) + Math.floor(Math.random() * 4)]);
    afterDialoguesEvent = function() {
        ui.stateIndex = POWERSCREEN;
        gameplaySilence = false;
        getPlayer().powered = true;
        powerscreen[0].text = powerscreen[1].text = COSPECIFICS[getPlayer().CO].powerName;
        for(let i = 0; i < powerscreenTotalRects; i++) {
            powerscreenRects.push({
                pos: vec2((Math.random() * (gameWidth*2)) - gameWidth,
                Math.random() * gameHeight),
                sc: vec2((Math.random() * (40 * pixelSize)) + (80 * pixelSize),
                (Math.random() * (1 * pixelSize)) + (2 * pixelSize)),
                spd: Math.random() * 40.0,
                color: Math.random() < 0.5 ? getActiveTeamColor() : (Math.random() < 0.5 ? "#ffffff" : "#000000"),
            });
        }
    }
}

function powerscreenSetup() {
    powerscreenTimer = powerscreenDelay;
    powerscreenFontSize = 72.0 * pixelSize;
    powerscreen.push(new Label(tr(vec2((gameWidth / 2) + (powerscreenFontSize / 16.0), (gameHeight * 1.25) + (powerscreenFontSize / 16.0)), vec2(gameWidth/2, gameHeight)), "POWER!", powerscreenFontSize.toString() + "px " + uiContext.fontFamily, "black"));
    powerscreen.push(new Label(tr(vec2(gameWidth / 2, gameHeight * 1.25), vec2(gameWidth / 2, gameHeight)), "POWER!", powerscreenFontSize.toString() + "px " + uiContext.fontFamily));
}

function powerscreenResize() {
}

function powerscreenDraw(deltaTime) {
    map.draw(cam);
    manager.draw(cam);

    if (powerscreenTimer > powerscreenSwitcherTime) {
        powerscreenOpacity = lerp(powerscreenOpacity, 1.0, deltaTime / 120);
    }

    //Power Name Label Lerp
    powerscreen[1].transform.position = lerpVec2(vec2(-gameWidth), vec2(gameWidth / 2), powerscreenOpacity);
    powerscreen[0].transform.position = powerscreen[1].transform.position.add(toVec2(powerscreenFontSize / 10.0));

    //Black BG
    spritesRenderer.globalAlpha = powerscreenOpacity * powerscreenMaxBlack;
    drawRect(spritesRenderer, vec2(0, 0), vec2(gameWidth, gameHeight), true, getActiveTeamColor() + "bb");

    //Particles
    spritesRenderer.globalAlpha = powerscreenOpacity;
    for(let i = 0; i < powerscreenTotalRects; i++) {
        powerscreenRects[i].spd += 10.0 + (Math.random() * 20.0);
        powerscreenRects[i].pos.x += powerscreenRects[i].spd * deltaTime/120.0;
        drawRect(spritesRenderer, powerscreenRects[i].pos, powerscreenRects[i].sc, true, powerscreenRects[i].color);
        if(powerscreenRects[i].pos.x > gameWidth + powerscreenRects[i].sc.x)
            powerscreenRects[i].pos.x *= -1;
    }
    spritesRenderer.globalAlpha = 1.0;

    //CO Body
    bodyNFacesSheet.transform.position = vec2(lerp(-gameWidth, gameWidth/4, powerscreenOpacity), gameHeight/2);
    bodyNFacesSheet.drawScIn(vec2(1024 * getPlayer().CO), toVec2(1024));
}

function powerscreenUpdate(deltaTime) {
    if(getPlayer().CO == HULU || getPlayer().CO == JONAH) playBGM(BGM_BADPOWER);
    else playBGM(BGM_GOODPOWER);
    if (powerscreenTimer > 0) {
        powerscreenTimer -= deltaTime;
        if (powerscreenTimer < powerscreenSwitcherTime) {
            powerscreenOpacity = lerp(powerscreenOpacity, 0.0, deltaTime / 120);
        }
    } else {
        powerscreenTimer = powerscreenDelay;
        powerscreenOpacity = 0.0;
        powerscreenRects.length = 0;
        switch(getPlayer().CO) {
            case GURU:
                getPlayer().actionPoints *= 2;
            break;

            case ZAREEM:
                for(let i = 0; i < getPlayer().unitGroup.mapUnits.length; i++) {
                    var mu = getPlayer().unitGroup.mapUnits[i];
                    if(mu.unit.type == RIFLE_MECH) {
                        getPlayer().focus.push({ mUnit: mu, atFocus: function(player, munit) {
                            if(munit.unit.rank < 3) {
                                new TileParticle(tilePositionToPixelPosition(munit.mapPosition), rankUpSequence);
                                munit.unit.rank++;
                            }
                        }});
                    } else if(mu.unit.type == CITY_BUILDING) {
                        var pos = mu.mapPosition;
                        var offsets = [vec2(0, 1), vec2(1, 0), vec2(0, -1), vec2(-1, 0)];
                        for(let o = 0; o < offsets.length; o++) {
                            var poff = pos.add(offsets[o]);
                            if(manager.getPlayerAndUnitIndexOnTile(poff)[0] == -1
                            && map.getTileTypeFromPosition(poff) != SEA_TILE
                            && map.getTileTypeFromPosition(poff) != MOUNTAIN_TILE) {
                                removeTileParticles(poff);
                                newMapUnit = new MapUnit(RIFLE_MECH, poff);
                                newMapUnit.hp = Math.ceil(mu.hp);
                                getPlayer().unitGroup.mapUnits.push(newMapUnit);
                                getPlayer().focus.push({ mUnit: newMapUnit, atFocus: function(player, munit) {
                                    new TileParticle(tilePositionToPixelPosition(munit.mapPosition), teleportSequence);
                                }});
                                break;
                            }
                        }
                    }
                }
            break;

            case TAJA:
                for(let i = 0; i < getPlayer().unitGroup.mapUnits.length; i++) {
                    var mu = getPlayer().unitGroup.mapUnits[i];
                    if(mu.unit.type == ARTILLERY_MECH) {
                        getPlayer().focus.push({ mUnit: mu, atFocus: function(player, munit) {
                            if(munit.unit.rank < 3) {
                                new TileParticle(tilePositionToPixelPosition(munit.mapPosition), rankUpSequence);
                                munit.unit.rank++;
                            }
                        }});
                    }
                }
            break;

            case HULU:
                for(let i = 0; i < manager.players.length; i++) {
                    if(i != manager.index) {
                        for(let u = 0; u < manager.players[i].unitGroup.mapUnits.length; u++) {
                            var mu = manager.players[i].unitGroup.mapUnits[u];
                            if(mu.unit.type != RUIN_BUILDING) {
                                manager.players[i].focus.push({ mUnit: mu, atFocus: function(player, munit) {
                                    munit.hp -= 1.0;
                                    if(Math.ceil(munit.hp) > 0.0) new TileParticle(tilePositionToPixelPosition(munit.mapPosition), damageSequence);
                                }});
                            }
                        }
                    }
                }
            break;

            case JONAH:
                for(let i = 0; i < manager.players.length; i++) {
                    var conversion = 0;
                    if(manager.players[i].getTotalNumberOfMechs() <= 2) continue;
                    else if(manager.players[i].getTotalNumberOfMechs() <= 5) conversion = 1;
                    else if(manager.players[i].getTotalNumberOfMechs() <= 10) conversion = 2;
                    else conversion = 3;
                    var preferencePair = [];
                    for(let u = 0; u < manager.players[i].unitGroup.mapUnits.length; u++) {
                        var munit = manager.players[i].unitGroup.mapUnits[u];
                        if(!munit.unit.isBuilding) {
                            var pair = {index: u, pref: 0};
                            pair.pref += Math.ceil(munit.hp);
                            pair.pref += (munit.unit.rank * 2);
                            switch(munit.unit.type) {
                                case RIFLE_MECH: pair.pref += 4; break;
                                case CANNON_MECH: pair.pref += 8; break;
                                case ARTILLERY_MECH: pair.pref += 12; break;
                                case TELEPORT_MECH: pair.pref += 2; break;
                                case SUPPORT_MECH: pair.pref += 1; break;
                            }
                            preferencePair.push(pair);
                        }
                    }
                    highestPrefPair = {index: 0, pref: 0}; secondHighestPrefPair = {index: 0, pref: 0}; thirdHighestPrefPair = {index: 0, pref: 0};
                    for(let pi = 0; pi < preferencePair.length; pi++) {
                        if(preferencePair[pi].pref > highestPrefPair.pref) {
                            thirdHighestPrefPair.index = secondHighestPrefPair.index;
                            thirdHighestPrefPair.pref = secondHighestPrefPair.pref;
                            secondHighestPrefPair.index = highestPrefPair.index;
                            secondHighestPrefPair.pref = highestPrefPair.pref;
                            highestPrefPair.index = preferencePair[pi].index;
                            highestPrefPair.pref = preferencePair[pi].pref;
                        }
                    }
                    toConvert = [];
                    if(conversion >= 1) toConvert.push(manager.players[i].unitGroup.mapUnits[highestPrefPair.index]);
                    if(conversion >= 2) toConvert.push(manager.players[i].unitGroup.mapUnits[secondHighestPrefPair.index]);
                    if(conversion >= 3) toConvert.push(manager.players[i].unitGroup.mapUnits[thirdHighestPrefPair.index]);
                    while(toConvert.length > 0) {
                        var munit = new MapUnit(0, vec2());
                        munit.copy(toConvert[0]);
                        getPlayer().unitGroup.mapUnits.push(munit);
                        toConvert[0].hp = 0;
                        toConvert.splice(0, 1);
                        getPlayer().focus.push({ mUnit: munit, atFocus: function(player, _munit) {
                            _munit.unit.rank = 3;
                            _munit.hp = 10;
                        }});
                    }
                }
            break;
        }
        ui.stateIndex = GAMEPLAY;
    }
}

function powerscreenEvent(deltaTime) {
}