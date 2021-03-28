
function unitActionUISetup(fontSize) {
    var btnSize = isMobile() ? toVec2(80 * pixelSize) : toVec2(50 * pixelSize);
    unitUpBtn = new TextButton(isMobile() ?
    tr(vec2((gameWidth / 2) - (btnSize.x / 2), gameHeight - btnSize.y - gameBottomBarHeight), btnSize)
    : tr(vec2((gameWidth / 2) - (btnSize.x / 2), (gameHeight / 2) - btnSize.y - (40 * pixelSize)), btnSize),
        new Label(tr(), "", fontSize.toString() + "px " + uiContext.fontFamily, "white", 0),
        new Button(tr(), "#000000BB", "#FFFFFFFF", "#000000DD", "#FF0000BB"));
    gameplay.push(unitUpBtn);
    unitLeftBtn = new TextButton(isMobile() ?
    tr(vec2((gameWidth / 2) - (btnSize.x * 1.75), gameHeight - btnSize.y - gameBottomBarHeight), btnSize)
    : tr(vec2((gameWidth / 2) - btnSize.x - (40 * pixelSize), (gameHeight / 2) + (10 * pixelSize)), btnSize),
        new Label(tr(), "", fontSize.toString() + "px " + uiContext.fontFamily, "white", 0),
        new Button(tr(), "#000000BB", "#FFFFFFFF", "#000000DD", "#FF0000BB"));
    gameplay.push(unitLeftBtn);
    unitRightBtn = new TextButton(isMobile() ?
    tr(vec2((gameWidth / 2) + (btnSize.x * 0.75), gameHeight - btnSize.y - gameBottomBarHeight), btnSize)
    : tr(vec2((gameWidth / 2) + (40 * pixelSize), (gameHeight / 2) + (10 * pixelSize)), btnSize),
        new Label(tr(), "", fontSize.toString() + "px " + uiContext.fontFamily, "white", 0),
        new Button(tr(), "#000000BB", "#FFFFFFFF", "#000000DD", "#FF0000BB"));
    gameplay.push(unitRightBtn);
    unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
}

function unitActionUIUpdate() {
    if (maxDisplayTilesPerRow == totalTilesInRow)
        unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;

    if (unitUpBtn.button.output != UIOUTPUT_SELECT)
        unitUpBtn.button.output = getPlayer().getSelectedMapUnit().up == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitLeftBtn.button.output != UIOUTPUT_SELECT)
        unitLeftBtn.button.output = getPlayer().getSelectedMapUnit().left == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    if (unitRightBtn.button.output != UIOUTPUT_SELECT)
        unitRightBtn.button.output = getPlayer().getSelectedMapUnit().right == -1 ? UIOUTPUT_DISABLED : UIOUTPUT_RUNNING;
    
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

function updateUnitActionButtons() {
    resetTurnBtn.label.text = "Reset";
    switch (getPlayer().getSelectedMapUnit().unit.type) {
        case RIFLE_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SMOKE";
            unitRightBtn.label.text = "ATTACK";
            break;
        case CANNON_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "BOOST";
            unitRightBtn.label.text = "ATTACK";
            break;
        case ARTILLERY_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SMOKE";
            unitRightBtn.label.text = "ATTACK";
            break;
        case SUPPORT_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SUPPLY";
            unitRightBtn.label.text = "REPAIR";
            break;
        case TELEPORT_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "TELEPORT";
            unitRightBtn.label.text = "BOOM!";
            break;
        case HQ_BUILDING:
            unitUpBtn.label.text = "POWER";
            unitLeftBtn.label.text = "YIELD";
            unitRightBtn.label.text = "END";
            break;
    }
}