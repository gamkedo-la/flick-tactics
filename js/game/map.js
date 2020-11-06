var maxDisplayTilesPerRow = 16;
var gridBlackLinesFixFactor = 0.02;

const PLAINS_TILE = 0;

const SAND_TILE = 1;

const SEA_TILE = 2;
const SEA_TILES = [20, 21, 22, 23, 24, 25, 26, 27, 28, 40, 41, 42, 43, 44, 45, 46, 47, 48, 60, 61, 62, 63, 64, 65, 66, 67, 68];
const SEA_STARTANIMATION = 106; //107

const FOREST_TILE = 3;

const MOUNTAIN_TILE = 4;

const TOXIC_TILE = 5;
const TOXIC_TILES = [6, 7, 8, 9];
const TOXIC_STARTANIMATION = 87; //88

const ROAD_TILE = 86;
const ROAD_TILES = [80, 81, 82, 83, 84, 85, 100, 101, 102, 103, 104, 105];

//building_tile + teamID
const HQ_TILE = 281;
const CITY_TILE = 268;
const WAR_TILE = 289;
const RUIN_TILE = 293;

var map1 =
    "01.01.01.01.01.02.02.02.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01." +
    "01.03.01.00.02.02.02.02.00.00.00.00.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01." +
    "01.03.03.00.00.02.02.02.02.00.00.00.00.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01." +
    "01.00.00.00.00.00.02.02.02.02.02.00.00.00.00.01.01.01.03.01.01.01.01.01.01.01.01.01." +
    "01.01.00.00.00.00.02.02.02.00.00.01.01.01.02.02.01.01.03.03.01.01.01.01.01.01.01.01." +
    "01.01.01.00.00.00.00.02.00.00.01.01.02.02.02.02.01.01.01.01.01.01.01.01.01.01.01.01." +
    "01.01.01.00.00.00.00.00.00.01.02.02.02.02.02.02.01.01.02.01.01.01.01.01.01.01.01.01." +
    "00.00.00.01.01.01.01.01.01.01.01.02.02.02.02.01.01.02.02.00.00.00.00.01.01.01.01.01." +
    "00.03.01.01.01.02.02.02.01.01.01.01.01.01.01.01.02.02.02.02.00.00.00.00.01.01.01.01." +
    "01.00.03.02.02.02.02.02.02.02.00.00.01.01.01.01.01.01.02.02.02.02.00.00.00.00.01.01." +
    "01.01.03.00.02.02.02.02.02.00.00.00.00.01.01.01.01.01.02.02.00.00.01.01.01.02.02.01." +
    "01.00.00.02.02.02.02.02.02.02.02.00.00.00.00.01.01.01.01.01.01.01.01.01.01.01.01.01." +
    "01.01.00.00.02.02.02.02.02.00.00.01.01.01.02.02.01.01.01.03.03.01.01.01.01.01.01.01." +
    "01.01.01.02.02.02.02.02.00.00.01.01.02.02.02.02.01.01.01.01.03.01.01.01.01.01.01.01." +
    "01.01.01.01.01.02.02.02.02.01.02.02.02.02.02.02.01.01.01.01.01.03.01.01.01.01.01.01." +
    "01.01.01.01.01.01.01.01.01.01.01.02.02.02.02.01.01.01.01.01.01.01.01.01.01.01.01.01";

function drawSheet(index, pos, sc, tileSize) {
    if (typeof tileSize == "undefined") tileSize = vec2(64, 64);
    var cols = Math.floor(gameSheet.imageObject.image.width / tileSize.x);
    //var rows = Math.floor(gameSheet.imageObject.image.height / tileSize.y);

    gameSheet.transform.position = pos;
    gameSheet.transform.scale = sc;

    gameSheet.drawScIn(vec2(index % cols, Math.floor(index / cols)).multiply(vec2(64, 64)), tileSize);
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

                var tileSize = gameWidth / maxDisplayTilesPerRow;

                var pos = vec2(Math.floor(offset.x + (x * tileSize)),
                    Math.floor(offset.y + (y * tileSize)));
                var sc = vec2((tileSize / 64) + gridBlackLinesFixFactor,
                    (tileSize / 64) + gridBlackLinesFixFactor);
                drawSheet(index, pos, sc);
            }
        }

        //Getting Tile at which the mouse is hovering on (or about to click)
        this.cursorTile = vec2((touchPos[0].x - offset.x - ((gameWidth / maxDisplayTilesPerRow) / 2)) / (gameWidth / maxDisplayTilesPerRow),
            (touchPos[0].y - offset.y - ((gameWidth / maxDisplayTilesPerRow) / 2)) / (gameWidth / maxDisplayTilesPerRow));
        this.cursorTile.x = Math.floor(this.cursorTile.x + 1);
        this.cursorTile.y = Math.floor(this.cursorTile.y + 1);

        drawRect(spritesRenderer, vec2(Math.floor((offset.x + (this.cursorTile.x * (gameWidth / maxDisplayTilesPerRow)) - ((gameWidth / maxDisplayTilesPerRow) / 2))),
            Math.floor((offset.y + (this.cursorTile.y * (gameWidth / maxDisplayTilesPerRow)) - ((gameWidth / maxDisplayTilesPerRow) / 2)))),
            vec2(gameWidth / maxDisplayTilesPerRow, gameWidth / maxDisplayTilesPerRow), true, "#FFFFFF44");
    }

    //UNIT MOVEMENT START // //

    //

    //

    drawUnitMovement(offset, mapUnit) {
        for (let y = -mapUnit.unit.movement; y <= mapUnit.unit.movement; y++) {
            for (let x = -mapUnit.unit.movement; x <= mapUnit.unit.movement; x++) {

                if (Math.abs(x) + Math.abs(y) > mapUnit.unit.movement
                    || (x == 0 && y == 0)
                    || manager.getPlayerAndUnitIndexOnTile(vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y))[0] != -1
                    || (this.getTileTypeFromPosition(vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y)) == SEA_TILE
                        && mapUnit.unit.type != TELEPORT_MECH))
                    continue;

                var posi = vec2(Math.floor(offset.x + ((mapUnit.mapPosition.x + x) * (gameWidth / maxDisplayTilesPerRow))),
                    Math.floor(offset.y + ((mapUnit.mapPosition.y + y) * (gameWidth / maxDisplayTilesPerRow))));

                drawRect(spritesRenderer, posi.subtract(vec2((gameWidth / maxDisplayTilesPerRow) - (8 * pixelSize), (gameWidth / maxDisplayTilesPerRow) - (8 * pixelSize)).divide(vec2(2, 2))),
                    vec2((gameWidth / maxDisplayTilesPerRow) - (8 * pixelSize), (gameWidth / maxDisplayTilesPerRow) - (8 * pixelSize)), true,
                    (this.cursorTile.x == mapUnit.mapPosition.x + x && this.cursorTile.y == mapUnit.mapPosition.y + y) ? "#00FF0088" : "#FFFF0044");
            }
        }
    }

    eventUnitMovement(mapUnit) {
        if (isTouched) {
            isTouched = false;
            for (let y = -mapUnit.unit.movement; y <= mapUnit.unit.movement; y++) {
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
            }
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
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {

                if (Math.abs(x) + Math.abs(y) > 1
                    || (x == 0 && y == 0)
                    || manager.getPlayerAndUnitIndexOnTile(vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y))[0] != -1)
                    continue;

                var posi = vec2(Math.floor(offset.x + ((mapUnit.mapPosition.x + x) * (gameWidth / maxDisplayTilesPerRow))),
                    Math.floor(offset.y + ((mapUnit.mapPosition.y + y) * (gameWidth / maxDisplayTilesPerRow))));

                drawRect(spritesRenderer, posi.subtract(vec2((gameWidth / maxDisplayTilesPerRow) - (8 * pixelSize), (gameWidth / maxDisplayTilesPerRow) - (8 * pixelSize)).divide(vec2(2, 2))),
                    vec2((gameWidth / maxDisplayTilesPerRow) - (8 * pixelSize), (gameWidth / maxDisplayTilesPerRow) - (8 * pixelSize)), true,
                    (this.cursorTile.x == mapUnit.mapPosition.x + x && this.cursorTile.y == mapUnit.mapPosition.y + y) ? "#FF000088" : "#FF000044");
            }
        }
    }

    attack(munit1, munit2) {
        switch (munit1.unit.type) {
            case RIFLE_MECH:
                munit2.hp -= Math.floor((munit1.hp / 10.0) * 3);
                break;

            case CANNON_MECH:
                munit2.hp -= Math.floor((munit1.hp / 10.0) * 6);
                break;

            case ARTILLERY_MECH:
                munit2.hp -= Math.floor((munit1.hp / 10.0) * 8);
                break;

            case SUPPORT_MECH:
                munit2.hp -= Math.floor((munit1.hp / 10.0) * 2);
                break;

            case TELEPORT_MECH:
                munit2.hp -= Math.floor((munit1.hp / 10.0) * 4);
                break;
        }
    }

    eventUnitAttack(mapUnit) {
        if (isTouched) {
            isTouched = false;
            for (let y = -1; y <= 1; y++) {
                for (let x = -1; x <= 1; x++) {

                    if (Math.abs(x) + Math.abs(y) > 1
                        || (x == 0 && y == 0))
                        continue;

                    if (this.cursorTile.x == mapUnit.mapPosition.x + x
                        && this.cursorTile.y == mapUnit.mapPosition.y + y) {
                        var playerAndUnit = manager.getPlayerAndUnitIndexOnTile(this.cursorTile);
                        this.attack(mapUnit, manager.players[playerAndUnit[0]].unitGroup.mapUnits[playerAndUnit[1]]);
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
}