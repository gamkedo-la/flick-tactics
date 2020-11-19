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
    map = new GameMap(map1, 28, 16);
    //map = new GameMap(map2, 14, 8);
    manager = new PlayerManager([
        new Player(RED_TEAM, [
            new MapUnit(HQ_BUILDING, vec2(2, 2)),
            new MapUnit(CITY_BUILDING, vec2(3, 3)),
            new MapUnit(WAR_BUILDING, vec2(4, 3)),
            new MapUnit(RUIN_BUILDING, vec2(6, 6)),
            new MapUnit(RIFLE_MECH, vec2(4, 4)),
            new MapUnit(TELEPORT_MECH, vec2(7, 5)),
            new MapUnit(CANNON_MECH, vec2(9, 5))
        ]),
        new Player(BLACK_TEAM, [
            new MapUnit(HQ_BUILDING, vec2(16, 8)),
            new MapUnit(CITY_BUILDING, vec2(17, 6)),
            new MapUnit(RIFLE_MECH, vec2(12, 9)),
            new MapUnit(SUPPORT_MECH, vec2(11, 7)),
            new MapUnit(ARTILLERY_MECH, vec2(14, 8))
            /*new MapUnit(HQ_BUILDING, vec2(5, 8)),
            new MapUnit(CITY_BUILDING, vec2(5, 6)),
            new MapUnit(RIFLE_MECH, vec2(5, 9)),
            new MapUnit(SUPPORT_MECH, vec2(5, 7)),
            new MapUnit(ARTILLERY_MECH, vec2(5, 8))*/
        ])
    ]);

    cam = vec2(Math.floor((gameWidth / maxDisplayTilesPerRow) / 2), Math.floor((gameWidth / maxDisplayTilesPerRow) / 2));

    //Gameplay UI START
    var fontSize = 18.0 * pixelSize;
    controlBarUISetup(fontSize);
    leftUnitChangeBtn = new TextButton(tr(vec2(0.01, gameHeight / 2), vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), "<<"),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    gameplay.push(leftUnitChangeBtn);
    rightUnitChangeBtn = new TextButton(tr(vec2(gameWidth - (50 * pixelSize), gameHeight / 2), vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), ">>"),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    gameplay.push(rightUnitChangeBtn);
    unitActionUISetup();
    overviewUISetup(fontSize);
    buildingPanelSetup();
    gameplay.push(buildingPanel);
    //Gameplay UI END

    updateUnitActionButtons();

    gameplayReset();
}


function gameplayResize() {

}

function gameplayDraw(deltaTime) {
    map.draw(cam);
    manager.draw(cam);

    if (getPlayer().getSelectedMapUnit().up == 0) {
        map.drawUnitMovement(cam, getPlayer().getSelectedMapUnit());
    }
    else if (getPlayer().getSelectedMapUnit().right == 0) {
        map.drawUnitAttack(cam, getPlayer().getSelectedMapUnit());
    }

    overviewUIDraw(cam);
}

function gameplayUpdate(deltaTime) {

    if (maxDisplayTilesPerRow == defaultTilesPerRow)
        cam = lerpVec2(cam, getPlayer().getCameraPosition(), 0.25);

    if (!getPlayer().unitGroup.mapUnits[getPlayer().selectedIndex].unit.isBuilding) {
        buildingPanel.enabled = false;
        // Disabling Unit Action Buttons and Left/Right Unit Buttons START
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
    }
    else {
        buildingPanelUpdate();
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
    // Disabling Unit Action Buttons and Left/Right Unit Buttons END
}

function gameplayEvent(deltaTime) {

    overviewUIEvents();

    //Gameplay UI Button Events
    if (endTurnBtn.button.output == UIOUTPUT_SELECT) {
        manager.endTurn();
        actionPointsLabel.text = "AP: " + getPlayer().actionPoints.toString();
        endTurnBtn.button.resetOutput();
    }
    else if (leftUnitChangeBtn.button.output == UIOUTPUT_SELECT) {
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
}