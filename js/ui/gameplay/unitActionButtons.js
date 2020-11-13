
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