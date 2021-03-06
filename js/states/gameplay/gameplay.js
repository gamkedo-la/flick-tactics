const GAMEPLAY = 1;
var gameplay = [];
var gameplaySilence = false;

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
    gameplayStatIndex = 0;
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
    statsUISetup(fontSize);
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
    if(maxDisplayTilesPerRow == totalTilesInRow && isMobile()) {
        statsMobileDraw();
        if(dialogues.length <= 0) overviewUIDraw(cam);
        unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
    } else {
        map.draw(cam);
        manager.draw(cam);
        drawTileParticles(deltaTime, cam);
        map.drawUnitExtras();

        if(maxDisplayTilesPerRow == totalTilesInRow) {
            statsDraw();
        } else {
            drawRect(renderer, vec2(), vec2(gameWidth, (isMobile() ? 80 : 25) * pixelSize), true, "#00000066");

            for(let i = 0; i < statsGroup.length; i++) statsGroup[i].enabled = false;
            statsCOName.enabled = statsCOPower.enabled = statsCODesc.enabled = false;
            statsDisplayBtn.enabled = false;
        }

        if(dialogues.length <= 0) overviewUIDraw(cam);
        else dialogueDraw();
    }
}

function gameplayUIDisplayUpdate() {
    if (!getPlayer().getSelectedMapUnit().unit.isBuilding || getPlayer().control == 1) {
        if(getPlayer().getSelectedMapUnit().unit.deployTime <= 0) {
            unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled =
                (cam.distance(getPlayer().getCameraPosition()) < 2.5 * pixelSize
                && getPlayer().getSelectedMapUnit().mapPathIndex <= -1);

            if (getPlayer().getSelectedMapUnit().up == 0 || getPlayer().getSelectedMapUnit().left == 0 || getPlayer().getSelectedMapUnit().right == 0)
                leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
            else if (controlBar[0].enabled) leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = true;
        } else unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
    } else buildingPanelUpdate(getPlayer().getSelectedMapUnit());

    unitActionUIUpdate();
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
    statsEvent();

    if(lastMouseBtn != 2) map.event();
    buildingPanelEvent();
}
