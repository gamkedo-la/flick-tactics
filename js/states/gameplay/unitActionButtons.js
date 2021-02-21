
function unitActionUISetup() {
    unitUpBtn = new TextButton(tr(vec2((gameWidth / 2) - (25 * pixelSize), (gameHeight / 2) - (90 * pixelSize)),
        vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), "", undefined, "white", 0),
        new Button(tr(vec2(),
            vec2(50 * pixelSize, 50 * pixelSize)),
            "#000000BB", "#FFFFFFFF", "#000000DD", "#FF0000BB"));
    gameplay.push(unitUpBtn);
    unitLeftBtn = new TextButton(tr(vec2((gameWidth / 2) - (90 * pixelSize), (gameHeight / 2) + (10 * pixelSize)),
        vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), "", undefined, "white", 0),
        new Button(tr(vec2(),
            vec2(50 * pixelSize, 50 * pixelSize)),
            "#000000BB", "#FFFFFFFF", "#000000DD", "#FF0000BB"));
    gameplay.push(unitLeftBtn);
    unitRightBtn = new TextButton(tr(vec2((gameWidth / 2) + (40 * pixelSize), (gameHeight / 2) + (10 * pixelSize)),
        vec2(50 * pixelSize, 50 * pixelSize)),
        new Label(tr(), "", undefined, "white", 0),
        new Button(tr(vec2(),
            vec2(50 * pixelSize, 50 * pixelSize)),
            "#000000BB", "#FFFFFFFF", "#000000DD", "#FF0000BB"));
    gameplay.push(unitRightBtn);
    unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
}

function updateUnitActionButtons() {
    switch (getPlayer().unitGroup.mapUnits[getPlayer().selectedIndex].unit.type) {
        case RIFLE_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SMOKE"; //no
            unitRightBtn.label.text = "ATTACK";
            break;

        case CANNON_MECH:
            unitUpBtn.label.text = "MOVE"; //push->no
            unitLeftBtn.label.text = "BOOST"; //no
            unitRightBtn.label.text = "ATTACK";
            break;

        case ARTILLERY_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SMOKE"; //no
            unitRightBtn.label.text = "ATTACK"; //push
            break;

        case SUPPORT_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "SUPPLY"; //no
            unitRightBtn.label.text = "REPAIR"; //no
            break;

        case TELEPORT_MECH:
            unitUpBtn.label.text = "MOVE";
            unitLeftBtn.label.text = "TELEPORT"; //no
            unitRightBtn.label.text = "TACKLE";
            break;
    }
}