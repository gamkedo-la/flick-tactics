
function overviewUISetup(fontSize) {
    var zoomBtnSize = pixelSize / 1.4;
    gameplayZoomBtn = new TextButton(tr(vec2(0.01, gameHeight - (128 * zoomBtnSize)),
        vec2(128 * zoomBtnSize, 128 * zoomBtnSize)),
        new Label(tr(), "Q", fontSize.toString() + "px " + uiContext.fontFamily),
        new Button(tr(), "#00000000", "#00000000", "#00000000"));
    gameplay.push(gameplayZoomBtn);
}

function overviewUIDraw(offset) {
    if (gameplayZoomBtn.button.output == UIOUTPUT_HOVER) {
        var oldzoomBtnSize = pixelSize / 1.4;
        var zoomBtnSize = pixelSize / 1.3;
        if (!zoomLock) {
            gameplayZoomBtn.label.text = "ZOOM LOCK OFF";
            gameplayZoomBtn.label.textColor = "#FFBBBBFF";
        }
        else {
            gameplayZoomBtn.label.text = "ZOOM LOCK ON";
            gameplayZoomBtn.label.textColor = "#00FF00FF";
        }
        renderer.globalAlpha = 0.4;
        drawSheet(18, vec2(32 * oldzoomBtnSize, gameHeight - (96 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(19, vec2(96 * oldzoomBtnSize, gameHeight - (96 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(38, vec2(32 * oldzoomBtnSize, gameHeight - (32 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(39, vec2(96 * oldzoomBtnSize, gameHeight - (32 * oldzoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        renderer.globalAlpha = 1.0;
    }
    else {
        var zoomBtnSize = pixelSize / 1.4;
        gameplayZoomBtn.label.text = "Q";
        gameplayZoomBtn.label.textColor = "white";
        if(zoomLock) renderer.globalAlpha = 0.6;
        drawSheet(18, vec2(32 * zoomBtnSize, gameHeight - (96 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(19, vec2(96 * zoomBtnSize, gameHeight - (96 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(38, vec2(32 * zoomBtnSize, gameHeight - (32 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        drawSheet(39, vec2(96 * zoomBtnSize, gameHeight - (32 * zoomBtnSize)), vec2(zoomBtnSize, zoomBtnSize));
        renderer.globalAlpha = 1.0;
    }

    var oPos = vec2(offset.x, offset.y).subtract(vec2(tileSize / 2, tileSize / 2));
    var oSize = vec2((tileSize * 28) + (tileGap * 28) + (gridBlackLinesFixFactor * 28),
        (tileSize * 16) + (tileGap * 16) + (gridBlackLinesFixFactor * 16));
    //drawRect(spritesRenderer, oPos, oSize, true, "#00000044");
}

function enableOverview() {
    if (maxDisplayTilesPerRow == defaultTilesPerRow) {
        disableControlBar();
        leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = false;
        maxDisplayTilesPerRow = totalTilesInRow;
        updateTileSizes();
    }
}

function overviewUIEvents() {
    if (keysDown.indexOf('q') != -1) {
        if (!isKeyPressed('q')) {
            zoomLock = !zoomLock;
            enableOverview();
        }
    }
    else {
        removeKeyPressed('q');
    }
    if (gameplayZoomBtn.button.output == UIOUTPUT_SELECT) {
        zoomLock = !zoomLock;
    }
    if (gameplayZoomBtn.button.output == UIOUTPUT_HOVER) {
        enableOverview();
    }
    else if (maxDisplayTilesPerRow == totalTilesInRow && !zoomLock) {
        enableControlBar();
        leftUnitChangeBtn.enabled = rightUnitChangeBtn.enabled = true;
        maxDisplayTilesPerRow = defaultTilesPerRow;
        updateTileSizes();
    }
    if (maxDisplayTilesPerRow == totalTilesInRow) {
        cam.x = tilePixels * pixelSize;
        cam.y = tilePixels * pixelSize;
    }
    /*if (wheelScroll != 0.0 && zoomLock) {
        zoomedTilesPerRow += wheelScroll / 20.0;
        zoomedTilesPerRow = clamp(zoomedTilesPerRow, 6.0, 60.0);
        wheelScroll = 0.0;
        maxDisplayTilesPerRow = zoomedTilesPerRow;
        updateTileSizes();
    }*/
}