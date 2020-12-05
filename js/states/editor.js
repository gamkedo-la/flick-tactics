const EDITOR = 6;
var editor = [];
var editorCam = vec2();
var editorCamMove = 0.5;
var editorSelectedIndex = -1;
var currentEditorMap = 0;

var defaultEditorMapString =
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00." +
    "00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00";

var editorMaps = [
    defaultEditorMapString,
    defaultEditorMapString,
    defaultEditorMapString,
    defaultEditorMapString,
    defaultEditorMapString
];

function editorSetup() {
    editorMap = new GameMap(editorMaps[currentEditorMap], 28, 16);

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
    editorToMenuBtn = new TextButton(tr(vec2(0.001, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "BACK", undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFBBBBFF"));
    editorBtnGroup.push(editorToMenuBtn);
    mapBuildingUnitToggleBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 1, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "MAP", undefined, "black"),
        new Button(tr(), "#FFFF88BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(mapBuildingUnitToggleBtn);

    prevMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 2, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "PREV", undefined, "black"),
        new Button(tr(), "#BBFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(prevMapBtn);
    nextMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 5, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "NEXT", undefined, "black"),
        new Button(tr(), "#BBFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(nextMapBtn);
    resetMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 2, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "RESET", undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(resetMapBtn);
    saveMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 3, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "SAVE", undefined, "black"),
        new Button(tr(), "#88FF88BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(saveMapBtn);
    loadMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 4, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "LOAD", undefined, "black"),
        new Button(tr(), "#FF8888BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(loadMapBtn);

    editor.push(new FlexGroup(tr(vec2(0.001, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), vec2(gameWidth/2, editorBtnSize.y * 2)),
        new SubState(tr(), editorBtnGroup), false, toVec2(pixelSize), vec2(4, 2), true));
}

function editorResize() {
}

function editorDraw(deltaTime) {
    editorMap.draw(editorCam);

    drawRect(renderer, vec2(0, gameHeight - (64.0 * pixelSize)), vec2(gameWidth, 64.0 * pixelSize), true, "#000000BB");
    for(let i = 0; i < 6; i++)
    {
        if(editorSelectedIndex == -1 || editorSelectedIndex == i)
            renderer.globalAlpha = 1.0;
        else
            renderer.globalAlpha = 0.4;
        drawSheet(i, vec2(gameWidth - (32.0 * pixelSize) - (i * 64.0 * pixelSize), gameHeight - (32.0 * pixelSize)), toVec2(pixelSize - (pixelSize/8.0)));
        renderer.globalAlpha = 1.0;

        renderer.font = (uiContext.fontSize * 2.0).toString() + "px " + uiContext.fontFamily;
        drawText(renderer, i.toString(), vec2(gameWidth - (32.0 * pixelSize) - (i * 64.0 * pixelSize) - pixelSize, gameHeight - (31.0 * pixelSize)), "black");
        drawText(renderer, i.toString(), vec2(gameWidth - (32.0 * pixelSize) - (i * 64.0 * pixelSize), gameHeight - (32.0 * pixelSize)), "white");
    }
}

function editorUpdate(deltaTime) {
    playBGM(BGM_WORLDMAP);
}

function editorEvent(deltaTime) {

    var isIndexChanged = false;

    for(let i = 0; i < 6; i++)
    {
        var pos = vec2(gameWidth - (64.0 * pixelSize) - (i * 64.0 * pixelSize), gameHeight - (64.0 * pixelSize));
        var sc = toVec2((pixelSize - (pixelSize/8.0))*64.0);

        if(isTouched && touchPos[0].x >= pos.x && touchPos[0].x < pos.x + sc.x
            && touchPos[0].y >= pos.y && touchPos[0].y < pos.y + sc.y)
        {
            editorSelectedIndex = i;
            isIndexChanged = true;
            break;
        }
    }

    if(!isIndexChanged)
    {
        if(isTouched)
        {
            editorMap.indexes[editorMap.cursorTile.x + (editorMap.cursorTile.y * editorMap.cols)] = editorSelectedIndex;
        }
    }

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

    switch (editorToMenuBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(editorToMenuBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                editorToMenuBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            ui.transitionToState = STARTSCREEN;
            editorToMenuBtn.button.resetOutput();
    }
    switch (mapBuildingUnitToggleBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(mapBuildingUnitToggleBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                mapBuildingUnitToggleBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);

            //TODO [WIP]
            //TOGGLE BETWEEN MAP BUILDINGS AND UNITS

            mapBuildingUnitToggleBtn.button.resetOutput();
    }
    switch (prevMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(prevMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                prevMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            
            //TODO [WIP]
            //LOAD PREVIOUS MAP

            prevMapBtn.button.resetOutput();
    }
    switch (nextMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(nextMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                nextMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            
            //TODO [WIP]
            //LOAD NEXT MAP

            nextMapBtn.button.resetOutput();
    }
    switch (resetMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(resetMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                resetMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            editorCam = vec2();
            resetMapBtn.button.resetOutput();
    }
    switch (saveMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(saveMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                saveMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);

            //TODO [WIP]
            //PROPER SAVE MAP

            console.log(map.getMapString());

            saveMapBtn.button.resetOutput();
    }
    switch (loadMapBtn.button.output)
    {
        case UIOUTPUT_HOVER:
            if(loadMapBtn.button.hoverTrigger)
            {
                playSFX(SFX_BUTTON_HOVER);
                loadMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            
            //TODO [WIP]
            //LOAD MAP

            loadMapBtn.button.resetOutput();
    }
}