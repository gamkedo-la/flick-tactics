const EDITOR = 6;
var editor = [];
var editorCam = vec2();
var editorCamMove = 0.5;

var editorMap =
    "01.01.01.01.01.02.02.02.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01." +
    "01.03.01.00.02.02.02.02.00.00.00.00.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01." +
    "01.03.03.00.00.05.02.02.02.00.00.00.00.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01." +
    "01.00.00.00.00.00.02.02.02.02.02.00.00.00.00.01.01.01.03.01.01.01.01.01.01.01.01.01." +
    "01.01.00.00.00.00.02.02.02.00.00.01.01.01.02.02.01.01.03.03.01.01.01.01.01.01.01.01." +
    "04.01.01.00.00.00.00.02.00.00.01.01.02.02.02.02.01.01.01.01.01.01.01.01.01.01.01.01." +
    "04.04.01.00.00.00.00.00.00.01.02.02.02.02.02.02.01.01.02.01.01.01.01.01.01.01.01.01." +
    "00.04.05.01.01.01.01.01.01.01.01.02.02.02.02.01.01.02.02.00.00.00.00.01.01.01.01.01." +
    "00.03.01.01.01.02.02.02.01.01.01.01.01.01.01.01.02.02.02.02.00.00.00.00.01.01.01.01." +
    "01.00.03.02.02.02.02.02.02.02.00.00.01.01.01.01.01.01.02.02.02.02.00.00.00.00.01.01." +
    "01.01.03.00.02.02.02.02.02.00.00.00.00.01.01.01.01.01.02.02.00.00.01.01.01.02.02.01." +
    "01.00.00.02.02.02.02.02.02.02.02.00.00.00.00.01.01.01.01.01.01.01.01.01.01.01.01.01." +
    "01.01.00.00.02.02.02.02.02.00.00.01.01.01.02.02.01.01.01.03.03.01.01.01.01.01.01.01." +
    "01.01.01.02.02.02.02.02.00.00.01.01.02.02.02.02.01.01.01.01.03.01.01.01.01.01.01.01." +
    "01.01.01.01.01.02.02.02.02.01.02.02.02.02.02.02.01.01.01.01.01.03.01.01.01.01.01.01." +
    "01.01.01.01.01.01.01.01.01.01.01.02.02.02.02.01.01.01.01.01.01.01.01.01.01.01.01.01";

function editorSetup() {
    map = new GameMap(editorMap, 28, 16);

    leftMoveBtn = new TextButton(tr(vec2(0.01, ((gameHeight - (64 * pixelSize)) / 2) - (64 * pixelSize)), vec2(32 * pixelSize, 128 * pixelSize)),
        new Label(tr(), "<"),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    editor.push(leftMoveBtn);
    rightMoveBtn = new TextButton(tr(vec2(gameWidth - (32 * pixelSize), ((gameHeight - (64 * pixelSize)) / 2) - (64 * pixelSize)), vec2(32 * pixelSize, 128 * pixelSize)),
        new Label(tr(), ">"),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    editor.push(rightMoveBtn);
    upMoveBtn = new TextButton(tr(vec2((gameWidth / 2) - (64 * pixelSize), 0.01), vec2(128 * pixelSize, 32 * pixelSize)),
        new Label(tr(), "^"),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    editor.push(upMoveBtn);
    downMoveBtn = new TextButton(tr(vec2((gameWidth / 2) - (64 * pixelSize), gameHeight - (96 * pixelSize)), vec2(128 * pixelSize, 32 * pixelSize)),
        new Label(tr(), "v"),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    editor.push(downMoveBtn);

    var editorBtnSize = toVec2(pixelSize - (pixelSize/8.0)).multiply(toVec2(64.0));
    editorBtnSize.y /= 2.0;

    var editorBtnGroup = [];
    editorToMenuBtn = new TextButton(tr(vec2(0, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "BACK", undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FF8888FF"));
    editorBtnGroup.push(editorToMenuBtn);
    mapBuildingUnitToggleBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 1, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "MAP", undefined, "black"),
        new Button(tr(), "#FFFF88BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(mapBuildingUnitToggleBtn);

    prevMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 2, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "PREV", undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(prevMapBtn);
    saveMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 3, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "SAVE", undefined, "black"),
        new Button(tr(), "#88FF88BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(saveMapBtn);
    loadMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 4, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "LOAD", undefined, "black"),
        new Button(tr(), "#FF8888BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(loadMapBtn);
    nextMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 5, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "NEXT", undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(nextMapBtn);

    editor.push(new FlexGroup(tr(vec2(0, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), vec2(gameWidth/2, editorBtnSize.y * 2)),
        new SubState(tr(), editorBtnGroup), false, vec2(0.001, 0.001), vec2(3, 2), true));
}

function editorResize() {
}

function editorDraw(deltaTime) {
    map.draw(editorCam);

    drawRect(renderer, vec2(0, gameHeight - (64.0 * pixelSize)), vec2(gameWidth, 64.0 * pixelSize), true, "#000000BB");
    for(let i = 0; i < 6; i++)
        drawSheet(i, vec2(gameWidth - (32.0 * pixelSize) - (i * 64.0 * pixelSize), gameHeight - (32.0 * pixelSize)), toVec2(pixelSize - (pixelSize/8.0)));
}

function editorUpdate(deltaTime) {
}

function editorEvent(deltaTime) {
    if(leftMoveBtn.button.output == UIOUTPUT_HOVER)
    {
        editorCam.x += editorCamMove * pixelSize * deltaTime;
    }
    else if(rightMoveBtn.button.output == UIOUTPUT_HOVER)
    {
        editorCam.x -= editorCamMove * pixelSize * deltaTime;
    }
    else if(upMoveBtn.button.output == UIOUTPUT_HOVER)
    {
        editorCam.y += editorCamMove * pixelSize * deltaTime;
    }
    else if(downMoveBtn.button.output == UIOUTPUT_HOVER)
    {
        editorCam.y -= editorCamMove * pixelSize * deltaTime;
    }
}