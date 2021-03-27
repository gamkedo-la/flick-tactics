const GAMEPLAY = 1;
var gameplay = [];
var gameplaySilence = false;
var gameplayStatIndex = -1;

//#region helper_functions
//'manager.getActivePlayer()' => 'getPlayer()'
//'manager.getActivePlayer().unitGroup.mapUnits[i]' => 'getMUnit(i)'
//'manager.getPlayerAndUnitIndexOnTile(tilePos)' => 'getIndexPair(tilePos)'
//'manager.players[indexPair[0]]' => 'getPlayerI(indexPair)'
//'manager.players[indexPair[0]].unitGroup.mapUnits[indexPair[1]]' => 'getMUnitI(indexPair)'

function getPlayer() {
    return manager.getActivePlayer();
}
function getMUnit(i = -999) {
    if(i == -999) return manager.getActivePlayer().getSelectedMapUnit();
    if(i != -1) return manager.getActivePlayer().unitGroup.mapUnits[i];
    return -1;
}
function getIndexPair(tilePos) {
    return manager.getPlayerAndUnitIndexOnTile(tilePos);
}
function getPlayerI(indexPair) {
    if(indexPair[0] != -1) return manager.players[indexPair[0]];
    return -1;
}
function getMUnitI(indexPair) {
    if(indexPair[0] != -1 && indexPair[1] != -1) return manager.players[indexPair[0]].unitGroup.mapUnits[indexPair[1]];
    return -1;
}
function getTeamColor(team) {
    switch (team) {
        case RED_TEAM: return "#c32454";
        case BLUE_TEAM: return "#4d65b4";
        case GREEN_TEAM: return "#239063";
        case BLACK_TEAM: return "#625565";
        default: return "#000000";
    }
}
function getActiveTeamColor() {
    if (ui.stateIndex != GAMEPLAY && ui.stateIndex != POWERSCREEN) return "#000000";
    switch (getPlayer().unitGroup.teamID) {
        case RED_TEAM: return "#c32454";
        case BLUE_TEAM: return "#4d65b4";
        case GREEN_TEAM: return "#239063";
        case BLACK_TEAM: return "#625565";
        default: return "#000000";
    }
}

//#endregion

function gameplayReset() {
    continueBtn.enabled = false;
    versusBtn.label.text = "PLAY";
    gameplaySilence = false;
    map = undefined;
    manager = undefined;
    particles = [];
    particles = [];
}

function gameplayUISetup() {
    var fontSize = (isMobile() ? 26 : 14) * pixelSize;
    controlBarUISetup(fontSize);
    var leftRightBtnSize = isMobile() ? 80 * pixelSize : 50 * pixelSize;
    var ypos = isMobile() ? (gameHeight - leftRightBtnSize - gameBottomBarHeight) : (gameHeight / 2);
    leftUnitChangeBtn = new TextButton(tr(vec2(0, ypos), toVec2(leftRightBtnSize)),
        new Label(tr(), "<<", fontSize.toString() + "px " + uiContext.fontFamily), new Button(tr(), "#00000088", "#FFFFFFFF", "#000000DD"));
    gameplay.push(leftUnitChangeBtn);
    rightUnitChangeBtn = new TextButton(tr(vec2(gameWidth - (leftRightBtnSize), ypos), toVec2(leftRightBtnSize)),
        new Label(tr(), ">>", fontSize.toString() + "px " + uiContext.fontFamily), new Button(tr(), "#00000088", "#FFFFFFFF", "#000000DD"));
    gameplay.push(rightUnitChangeBtn);
    quickStatsUISetup(fontSize);
    unitActionUISetup(fontSize);
    overviewUISetup(fontSize);
    buildingPanelSetup();
}

function gameplaySetup() {
    gameBottomBarHeight = isMobile() ? (gameHeight / 6) : 140 * pixelSize;

    for(let i = 0; i < TOTAL_DEFAULT_MAPS; i++)
        maps.push(readFile("maps/map" + i.toString() + ".txt"));

    map = new GameMap(maps[currentMapIndex]);
    manager = new PlayerManager(map);
    gameplayStatIndex = manager.index;
    manager.saveState();

    cam = vec2(Math.floor((gameWidth / maxDisplayTilesPerRow) / 2), Math.floor((gameWidth / maxDisplayTilesPerRow) / 2));

    gameplayUISetup();
    updateUnitActionButtons();
    gameplayReset();
}

function gameplayResize() {

}

function gameplayDraw(deltaTime) {
    if(isMobile() && maxDisplayTilesPerRow == totalTilesInRow) {
        map.drawInRect(toVec2((gameWidth/2)/MAP_SIZE.x).add(vec2(0, (pixelSize/4) * 1024)), toVec2(gameWidth));
        manager.drawInRect(toVec2((gameWidth/2)/MAP_SIZE.x).add(vec2(0, (pixelSize/4) * 1024)), toVec2(gameWidth));
        if(dialogues.length <= 0) overviewUIDraw(cam);
        unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;

        var COoffset = isMobile() ? (gameWidth / 4) : (gameWidth / 8);
        var COheight = isMobile() ? ((pixelSize / 4) * 512) : gameHeight - ((pixelSize / 4) * 512);

        //Dark CO bodies
        spritesRenderer.globalCompositeOperation = "overlay";
        for(let i = 0; i < manager.players.length; i++) {
            if(manager.players[i] != -1 && manager.players[i].control != -1) {
                bodyNFacesSheet.transform.position = vec2((COoffset/2) + (COoffset * (manager.players[i].CO > HULU ? HULU : manager.players[i].CO)), COheight);
                bodyNFacesSheet.transform.scale = toVec2(pixelSize / 4);
                bodyNFacesSheet.drawScIn(vec2(1024 * manager.players[i].CO), toVec2(1024));
            }
        }
        spritesRenderer.globalCompositeOperation = "source-over";

        drawCircle(renderer, getPlayer().unitGroup.mapUnits[getPlayer().getHQUnitIndex()].unit.position,
            16.0*pixelSize, false, "white", 4.0*pixelSize);
        //Selected CO body
        bodyNFacesSheet.transform.position = vec2((COoffset/2) + (COoffset * (getPlayer().CO > HULU ? HULU : getPlayer().CO)), COheight);
        bodyNFacesSheet.transform.scale = toVec2(pixelSize / 4);
        bodyNFacesSheet.drawScIn(vec2(1024 * getPlayer().CO), toVec2(1024));

        versusCOName.text = COSPECIFICS[getPlayer().CO].name;
        versusCOPower.text = COSPECIFICS[getPlayer().CO].powerName;
        versusCODesc.text = COSPECIFICS[getPlayer().CO].powerDesc;

        versusCOName.draw();
        versusCOPower.draw();
        versusCODesc.draw();
    } else {
        map.draw(cam);
        manager.draw(cam);
        drawTileParticles(deltaTime, cam);
        map.drawUnitExtras();
        if(dialogues.length <= 0) overviewUIDraw(cam);
        else dialogueDraw();
    }

    if(maxDisplayTilesPerRow == defaultTilesPerRow) {
        drawRect(renderer, vec2(), vec2(gameWidth, (isMobile() ? 80 : 25) * pixelSize), true, "#00000066"); //Control BG Bar
    } else {
        unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
    }
}

function gameplayUIDisplayUpdate() {
    if (!getPlayer().getSelectedMapUnit().unit.isBuilding || getPlayer().control == 1) {
        if(getPlayer().getSelectedMapUnit().unit.deployTime <= 0) {
            unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled =
                (cam.distance(getPlayer().getCameraPosition()) < 2.5 * pixelSize
                && getPlayer().getSelectedMapUnit().mapPathIndex <= -1);

            if (getPlayer().getSelectedMapUnit().up == 0
            || getPlayer().getSelectedMapUnit().left == 0
            || getPlayer().getSelectedMapUnit().right == 0)
                leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled =
                unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
            else if (controlBar[0].enabled)
                leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = true;
        } else {
            unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
        }
    } else
        buildingPanelUpdate(getPlayer().getSelectedMapUnit());

    if (unitUpBtn.button.output != UIOUTPUT_SELECT) unitUpBtn.button.output = getPlayer().getSelectedMapUnit().up == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitLeftBtn.button.output != UIOUTPUT_SELECT) unitLeftBtn.button.output = getPlayer().getSelectedMapUnit().left == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitRightBtn.button.output != UIOUTPUT_SELECT) unitRightBtn.button.output = getPlayer().getSelectedMapUnit().right == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    
    if (getPlayer().actionPoints <= 0
    && getPlayer().getSelectedMapUnit().unit.type != HQ_BUILDING)
        unitUpBtn.button.output = unitLeftBtn.button.output
        = unitRightBtn.button.output = UIOUTPUT_DISABLED;

    if (getPlayer().getSelectedMapUnit().unit.type == HQ_BUILDING
    && getPlayer().powerMeter < 0.999) {
        unitUpBtn.button.output = UIOUTPUT_DISABLED;
    }
    
    if (getPlayer().getSelectedMapUnit().unit.ammo == 0
    || isTileOnSmoke(getPlayer().getSelectedMapUnit().mapPosition)) {
        if(getPlayer().getSelectedMapUnit().unit.type == TELEPORT_MECH) unitLeftBtn.button.output = UIOUTPUT_DISABLED;
        else unitRightBtn.button.output = UIOUTPUT_DISABLED;
    }
    
    if (((getPlayer().getSelectedMapUnit().unit.type == RIFLE_MECH
    || getPlayer().getSelectedMapUnit().unit.type == ARTILLERY_MECH)
    && getPlayer().getSelectedMapUnit().unit.smokeAmmo == 0)
    || (getPlayer().getSelectedMapUnit().unit.type == CANNON_MECH
    && getPlayer().getSelectedMapUnit().unit.boost < 0))
        unitLeftBtn.button.output = UIOUTPUT_DISABLED;
}

function gameplayUpdate(deltaTime) {
    if(gameplaySilence)
        playBGM(-1);
    else if(getPlayer().powered) {
        if(getPlayer().CO == HULU || getPlayer().CO == JONAH)
            playBGM(BGM_BADPOWER);
        else
            playBGM(BGM_GOODPOWER);
    } else
        playBGM(BGM_GAMEPLAY);

    if(dialogues.length <= 0) {
        aiUpdate(deltaTime);

        if (maxDisplayTilesPerRow == defaultTilesPerRow && !camDetached) {
            if(getPlayer().focusMUnit(deltaTime, cam)) {
                cam = lerpVec2(cam, getPlayer().focus[0].mUnit.getCameraPosition(), 0.4);
            } else {
                cam = lerpVec2(cam, getPlayer().getCameraPosition(), 0.25);
            }
        } else if(camDetached && isTouchMoved) {
            cam = cam.add(relTouchPos[0]);
            relTouchPos[0] = relTouchPos[0].multiply(toVec2(0.5));
        }

        gameplayUIDisplayUpdate();

        controlBarUIUpdate();
        quickStatsUIUpdate();

        if(isMobile() && getPlayer().getSelectedMapUnit().unit.type == WAR_BUILDING) {
            qStatsPanel.enabled = gameplayZoomBtn.enabled = false;
        } else {
            gameplayZoomBtn.enabled = true;
        }
        
    } else {
        dialogueUpdate(deltaTime);
        qStatsPanel.enabled = gameplayZoomBtn.enabled = 
        unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
    }
}

function changeSelectedUnit(val) {
    playSFX(SFX_SELECT);
    stepBackAction();
    var limit = 128;
    do { getPlayer().selectedIndex += val; limit--;
    if (getPlayer().selectedIndex <= -1) getPlayer().selectedIndex = getPlayer().unitGroup.mapUnits.length - 1;
    else if (getPlayer().selectedIndex >= getPlayer().unitGroup.mapUnits.length) getPlayer().selectedIndex = 0;
    } while ((getPlayer().getSelectedMapUnit().unit.type == RUIN_BUILDING
    || getPlayer().getSelectedMapUnit().unit.type == CITY_BUILDING) && limit > 0);
    updateUnitActionButtons();
}

function gameplayEvent(deltaTime) {
    if(dialogues.length > 0) return;

    map.getCursorTile(cam);

    if(isRightClick) {
        if(!stepBackAction()
        && getPlayer().selectedIndex != getPlayer().getHQUnitIndex()
        && getPlayer().getHQUnitIndex() != -1) {
            getPlayer().selectedIndex = getPlayer().getHQUnitIndex();
            updateUnitActionButtons();
        }
    }

    controlBarUIEvents();
    overviewUIEvents();

    if (isKey('ArrowLeft')) changeSelectedUnit(-1);
    if (isKey('ArrowRight')) changeSelectedUnit(1);

    //Gameplay UI Button Events
    if (leftUnitChangeBtn.button.output == UIOUTPUT_SELECT) {
        changeSelectedUnit(-1);
        leftUnitChangeBtn.button.resetOutput();
    }
    else if (rightUnitChangeBtn.button.output == UIOUTPUT_SELECT) {
        changeSelectedUnit(1);
        rightUnitChangeBtn.button.resetOutput();
    }
    else if (unitUpBtn.button.output == UIOUTPUT_SELECT) {
        playSFX(SFX_SELECT);
        if(getPlayer().getSelectedMapUnit().unit.type == HQ_BUILDING) {
            if(getPlayer().powerMeter >= 0.999) {
                activatePower();
                getPlayer().powerMeter = 0.0;
            }
        } else {
            getPlayer().getSelectedMapUnit().up = 0;
            if(isMobile()) camDetached = true;
            resetTurnBtn.label.text = "Cancel";
        }
        unitUpBtn.button.resetOutput();
    }
    else if (unitLeftBtn.button.output == UIOUTPUT_SELECT) {
        playSFX(SFX_SELECT);
        if(getPlayer().getSelectedMapUnit().unit.type == HQ_BUILDING) {
            unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
            getPlayer().getSelectedMapUnit().hp = 0;
        } else {
            getPlayer().getSelectedMapUnit().left = 0;
            if(isMobile()) camDetached = true;
            resetTurnBtn.label.text = "Cancel";
        }
        unitLeftBtn.button.resetOutput();
    }
    else if (unitRightBtn.button.output == UIOUTPUT_SELECT) {
        playSFX(SFX_SELECT);
        if(getPlayer().getSelectedMapUnit().unit.type == HQ_BUILDING) {
            manager.endTurn();
        } else {
            getPlayer().getSelectedMapUnit().right = 0;
            if(isMobile()) camDetached = true;
            resetTurnBtn.label.text = "Cancel";
        }
        unitRightBtn.button.resetOutput();
    }

    if(lastMouseBtn != 2) map.event();
    buildingPanelEvent();
}
