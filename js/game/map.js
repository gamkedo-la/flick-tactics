
var tileSize;
var tileGap;
var tileGapFactor = 16.0;

var defaultTilesPerRow = 15.0;
var zoomLock = false;
var maxDisplayTilesPerRow = 15.0;
var totalTilesInRow = 28.0;
var tilePixels = 16.0;
var gridBlackLinesFixFactor = 0.0;

const PLAINS_TILE = 0;
const SAND_TILE = 1;
const SEA_TILE = 2;
const FOREST_TILE = 3;
const MOUNTAIN_TILE = 4;
const TOXIC_TILE = 5;

var map1 =
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

var map2 =
    "01.01.02.02.01.03.03.03.03.03.03.03.01.01." +
    "03.01.01.02.01.01.03.03.03.03.03.03.01.01." +
    "03.03.01.02.02.01.01.03.03.03.03.03.03.03." +
    "03.03.01.01.02.02.00.00.03.03.03.03.03.03." +
    "03.03.03.01.01.00.00.00.01.03.03.03.03.03." +
    "03.03.03.03.00.00.00.02.01.01.03.03.03.03." +
    "01.01.03.03.03.01.01.02.02.01.01.03.03.03." +
    "01.01.03.03.03.03.01.01.02.02.01.01.03.03.";

var currentMapNumber = 2;
var mapList = [];

function mapDefinitions(){
     mapList = [
{levelData:map1, levelCol: 28, levelRow: 16, redTeam:[
            new MapUnit(HQ_BUILDING, vec2(2, 2)),
            new MapUnit(CITY_BUILDING, vec2(3, 3)),
            new MapUnit(WAR_BUILDING, vec2(4, 3)),
            new MapUnit(RUIN_BUILDING, vec2(6, 6)),
            new MapUnit(RIFLE_MECH, vec2(4, 4)),
            new MapUnit(TELEPORT_MECH, vec2(7, 5)),
            new MapUnit(CANNON_MECH, vec2(9, 5))
        ],blackTeam:[
            new MapUnit(HQ_BUILDING, vec2(16, 8)),
            new MapUnit(CITY_BUILDING, vec2(17, 6)),
            new MapUnit(RIFLE_MECH, vec2(12, 9)),
            new MapUnit(SUPPORT_MECH, vec2(11, 7)),
            new MapUnit(ARTILLERY_MECH, vec2(14, 8))]},

{levelData:map2, levelCol: 14, levelRow: 8, redTeam:[
            new MapUnit(HQ_BUILDING, vec2(2, 2)),
            new MapUnit(CITY_BUILDING, vec2(3, 3)),
            new MapUnit(WAR_BUILDING, vec2(4, 3)),
            new MapUnit(RUIN_BUILDING, vec2(6, 6)),
            new MapUnit(RIFLE_MECH, vec2(4, 4)),
            new MapUnit(TELEPORT_MECH, vec2(7, 5)),
            new MapUnit(CANNON_MECH, vec2(9, 5))
        ],blackTeam:[
            new MapUnit(HQ_BUILDING, vec2(5, 4)),
            new MapUnit(CITY_BUILDING, vec2(5, 6)),
            new MapUnit(RIFLE_MECH, vec2(5, 5)),
            new MapUnit(SUPPORT_MECH, vec2(5, 7)),
            new MapUnit(ARTILLERY_MECH, vec2(5, 7))]},

{levelData:map1, levelCol: 28, levelRow: 16, redTeam:[
            new MapUnit(HQ_BUILDING, vec2(2, 2)),
            new MapUnit(CITY_BUILDING, vec2(3, 3)),
            new MapUnit(WAR_BUILDING, vec2(4, 3)),
            new MapUnit(RUIN_BUILDING, vec2(6, 6)),
            new MapUnit(RIFLE_MECH, vec2(4, 4)),
            new MapUnit(TELEPORT_MECH, vec2(7, 5)),
            new MapUnit(CANNON_MECH, vec2(9, 5))
        ],blackTeam:[
            new MapUnit(HQ_BUILDING, vec2(5, 4)),
            new MapUnit(CITY_BUILDING, vec2(5, 6)),
            new MapUnit(RIFLE_MECH, vec2(5, 5)),
            new MapUnit(SUPPORT_MECH, vec2(5, 7)),
            new MapUnit(ARTILLERY_MECH, vec2(5, 7))]},
];
}

  /*new Player(RED_TEAM, ),
        new Player(BLACK_TEAM, [
            new MapUnit(HQ_BUILDING, vec2(16, 8)),
            new MapUnit(CITY_BUILDING, vec2(17, 6)),
            new MapUnit(RIFLE_MECH, vec2(12, 9)),
            new MapUnit(SUPPORT_MECH, vec2(11, 7)),
            new MapUnit(ARTILLERY_MECH, vec2(14, 8))*/

function drawSheet(index, pos, sc, tileSize) {
    if (typeof tileSize == "undefined") tileSize = vec2(64, 64);
    var cols = Math.floor((gameSheet.imageObject.image.width - 20) / tileSize.x);
    //var rows = Math.floor(gameSheet.imageObject.image.height / tileSize.y);

    gameSheet.transform.position = pos;
    gameSheet.transform.scale = sc;

    var row = index % cols;
    var col = Math.floor(index / cols);
    gameSheet.drawScIn(vec2((row*68), (col*68)), tileSize);
}

function updateTileSizes() {
    tileSize = (gameWidth / (maxDisplayTilesPerRow + (totalTilesInRow / tilePixels)));
    tileGap = Math.floor(tileSize / tileGapFactor);
}

class GameMap {
    constructor(mapString, totalCols, totalRows) {
        this.cols = totalCols;
        this.rows = totalRows;

        this.indexes = [];
        var tindexes = mapString.split('.');
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.indexes.push(parseInt(tindexes[x + (y * this.cols)]));
            }
        }

        this.cursorTile = vec2(0, 0);
    }

    getTileTypeFromPosition(pos) {
        return this.indexes[pos.x + (pos.y * this.cols)];
    }

    draw(offset) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                var index = this.getTileTypeFromPosition(vec2(x, y));

                var pos = vec2(Math.floor(offset.x + (x * tileSize) + (x * tileGap)),
                    Math.floor(offset.y + (y * tileSize) + (y * tileGap)));
                var sc = vec2((tileSize / 64) + gridBlackLinesFixFactor,
                    (tileSize / 64) + gridBlackLinesFixFactor);

                if (index == SEA_TILE || index == TOXIC_TILE) {
                    if (gameTime % 2000 < 1000)
                        index += 20;
                }
                drawSheet(index, pos, sc);
            }
        }
        //Getting Tile at which the mouse is hovering on (or about to click)
        this.cursorTile = vec2((touchPos[0].x - offset.x - (tileSize / 2)) / (tileSize + tileGap),
            (touchPos[0].y - offset.y - (tileSize / 2)) / (tileSize + tileGap));
        this.cursorTile.x = Math.floor(this.cursorTile.x + 1);
        this.cursorTile.y = Math.floor(this.cursorTile.y + 1);

        drawRect(spritesRenderer, vec2(Math.floor((offset.x + (this.cursorTile.x * tileSize) + (this.cursorTile.x * tileGap) - (tileSize / 2))),
            Math.floor((offset.y + (this.cursorTile.y * tileSize) + (this.cursorTile.y * tileGap) - (tileSize / 2)))),
            vec2(tileSize, tileSize), true, "#FFFFFF44");
    }

    //UNIT MOVEMENT START // //

    //

    //

    calculateUnitMovement(mapUnit, destinationTile = vec2(this.cursorTile.x, this.cursorTile.y)) {
        var path = [mapUnit.mapPosition];
        var totalMovement = mapUnit.unit.movement;
        do {
            var adjacentTiles = [
                path[path.length - 1].add(vec2(-1, 0)),
                path[path.length - 1].add(vec2(0, -1)),
                path[path.length - 1].add(vec2(1, 0)),
                path[path.length - 1].add(vec2(0, 1))
            ];
            var shortestDist = 99999.0;
            var shortestDistTileIndex = -1;
            for (let i = 0; i < 4; i++) {
                var dist = adjacentTiles[i].distance(destinationTile);
                if (dist < shortestDist) {
                    shortestDist = dist;
                    shortestDistTileIndex = i;
                }
            }
            path.push(adjacentTiles[shortestDistTileIndex]);
            totalMovement -= 1;
        } while (!path[path.length - 1].isEqual(destinationTile) && totalMovement > 0);

        return path;
    }

    canUnitReachTile(mapUnit, tilePosition) {
        var path = this.calculateUnitMovement(mapUnit, tilePosition);
        return path[path.length - 1].isEqual(tilePosition);
    }

    drawUnitMovement(offset, mapUnit) {

        for (let y = -mapUnit.unit.movement; y <= mapUnit.unit.movement; y++) {
            for (let x = -mapUnit.unit.movement; x <= mapUnit.unit.movement; x++) {

                /*
                if (Math.abs(x) + Math.abs(y) > mapUnit.unit.movement
                    || (x == 0 && y == 0)
                    || manager.getPlayerAndUnitIndexOnTile(vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y))[0] != -1
                    || (this.getTileTypeFromPosition(vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y)) == SEA_TILE
                        && mapUnit.unit.type != TELEPORT_MECH))
                    continue;
                */

                if (this.canUnitReachTile(mapUnit, vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y))) {
                    var posi = vec2(Math.floor(offset.x + ((mapUnit.mapPosition.x + x) * tileSize) + ((mapUnit.mapPosition.x + x) * tileGap)),
                        Math.floor(offset.y + ((mapUnit.mapPosition.y + y) * tileSize) + ((mapUnit.mapPosition.y + y) * tileGap)));

                    drawRect(spritesRenderer, posi.subtract(vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)).divide(vec2(2, 2))),
                        vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)), true, "#FFFF0088");
                }
            }
        }

        var path = this.calculateUnitMovement(mapUnit);
        for (let i = 0; i < path.length; i++) {
            var posi = vec2(Math.floor(offset.x + (path[i].x * tileSize) + (path[i].x * tileGap)),
                Math.floor(offset.y + (path[i].y * tileSize) + (path[i].y * tileGap)));
            drawRect(spritesRenderer, posi.subtract(vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)).divide(vec2(2, 2))),
                vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)), true,
                (this.cursorTile.x == path[i].x && this.cursorTile.y == path[i].y) ? "#FF0000FF" : "#FF0000BB");
        }
    }

    eventUnitMovement(mapUnit) {
        if (isTouched) {
            isTouched = false;

            var path = this.calculateUnitMovement(mapUnit);
            mapUnit.mapPath = path;
            mapUnit.mapPathIndex = 0;
            mapUnit.up = -1;

            /*for (let y = -mapUnit.unit.movement; y <= mapUnit.unit.movement; y++) {
                for (let x = -mapUnit.unit.movement; x <= mapUnit.unit.movement; x++) {

                    if (Math.abs(x) + Math.abs(y) > mapUnit.unit.movement
                        || (x == 0 && y == 0))
                        continue;

                    if (this.cursorTile.x == mapUnit.mapPosition.x + x
                        && this.cursorTile.y == mapUnit.mapPosition.y + y
                        && manager.getPlayerAndUnitIndexOnTile(this.cursorTile)[0] == -1
                        && ((this.getTileTypeFromPosition(vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y)) != SEA_TILE
                            && mapUnit.unit.type != TELEPORT_MECH)
                            || mapUnit.unit.type == TELEPORT_MECH)) {
                        mapUnit.mapPosition = mapUnit.mapPosition.add(vec2(x, y));
                        mapUnit.up = -1;
                        return true;
                    }
                }
            }*/
        }
        return false;
    }

    //

    //

    //UNIT MOVEMENT END // //

    //UNIT ATTACK START // //

    //

    //

    drawUnitAttack(offset, mapUnit) {
        var skipRange = mapUnit.unit.type == ARTILLERY_MECH ? 2 : 0;
        var range = mapUnit.unit.type == ARTILLERY_MECH ? 4 : 1;
        for (let y = -range; y <= range; y++) {
            for (let x = -range; x <= range; x++) {

                if (Math.abs(x) + Math.abs(y) > range
                    || Math.abs(x) + Math.abs(y) <= skipRange
                    || (x == 0 && y == 0))
                    continue;

                var posi = vec2(Math.floor(offset.x + ((mapUnit.mapPosition.x + x) * tileSize) + ((mapUnit.mapPosition.x + x) * tileGap)),
                    Math.floor(offset.y + ((mapUnit.mapPosition.y + y) * tileSize) + ((mapUnit.mapPosition.y + y) * tileGap)));

                drawRect(spritesRenderer, posi.subtract(vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)).divide(vec2(2, 2))),
                    vec2(tileSize - (8 * pixelSize), tileSize - (8 * pixelSize)), true,
                    (this.cursorTile.x == mapUnit.mapPosition.x + x && this.cursorTile.y == mapUnit.mapPosition.y + y) ? "#FF0000BB" : "#FF000088");
            }
        }
    }

    battlescreenTransition(munit1, munit2) {
        ui.stateIndex = BATTLESCREEN;
        activeTeamID = manager.players[manager.getPlayerAndUnitIndexOnTile(munit1.mapPosition)[0]].unitGroup.teamID;
        activeMapUnit = munit1;
        passiveTeamID = manager.players[manager.getPlayerAndUnitIndexOnTile(munit2.mapPosition)[0]].unitGroup.teamID;
        passiveMapUnit = munit2;
    }

    attack(munit1, munit2, placement) {
        switch (munit1.unit.type) {
            case RIFLE_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit2.hp -= Math.floor((munit1.hp / 10.0) * 3);
                }
                break;

            case CANNON_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit2.hp -= Math.floor((munit1.hp / 10.0) * 6);
                }
                break;

            case ARTILLERY_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit2.hp -= Math.floor((munit1.hp / 10.0) * 8);
                }

                //Artillery Range Attack and pushes all units around the attack point
                var pu1 = manager.getPlayerAndUnitIndexOnTile(munit1.mapPosition.add(placement).add(vec2(1, 0)));
                if (pu1[0] != -1 && pu1[1] != -1)
                    manager.players[pu1[0]].unitGroup.mapUnits[pu1[1]].mapPosition
                        = manager.players[pu1[0]].unitGroup.mapUnits[pu1[1]].mapPosition.add(vec2(1, 0));

                var pu2 = manager.getPlayerAndUnitIndexOnTile(munit1.mapPosition.add(placement).add(vec2(-1, 0)));
                if (pu2[0] != -1 && pu2[1] != -1)
                    manager.players[pu2[0]].unitGroup.mapUnits[pu2[1]].mapPosition
                        = manager.players[pu2[0]].unitGroup.mapUnits[pu2[1]].mapPosition.add(vec2(-1, 0));

                var pu3 = manager.getPlayerAndUnitIndexOnTile(munit1.mapPosition.add(placement).add(vec2(0, 1)));
                if (pu3[0] != -1 && pu3[1] != -1)
                    manager.players[pu3[0]].unitGroup.mapUnits[pu3[1]].mapPosition
                        = manager.players[pu3[0]].unitGroup.mapUnits[pu3[1]].mapPosition.add(vec2(0, 1));

                var pu4 = manager.getPlayerAndUnitIndexOnTile(munit1.mapPosition.add(placement).add(vec2(0, -1)));
                if (pu4[0] != -1 && pu4[1] != -1)
                    manager.players[pu4[0]].unitGroup.mapUnits[pu4[1]].mapPosition
                        = manager.players[pu4[0]].unitGroup.mapUnits[pu4[1]].mapPosition.add(vec2(0, -1));

                break;

            case SUPPORT_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit1.hp -= Math.floor((((munit1.hp + munit2.hp) / 2) / 10.0) * 2);
                    munit2.hp -= Math.floor((munit1.hp / 10.0) * 4);
                    munit2.mapPosition = munit2.mapPosition.add(placement);
                }
                break;

            case TELEPORT_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit2.hp -= Math.floor((munit1.hp / 10.0) * 2);
                }
                break;
        }
    }

    eventUnitAttack(mapUnit) {
        if (isTouched) {
            isTouched = false;
            var skipRange = mapUnit.unit.type == ARTILLERY_MECH ? 2 : 0;
            var range = mapUnit.unit.type == ARTILLERY_MECH ? 4 : 1;
            for (let y = -range; y <= range; y++) {
                for (let x = -range; x <= range; x++) {

                    if (Math.abs(x) + Math.abs(y) > range
                        || Math.abs(x) + Math.abs(y) <= skipRange
                        || (x == 0 && y == 0))
                        continue;

                    if (this.cursorTile.x == mapUnit.mapPosition.x + x
                        && this.cursorTile.y == mapUnit.mapPosition.y + y) {
                        var playerAndUnit = manager.getPlayerAndUnitIndexOnTile(this.cursorTile);
                        if (playerAndUnit[0] != -1 && playerAndUnit[1] != -1)
                            this.attack(mapUnit, manager.players[playerAndUnit[0]].unitGroup.mapUnits[playerAndUnit[1]], vec2(x, y));
                        else
                            this.attack(mapUnit, -1, vec2(x, y));
                        mapUnit.right = -1;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    //

    //

    //UNIT ATTACK END // //

    event() {
        //Unit Action Event End Point
        if (getPlayer().getSelectedMapUnit().up == 0) {
            if (this.eventUnitMovement(getPlayer().getSelectedMapUnit())) {
                getPlayer().actionPoints--;
                actionPointsLabel.text = "AP: " + getPlayer().actionPoints.toString();
            }
        }
        else if (getPlayer().getSelectedMapUnit().right == 0) {
            if (this.eventUnitAttack(getPlayer().getSelectedMapUnit())) {
                getPlayer().actionPoints--;
                actionPointsLabel.text = "AP: " + getPlayer().actionPoints.toString();
            }
        }

        //Select unit on click/touch
        if (isTouched) {
            var playerAndUnit = manager.getPlayerAndUnitIndexOnTile(this.cursorTile);
            if (playerAndUnit[0] != -1
                && manager.players[playerAndUnit[0]].unitGroup.teamID == getPlayer().unitGroup.teamID) {
                getPlayer().selectedIndex = playerAndUnit[1];
                updateUnitActionButtons();
                zoomLock = false;
            }
        }
    }
}