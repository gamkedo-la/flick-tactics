var tileSize;
var tileGap;
var tileGapFactor = 16.0;

var defaultTilesPerRow = 16.0;
var zoomLock = false;
var maxDisplayTilesPerRow = 16.0;
var totalTilesInRow = 28.0;
var tilePixels = 16.0;
var gridBlackLinesFixFactor = 0.0;

const PLAINS_TILE = 0;
const SAND_TILE = 1;
const SEA_TILE = 2;
const FOREST_TILE = 3;
const MOUNTAIN_TILE = 4;
const TOXIC_TILE = 5;

const terrainTacticEffect = [
    { attack: 0.0,      defense: 10.0   },
    { attack: -10.0,    defense: 0.0    },
    { attack: 0.0,      defense: 0.0    },
    { attack: -10.0,    defense: 25.0   },
    { attack: 75.0,     defense: 50.0   },
    { attack: 0.0,      defense: 0.0    }
];

//Map Tile Unit = 0_0_0
//1st digit -> Terrain
//2nd digit -> Unit (Builidng/Mech)
//3rd digit -> Team ID

const MAP_SIZE = {x: 28, y: 16};
var maps = [];

var currentMapIndex = 0;

//#region map_helpers

function drawSheet(index, pos, sc, tileSize) {
    if (typeof tileSize == "undefined") tileSize = vec2(64, 64);

    if(pos.x > -tileSize.x * sc.x && pos.y > -tileSize.y * sc.y &&
    pos.x < window.innerWidth + (tileSize.x * sc.x) && pos.y < window.innerHeight + (tileSize.y * sc.y)) {
        var cols = Math.floor((gameSheet.imageObject.image.width - 20) / tileSize.x);
        gameSheet.transform.position = pos;
        gameSheet.transform.scale = sc;
        gameSheet.drawScIn(vec2(((index % cols) * 68), (Math.floor(index / cols) * 68)), tileSize);
    }
}

function updateTileSizes() {
    tileSize = (gameWidth / (maxDisplayTilesPerRow + (totalTilesInRow / tilePixels)));
    tileGap = Math.floor(tileSize / tileGapFactor);
}

function pixelPositionToTilePosition(pixelPos) {
    return vec2(Math.floor((pixelPos.x / (tileSize + tileGap))+0.01),
        Math.floor((pixelPos.y / (tileSize + tileGap))+0.01));
}

function pixelPositionToTilePositionForDefaultDisplayTilesPerRow(pixelPos) {
    var prevTilesPerRow = maxDisplayTilesPerRow;
    maxDisplayTilesPerRow = defaultTilesPerRow;
    updateTileSizes();
    var pos = vec2(Math.floor((pixelPos.x / (tileSize + tileGap))+0.01),
        Math.floor((pixelPos.y / (tileSize + tileGap))+0.01));
    maxDisplayTilesPerRow = prevTilesPerRow;
    updateTileSizes();
    return pos;
}

function tilePositionToPixelPosition(tilePos) {
    return vec2(Math.floor((tilePos.x * tileSize) + (tilePos.x * tileGap)),
        Math.floor((tilePos.y * tileSize) + (tilePos.y * tileGap)));
}

//#endregion

class GameMap {
    constructor(mapString) {
        this.indexes = [];

        this.redData = [];
        this.blueData = [];
        this.greenData = [];
        this.blackData = [];

        defaultTilesPerRow = isMobile() ? 6 : 16;
        maxDisplayTilesPerRow = defaultTilesPerRow;

        var tindexes = mapString.split('.');
        for (let y = 0; y < MAP_SIZE.y; y++) {
            for (let x = 0; x < MAP_SIZE.x; x++) {
                var terrain = parseInt(tindexes[x + (y * MAP_SIZE.x)].split('_')[0]);
                this.indexes.push(terrain);

                var unit = parseInt(tindexes[x + (y * MAP_SIZE.x)].split('_')[1]);
                var teamID = parseInt(tindexes[x + (y * MAP_SIZE.x)].split('_')[2]);

                if(unit <= 0) continue;
                else if(unit > 0 && unit < 6) unit--;
                else if(unit >= 6) unit = getBuildingIndexFromType(unit - 6);

                switch(teamID)
                {
                    case RED_TEAM:
                        this.redData.push(new MapUnit(unit, vec2(x, y)));
                        break;

                    case BLUE_TEAM:
                        this.blueData.push(new MapUnit(unit, vec2(x, y)));
                        break;

                    case GREEN_TEAM:
                        this.greenData.push(new MapUnit(unit, vec2(x, y)));
                        break;

                    case BLACK_TEAM:
                        this.blackData.push(new MapUnit(unit, vec2(x, y)));
                        break;
                }
            }
        }

        this.cursorTile = vec2(0, 0);
    }

    //#region map_getters

    getMapString(customManager) {
        var mapString = "";

        if(typeof customManager != "undefined") {
            for (let y = 0; y < MAP_SIZE.y; y++) {
                for (let x = 0; x < MAP_SIZE.x; x++) {
                    var unitTeamString = "";
                    var PU = customManager.getPlayerAndUnitIndexOnTile(vec2(x, y));

                    if(PU[0] <= -1) {
                        unitTeamString = "_0_0";
                    } else {
                        var team = customManager.players[PU[0]].unitGroup.teamID;
                        var unit = customManager.players[PU[0]].unitGroup.mapUnits[PU[1]].unit.type + 1;

                        if(unit == HQ_BUILDING+1) unit = 6;
                        else if(unit == CITY_BUILDING+1) unit = 7;
                        else if(unit == WAR_BUILDING+1) unit = 8;
                        else if(unit == RUIN_BUILDING+1) unit = 9;

                        unitTeamString = "_" + unit.toString() + "_" + team.toString();
                    }

                    mapString += this.indexes[x + (y * MAP_SIZE.x)].toString() + unitTeamString + ".";
                }
            }
        }
        else {
            for (let y = 0; y < MAP_SIZE.y; y++) {
                for (let x = 0; x < MAP_SIZE.x; x++) {
                    mapString += this.indexes[x + (y * MAP_SIZE.x)].toString() + "_0_0" + ".";
                }
            }
        }

        return mapString;
    }

    getTileTypeFromPosition(pos) {
        return this.indexes[pos.x + (pos.y * MAP_SIZE.x)];
    }

    setTileTypeFromPosition(pos, type) {
        this.indexes[pos.x + (pos.y * MAP_SIZE.x)] = type;
    }

    //#endregion

    //#region map_draw

    drawInRect(pos, size) {
        tileSize = size.x / MAP_SIZE.x;
        tileGap = 0;

        for (let y = 0; y < MAP_SIZE.y; y++) {
            for (let x = 0; x < MAP_SIZE.x; x++) {
                var index = this.getTileTypeFromPosition(vec2(x, y));

                var posi = vec2(Math.floor(pos.x + (x * tileSize) + (x * tileGap)),
                    Math.floor(pos.y + (y * tileSize) + (y * tileGap)));
                var sc = toVec2((tileSize / 64) + gridBlackLinesFixFactor);

                if (index == SEA_TILE || index == TOXIC_TILE) {
                    if (gameTime % 2000 < 1000)
                        index += 20;
                }

                drawSheet(index, posi, sc);
            }
        }
    }

    draw(offset) {
        for (let y = 0; y < MAP_SIZE.y; y++) {
            for (let x = 0; x < MAP_SIZE.x; x++) {
                var index = this.getTileTypeFromPosition(vec2(x, y));

                var pos = vec2(Math.floor(offset.x + (x * tileSize) + (x * tileGap)),
                    Math.floor(offset.y + (y * tileSize) + (y * tileGap)));
                var sc = toVec2((tileSize / 64) + gridBlackLinesFixFactor);

                if (index == SEA_TILE || index == TOXIC_TILE) {
                    if (gameTime % 2000 < 1000)
                        index += 20;
                }

                drawSheet(index, pos, sc);

                if(maxDisplayTilesPerRow == totalTilesInRow && gameTime % 1200 < 600) {
                    if(isTileOnFire(pixelPositionToTilePosition(pos))) {
                        drawSheet(fireSequence[0].index, pos, sc);
                    } else if(isTileOnSmoke(pixelPositionToTilePosition(pos))) {
                        drawSheet(smokeSequence[0].index, pos, sc);
                    }
                }
            }
        }
        drawRect(spritesRenderer, vec2(Math.floor((offset.x + (this.cursorTile.x * tileSize) + (this.cursorTile.x * tileGap) - (tileSize / 2))),
            Math.floor((offset.y + (this.cursorTile.y * tileSize) + (this.cursorTile.y * tileGap) - (tileSize / 2)))),
            vec2(tileSize, tileSize), true, "#FFFFFF44");
    }

    getCursorTile(offset) {
        if(!touchPos[0].isEqual(vec2())) {
            this.cursorTile = vec2((touchPos[0].x - offset.x - (tileSize / 2)) / (tileSize + tileGap),
                (touchPos[0].y - offset.y - (tileSize / 2)) / (tileSize + tileGap));
            this.cursorTile.x = Math.floor(this.cursorTile.x + 1);
            this.cursorTile.y = Math.floor(this.cursorTile.y + 1);
        } else {
            this.cursorTile.x = this.cursorTile.y = -999;
        }
    }

    drawUnitExtras() {
        if(getPlayer().selectedIndex == -1) {
            if(dialogues.length <= 0) lose(getPlayer().CO);
            getPlayer().control = -1;
            manager.endTurn(true);
        }

        if (getPlayer().getSelectedMapUnit().up == 0) {
            map.drawUnitMovement(cam, getPlayer().getSelectedMapUnit());
        }
        else if (getPlayer().getSelectedMapUnit().right == 0) {
            map.drawUnitAttack(cam, getPlayer().getSelectedMapUnit());
        }
        else if (getPlayer().getSelectedMapUnit().left == 0) {
            map.drawUnitSpecial(cam, getPlayer().getSelectedMapUnit());
        }
    }

    //#endregion

    //#region unit_movement

    isTileMovementObstacleToMapUnit(mapUnit, tilePosition) {
        var tileType = this.getTileTypeFromPosition(tilePosition);
        for(let i = 0; i < mapUnit.unit.movementObstacles.length; i++)
            if(mapUnit.unit.movementObstacles[i] == tileType)
                return true;

        //Other Player Units are Obstacles except for Ruins
        var plAndUnitInd = getIndexPair(tilePosition);
        if(plAndUnitInd[0] != -1
        && manager.index != plAndUnitInd[0]
        && getMUnitI(plAndUnitInd).unit.type != RUIN_BUILDING)
            return true;

        return false;
    }

    isTileMovementReducerToMapUnit(mapUnit, tilePosition) {
        //Boosted Cannon Mech's Movement is not reducible!
        if(mapUnit.unit.type == CANNON_MECH && mapUnit.unit.boost >= 1) return false;

        var tileType = this.getTileTypeFromPosition(tilePosition);
        for(let i = 0; i < mapUnit.unit.movementReducers.length; i++)
            if(mapUnit.unit.movementReducers[i] == tileType)
                return true;
        return false;
    }

    calculateUnitMovement(mapUnit, destinationTile = vec2(this.cursorTile.x, this.cursorTile.y), limited = true) {
        if(mapUnit.unit.isBuilding == true
        || this.isTileMovementObstacleToMapUnit(mapUnit, destinationTile)
        || getIndexPair(destinationTile)[0] != -1
        || destinationTile.x < 0
        || destinationTile.y < 0
        || destinationTile.x >= MAP_SIZE.x
        || destinationTile.y >= MAP_SIZE.y)
            return -1;

        var method = 0;
        var path = [];
        do {
            path = [mapUnit.mapPosition];
            var totalMovement = limited ? mapUnit.unit.movement + (getPlayer().CO == ZAREEM && mapUnit.unit.type == RIFLE_MECH && getPlayer().powered ? 1 : 0) : 200;
            do {
                var adjacentTiles = [];
                var offsets = [vec2(-1, 0), vec2(0, -1), vec2(1, 0), vec2(0, 1)];
                for(let i = 0; i < offsets.length; i++) {
                    var adjaTile = path[path.length - 1].add(offsets[i]);
                    if(!this.isTileMovementObstacleToMapUnit(mapUnit, adjaTile)
                    && !isVec2InArr(path, adjaTile))
                        adjacentTiles.push(adjaTile);
                }
                if(adjacentTiles.length <= 0) break;

                //method 0 = go for shortest
                //method 1 = go for second shortest
                //method 3 = go for third shortest

                var shortestDist = 99999.0;
                var shortestDistTileIndex = -1;
                var secondShortestIndex = -1;
                var thirdShortestIndex = -1;
                for (let i = 0; i < adjacentTiles.length; i++) {
                    var dist = adjacentTiles[i].distanceFloor(destinationTile);
                    if (dist < shortestDist) {
                        shortestDist = dist;
                        thirdShortestIndex = secondShortestIndex;
                        secondShortestIndex = shortestDistTileIndex;
                        shortestDistTileIndex = i;
                    }
                }
                if(method == 1 && secondShortestIndex != -1 && path.length < 2) path.push(adjacentTiles[secondShortestIndex]);
                else if(method == 2 && thirdShortestIndex != -1 && path.length < 2) path.push(adjacentTiles[thirdShortestIndex]);
                else path.push(adjacentTiles[shortestDistTileIndex]);

                if(this.isTileMovementReducerToMapUnit(mapUnit, adjacentTiles[shortestDistTileIndex])) {
                    totalMovement--;
                    //Rifle Mech movement is double reduced by mountains
                    if(mapUnit.unit.type == RIFLE_MECH) totalMovement--;
                }

                totalMovement--;
            } while (!path[path.length - 1].isEqual(destinationTile) && totalMovement > 0);

            method++;
        } while (!path[path.length - 1].isEqual(destinationTile) && method < 3);

        if(!path[path.length - 1].isEqual(destinationTile)) return -1;

        return path;
    }

    canUnitReachTile(mapUnit, tilePosition) {
        var path = this.calculateUnitMovement(mapUnit, tilePosition);
        if(path == -1) return false;
        return path[path.length - 1].isEqual(tilePosition);
    }

    canUnitReachAdjacentTile(mapUnit, tilePosition) {
        var offsets = [vec2(1, 0), vec2(0, 1), vec2(-1, 0), vec2(0, -1)];
        for(let i = 0; i < offsets.length; i++) {
            var dir = this.calculateUnitMovement(mapUnit, tilePosition.add(offsets[i]));
            var otherDirCanReach = false;
            for(let o = 0; o < offsets.length; o++) {
                if (o != i) {
                    var otherDir = this.calculateUnitMovement(mapUnit, tilePosition.add(offsets[o]));
                    if (otherDir != -1 && dir.length > otherDir.length) {
                        otherDirCanReach = true;
                        break;
                    }
                }
            }
            if(!otherDirCanReach) return dir;
        }
        return -1;
    }

    drawUnitMovement(offset, mapUnit) {
        spritesRenderer.globalAlpha = 0.25 + ((Math.sin(gameTime/200.0) + 1.0) / 4.0);
        spritesRenderer.globalCompositeOperation = "lighter";
        var mv = mapUnit.unit.movement + (getPlayer().CO == ZAREEM && mapUnit.unit.type == RIFLE_MECH && getPlayer().powered ? 1 : 0);
        for (let y = -mv; y <= mv; y++) {
            for (let x = -mv; x <= mv; x++) {
                if (this.canUnitReachTile(mapUnit, vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y))) {
                    var posi = vec2(Math.floor(offset.x + ((mapUnit.mapPosition.x + x) * tileSize) + ((mapUnit.mapPosition.x + x) * tileGap)),
                        Math.floor(offset.y + ((mapUnit.mapPosition.y + y) * tileSize) + ((mapUnit.mapPosition.y + y) * tileGap)));
                    var absPos = posi.subtract(vec2(tileSize - (16 * pixelSize), tileSize - (16 * pixelSize)).divide(vec2(2, 2)));
                    drawRect(spritesRenderer, absPos, vec2(tileSize - (16 * pixelSize), tileSize - (16 * pixelSize)), true, "#FFFFFF88");
                }
            }
        }
        spritesRenderer.globalCompositeOperation = "source-over";
        spritesRenderer.globalAlpha += 0.25;
        if(spritesRenderer.globalAlpha > 1.0) spritesRenderer.globalAlpha = 1.0;
        var path = this.calculateUnitMovement(mapUnit);
        for (let i = 0; i < path.length; i++) {
            var posi = vec2(Math.floor(offset.x + (path[i].x * tileSize) + (path[i].x * tileGap)),
                Math.floor(offset.y + (path[i].y * tileSize) + (path[i].y * tileGap)));
            drawRect(spritesRenderer, posi.subtract(vec2(tileSize - (32 * pixelSize), tileSize - (32 * pixelSize)).divide(vec2(2, 2))),
                vec2(tileSize - (32 * pixelSize), tileSize - (32 * pixelSize)), true,
                (this.cursorTile.x == path[i].x && this.cursorTile.y == path[i].y) ? "#000000FF" : "#000000BB");
        }
        spritesRenderer.globalAlpha = 1.0;
    }

    eventUnitMovement(mapUnit) {
        if (isTouched()) {
            var path = this.calculateUnitMovement(mapUnit);
            if(path == -1) return false;

            mapUnit.mapPath = path;
            mapUnit.mapPathIndex = 0;
            mapUnit.up = -1;

            return true;
        }
        return false;
    }

    eventAIUnitMovement(mapUnit) {
        var path = -1;
        var tries = 0;
        while(path == -1) {
            path = this.calculateUnitMovement(mapUnit, mapUnit.mapPosition.add( vec2(
            Math.floor(-mapUnit.unit.movement + (Math.random() * (mapUnit.unit.movement * 2))),
            Math.floor(-mapUnit.unit.movement + (Math.random() * (mapUnit.unit.movement * 2))))
        ));
            if(tries > 9999) return;
            else tries++;
        }

        mapUnit.mapPath = path;
        mapUnit.mapPathIndex = 0;
        mapUnit.up = -1;
    }

    //#endregion

    //#region unit_attack

    drawUnitAttack(offset, munit) {
        spritesRenderer.globalAlpha = 0.75 + ((Math.sin(gameTime/200.0) + 1.0) / 8.0);
        spritesRenderer.globalCompositeOperation = "darken";
        var sc = vec2((tileSize / 64) + gridBlackLinesFixFactor, (tileSize / 64) + gridBlackLinesFixFactor);
        var attackable = false;
        var fire = false;
        var smoke = false;
        var skipRange = munit.unit.type == ARTILLERY_MECH ? 2 : 0;
        var range = munit.unit.type == ARTILLERY_MECH ? 4 + (getPlayer().CO == TAJA && getPlayer().powered ? 1 : 0) : 1;
        for (let y = -range; y <= range; y++) {
            for (let x = -range; x <= range; x++) {

                if (Math.abs(x) + Math.abs(y) > range
                    || Math.abs(x) + Math.abs(y) <= skipRange
                    || (x == 0 && y == 0))
                    continue;

                var posi = vec2(Math.floor(offset.x + ((munit.mapPosition.x + x) * tileSize) + ((munit.mapPosition.x + x) * tileGap)),
                    Math.floor(offset.y + ((munit.mapPosition.y + y) * tileSize) + ((munit.mapPosition.y + y) * tileGap)));

                if(this.cursorTile.isEqual(munit.mapPosition.add(vec2(x, y)))) {
                    attackable = true;
                    drawRect(renderer, posi.subtract(vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)).divide(vec2(2, 2))),
                        vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)), true, munit.unit.type == SUPPORT_MECH ? "#00FF44FF" : "#FF0000FF");
                    if(munit.unit.type != SUPPORT_MECH) {
                        if(munit.unit.type != RIFLE_MECH) {
                            fire = this.getTileTypeFromPosition(munit.mapPosition.add(vec2(x, y))) == FOREST_TILE;
                        }
                        smoke = this.getTileTypeFromPosition(munit.mapPosition.add(vec2(x, y))) == SAND_TILE;
                    }
                } else {
                    drawRect(spritesRenderer, posi.subtract(vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)).divide(vec2(2, 2))),
                        vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)), true, munit.unit.type == SUPPORT_MECH ? "#00BB66BB" : "#FF000088");
                }
            }
        }
        spritesRenderer.globalAlpha = 1.0;
        spritesRenderer.globalCompositeOperation = "source-over";

        //Fire, Smoke, Push, Push-Damage and Damage Indicators
        if(attackable && gameTime % 600 < 300) {
            if (fire) drawSheet(fireSequence[0].index, tilePositionToPixelPosition(this.cursorTile).add(offset), sc);
            else if (smoke) drawSheet(smokeSequence[0].index, tilePositionToPixelPosition(this.cursorTile).add(offset), sc);
            if (munit.unit.type == ARTILLERY_MECH || munit.unit.type == TELEPORT_MECH) {
                renderer.globalAlpha = gameTime % 600 < 150 ? 0.4 : 0.6;
                var pos = [vec2(0, 1), vec2(1, 0), vec2(0, -1), vec2(-1, 0)];
                for(let i = 0; i < 4; i++) {
                    var opos = (munit.unit.type == ARTILLERY_MECH ? this.cursorTile : munit.mapPosition).add(pos[i]);
                    var opospushed = opos.add(pos[i]);
                    var oposplayer = getPlayerI(getIndexPair(opos));
                    var oposunit = getMUnitI(getIndexPair(opos));
                    var opospushedunit = getMUnitI(getIndexPair(opospushed));
                    var opospushedtiletype = this.getTileTypeFromPosition(opospushed);
                    if(oposunit != -1 && (!oposunit.unit.isBuilding || munit.unit.type == TELEPORT_MECH)) {
                        if(opospushedunit == -1 && opospushedtiletype != MOUNTAIN_TILE) {
                            drawSheet(getMechIndexFromType(oposunit.unit.type, oposplayer.unitGroup.teamID, -1),
                                tilePositionToPixelPosition(opospushed.subtract(pos[i].multiply(toVec2(gameTime % 600 < 150 ? 0.5 : 0.0)))).add(offset), sc);
                            if(munit.unit.type == TELEPORT_MECH) drawSheet(damageSequence[1].index, tilePositionToPixelPosition(opos).add(offset), sc);
                        } else {
                            drawSheet(getMechIndexFromType(oposunit.unit.type, oposplayer.unitGroup.teamID, -1),
                                tilePositionToPixelPosition(opospushed.subtract(pos[i].multiply(toVec2(gameTime % 600 < 150 ? 0.75 : 0.5)))).add(offset), sc);
                            drawSheet(damageSequence[1].index, tilePositionToPixelPosition(opos).add(offset), sc);
                            if(opospushedunit != -1)
                                drawSheet(damageSequence[1].index, tilePositionToPixelPosition(opospushed).add(offset), sc);
                        }
                    }
                }
                renderer.globalAlpha = 1.0;
            }

            var attmunit = getMUnitI(getIndexPair(this.cursorTile));
            if(attmunit != -1) {
                if(munit.unit.type == SUPPORT_MECH) {
                    drawText(renderer, "~" + Math.floor((Math.ceil(munit.hp) / 10.0) * munit.unit.repair[attmunit.unit.isBuilding ? 5 : attmunit.unit.type]).toString(),
                        offset.add(attmunit.unit.position), "white");
                } else {
                    drawText(renderer, "~" + Math.floor(this.calculateDamage(munit, attmunit, false, 0)).toString(),
                        offset.add(attmunit.unit.position), "yellow");
                }
            }
        }
    }

    battlescreenTransition(munit1, munit2) {
        passiveMUnitPrevHP = munit2.hp;
        ui.stateIndex = BATTLESCREEN;
        activeTeamID = getPlayerI(getIndexPair(munit1.mapPosition)).unitGroup.teamID;
        activeMUnit = munit1;
        passiveTeamID = getPlayerI(getIndexPair(munit2.mapPosition)).unitGroup.teamID;
        passiveMUnit = munit2;
    }

    calculateDamage(munit1, munit2, incPow = true, randMult = 1.0) {
        //Damage Calculation Sequence
        //First all ATT is added: Terrain -> Rank -> CO
        //Then, all DEF is subtracted: Terrain -> Rank -> CO -> Building
        //+-5% Random Factor at last

        var pl1 = getPlayerI(getIndexPair(munit1.mapPosition));
        var pl2 = getPlayerI(getIndexPair(munit2.mapPosition));

        //Default Unit to Unit Damage
        var damage = (munit1.unit.attack[munit2.unit.isBuilding ? 5 : munit2.unit.type] * (munit1.hp / 10.0));

        //ATT: Terrain Contribution
        damage += (damage / 100.0) * terrainTacticEffect[this.getTileTypeFromPosition(munit1.mapPosition)].attack;

        //ATT: Rank Contribution
        damage += (damage / 100.0) * (munit1.unit.rank * RANK_ATTACK_BONUS);

        //ATT: CO Contribution
        switch(pl1.CO) {
            case GURU: /* nothing */ break;
            case ZAREEM: damage += (damage / 100.0) * (munit1.unit.type == RIFLE_MECH ? 10.0 : 0.0); break;
            case TAJA: damage += (damage / 100.0) * (munit1.unit.type == ARTILLERY_MECH ? 10.0 + (pl1.powered ? 5.0 : 0.0) : 0.0); break;
            case HULU: damage += (damage / 100.0) * 15.0; break;
            case JONAH: damage += (damage / 100.0) * 10.0; break;
        }

        //DEF: Terrain Contribution
        if(!munit2.unit.isBuilding && munit2.unit.type != TELEPORT_MECH) {
            damage -= (damage / 100.0) * terrainTacticEffect[this.getTileTypeFromPosition(munit2.mapPosition)].defense;
        }

        //DEF: Building Contribution
        if(munit2.unit.type == HQ_BUILDING) damage *= 0.5;
        else if(munit2.unit.type == WAR_BUILDING) damage *= 0.75;

        //DEF: Rank Contribution
        if(!munit2.unit.isBuilding) damage -= (damage / 100.0) * (munit2.unit.rank * RANK_DEFENSE_BONUS);

        //DEF: CO Contribution
        switch(pl2.CO) {
            case GURU: damage += (damage / 100.0) * 5.0; break;
            case ZAREEM: damage -= (damage / 100.0) * (munit2.unit.type == RIFLE_MECH ? 10.0 : 0.0); break;
            case TAJA: /* nothing */ break;
            case HULU: damage += (damage / 100.0) * 15.0; break; //-15% Defense
            case JONAH: damage -= (damage / 100.0) * 10.0; break;
        }

        //5% Random Factor
        damage += ((damage / 100.0) * (((Math.random() - 0.5) * 2.0) * 5.0)) * randMult;

        //Increase Power Meter upon receiving damage
        if(incPow && !pl2.powered) {
            switch(munit2.unit.type) {
                case RIFLE_MECH: pl2.powerMeter += 0.02 * (damage / 10.0); break;
                case CANNON_MECH: pl2.powerMeter += 0.06 * (damage / 10.0); break;
                case ARTILLERY_MECH: pl2.powerMeter += 0.08 * (damage / 10.0); break;
                case SUPPORT_MECH: pl2.powerMeter += 0.04 * (damage / 10.0); break;
                case TELEPORT_MECH: pl2.powerMeter += 0.03 * (damage / 10.0); break;
                case HQ_BUILDING: pl2.powerMeter += 0.2 * (damage / 10.0); break;
                case WAR_BUILDING: pl2.powerMeter += 0.15 * (damage / 10.0); break;
                case CITY_BUILDING: pl2.powerMeter += 0.1 * (damage / 10.0); break;
                default: break;
            }
            if(pl2.powerMeter > 1.0) pl2.powerMeter = 1.0;
        }

        return damage;
    }

    attack(munit1, munit2, placement) {

        if(munit1.unit.ammo > 0) munit1.unit.ammo--;

        switch (munit1.unit.type) {
            case RIFLE_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit2.hp -= this.calculateDamage(munit1, munit2);
                    if(munit2.hp <= 0.0) munit2.hp = -0.01;
                    else new TileParticle(tilePositionToPixelPosition(munit2.mapPosition), damageSequence);
                } else {
                    playSFX(SFX_RIFLEATTACK);
                }
                //Rifle Mech cannot create Fire on the Forest Tile
                /*if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == FOREST_TILE && !isTileOnFire(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
                } else */if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == SAND_TILE && !isTileOnSmoke(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), smokeSequence).forTurns(SAND_SMOKE_TURNS);
                }
                break;

            case CANNON_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit2.hp -= this.calculateDamage(munit1, munit2);
                    if(munit2.hp <= 0.0) munit2.hp = -0.01;
                    else new TileParticle(tilePositionToPixelPosition(munit2.mapPosition), damageSequence);
                } else {
                    playSFX(SFX_CANNONATTACK);
                }
                if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == FOREST_TILE && !isTileOnFire(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
                } else if(munit1.unit.boost == 1 && !isTileOnFire(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), fireSequence, fireSequenceEndFunction).forTurns(MECH_FIRE_TURNS);
                } else if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == SAND_TILE && !isTileOnSmoke(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), smokeSequence).forTurns(SAND_SMOKE_TURNS);
                }
                break;

            case ARTILLERY_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit2.hp -= this.calculateDamage(munit1, munit2);
                    if(munit2.hp <= 0.0) munit2.hp = -0.01;
                    else new TileParticle(tilePositionToPixelPosition(munit2.mapPosition), damageSequence);
                } else {
                    playSFX(SFX_ARTILLERYATTACK);
                }
                if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == FOREST_TILE && !isTileOnFire(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
                } else if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == SAND_TILE && !isTileOnSmoke(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), smokeSequence).forTurns(SAND_SMOKE_TURNS);
                }
                //Artillery Range Attack and pushes all units around the attack point
                var pushOffset = [vec2(1, 0), vec2(-1, 0), vec2(0, 1), vec2(0, -1)];
                for(let i = 0; i < pushOffset.length; i++) {
                    var mUnitToPush = getMUnitI(getIndexPair(munit1.mapPosition.add(placement).add(pushOffset[i])));
                    if (mUnitToPush != -1) mUnitToPush.push(pushOffset[i]);
                }
                break;

            case SUPPORT_MECH:
                if (munit2 != -1) {
                    munit2.hp += (Math.ceil(munit1.hp) / 10.0) * munit1.unit.repair[munit2.unit.isBuilding ? 5 : munit2.unit.type];
                    new TileParticle(tilePositionToPixelPosition(munit2.mapPosition), repairSequence);
                    if(munit2.hp > 10.0) munit2.hp = 10.0;
                }
                break;

            case TELEPORT_MECH:
                var affOffset = [vec2(1, 0), vec2(-1, 0), vec2(0, 1), vec2(0, -1)];
                for(let i = 0; i < affOffset.length; i++) {
                    var affMUnit = getMUnitI(getIndexPair(munit1.mapPosition.add(affOffset[i])));
                    if(affMUnit != -1) {
                        affMUnit.hp -= this.calculateDamage(munit1, affMUnit);
                        if(affMUnit.hp <= 0.0) affMUnit.hp = -0.01;
                        else new TileParticle(tilePositionToPixelPosition(affMUnit.mapPosition), damageSequence);
                        if(Math.ceil(munit1.hp) >= 5) affMUnit.push(affOffset[i]);
                    }
                }
                munit1.hp = 0;
                munit1.destroyTime = gameTime + 250;
                break;
        }
    }

    eventUnitAttack(mapUnit) {
        if (isTouched()) {
            var skipRange = mapUnit.unit.type == ARTILLERY_MECH ? 2 : 0;
            var range = mapUnit.unit.type == ARTILLERY_MECH ? 4 + (getPlayer().CO == TAJA && getPlayer().powered ? 1 : 0) : 1;
            for (let y = -range; y <= range; y++) {
                for (let x = -range; x <= range; x++) {

                    if (Math.abs(x) + Math.abs(y) > range
                        || Math.abs(x) + Math.abs(y) <= skipRange
                        || (x == 0 && y == 0))
                        continue;

                    if (this.cursorTile.x == mapUnit.mapPosition.x + x
                        && this.cursorTile.y == mapUnit.mapPosition.y + y) {
                        var mUnit = getMUnitI(getIndexPair(this.cursorTile));
                        if (mUnit != -1) this.attack(mapUnit, mUnit, vec2(x, y));
                        else this.attack(mapUnit, -1, vec2(x, y));
                        mapUnit.right = -1;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    //#endregion

    //#region unit_special

    drawUnitSpecial(offset, mapUnit) {
        spritesRenderer.globalAlpha = 0.5 + ((Math.sin(gameTime/200.0) + 1.0) / 2.0);
        spritesRenderer.globalCompositeOperation = "darken";
        var skipRange = mapUnit.unit.type == TELEPORT_MECH ? 1 : 0;
        var range = mapUnit.unit.type == TELEPORT_MECH ? (mapUnit.unit.ammo > Math.ceil(mapUnit.unit.ammoCapacity/2) ? 3 : 2) : 1;
        for (let y = -range; y <= range; y++) {
            for (let x = -range; x <= range; x++) {

                if (Math.abs(x) + Math.abs(y) > range
                    || Math.abs(x) + Math.abs(y) <= skipRange
                    || (x == 0 && y == 0))
                    continue;

                var tType = this.getTileTypeFromPosition(mapUnit.mapPosition.add(vec2(x, y)));
                var mUnit = getMUnitI(getIndexPair(mapUnit.mapPosition.add(vec2(x, y))));
                if ((mUnit != -1 && mapUnit.unit.type == TELEPORT_MECH && mUnit.unit.isBuilding) || tType == -1 || tType == MOUNTAIN_TILE) continue;

                var posi = vec2(Math.floor(offset.x + ((mapUnit.mapPosition.x + x) * tileSize) + ((mapUnit.mapPosition.x + x) * tileGap)),
                    Math.floor(offset.y + ((mapUnit.mapPosition.y + y) * tileSize) + ((mapUnit.mapPosition.y + y) * tileGap)));

                drawRect(spritesRenderer, posi.subtract(vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)).divide(vec2(2, 2))),
                    vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)), true,
                    (this.cursorTile.x == mapUnit.mapPosition.x + x && this.cursorTile.y == mapUnit.mapPosition.y + y) ? "#0000FFBB" : "#0000FF88");
            }
        }
        spritesRenderer.globalAlpha = 1.0;
        spritesRenderer.globalCompositeOperation = "source-over";
    }

    special(munit1, munit2, placement) {

        switch (munit1.unit.type) {
            case RIFLE_MECH:
                if (munit1.unit.smokeAmmo > 0) {
                    var offsets = [vec2(1, 0), vec2(-1, 0), vec2(0, 1), vec2(0, -1)];
                    for(let i = 0; i < 4; i++) {
                        if(!isTileOnSmoke(munit1.mapPosition.add(offsets[i])))
                            new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(offsets[i])), smokeSequence).forTurns(MECH_SMOKE_TURNS);
                    }
                    munit1.unit.smokeAmmo--;
                }
                break;

            case CANNON_MECH:
                if (munit1.unit.boost == 0) {
                    playSFX(SFX_RANKUP);
                    munit1.unit.boost = 1;
                    munit1.unit.movement += munit1.unit.boostMovement;
                }
                break;

            case ARTILLERY_MECH:
                if (munit1.unit.smokeAmmo > 0) {
                    var offsets = [vec2(1, 0), vec2(-1, 0), vec2(0, 1), vec2(0, -1)];
                    for(let i = 0; i < 4; i++) {
                        if(!isTileOnSmoke(munit1.mapPosition.add(offsets[i])))
                            new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(offsets[i])), smokeSequence).forTurns(MECH_SMOKE_TURNS);
                    }
                    munit1.unit.smokeAmmo--;
                }
                break;

            case SUPPORT_MECH:
                if (munit2 != -1 && !munit2.unit.isBuilding) {
                    if(typeof munit2.unit.ammoCapacity != "undefined") {
                        munit2.unit.ammo = munit2.unit.ammoCapacity;
                        playSFX(SFX_REPAIR);
                    }
                    if(typeof munit2.unit.smokeAmmoCapacity != "undefined") {
                        munit2.unit.smokeAmmo = munit2.unit.smokeAmmoCapacity;
                        playSFX(SFX_REPAIR);
                    }
                }
                break;

            case TELEPORT_MECH:
                if (munit2 != -1 && !munit2.unit.isBuilding) {
                    var munit2NewPosition = vec2(munit1.mapPosition.x, munit1.mapPosition.y);
                    munit1.mapPosition = vec2(munit2.mapPosition.x, munit2.mapPosition.y);
                    munit2.mapPosition = vec2(munit2NewPosition.x, munit2NewPosition.y);
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition), teleportSequence);
                    new TileParticle(tilePositionToPixelPosition(munit2.mapPosition), teleportSequence);
                    munit1.unit.ammo -= 2;
                    if(munit1.unit.ammo < 0) munit1.unit.ammo = 0;
                } else {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition), teleportSequence);
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), teleportSequence);
                    munit1.mapPosition = munit1.mapPosition.add(placement);
                    munit1.unit.ammo--;
                }
                break;
        }
    }

    eventUnitSpecial(mapUnit) {

        if(mapUnit.unit.type == RIFLE_MECH
        || mapUnit.unit.type == ARTILLERY_MECH
        || mapUnit.unit.type == CANNON_MECH) {
            this.special(mapUnit, -1, vec2());
            mapUnit.left = -1;
            return true;
        }

        if (isTouched()) {
            var skipRange = mapUnit.unit.type == TELEPORT_MECH ? 1 : 0;
            var range = mapUnit.unit.type == TELEPORT_MECH ? (mapUnit.unit.ammo > Math.ceil(mapUnit.unit.ammoCapacity/2) ? 3 : 2) : 1;
            for (let y = -range; y <= range; y++) {
                for (let x = -range; x <= range; x++) {

                    if (Math.abs(x) + Math.abs(y) > range
                    || Math.abs(x) + Math.abs(y) <= skipRange
                    || (x == 0 && y == 0))
                        continue;

                    if (this.cursorTile.x == mapUnit.mapPosition.x + x
                        && this.cursorTile.y == mapUnit.mapPosition.y + y) {
                        var mUnit = getMUnitI(getIndexPair(this.cursorTile));
                        var tType = this.getTileTypeFromPosition(mapUnit.mapPosition.add(vec2(x, y)));
                        if(tType == -1 || tType == MOUNTAIN_TILE) continue;
                        if (mUnit != -1) {
                            if (mapUnit.unit.type == TELEPORT_MECH && mUnit.unit.isBuilding) continue;
                            this.special(mapUnit, mUnit, vec2(x, y));
                        } else {
                            this.special(mapUnit, -1, vec2(x, y));
                        }
                        mapUnit.left = -1;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    //#endregion

    immediatelyAfterAction() {
        playSFX(SFX_SELECT);
        getPlayer().getSelectedMapUnit().actionPointsUsed++;
        getPlayer().actionPoints--;
        resetTurnBtn.label.text = "Reset";
        if(!getPlayer().powered) getPlayer().powerMeter += 0.01;
        if(getPlayer().powerMeter > 1.0) getPlayer().powerMeter = 1.0;
    }

    event() {
        //Unit Action Event End Point
        if (getPlayer().getSelectedMapUnit().up == 0) { //Move
            if (this.eventUnitMovement(getPlayer().getSelectedMapUnit())) this.immediatelyAfterAction();
        } else if (getPlayer().getSelectedMapUnit().right == 0) { //Attack
            if (this.eventUnitAttack(getPlayer().getSelectedMapUnit())) this.immediatelyAfterAction();
        } else if (getPlayer().getSelectedMapUnit().left == 0) { //Special
            if (this.eventUnitSpecial(getPlayer().getSelectedMapUnit())) this.immediatelyAfterAction();
        }

        //Check Win/Lose Conditions
        var total = manager.players.length;
        var lastIndex = -1;
        for(let i = 0; i < manager.players.length; i++) {
            var HQi = manager.players[i].getHQUnitIndex();
            if((HQi == -1 || manager.players[i].unitGroup.mapUnits[HQi].hp <= 0) && manager.players[i].control != -1) {
                if(dialogues.length <= 0) lose(manager.players[i].CO);
                manager.players[i].control = -1;
                total--;
            } else if(manager.players[i].control == -1) {
                total--;
            } else if(manager.players[i].control != -1) {
                lastIndex = i;
            }
        }
        if(total <= 1) {
            if(manager.players[lastIndex].control == 0) win(manager.players[lastIndex].CO, true);
            else win(manager.players[lastIndex].CO, false);
        }

        //Select unit on click/touch
        if ((getPlayer().getSelectedMapUnit().unit.type != WAR_BUILDING || touchPos[0].y < panelY) && isTouched()) {
            var indexPair = getIndexPair(this.cursorTile);
            if (indexPair[0] != -1
            && getPlayerI(indexPair).unitGroup.teamID == getPlayer().unitGroup.teamID
            && getMUnitI(indexPair).unit.type != RUIN_BUILDING
            && getMUnitI(indexPair).unit.type != CITY_BUILDING) {
                playSFX(SFX_SELECT);
                stepBackAction();
                getPlayer().selectedIndex = indexPair[1];
                updateUnitActionButtons();
                zoomLock = false;
            } else {
                touched = true;
            }
        }
    }

}

function fireSequenceEndFunction(self) {
    var pos = pixelPositionToTilePosition(self.position);

    if(map.getTileTypeFromPosition(pos) == FOREST_TILE) {
        map.setTileTypeFromPosition(pos, SAND_TILE);
        new TileParticle(tilePositionToPixelPosition(pos), smokeSequence).forTurns(AFTER_FOREST_SMOKE_TURNS);
    }

    if(map.getTileTypeFromPosition(pos.add(vec2(0,1))) == FOREST_TILE && !isTileOnFire(pos.add(vec2(0,1))))
        new TileParticle(tilePositionToPixelPosition(pos.add(vec2(0,1))), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
    if(map.getTileTypeFromPosition(pos.add(vec2(1,0))) == FOREST_TILE && !isTileOnFire(pos.add(vec2(1,0))))
        new TileParticle(tilePositionToPixelPosition(pos.add(vec2(1,0))), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
    if(map.getTileTypeFromPosition(pos.add(vec2(0,-1))) == FOREST_TILE && !isTileOnFire(pos.add(vec2(0,-1))))
        new TileParticle(tilePositionToPixelPosition(pos.add(vec2(0,-1))), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
    if(map.getTileTypeFromPosition(pos.add(vec2(-1,0))) == FOREST_TILE && !isTileOnFire(pos.add(vec2(-1,0))))
        new TileParticle(tilePositionToPixelPosition(pos.add(vec2(-1,0))), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
}