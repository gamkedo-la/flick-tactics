
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

function updateUnitActionButtons() {
    switch (getPlayer().unitGroup.mapUnits[getPlayer().selectedIndex].unit.type) {
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
    }
}