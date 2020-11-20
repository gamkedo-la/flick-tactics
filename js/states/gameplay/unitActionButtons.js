
function unitActionUISetup() {
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

function updateUnitActionButtons() {
    switch (getPlayer().unitGroup.mapUnits[getPlayer().selectedIndex].unit.type) {
        case RIFLE_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SMOKE"; //no
            unitDownBtn.label.text = "EMP"; //no
            unitRightBtn.label.text = "ATTACK";
            break;

        case CANNON_MECH:
            unitUpBtn.label.text = "MOVE"; //push->no
            unitLeftBtn.label.text = "BOOST"; //no
            unitDownBtn.label.text = "MINI-ART"; //no; push->no
            unitRightBtn.label.text = "ATTACK";
            break;

        case ARTILLERY_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SMOKE"; //no
            unitDownBtn.label.text = "SHIELD"; //no
            unitRightBtn.label.text = "ATTACK"; //push
            break;

        case SUPPORT_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SUPPLY"; //no
            unitDownBtn.label.text = "REPAIR"; //no
            unitRightBtn.label.text = "TACKLE"; //push
            break;

        case TELEPORT_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "TELEPORT"; //no
            unitDownBtn.label.text = "SHIELD"; //no
            unitRightBtn.label.text = "TACKLE";
            break;
    }
}