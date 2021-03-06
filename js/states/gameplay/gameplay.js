const GAMEPLAY = 1;
var gameplay = [];

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
    //Resetting building panel properties
    buildingPanelCOSelection = 0;
}

function gameplayUISetup() {
    var fontSize = 18.0 * pixelSize;

    controlBarUISetup(fontSize);

    leftUnitChangeBtn = new TextButton(tr(vec2(0, gameHeight / 2), vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), "<<"),
        new Button(tr(), "#00000088", "#FFFFFFFF", "#000000DD"));
    gameplay.push(leftUnitChangeBtn);
    rightUnitChangeBtn = new TextButton(tr(vec2(gameWidth - (50 * pixelSize), gameHeight / 2), vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), ">>"),
        new Button(tr(), "#00000088", "#FFFFFFFF", "#000000DD"));
    gameplay.push(rightUnitChangeBtn);

    quickStatsUISetup();

    unitActionUISetup();

    overviewUISetup(fontSize);

    buildingPanelSetup();
    gameplay.push(buildingPanel);

    helpMenuSetup();
    gameplay.push(helpMenu);
}

function gameplaySetup() {
    gameBottomBarHeight = 140 * pixelSize;

    for(let i = 0; i < 16; i++)
        maps.push(readFile("maps/map" + i.toString() + ".txt"));

    map = new GameMap(maps[currentMapIndex]);
    manager = new PlayerManager(map);
    manager.saveState();

    cam = vec2(Math.floor((gameWidth / maxDisplayTilesPerRow) / 2), Math.floor((gameWidth / maxDisplayTilesPerRow) / 2));

    gameplayUISetup();
    updateUnitActionButtons();
    gameplayReset();
}

function gameplayResize() {

}

function gameplayDraw(deltaTime) {
    map.draw(cam);
    manager.draw(cam);
    drawTileParticles(deltaTime, cam);
    map.drawUnitExtras();
    if(dialogues.length <= 0) overviewUIDraw(cam);
    else dialogueDraw();
}

function gameplayUIDisplayUpdate() {
    if (!getPlayer().getSelectedMapUnit().unit.isBuilding || getPlayer().control == 1) {
        buildingPanel.enabled = false;

        if(getPlayer().getSelectedMapUnit().unit.deployTime <= 0) {
            unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled =
                (cam.distance(getPlayer().getCameraPosition()) < 2.5 * pixelSize);

            if (getPlayer().getSelectedMapUnit().up == 0
            || getPlayer().getSelectedMapUnit().left == 0
            || getPlayer().getSelectedMapUnit().right == 0) {
                leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled =
                    unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
            }
            else if (controlBar[0].enabled) {
                leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = true;
            }
        } else {
            unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
        }
    }
    else {
        buildingPanelUpdate(getPlayer().getSelectedMapUnit());
    }

    if (unitUpBtn.button.output != UIOUTPUT_SELECT) unitUpBtn.button.output = getPlayer().getSelectedMapUnit().up == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitLeftBtn.button.output != UIOUTPUT_SELECT) unitLeftBtn.button.output = getPlayer().getSelectedMapUnit().left == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitRightBtn.button.output != UIOUTPUT_SELECT) unitRightBtn.button.output = getPlayer().getSelectedMapUnit().right == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    
    if (getPlayer().actionPoints <= 0)
        unitUpBtn.button.output = unitLeftBtn.button.output
        = unitRightBtn.button.output = UIOUTPUT_DISABLED;
    
    if (getPlayer().getSelectedMapUnit().unit.ammo == 0
    || isTileOnSmoke(getPlayer().getSelectedMapUnit().mapPosition))
        unitRightBtn.button.output = UIOUTPUT_DISABLED;
    
    if ((getPlayer().getSelectedMapUnit().unit.type == RIFLE_MECH
    || getPlayer().getSelectedMapUnit().unit.type == ARTILLERY_MECH)
    && getPlayer().getSelectedMapUnit().unit.smokeAmmo == 0)
        unitLeftBtn.button.output = UIOUTPUT_DISABLED;
}

function gameplayUpdate(deltaTime) {
    playBGM(BGM_WORLDMAP);

    if(dialogues.length <= 0) {

        aiUpdate(deltaTime);

        if (maxDisplayTilesPerRow == defaultTilesPerRow)
            cam = lerpVec2(cam, getPlayer().getCameraPosition(), 0.25);

        gameplayUIDisplayUpdate();

        controlBarUIUpdate();
        quickStatsUIUpdate();

        gameplayZoomBtn.enabled = true;

    } else {
        dialogueUpdate(deltaTime);
        buildingPanel.enabled = qStatsPanel.enabled = gameplayZoomBtn.enabled = false;
    }
}

function gameplayEvent(deltaTime) {

    if(dialogues.length > 0) return;

    controlBarUIEvents();
    overviewUIEvents();

    if(isRightClick) {
        if(!stepBackAction()
        && getPlayer().selectedIndex != getPlayer().getHQUnitIndex()
        && getPlayer().getHQUnitIndex() != -1)
            getPlayer().selectedIndex = getPlayer().getHQUnitIndex();
    }
    if(getPlayer().getSelectedMapUnit().up == 0 || getPlayer().getSelectedMapUnit().left == 0 || getPlayer().getSelectedMapUnit().right == 0)
        resetTurnBtn.label.text = "Cancel";
    else
        resetTurnBtn.label.text = "Reset";

    //Gameplay UI Button Events
    if (leftUnitChangeBtn.button.output == UIOUTPUT_SELECT) {
        var limit = 128;
        do { getPlayer().selectedIndex--; limit--;
        if (getPlayer().selectedIndex <= -1) getPlayer().selectedIndex = getPlayer().unitGroup.mapUnits.length - 1;
        } while (getPlayer().getSelectedMapUnit().unit.type == RUIN_BUILDING && limit > 0);
        updateUnitActionButtons();
        leftUnitChangeBtn.button.resetOutput();
    }
    else if (rightUnitChangeBtn.button.output == UIOUTPUT_SELECT) {
        var limit = 128;
        do { getPlayer().selectedIndex++; limit--;
        if (getPlayer().selectedIndex >= getPlayer().unitGroup.mapUnits.length) getPlayer().selectedIndex = 0;
        } while (getPlayer().getSelectedMapUnit().unit.type == RUIN_BUILDING && limit > 0);
        updateUnitActionButtons();
        rightUnitChangeBtn.button.resetOutput();
    }
    else if (unitUpBtn.button.output == UIOUTPUT_SELECT) {
        getPlayer().getSelectedMapUnit().up = 0;
        unitUpBtn.button.resetOutput();
    }
    else if (unitLeftBtn.button.output == UIOUTPUT_SELECT) {
        getPlayer().getSelectedMapUnit().left = 0;
        unitLeftBtn.button.resetOutput();
    }
    else if (unitRightBtn.button.output == UIOUTPUT_SELECT) {
        getPlayer().getSelectedMapUnit().right = 0;
        unitRightBtn.button.resetOutput();
    }

    map.event();
    buildingPanelEvent();
}
