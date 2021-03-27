const EDITOR = 7;
var editor = [];
var editorCam = vec2();
var editorCamMove = 0.5;
var editorSelectedIndex = 0;
var editorTeamID = RED_TEAM;
var editorOverviewLock = false;
var editorMapIndex = -1;

const TOTAL_DEFAULT_MAPS = 12;

const EDIT_TERRAIN = 0;
const EDIT_BUILDING = 1;
const EDIT_MECH = 2;
var editMode = EDIT_TERRAIN;

var defaultEditorMapString =
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0." +
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0";

var editorMapData = defaultEditorMapString;

function editorSaveMap() {
    editorMapData = editorMap.getMapString(editorManager);
    saveFile(editorMapData, "flickTacticsMap.txt");
}

function editorLoadMap() {
    if(editorMapIndex <= -1)
        editorLoadBtn.click();
    else {
        editorMapData = readFile("maps/map" + editorMapIndex.toString() + ".txt");
        editorMap = new GameMap(editorMapData);
        editorManager = new PlayerManager(editorMap, 1);
    }
}

function editorSetup() {
    editorLoadBtn = document.getElementById('file-input');
    editorLoadBtn.onchange = e => {
        let reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.addEventListener('load', e => {
            editorMapData = e.target.result;
            editorMap = new GameMap(editorMapData);
            editorManager = new PlayerManager(editorMap, 1);
            editorLoadBtn = document.getElementById('file-input');
        });
    }

    editorMap = new GameMap(editorMapData);
    editorManager = new PlayerManager(editorMap, 1);

    var fontStr = ((isMobile() ? 24 : 12) * pixelSize).toString() + "px " + uiContext.fontFamily;

    leftMoveBtn = new TextButton( isMobile() ?
        tr(vec2(0.01, ((gameHeight - (64 * pixelSize)) / 2) - (64 * pixelSize)), vec2(64 * pixelSize, 128 * pixelSize))
        : tr(vec2(0.01, ((gameHeight - (64 * pixelSize)) / 2) - (64 * pixelSize)), vec2(32 * pixelSize, 128 * pixelSize)),
        new Label(tr(), "<", fontStr),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    editor.push(leftMoveBtn);
    rightMoveBtn = new TextButton( isMobile() ?
        tr(vec2(gameWidth - (64 * pixelSize), ((gameHeight - (64 * pixelSize)) / 2) - (64 * pixelSize)), vec2(64 * pixelSize, 128 * pixelSize))
        : tr(vec2(gameWidth - (32 * pixelSize), ((gameHeight - (64 * pixelSize)) / 2) - (64 * pixelSize)), vec2(32 * pixelSize, 128 * pixelSize)),
        new Label(tr(), ">", fontStr),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    editor.push(rightMoveBtn);
    upMoveBtn = new TextButton( isMobile() ? 
        tr(vec2((gameWidth / 2) - (64 * pixelSize), 0.01), vec2(128 * pixelSize, 64 * pixelSize))
        : tr(vec2((gameWidth / 2) - (64 * pixelSize), 0.01), vec2(128 * pixelSize, 32 * pixelSize)),
        new Label(tr(), "^", fontStr),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    editor.push(upMoveBtn);
    downMoveBtn = new TextButton( isMobile() ?
        tr(vec2((gameWidth / 2) - (64 * pixelSize), gameHeight - (216 * pixelSize)), vec2(128 * pixelSize, 64 * pixelSize))
        : tr(vec2((gameWidth / 2) - (64 * pixelSize), gameHeight - (96 * pixelSize)), vec2(128 * pixelSize, 32 * pixelSize)),
        new Label(tr(), "v", fontStr),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
    editor.push(downMoveBtn);

    var editorBtnSize = toVec2(pixelSize - (pixelSize/8.0)).multiply(toVec2(64.0));
    if(isMobile())
        editorBtnSize.y *= 1.25;
    else
        editorBtnSize.y /= 2.0;

    editorBtnGroup = [];
    overviewMapBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "OVERVIEW", fontStr, "black"),
        new Button(tr(), "#FFFFFFBB", "#00000022", "#FFFFFF22"));
    editorBtnGroup.push(overviewMapBtn);
    overviewMapBtn.enabled = isMobile() ? false : true;
    mapBuildingUnitToggleBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "TERRAIN", fontStr, "black"),
        new Button(tr(), "#FFFF88BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(mapBuildingUnitToggleBtn);
    editorTeamBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "RED", fontStr, "black"),
        new Button(tr(), "#FFBBBBBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(editorTeamBtn);
    resetMapBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "RESET POS", fontStr, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(resetMapBtn);
    clearMapBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "CLEAR", fontStr, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(clearMapBtn);
    editorToMenuBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "BACK", fontStr, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFBBBBFF"));
    editorBtnGroup.push(editorToMenuBtn);
    saveMapBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "SAVE", fontStr, "black"),
        new Button(tr(), "#88FF88BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(saveMapBtn);
    editorLoadMapBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "LOAD", fontStr, "black"),
        new Button(tr(), "#FF8888BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(editorLoadMapBtn);
    editorPlayMapBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "PLAY", fontStr, "black"),
        new Button(tr(), "#88FFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(editorPlayMapBtn);
    changeMapBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), editorMapIndex <= -1 ? "EXT." : "MAP " + (editorMapIndex+1).toString(), fontStr, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(changeMapBtn);
    if(isMobile()) {
        changeTileBtn = new TextButton(tr(vec2(), editorBtnSize),
        new Label(tr(), "", fontStr, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
        editorBtnGroup.push(changeTileBtn);
        changeTileBtn.visible = false;

        mobFullView = new TextButton(tr(vec2(gameWidth - editorBtnSize.x, gameHeight - (216 * pixelSize)), editorBtnSize),
        new Label(tr(), "VIEW", fontStr, "white"),
        new Button(tr(), "#00000066", "#FFFFFFFF", "#000000BB"));
        editor.push(mobFullView);
    }

    editor.push(new FlexGroup( isMobile() ?
        tr(vec2(0.01, gameHeight - ((160.0) * (pixelSize - (pixelSize/16.0)))), vec2(gameWidth, editorBtnSize.y * 2))
        : tr(vec2(0.01, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), vec2(gameWidth/2, editorBtnSize.y * 2)),
        new SubState(tr(), editorBtnGroup), false, toVec2(pixelSize), vec2(5, 2), true));
}

function editorResize() {
}

function editorDraw(deltaTime) {
    editorMap.draw(editorCam);
    editorManager.draw(editorCam);
    drawTileParticles(deltaTime, editorCam);

    if(isMobile()) {
        if(mobFullView.label.text == "FULL") {
            drawRect(renderer, vec2(), vec2(gameWidth, gameHeight), true, "#000000BB");
            editorMap.drawInRect(toVec2((gameWidth/2)/MAP_SIZE.x), toVec2(gameWidth));
            editorManager.drawInRect(toVec2((gameWidth/2)/MAP_SIZE.x), toVec2(gameWidth));
            for(let i = 0; i < editorBtnGroup.length; i++) editorBtnGroup[i].enabled = false;
            upMoveBtn.enabled = downMoveBtn.enabled = leftMoveBtn.enabled = rightMoveBtn.enabled = false;
        } else {
            drawRect(renderer, vec2(gameWidth - (100.0 * pixelSize), gameHeight - (80.0 * pixelSize)), vec2(100.0 * pixelSize, 80.0 * pixelSize), true, "#000000BB");
            if((editMode == EDIT_BUILDING && editorSelectedIndex > 3) || (editMode == EDIT_MECH && editorSelectedIndex > 4)) {
                drawSheet(unitDestroySequence[2].index, vec2(gameWidth - (48.0 * pixelSize) - pixelSize, gameHeight - (48.0 * pixelSize)), toVec2(pixelSize));
            } else {
                var index = editorSelectedIndex;
                if(editMode == EDIT_BUILDING) index = getBuildingIndexFromType(editorSelectedIndex) + editorTeamID;
                else if(editMode == EDIT_MECH) index = getMechIndexFromType(editorSelectedIndex, editorTeamID);
                drawSheet(index, vec2(gameWidth - (48.0 * pixelSize) - pixelSize, gameHeight - (48.0 * pixelSize)), toVec2(pixelSize));
            }
            for(let i = 0; i < editorBtnGroup.length; i++) editorBtnGroup[i].enabled = true;
            overviewMapBtn.enabled = false;
            upMoveBtn.enabled = downMoveBtn.enabled = leftMoveBtn.enabled = rightMoveBtn.enabled = true;
        }
    } else {
        if(maxDisplayTilesPerRow != totalTilesInRow || (editorOverviewLock && overviewMapBtn.label.text != "IMMERSED"))
        {
            drawRect(renderer, vec2(0, gameHeight - (64.0 * pixelSize)), vec2(gameWidth, 64.0 * pixelSize), true, "#000000BB");
            for(let i = 0; i < 6 - (editMode == EDIT_BUILDING ? 2 : (editMode == EDIT_MECH ? 1 : 0)); i++)
            {
                if(editorSelectedIndex == -1 || editorSelectedIndex == i)
                    renderer.globalAlpha = 1.0;
                else
                    renderer.globalAlpha = 0.4;

                var index = i;
                if(editMode == EDIT_BUILDING) index = getBuildingIndexFromType(i) + editorTeamID;
                else if(editMode == EDIT_MECH) index = getMechIndexFromType(i, editorTeamID);
                drawSheet(index, vec2(gameWidth - (32.0 * pixelSize) - (i * 64.0 * pixelSize), gameHeight - (32.0 * pixelSize)), toVec2(pixelSize - (pixelSize/8.0)));
                
                renderer.globalAlpha = 1.0;

                renderer.font = (uiContext.fontSize * 2.0).toString() + "px " + uiContext.fontFamily;
                drawText(renderer, (i+1).toString(), vec2(gameWidth - (32.0 * pixelSize) - (i * 64.0 * pixelSize) - pixelSize, gameHeight - (31.0 * pixelSize)), "black");
                drawText(renderer, (i+1).toString(), vec2(gameWidth - (32.0 * pixelSize) - (i * 64.0 * pixelSize), gameHeight - (32.0 * pixelSize)), "white");
            }
            if(editMode != EDIT_TERRAIN) drawText(renderer, "DEL", vec2(gameWidth - (32.0 * pixelSize) - (5 * 64.0 * pixelSize), gameHeight - (32.0 * pixelSize)), "white");
        }
    }
}

function editorOverview() {
    leftMoveBtn.enabled = rightMoveBtn.enabled = upMoveBtn.enabled = downMoveBtn.enabled = false;
    maxDisplayTilesPerRow = totalTilesInRow;
    updateTileSizes();
    editorCam.x = tilePixels * pixelSize;
    editorCam.y = tilePixels * pixelSize;
}

function editorUpdate(deltaTime) {
    playBGM(BGM_WORLDMAP);
    if(editorOverviewLock) editorOverview();
}

function editorEvent(deltaTime) {

    editorMap.getCursorTile(editorCam);

    if(overviewMapBtn.label.text != "IMMERSED")
        for(let i = 0; i < 6; i++) {
            var pos = vec2(gameWidth - (64.0 * pixelSize) - (i * 64.0 * pixelSize), gameHeight - (64.0 * pixelSize));
            var sc = toVec2((pixelSize - (pixelSize/8.0))*64.0);
            if(touchPos[0].x >= pos.x && touchPos[0].x < pos.x + sc.x
            && touchPos[0].y >= pos.y && touchPos[0].y < pos.y + sc.y
            && isTouched()) {
                editorSelectedIndex = i;
                break;
            }
        }

    var playerAndUnitIndex = editorManager.getPlayerAndUnitIndexOnTile(editorMap.cursorTile);

    if(wheelScroll != 0) {
        if(playerAndUnitIndex[0] >= 0) {
            var unit = editorManager.players[playerAndUnitIndex[0]].unitGroup.mapUnits[playerAndUnitIndex[1]];
            unit.hp -= wheelScroll / 100.0;
            if(unit.hp <= 0.0) {
                if(maxDisplayTilesPerRow != totalTilesInRow) new TileParticle(editorManager.players[playerAndUnitIndex[0]].unitGroup.mapUnits[playerAndUnitIndex[1]].unit.position, unitDestroySequence);
                editorManager.players[playerAndUnitIndex[0]].unitGroup.mapUnits.splice(playerAndUnitIndex[1], 1);
            }
            else if(unit.hp > 10.0) unit.hp = 10.0;
        }
    }
    wheelScroll = 0.0;

    if(!isMobile() && isRightClick) {
        if(overviewMapBtn.label.text == "OVERVIEW") {
            overviewMapBtn.label.text = "LOCKED";
            editorOverviewLock = true;
        } else if (overviewMapBtn.label.text == "LOCKED") {
            overviewMapBtn.label.text = "IMMERSED";
            for(let i = 1; i < editorBtnGroup.length; i++) editorBtnGroup[i].enabled = false;
        } else if (overviewMapBtn.label.text == "IMMERSED") {
            overviewMapBtn.label.text = "LOCKED";
        }
    } else if((overviewMapBtn.label.text == "IMMERSED" || touchPos[0].y < gameHeight - (64.0 * pixelSize)) && isTouched()) {

        switch(editMode) {
            case EDIT_TERRAIN:
                editorMap.indexes[editorMap.cursorTile.x + (editorMap.cursorTile.y * MAP_SIZE.x)] = editorSelectedIndex;
                break;

            case EDIT_BUILDING:
                if(playerAndUnitIndex[0] >= 0) {
                    if(maxDisplayTilesPerRow != totalTilesInRow) new TileParticle(editorManager.players[playerAndUnitIndex[0]].unitGroup.mapUnits[playerAndUnitIndex[1]].unit.position, unitDestroySequence);
                    editorManager.players[playerAndUnitIndex[0]].unitGroup.mapUnits.splice(playerAndUnitIndex[1], 1);
                }
                if(editorSelectedIndex <= 3)
                    editorManager.players[editorTeamID].unitGroup.mapUnits
                        .push(new MapUnit(getBuildingIndexFromType(editorSelectedIndex),
                        vec2(editorMap.cursorTile.x, editorMap.cursorTile.y)));
                break;

            case EDIT_MECH:
                if(playerAndUnitIndex[0] >= 0) {
                    if(maxDisplayTilesPerRow != totalTilesInRow) new TileParticle(editorManager.players[playerAndUnitIndex[0]].unitGroup.mapUnits[playerAndUnitIndex[1]].unit.position, unitDestroySequence);
                    editorManager.players[playerAndUnitIndex[0]].unitGroup.mapUnits.splice(playerAndUnitIndex[1], 1);
                }
                if(editorSelectedIndex <= 4)
                    editorManager.players[editorTeamID].unitGroup.mapUnits
                        .push(new MapUnit(editorSelectedIndex,
                        vec2(editorMap.cursorTile.x, editorMap.cursorTile.y)));
                break;
        }
    }

    if(leftMoveBtn.button.output == UIOUTPUT_HOVER || leftMoveBtn.button.output == UIOUTPUT_SELECT) {
        editorCam.x += editorCamMove * pixelSize * deltaTime;
    } else if(rightMoveBtn.button.output == UIOUTPUT_HOVER || rightMoveBtn.button.output == UIOUTPUT_SELECT) {
        editorCam.x -= editorCamMove * pixelSize * deltaTime;
    } else if(upMoveBtn.button.output == UIOUTPUT_HOVER || upMoveBtn.button.output == UIOUTPUT_SELECT) {
        editorCam.y += editorCamMove * pixelSize * deltaTime;
    } else if(downMoveBtn.button.output == UIOUTPUT_HOVER || downMoveBtn.button.output == UIOUTPUT_SELECT) {
        editorCam.y -= editorCamMove * pixelSize * deltaTime;
    }

    for(let i = 0; i < 6; i++) if(isKey((i+1).toString())) editorSelectedIndex = i;

    if(isKey('t')) {
        switch(editorTeamID) {
            case BLACK_TEAM:
                editorTeamID = RED_TEAM;
                editorTeamBtn.label.text = "RED";
                editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#FFBBBBBB";
                break;

            case RED_TEAM:
                editorTeamID = BLUE_TEAM;
                editorTeamBtn.label.text = "BLUE";
                editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#BBBBFFBB";
                break;

            case BLUE_TEAM:
                editorTeamID = GREEN_TEAM;
                editorTeamBtn.label.text = "GREEN";
                editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#BBFFBBBB";
                break;

            case GREEN_TEAM:
                editorTeamID = BLACK_TEAM;
                editorTeamBtn.label.text = "BLACK";
                editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#BBBBBBBB";
                break;
        }
    }

    if(isKey('e')) {
        switch(editMode) {
            case EDIT_MECH:
                editMode = EDIT_TERRAIN;
                mapBuildingUnitToggleBtn.label.text = "TERRAIN";
                break;
            case EDIT_TERRAIN:
                editMode = EDIT_BUILDING;
                mapBuildingUnitToggleBtn.label.text = "BUILDING";
                break;
            case EDIT_BUILDING:
                editMode = EDIT_MECH;
                mapBuildingUnitToggleBtn.label.text = "MECH";
                break;
        }
    }

    if(isCtrlWithKey('s')) {
        playSFX(SFX_BUTTON_CLICK);
        editorSaveMap();
    }

    switch (editorToMenuBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(editorToMenuBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                editorToMenuBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            maxDisplayTilesPerRow = defaultTilesPerRow;
            updateTileSizes();
            ui.transitionToState = STARTSCREEN;
            editorToMenuBtn.button.resetOutput();
    }
    switch (mapBuildingUnitToggleBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(mapBuildingUnitToggleBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                mapBuildingUnitToggleBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            editMode++;
            if(editMode > EDIT_MECH) editMode = EDIT_TERRAIN;

            switch(editMode) {
                case EDIT_TERRAIN: mapBuildingUnitToggleBtn.label.text = "TERRAIN"; break;
                case EDIT_BUILDING: mapBuildingUnitToggleBtn.label.text = "BUILDING"; break;
                case EDIT_MECH: mapBuildingUnitToggleBtn.label.text = "MECH"; break;
            }

            if(isMobile()) {
                switch(editMode) {
                    case EDIT_TERRAIN: if(editorSelectedIndex > 5) editorSelectedIndex = 0; break;
                    case EDIT_BUILDING: if(editorSelectedIndex > 4) editorSelectedIndex = 0; break;
                    case EDIT_MECH: if(editorSelectedIndex > 5) editorSelectedIndex = 0; break;
                }
            }

            mapBuildingUnitToggleBtn.button.resetOutput();
    }
    switch (resetMapBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(resetMapBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                resetMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            editorCam = vec2();
            resetMapBtn.button.resetOutput();
    }
    switch (editorTeamBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(editorTeamBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                editorTeamBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            editorTeamID++;
            if(editorTeamID > BLACK_TEAM) editorTeamID = RED_TEAM;

            switch(editorTeamID) {
                case RED_TEAM:
                    editorTeamBtn.label.text = "RED";
                    editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#FFBBBBBB";
                    break;
                case BLUE_TEAM:
                    editorTeamBtn.label.text = "BLUE";
                    editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#BBBBFFBB";
                    break;
                case GREEN_TEAM:
                    editorTeamBtn.label.text = "GREEN";
                    editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#BBFFBBBB";
                    break;
                case BLACK_TEAM:
                    editorTeamBtn.label.text = "BLACK";
                    editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#BBBBBBBB";
                    break;
            }

            editorTeamBtn.button.resetOutput();
    }
    switch (saveMapBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(saveMapBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                saveMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            editorSaveMap();
            saveMapBtn.button.resetOutput();
    }
    switch (editorLoadMapBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(editorLoadMapBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                editorLoadMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            editorLoadMap();
            editorLoadMapBtn.button.resetOutput();
    }
    switch (clearMapBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(clearMapBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                clearMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            editorMapData = defaultEditorMapString;
            editorMap = new GameMap(editorMapData);
            editorManager = new PlayerManager(editorMap, 1);
            clearMapBtn.button.resetOutput();
    }
    switch (overviewMapBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(overviewMapBtn.button.hoverTrigger) {
                if(maxDisplayTilesPerRow != totalTilesInRow) playSFX(SFX_BUTTON_HOVER);
                for(let i = 1; i < editorBtnGroup.length; i++) editorBtnGroup[i].enabled = false;
                editorOverview();
                //overviewMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            if(overviewMapBtn.label.text == "OVERVIEW") {
                overviewMapBtn.label.text = "LOCKED";
                editorOverviewLock = true;
            } else if (overviewMapBtn.label.text == "LOCKED") {
                overviewMapBtn.label.text = "IMMERSED";
                for(let i = 1; i < editorBtnGroup.length; i++) editorBtnGroup[i].enabled = false;
            } else if (overviewMapBtn.label.text == "IMMERSED") {
                overviewMapBtn.label.text = "OVERVIEW";
                editorOverviewLock = false;
            }
            break;

        default:
            if(overviewMapBtn.label.text != "IMMERSED")
                for(let i = 1; i < editorBtnGroup.length; i++) editorBtnGroup[i].enabled = true;
            if(!editorOverviewLock) {
                leftMoveBtn.enabled = rightMoveBtn.enabled = upMoveBtn.enabled = downMoveBtn.enabled = true;
                maxDisplayTilesPerRow = defaultTilesPerRow;
            }
            updateTileSizes();
    }
    switch (changeMapBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(changeMapBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                changeMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            editorMapIndex++;
            if(editorMapIndex >= TOTAL_DEFAULT_MAPS) editorMapIndex = -1;
            changeMapBtn.label.text = editorMapIndex <= -1 ? "EXT." : "MAP " + (editorMapIndex+1).toString();
            changeMapBtn.button.resetOutput();
    }
    switch (editorPlayMapBtn.button.output) {
        case UIOUTPUT_HOVER:
            if(editorPlayMapBtn.button.hoverTrigger) {
                playSFX(SFX_BUTTON_HOVER);
                editorPlayMapBtn.button.hoverTrigger = false;
            }
            break;

        case UIOUTPUT_SELECT:
            playSFX(SFX_BUTTON_CLICK);
            particles = [];
            editorToVersus(editorMap.getMapString(editorManager));
            editorPlayMapBtn.button.resetOutput();
    }

    if(isMobile()) {
        switch (changeTileBtn.button.output) {
            case UIOUTPUT_HOVER:
                if(changeTileBtn.button.hoverTrigger) {
                    playSFX(SFX_BUTTON_HOVER);
                    changeTileBtn.button.hoverTrigger = false;
                }
                break;
    
            case UIOUTPUT_SELECT:
                playSFX(SFX_BUTTON_CLICK);
                editorSelectedIndex++;
                switch(editMode) {
                    case EDIT_TERRAIN: if(editorSelectedIndex > 5) editorSelectedIndex = 0; break;
                    case EDIT_BUILDING: if(editorSelectedIndex > 4) editorSelectedIndex = 0; break;
                    case EDIT_MECH: if(editorSelectedIndex > 5) editorSelectedIndex = 0; break;
                }
                changeTileBtn.button.resetOutput();
        }

        switch (mobFullView.button.output) {
            case UIOUTPUT_HOVER:
                if(mobFullView.button.hoverTrigger) {
                    playSFX(SFX_BUTTON_HOVER);
                    mobFullView.button.hoverTrigger = false;
                }
                break;
    
            case UIOUTPUT_SELECT:
                playSFX(SFX_BUTTON_CLICK);
                mobFullView.label.text = mobFullView.label.text == "VIEW" ? "FULL" : "VIEW";
                mobFullView.button.resetOutput();
        }
    }
}