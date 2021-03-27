const MECHCOST = [2000, 8000, 12000, 5000, 5000];

function buildingPanelSetup() {
    panelX = isMobile() ? 0 : 200 * pixelSize;
    panelH = gameBottomBarHeight;
    panelY = gameHeight - panelH;
    panelW = gameWidth - (panelX * 2);
    var tabGap = 4 * pixelSize;
    var fontStr = ((isMobile() ? 18 : 12) * pixelSize).toString() + "px " + uiContext.fontFamily;
}

function buildingPanelUpdate(buildingMUnit) {
    if (maxDisplayTilesPerRow == defaultTilesPerRow) {
        if(buildingMUnit.unit.type == WAR_BUILDING)
            unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled = false;
        else
            unitUpBtn.enabled = unitLeftBtn.enabled = unitRightBtn.enabled =
                cam.distance(getPlayer().getCameraPosition()) < 2.5 * pixelSize
                && getPlayer().getSelectedMapUnit().hp > 0;
    }
    /*
    setBTab(2, "CO");
    setBLabel(2, 0, (manager.index == buildingPanelCOSelection ? "(YOU) " : "") + "Player CO: " + COSPECIFICS[manager.players[buildingPanelCOSelection].CO].name + ".");
    setBLabel(2, 1, "CO Power: " + COSPECIFICS[manager.players[buildingPanelCOSelection].CO].powerName + "." + (manager.index == buildingPanelCOSelection ? "" : (" Power Fill: " + Math.floor(manager.players[buildingPanelCOSelection].powerMeter * 100.0).toString() + "%")));
    setBLabel(2, 2, COSPECIFICS[manager.players[buildingPanelCOSelection].CO].powerDesc);

    setBButton(2, 0, "Previous CO");
    
    if(getPlayer().powerMeter >= 0.999) setBButton(2, 1, "Use Power!");
    else setBButton(2, 1, "insufficient power", true);

    setBButton(2, 2, "Next CO");

    setBLabel(1, 0, "CO Power: " + COSPECIFICS[getPlayer().CO].powerName + ".");
    setBLabel(1, 1, COSPECIFICS[getPlayer().CO].powerDesc);
    */
}

function buildingPanelDraw() {
    if (dialogues.length > 0 || getPlayer().focus.length > 0) return;
    if(maxDisplayTilesPerRow == defaultTilesPerRow && (cam.distance(getPlayer().getCameraPosition()) < 2.5 * pixelSize && getPlayer().getSelectedMapUnit().mapPathIndex <= -1)) {
        if(getPlayer().getSelectedMapUnit().unit.type == HQ_BUILDING) {
            var sc = pixelSize/2.0;
            var powerBarHeight = isMobile() ? 20 : 12;
            bodyNFacesSheet.transform.scale = toVec2(sc);
            bodyNFacesSheet.transform.position = vec2(panelX + panelW/2, gameHeight - (sc * 128.0)).subtract(vec2(0, powerBarHeight * sc));
            drawRect(renderer, bodyNFacesSheet.transform.position.subtract(toVec2(128 * sc)), toVec2(256 * sc), true, getActiveTeamColor());
            bodyNFacesSheet.drawScIn(facePositions[getPlayer().powerMeter >= 1.0 || getPlayer().powered ? FACE_HAPPY : FACE_NEUTRAL].add(vec2(1024 * getPlayer().CO)), toVec2(256));
            
            if(!getPlayer().powered) {
                drawRect(renderer, bodyNFacesSheet.transform.position.subtract(toVec2(sc * 128)).add(vec2(0, sc * 256)), vec2(sc * 256, sc * powerBarHeight), true, "black");
                drawRect(renderer, bodyNFacesSheet.transform.position.subtract(toVec2(sc * 128)).add(vec2(0, sc * 256)), vec2(sc * 256 * getPlayer().powerMeter, sc * powerBarHeight), true, getPlayer().powerMeter >= 1.0 && gameTime % 600 < 300 ? "white" : "#66ff66");
            } else {
                renderer.globalAlpha = ((Math.sin(gameTime/100.0) + 1.0) / 8.0);
                renderer.globalCompositeOperation = "lighter";
                drawRect(renderer, bodyNFacesSheet.transform.position.subtract(toVec2(128 * sc)), toVec2(256 * sc), true, "white");
                renderer.globalAlpha = 1.0;
                renderer.globalCompositeOperation = "source-over";
            }
        } else if(getPlayer().getSelectedMapUnit().unit.type == WAR_BUILDING) {
            var pos = getPlayer().getSelectedMapUnit().mapPosition;
            for(let i = 0; i < 5; i++) {
                var pos = vec2(panelX + ((panelW / 2) / 5) + (i * (panelW / 5)), panelY + (panelH / 2));
                drawRect(renderer, pos.subtract(toVec2(32 * pixelSize)), toVec2(64 * pixelSize), true, (getPlayer().money < MECHCOST[i] ? "#440000" : getActiveTeamColor()));
                if(getPlayer().money < MECHCOST[i]) renderer.globalAlpha = 0.6;
                drawSheet(getMechIndexFromType(i, getPlayer().unitGroup.teamID), pos, toVec2(pixelSize));
                renderer.font = ((isMobile() ? 32 : 24) * pixelSize).toString() + "px OrangeKid";
                drawText(renderer, MECHCOST[i].toString() + "$", pos.add(vec2(-32 * pixelSize, 40 * pixelSize)).add(toVec2(pixelSize * 2)), "black");
                drawText(renderer, MECHCOST[i].toString() + "$", pos.add(vec2(-32 * pixelSize, 40 * pixelSize)), "white");
                if(getPlayer().money < MECHCOST[i]) renderer.globalAlpha = 1.0;
            }
        }
    }
}

function buildingPanelEvent() {
    if(isTouched()) {
        var buildingMUnit = getPlayer().getSelectedMapUnit();
        if(buildingMUnit.unit.type == WAR_BUILDING) {
            var pos = buildingMUnit.mapPosition;
            var off = [vec2(0, 1), vec2(1, 0), vec2(0, -1), vec2(-1, 0)];
            for(let i = 0; i < off.length; i++) {
                var opos = pos.add(off[i]);
                if(map.cursorTile.isEqual(opos)
                && getIndexPair(opos)[0] == -1
                && map.getTileTypeFromPosition(opos) != SEA_TILE
                && map.getTileTypeFromPosition(opos) != MOUNTAIN_TILE) {
                    playSFX(SFX_SELECT);
                    buildingMUnit.unit.mechDeployOffset = off[i];
                }
            }

            for(let i = 0; i < 5; i++) {
                if(buildingMUnit.unit.mechDeployOffset != -1) {
                    var uiPos = vec2(panelX + ((panelW / 2) / 5) + (i * (panelW / 5)), panelY + (panelH / 2)).subtract(toVec2(32 * pixelSize));
                    var uiSc = toVec2(64 * pixelSize);
                    if(getPlayer().money >= MECHCOST[i] && touchPos[0].x >= uiPos.x && touchPos[0].y >= uiPos.y && touchPos[0].x < uiPos.x + uiSc.x && touchPos[0].y < uiPos.y + uiSc.y) {
                        var pos = buildingMUnit.mapPosition;
                        removeTileParticles(pos.add(buildingMUnit.unit.mechDeployOffset));
                        new TileParticle(tilePositionToPixelPosition(pos.add(buildingMUnit.unit.mechDeployOffset)), teleportSequence);
                        var newMapUnit = new MapUnit(i, pos.add(buildingMUnit.unit.mechDeployOffset));
                        newMapUnit.hp = Math.ceil(buildingMUnit.hp);
                        getPlayer().money -= MECHCOST[i];

                        //Deploy Delay Effect
                        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMUnit.unit.mechDeployDelay[i];

                        getPlayer().unitGroup.mapUnits.push(newMapUnit);

                        touchPos[0] = vec2();
                    }
                }
            }
        }
    }

    /*HQ BUILDING EVENTS
    var hqBuilding_helpBtn = getBButton(0, 1, HQ_BUILDING);
    if (hqBuilding_helpBtn != 0 && hqBuilding_helpBtn.button.output == UIOUTPUT_SELECT) {
        helpFromGameplay = true;
        ui.transitionToState = HELP;
        hqBuilding_helpBtn.button.resetOutput();
    }*/
}
