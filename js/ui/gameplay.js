const GAMEPLAY = 1;
var gameplay = [];

//Helper Function: 'manager.getActivePlayer()' => 'getPlayer()'
function getPlayer() { return manager.getActivePlayer(); }

function gameplayReset() {

}

function controlBarUISetup(fontSize) {
    controlBar = [];
    controlBar.push(new Label(tr(), ""));
    controlBar.push(new Label(tr(), ""));
    controlBar.push(new Label(tr(), ""));
    actionPointsLabel = new Label(tr(), "AP: " + getPlayer().actionPoints.toString(),
        fontSize.toString() + "px " + uiContext.fontFamily);
    controlBar.push(actionPointsLabel);
    resetTurnBtn = new TextButton(tr(),
        new Label(tr(), "Reset", fontSize.toString() + "px " + uiContext.fontFamily, "black"),
        new Button(tr(), "#FFFFFFFF", "#000000FF", "#FFFFFF99"));
    controlBar.push(resetTurnBtn);
    endTurnBtn = new TextButton(tr(),
        new Label(tr(), "END", fontSize.toString() + "px " + uiContext.fontFamily, "black"),
        new Button(tr(), "#FFFFFFFF", "#000000FF", "#FFFFFF99"));
    controlBar.push(endTurnBtn);
    controlBar.push(new Label(tr(), ""));
    controlBar.push(new Label(tr(), ""));
    controlBar.push(new Label(tr(), ""));
    gameplay.push(new FlexGroup(tr(vec2(0.01, 0.01), vec2(gameWidth, 25 * pixelSize)),
        new SubState(tr(), controlBar), false, vec2(10 * pixelSize, 0), vec2(9, 1), true));
}

function unitControlsUISetup() {
    unitUpBtn = new Button(tr(vec2((gameWidth / 2) - (25 * pixelSize), (gameHeight / 2) - (100 * pixelSize)), vec2(50 * pixelSize, 50 * pixelSize)), "#00000066", "#FFFFFFFF", "#000000BB", "#FF000044");
    gameplay.push(unitUpBtn);
    unitLeftBtn = new Button(tr(vec2((gameWidth / 2) - (100 * pixelSize), (gameHeight / 2) - (25 * pixelSize)), vec2(50 * pixelSize, 50 * pixelSize)), "#00000066", "#FFFFFFFF", "#000000BB", "#FF000044");
    gameplay.push(unitLeftBtn);
    unitDownBtn = new Button(tr(vec2((gameWidth / 2) - (25 * pixelSize), (gameHeight / 2) + (50 * pixelSize)), vec2(50 * pixelSize, 50 * pixelSize)), "#00000066", "#FFFFFFFF", "#000000BB", "#FF000044");
    gameplay.push(unitDownBtn);
    unitRightBtn = new Button(tr(vec2((gameWidth / 2) + (50 * pixelSize), (gameHeight / 2) - (25 * pixelSize)), vec2(50 * pixelSize, 50 * pixelSize)), "#00000066", "#FFFFFFFF", "#000000BB", "#FF000044");
    gameplay.push(unitRightBtn);
    unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled = false;
}

function gameplaySetup() {
    map = new GameMap(map1, 16, 16);
    manager = new PlayerManager([
        new Player(RED_TEAM, [
            new MapUnit(RIFLE_MECH, vec2(4, 4)),
            new MapUnit(TELEPORT_MECH, vec2(7, 5)),
            new MapUnit(CANNON_MECH, vec2(9, 5))
        ]),
        new Player(BLACK_TEAM, [
            new MapUnit(RIFLE_MECH, vec2(12, 9)),
            new MapUnit(SUPPORT_MECH, vec2(11, 7)),
            new MapUnit(ARTILLERY_MECH, vec2(14, 8))
        ])
    ]);

    cam = vec2(Math.floor((gameWidth / maxDisplayTilesPerRow) / 2), Math.floor((gameWidth / maxDisplayTilesPerRow) / 2));

    //Gameplay UI START
    var fontSize = 14.0 * pixelSize;
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
    //Gameplay UI END

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
}

function gameplayUpdate(deltaTime) {

    cam = lerpVec2(cam, getPlayer().getCameraPosition(), 0.1);

    // Disabling Unit Action Buttons and Left/Right Unit Buttons START
    unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled =
        (cam.distance(getPlayer().getCameraPosition()) < 2.5 * pixelSize);

    if (getPlayer().getSelectedMapUnit().up == 0 || getPlayer().getSelectedMapUnit().left == 0 ||
        getPlayer().getSelectedMapUnit().down == 0 || getPlayer().getSelectedMapUnit().right == 0) {
        leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled =
            unitUpBtn.enabled = unitLeftBtn.enabled = unitDownBtn.enabled = unitRightBtn.enabled = false;
    }
    else {
        leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = true;
    }

    if (unitUpBtn.output != UIOUTPUT_SELECT)
        unitUpBtn.output = getPlayer().getSelectedMapUnit().up == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitLeftBtn.output != UIOUTPUT_SELECT)
        unitLeftBtn.output = getPlayer().getSelectedMapUnit().left == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitDownBtn.output != UIOUTPUT_SELECT)
        unitDownBtn.output = getPlayer().getSelectedMapUnit().down == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitRightBtn.output != UIOUTPUT_SELECT)
        unitRightBtn.output = getPlayer().getSelectedMapUnit().right == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;

    if (getPlayer().actionPoints <= 0)
        unitUpBtn.output = unitLeftBtn.output = unitDownBtn.output = unitRightBtn.output = UIOUTPUT_DISABLED;
    // Disabling Unit Action Buttons and Left/Right Unit Buttons END
}

function gameplayEvent(deltaTime) {

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

    //Gameplay UI Button Events
    if (endTurnBtn.button.output == UIOUTPUT_SELECT) {
        manager.endTurn();
        actionPointsLabel.text = "AP: " + getPlayer().actionPoints.toString();
        endTurnBtn.button.resetOutput();
    }
    else if (leftUnitChangeBtn.button.output == UIOUTPUT_SELECT) {
        getPlayer().selectedIndex--;
        if (getPlayer().selectedIndex <= -1) getPlayer().selectedIndex = getPlayer().unitGroup.mapUnits.length - 1;
        leftUnitChangeBtn.button.resetOutput();
    }
    else if (rightUnitChangeBtn.button.output == UIOUTPUT_SELECT) {
        getPlayer().selectedIndex++;
        if (getPlayer().selectedIndex >= getPlayer().unitGroup.mapUnits.length) getPlayer().selectedIndex = 0;
        rightUnitChangeBtn.button.resetOutput();
    }
    else if (unitUpBtn.output == UIOUTPUT_SELECT) {
        getPlayer().getSelectedMapUnit().up = 0;
        unitUpBtn.resetOutput();
    }
    else if (unitLeftBtn.output == UIOUTPUT_SELECT) {
        getPlayer().getSelectedMapUnit().left = 0;
        unitLeftBtn.resetOutput();
    }
    else if (unitDownBtn.output == UIOUTPUT_SELECT) {
        getPlayer().getSelectedMapUnit().down = 0;
        unitDownBtn.resetOutput();
    }
    else if (unitRightBtn.output == UIOUTPUT_SELECT) {
        getPlayer().getSelectedMapUnit().right = 0;
        unitRightBtn.resetOutput();
    }
}