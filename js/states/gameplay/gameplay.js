const GAMEPLAY = 1;
var gameplay = [];

//Helper Function: 'manager.getActivePlayer()' => 'getPlayer()'

function getPlayer() { return manager.getActivePlayer(); }

function gameplayReset() {

}

function getActiveTeamColor() {
    if (ui.stateIndex != GAMEPLAY)
        return "#000000";
    switch (getPlayer().unitGroup.teamID) {
        case RED_TEAM:
            return "#c32454";
        case BLUE_TEAM:
            return "#4d65b4";
        case GREEN_TEAM:
            return "#239063";
        case BLACK_TEAM:
            return "#625565";
        default:
            return "#000000";
    }
}

function gameplaySetup() {
    gameBottomBarHeight = 140 * pixelSize;

    map = new GameMap(maps[currentMapIndex]);
    manager = new PlayerManager(map);

    cam = vec2(Math.floor((gameWidth / maxDisplayTilesPerRow) / 2), Math.floor((gameWidth / maxDisplayTilesPerRow) / 2));

    //Gameplay UI START
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
    //Gameplay UI END

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
    overviewUIDraw(cam);
}

function gameplayUpdate(deltaTime) {
    playBGM(BGM_WORLDMAP);
    if (maxDisplayTilesPerRow == defaultTilesPerRow)
        cam = lerpVec2(cam, getPlayer().getCameraPosition(), 0.25);

    if (!getPlayer().getSelectedMapUnit().unit.isBuilding) {
        buildingPanel.enabled = false;

        if(getPlayer().getSelectedMapUnit().unit.deployTime <= 0) {
            unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled =
                (cam.distance(getPlayer().getCameraPosition()) < 2.5 * pixelSize);

            if (getPlayer().getSelectedMapUnit().up == 0 || getPlayer().getSelectedMapUnit().left == 0 ||
                getPlayer().getSelectedMapUnit().down == 0 || getPlayer().getSelectedMapUnit().right == 0) {
                leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled =
                    unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled = false;
            }
            else if (controlBar[0].enabled) {
                leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = true;
            }
        } else {
            unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled = false;
        }
    }
    else {
        buildingPanelUpdate(getPlayer().getSelectedMapUnit());
    }

    if (unitUpBtn.button.output != UIOUTPUT_SELECT)
        unitUpBtn.button.output = getPlayer().getSelectedMapUnit().up == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitLeftBtn.button.output != UIOUTPUT_SELECT)
        unitLeftBtn.button.output = getPlayer().getSelectedMapUnit().left == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitDownBtn.button.output != UIOUTPUT_SELECT)
        unitDownBtn.button.output = getPlayer().getSelectedMapUnit().down == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitRightBtn.button.output != UIOUTPUT_SELECT)
        unitRightBtn.button.output = getPlayer().getSelectedMapUnit().right == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;

    if (getPlayer().actionPoints <= 0)
        unitUpBtn.button.output = unitLeftBtn.button.output = unitDownBtn.button.output = unitRightBtn.button.output = UIOUTPUT_DISABLED;

    controlBarUIUpdate();
    quickStatsUIUpdate();
}

function gameplayEvent(deltaTime) {

    controlBarUIEvents();
    overviewUIEvents();

    //Gameplay UI Button Events
    if (leftUnitChangeBtn.button.output == UIOUTPUT_SELECT) {
        getPlayer().selectedIndex--;
        if (getPlayer().selectedIndex <= -1) getPlayer().selectedIndex = getPlayer().unitGroup.mapUnits.length - 1;
        updateUnitActionButtons();
        leftUnitChangeBtn.button.resetOutput();
    }
    else if (rightUnitChangeBtn.button.output == UIOUTPUT_SELECT) {
        getPlayer().selectedIndex++;
        if (getPlayer().selectedIndex >= getPlayer().unitGroup.mapUnits.length) getPlayer().selectedIndex = 0;
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
    else if (unitDownBtn.button.output == UIOUTPUT_SELECT) {
        getPlayer().getSelectedMapUnit().down = 0;
        unitDownBtn.button.resetOutput();
    }
    else if (unitRightBtn.button.output == UIOUTPUT_SELECT) {
        getPlayer().getSelectedMapUnit().right = 0;
        unitRightBtn.button.resetOutput();
    }

    map.event();
    buildingPanelEvent();
}
