
var camDetached = false;

function overviewUISetup(fontSize) {
    var zoomBtnSize = isMobile() ? (pixelSize * 1.25) : (pixelSize / 1.4);
    gameplayZoomBtn = new TextButton(tr(vec2(0.001, gameHeight - (128 * zoomBtnSize)),
        vec2(128 * zoomBtnSize, 128 * zoomBtnSize)),
        new Label(tr(), "Q", fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00000000", "#00000000", "#00000000"));
    gameplay.push(gameplayZoomBtn);
}

function overviewUIDraw(offset) {
    if (!isMobile() && gameplayZoomBtn.button.output == UIOUTPUT_HOVER) {
        var oldzoomBtnSize = pixelSize / 1.4;
        var zoomBtnSize = pixelSize / 1.3;
        if (!zoomLock) {
            gameplayZoomBtn.label.text = "VIEW OFF";
            gameplayZoomBtn.label.textColor = "#FFBBBBFF";
        } else {
            gameplayZoomBtn.label.text = "VIEW ON";
            gameplayZoomBtn.label.textColor = "#00FF00FF";
        }
        renderer.globalAlpha = 0.4;
        drawSheet(18, vec2(32 * oldzoomBtnSize, gameHeight - (96 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(19, vec2(96 * oldzoomBtnSize, gameHeight - (96 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(38, vec2(32 * oldzoomBtnSize, gameHeight - (32 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(39, vec2(96 * oldzoomBtnSize, gameHeight - (32 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        renderer.globalAlpha = 1.0;
    } else {
        var zoomBtnSize = pixelSize / 1.4;
        if(isMobile()) {
            zoomBtnSize = (pixelSize * 1.25);
            if(getPlayer().getSelectedMapUnit().up == 0
            || getPlayer().getSelectedMapUnit().left == 0
            || getPlayer().getSelectedMapUnit().right == 0) {
                gameplayZoomBtn.label.text = camDetached ? "ATTACH" : "DETACH";
            } else {
                if (!zoomLock) {
                    gameplayZoomBtn.label.text = "VIEW OFF";
                    gameplayZoomBtn.label.textColor = "#FFBBBBFF";
                } else {
                    gameplayZoomBtn.label.text = "VIEW ON";
                    gameplayZoomBtn.label.textColor = "#00FF00FF";
                }
                camDetached = false;
            }
        } else {
            gameplayZoomBtn.label.text = "Q";
            gameplayZoomBtn.label.textColor = "white";
        }
        
        if(gameplayZoomBtn.enabled) {
            if(zoomLock) renderer.globalAlpha = 0.6;
            drawSheet(18, vec2(32 * zoomBtnSize, gameHeight - (96 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
            drawSheet(19, vec2(96 * zoomBtnSize, gameHeight - (96 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
            drawSheet(38, vec2(32 * zoomBtnSize, gameHeight - (32 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
            drawSheet(39, vec2(96 * zoomBtnSize, gameHeight - (32 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
            renderer.globalAlpha = 1.0;
        }
    }

    var oPos = vec2(offset.x, offset.y).subtract(vec2(tileSize / 2, tileSize / 2));
    var oSize = vec2((tileSize * 28) + (tileGap * 28) + (gridBlackLinesFixFactor * 28),
        (tileSize * 16) + (tileGap * 16) + (gridBlackLinesFixFactor * 16));
}

function enableOverview() {
    if (maxDisplayTilesPerRow == defaultTilesPerRow) {
        controlBarDisable();
        leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = false;
        maxDisplayTilesPerRow = totalTilesInRow;
        updateTileSizes();
    }
}

function overviewUIEvents() {
    if (gameplayZoomBtn.button.output == UIOUTPUT_SELECT) {
        if(isMobile()
        && (getPlayer().getSelectedMapUnit().up == 0
        || getPlayer().getSelectedMapUnit().left == 0
        || getPlayer().getSelectedMapUnit().right == 0)) {
            camDetached = !camDetached;
        } else {
            zoomLock = !zoomLock;
            enableOverview();
        }
    }
    if (!isMobile() && gameplayZoomBtn.button.output == UIOUTPUT_HOVER) {
        enableOverview();
    } else if (maxDisplayTilesPerRow == totalTilesInRow && !zoomLock) {
        controlBarEnable();
        leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = true;
        maxDisplayTilesPerRow = defaultTilesPerRow;
        updateTileSizes();
    }
    
    if (keysDown.indexOf('q') != -1) {
        if (isKeyPressed('q')) {
            enableOverview();
        }
    } else {
        removeKeyPressed('q');
    }

    if (maxDisplayTilesPerRow == totalTilesInRow && !camDetached) {
        cam.x = tilePixels * pixelSize;
        cam.y = tilePixels * pixelSize;
    }
}