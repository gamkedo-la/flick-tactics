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

function unitControlsUISetup() {
    unitUpBtn = new TextButton(tr(vec2((gameWidth / 2) - (25 * pixelSize), (gameHeight / 2) - (100 * pixelSize)),
        vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), "", undefined, "white", 0),
        new Button(tr(vec2((gameWidth / 2) - (25 * pixelSize), (gameHeight / 2) - (100 * pixelSize)),
            vec2(50 * pixelSize, 50 * pixelSize)),
            "#00000088", "#FFFFFFFF", "#000000BB", "#FF0000BB"));
    gameplay.push(unitUpBtn);
    unitLeftBtn = new TextButton(tr(vec2((gameWidth / 2) - (100 * pixelSize), (gameHeight / 2) - (25 * pixelSize)),
        vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), "", undefined, "white", 0),
        new Button(tr(vec2((gameWidth / 2) - (100 * pixelSize), (gameHeight / 2) - (25 * pixelSize)),
            vec2(50 * pixelSize, 50 * pixelSize)),
            "#00000088", "#FFFFFFFF", "#000000BB", "#FF0000BB"));
    gameplay.push(unitLeftBtn);
    unitDownBtn = new TextButton(tr(vec2((gameWidth / 2) - (25 * pixelSize), (gameHeight / 2) + (50 * pixelSize)),
        vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), "", undefined, "white", 0),
        new Button(tr(vec2((gameWidth / 2) - (25 * pixelSize), (gameHeight / 2) + (50 * pixelSize)),
            vec2(50 * pixelSize, 50 * pixelSize)),
            "#00000088", "#FFFFFFFF", "#000000BB", "#FF0000BB"));
    gameplay.push(unitDownBtn);
    unitRightBtn = new TextButton(tr(vec2((gameWidth / 2) + (50 * pixelSize), (gameHeight / 2) - (25 * pixelSize)),
        vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), "", undefined, "white", 0),
        new Button(tr(vec2((gameWidth / 2) + (50 * pixelSize), (gameHeight / 2) - (25 * pixelSize)),
            vec2(50 * pixelSize, 50 * pixelSize)),
            "#00000088", "#FFFFFFFF", "#000000BB", "#FF0000BB"));
    gameplay.push(unitRightBtn);
    unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled = false;
}

function gameplaySetup() {
    map = new GameMap(map1, 28, 16);
    manager = new PlayerManager([
        /*new Player(RED_TEAM, [
            new MapUnit(RIFLE_MECH, vec2(4, 4)),
            new MapUnit(CANNON_MECH, vec2(5, 4)),
            new MapUnit(ARTILLERY_MECH, vec2(6, 4)),
            new MapUnit(SUPPORT_MECH, vec2(4, 5)),
            new MapUnit(TELEPORT_MECH, vec2(5, 5))
        ]),
        new Player(BLUE_TEAM, [
            new MapUnit(RIFLE_MECH, vec2(7, 4)),
            new MapUnit(CANNON_MECH, vec2(8, 4)),
            new MapUnit(ARTILLERY_MECH, vec2(9, 4)),
            new MapUnit(SUPPORT_MECH, vec2(7, 5)),
            new MapUnit(TELEPORT_MECH, vec2(8, 5))
        ]),
        new Player(GREEN_TEAM, [
            new MapUnit(RIFLE_MECH, vec2(1, 4)),
            new MapUnit(CANNON_MECH, vec2(2, 4)),
            new MapUnit(ARTILLERY_MECH, vec2(3, 4)),
            new MapUnit(SUPPORT_MECH, vec2(1, 5)),
            new MapUnit(TELEPORT_MECH, vec2(2, 5))
        ]),
        new Player(BLACK_TEAM, [
            new MapUnit(RIFLE_MECH, vec2(2, 3)),
            new MapUnit(CANNON_MECH, vec2(3, 3)),
            new MapUnit(ARTILLERY_MECH, vec2(4, 3)),
            new MapUnit(SUPPORT_MECH, vec2(5, 3)),
            new MapUnit(TELEPORT_MECH, vec2(6, 3))
        ]),*/
        
        new Player(RED_TEAM, [
            new MapUnit(HQ_BUILDING, vec2(2, 2)),
            new MapUnit(RIFLE_MECH, vec2(4, 4)),
            new MapUnit(TELEPORT_MECH, vec2(7, 5)),
            new MapUnit(CANNON_MECH, vec2(9, 5))
        ]),
        new Player(BLACK_TEAM, [
            new MapUnit(HQ_BUILDING, vec2(16, 8)),
            new MapUnit(RIFLE_MECH, vec2(12, 9)),
            new MapUnit(SUPPORT_MECH, vec2(11, 7)),
            new MapUnit(ARTILLERY_MECH, vec2(14, 8))
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
    unitControlsUISetup();
    var zoomBtnSize = pixelSize/1.4;
    gameplayZoomBtn = new TextButton(tr(vec2(0.01, gameHeight - (128 * zoomBtnSize)),
        vec2(128*zoomBtnSize, 128*zoomBtnSize)),
        new Label(tr(), "Q", fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00000000", "#00000000", "#00000000"));
    gameplay.push(gameplayZoomBtn);
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

    if(getPlayer().getSelectedMapUnit().unit.isBuilding)
        drawBuildingPanel();

    if(gameplayZoomBtn.button.output == UIOUTPUT_HOVER)
    {
        var oldzoomBtnSize = pixelSize/1.4;
        var zoomBtnSize = pixelSize/1.3;
        if(!zoomLock)
        {
            gameplayZoomBtn.label.text = "ZOOM LOCK OFF";
            gameplayZoomBtn.label.textColor = "#FFBBBBFF";
        }
        else
        {
            gameplayZoomBtn.label.text = "ZOOM LOCK ON";
            gameplayZoomBtn.label.textColor = "#00FF00FF";
        }
        drawSheet(18, vec2(32 * oldzoomBtnSize, gameHeight - (96 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(19, vec2(96 * oldzoomBtnSize, gameHeight - (96 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(38, vec2(32 * oldzoomBtnSize, gameHeight - (32 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(39, vec2(96 * oldzoomBtnSize, gameHeight - (32 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
    }
    else
    {
        var zoomBtnSize = pixelSize/1.4;
        gameplayZoomBtn.label.text = "Q";
        gameplayZoomBtn.label.textColor = "white";
        drawSheet(18, vec2(32 * zoomBtnSize, gameHeight - (96 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(19, vec2(96 * zoomBtnSize, gameHeight - (96 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(38, vec2(32 * zoomBtnSize, gameHeight - (32 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(39, vec2(96 * zoomBtnSize, gameHeight - (32 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
    }
}

function gameplayUpdate(deltaTime) {

    if(maxDisplayTilesPerRow == defaultTilesPerRow)
        cam = lerpVec2(cam, getPlayer().getCameraPosition(), 0.25);

    if(!getPlayer().unitGroup.mapUnits[getPlayer().selectedIndex].unit.isBuilding)
    {
        // Disabling Unit Action Buttons and Left/Right Unit Buttons START
        unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled =
            (cam.distance(getPlayer().getCameraPosition()) < 2.5 * pixelSize);

        if (getPlayer().getSelectedMapUnit().up == 0 || getPlayer().getSelectedMapUnit().left == 0 ||
            getPlayer().getSelectedMapUnit().down == 0 || getPlayer().getSelectedMapUnit().right == 0) {
            leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled =
                unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled = false;
        }
        else if(controlBar[0].enabled) {
            leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = true;
        }
    }
    else
    {
        unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled = false;
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

    if(keysDown.indexOf('q') != -1) {
        if(!isKeyPressed('q')) {
            zoomLock = !zoomLock;
            if(maxDisplayTilesPerRow == defaultTilesPerRow) {
                disableControlBar();
                leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = false;
                maxDisplayTilesPerRow = zoomedTilesPerRow;
                updateTileSizes();
            }
        }
    }
    else {
        removeKeyPressed('q');
    }

    //Unit Action Completion Events
    if (getPlayer().getSelectedMapUnit().up == 0) {
        if (map.eventUnitMovement(getPlayer().getSelectedMapUnit())) {
            getPlayer().actionPoints--;
            actionPointsLabel.text = "AP: " + getPlayer().actionPoints.toString();
        }
    }
    else if (getPlayer().getSelectedMapUnit().right == 0) {
        if (map.eventUnitAttack(getPlayer().getSelectedMapUnit())) {
            getPlayer().actionPoints--;
            actionPointsLabel.text = "AP: " + getPlayer().actionPoints.toString();
        }
    }

    //Gameplay Zoom Button Events START
    if(gameplayZoomBtn.button.output == UIOUTPUT_SELECT) {
        zoomLock = !zoomLock;
    }
    if(gameplayZoomBtn.button.output == UIOUTPUT_HOVER) {
        if(maxDisplayTilesPerRow == defaultTilesPerRow) {
            disableControlBar();
            leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = false;
            maxDisplayTilesPerRow = zoomedTilesPerRow;
            updateTileSizes();
        }
    }
    else if(maxDisplayTilesPerRow == zoomedTilesPerRow && !zoomLock)
    {
        enableControlBar();
        leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = true;
        maxDisplayTilesPerRow = defaultTilesPerRow;
        updateTileSizes();
    }
    if(maxDisplayTilesPerRow == zoomedTilesPerRow) {
        cam.x = 24.0 * pixelSize;
        cam.y = 24.0 * pixelSize;
    }
    if(wheelScroll != 0.0 && zoomLock)
    {
        zoomedTilesPerRow += wheelScroll/20.0;
        zoomedTilesPerRow = clamp(zoomedTilesPerRow, 6.0, 60.0);
        wheelScroll = 0.0;
        maxDisplayTilesPerRow = zoomedTilesPerRow;
        updateTileSizes();
    }
    //Gameplay Zoom Button Events END

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
}