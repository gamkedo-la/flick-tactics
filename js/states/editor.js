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

    editorBtnGroup = [];
    overviewMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 2, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "OVERVIEW", undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#00000022", "#FFFFFF22"));
    editorBtnGroup.push(overviewMapBtn);
    mapBuildingUnitToggleBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 1, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "TERRAIN", undefined, "black"),
        new Button(tr(), "#FFFF88BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(mapBuildingUnitToggleBtn);
    editorTeamBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 2, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "RED", undefined, "black"),
        new Button(tr(), "#FFBBBBBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(editorTeamBtn);
    resetMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 2, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "RESET POS", undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(resetMapBtn);
    clearMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 2, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "CLEAR", undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(clearMapBtn);
    editorToMenuBtn = new TextButton(tr(vec2(0.001, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "BACK", undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFBBBBFF"));
    editorBtnGroup.push(editorToMenuBtn);
    saveMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 3, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "SAVE", undefined, "black"),
        new Button(tr(), "#88FF88BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(saveMapBtn);
    editorLoadMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 4, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "LOAD", undefined, "black"),
        new Button(tr(), "#FF8888BB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(editorLoadMapBtn);
    editorPlayMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 3, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), "PLAY", undefined, "black"),
        new Button(tr(), "#88FFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(editorPlayMapBtn);
    changeMapBtn = new TextButton(tr(vec2((64.0 * pixelSize) * 4, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), editorBtnSize),
        new Label(tr(), editorMapIndex <= -1 ? "EXT." : "MAP " + (editorMapIndex+1).toString(), undefined, "black"),
        new Button(tr(), "#FFFFFFBB", "#000000FF", "#FFFFFFFF"));
    editorBtnGroup.push(changeMapBtn);

    editor.push(new FlexGroup(tr(vec2(0.001, gameHeight - (64.0 * (pixelSize - (pixelSize/16.0)))), vec2(gameWidth/2, editorBtnSize.y * 2)),
        new SubState(tr(), editorBtnGroup), false, toVec2(pixelSize), vec2(5, 2), true));
}

function editorResize() {
}

function editorDraw(deltaTime) {
    editorMap.draw(editorCam);
    editorManager.draw(editorCam);
    drawTileParticles(deltaTime, editorCam);

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

function editorOverview() {
    leftMoveBtn.enabled = rightMoveBtn.enabled = upMoveBtn.enabled = downMoveBtn.enabled = false;
    maxDisplayTilesPerRow = totalTilesInRow;
    updateTileSizes();
    editorCam.x = tilePixels * pixelSize;
    editorCam.y = tilePixels * pixelSize;
}

function editorUpdate(deltaTime) {
    playBGM(BGM_WORLDMAP);

    if(editorOverviewLock) {
        editorOverview();
    }
}

function editorEvent(deltaTime) {
    if(overviewMapBtn.label.text != "IMMERSED")
        for(let i = 0; i < 6; i++) {
            var pos = vec2(gameWidth - (64.0 * pixelSize) - (i * 64.0 * pixelSize), gameHeight - (64.0 * pixelSize));
            var sc = toVec2((pixelSize - (pixelSize/8.0))*64.0);

            if(isTouched && touchPos[0].x >= pos.x && touchPos[0].x < pos.x + sc.x
            && touchPos[0].y >= pos.y && touchPos[0].y < pos.y + sc.y) {
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

    if(isRightClick) {
        if(overviewMapBtn.label.text == "OVERVIEW") {
            overviewMapBtn.label.text = "LOCKED";
            editorOverviewLock = true;
        } else if (overviewMapBtn.label.text == "LOCKED") {
            overviewMapBtn.label.text = "IMMERSED";
            for(let i = 1; i < editorBtnGroup.length; i++) editorBtnGroup[i].enabled = false;
        } else if (overviewMapBtn.label.text == "IMMERSED") {
            overviewMapBtn.label.text = "LOCKED";
        }
    } else if(isTouched && (overviewMapBtn.label.text == "IMMERSED" || touchPos[0].y < gameHeight - (64.0 * pixelSize))) {

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

    if(leftMoveBtn.button.output == UIOUTPUT_HOVER) {
        editorCam.x += editorCamMove * pixelSize * deltaTime;
    } else if(rightMoveBtn.button.output == UIOUTPUT_HOVER) {
        editorCam.x -= editorCamMove * pixelSize * deltaTime;
    } else if(upMoveBtn.button.output == UIOUTPUT_HOVER) {
        editorCam.y += editorCamMove * pixelSize * deltaTime;
    } else if(downMoveBtn.button.output == UIOUTPUT_HOVER) {
        editorCam.y -= editorCamMove * pixelSize * deltaTime;
    }

    if (keysDown.indexOf(' ') != -1) {
        if(!isKeyPressed(' ')) {
            editMode++;
            if(editMode > EDIT_MECH) editMode = EDIT_TERRAIN;

            switch(editMode) {
                case EDIT_TERRAIN:
                    mapBuildingUnitToggleBtn.label.text = "TERRAIN";
                    break;
                case EDIT_BUILDING:
                    mapBuildingUnitToggleBtn.label.text = "BUILDING";
                    break;
                case EDIT_MECH:
                    mapBuildingUnitToggleBtn.label.text = "MECH";
                    break;
            }
        }
    }
    else removeKeyPressed(' ');

    if (keysDown.indexOf('1') != -1) {
        if(isKeyPressed('1')) editorSelectedIndex = 0;
    } else removeKeyPressed('1');
    if (keysDown.indexOf('2') != -1) {
        if(isKeyPressed('2')) editorSelectedIndex = 1;
    } else removeKeyPressed('2');
    if (keysDown.indexOf('3') != -1) {
        if(isKeyPressed('3')) editorSelectedIndex = 2;
    } else removeKeyPressed('3');
    if (keysDown.indexOf('4') != -1) {
        if(isKeyPressed('4')) editorSelectedIndex = 3;
    } else removeKeyPressed('4');
    if (keysDown.indexOf('5') != -1) {
        if(isKeyPressed('5')) editorSelectedIndex = 4;
    } else removeKeyPressed('5');
    if (keysDown.indexOf('6') != -1) {
        if(isKeyPressed('6')) editorSelectedIndex = 5;
    } else removeKeyPressed('6');

    if (keysDown.indexOf('a') != -1) {
        if(isKeyPressed('a')) {
            editorTeamID = RED_TEAM;
            editorTeamBtn.label.text = "RED";
            editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#FFBBBBBB";
        }
    } else removeKeyPressed('a');
    if (keysDown.indexOf('s') != -1) {
        if(isKeyPressed('s')) {
            editorTeamID = BLUE_TEAM;
            editorTeamBtn.label.text = "BLUE";
            editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#BBBBFFBB";
        }
    } else removeKeyPressed('s');
    if (keysDown.indexOf('d') != -1) {
        if(isKeyPressed('d')) {
            editorTeamID = GREEN_TEAM;
            editorTeamBtn.label.text = "GREEN";
            editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#BBFFBBBB";
        }
    } else removeKeyPressed('d');
    if (keysDown.indexOf('f') != -1) {
        if(isKeyPressed('f')) {
            editorTeamID = BLACK_TEAM;
            editorTeamBtn.label.text = "BLACK";
            editorTeamBtn.button.btnColor = editorTeamBtn.button.defColor = "#BBBBBBBB";
        }
    } else removeKeyPressed('f');

    if (keysDown.indexOf('q') != -1) {
        if(isKeyPressed('q')) {
            editMode = EDIT_TERRAIN;
            mapBuildingUnitToggleBtn.label.text = "TERRAIN";
        }
    } else removeKeyPressed('q');
    if (keysDown.indexOf('w') != -1) {
        if(isKeyPressed('w')) {
            editMode = EDIT_BUILDING;
            mapBuildingUnitToggleBtn.label.text = "BUILDING";
        }
    } else removeKeyPressed('w');
    if (keysDown.indexOf('e') != -1) {
        if(isKeyPressed('e')) {
            editMode = EDIT_MECH;
            mapBuildingUnitToggleBtn.label.text = "MECH";
        }
    } else removeKeyPressed('e');

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
                case EDIT_TERRAIN:
                    mapBuildingUnitToggleBtn.label.text = "TERRAIN";
                    break;
                case EDIT_BUILDING:
                    mapBuildingUnitToggleBtn.label.text = "BUILDING";
                    break;
                case EDIT_MECH:
                    mapBuildingUnitToggleBtn.label.text = "MECH";
                    break;
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
}