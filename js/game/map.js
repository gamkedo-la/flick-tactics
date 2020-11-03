var maxDisplayTilesPerRow = 16;
var gridBlackLinesFixFactor = 0.02;

const PLAINS_TILE = 0;
const SAND_TILE = 1;
const SEA_TILE = 2;

const FOREST_TILE = 3;
const MOUNTAIN_TILE = 4;

const TOXIC_TILE = 5;

var map1 =
    "01.01.01.01.01.02.02.02.01.01.01.01.01.01.01.01." +
    "01.01.03.00.02.02.02.02.00.00.00.00.01.01.01.01." +
    "01.00.00.00.00.02.02.02.02.00.00.00.00.01.01.01." +
    "01.00.00.00.00.00.02.02.02.02.02.00.00.00.00.01." +
    "01.01.00.00.00.00.02.02.02.00.00.01.01.01.02.02." +
    "01.01.01.00.00.00.00.02.00.00.01.01.02.02.02.02." +
    "01.01.01.00.00.00.00.00.00.01.02.02.02.02.02.02." +
    "00.00.00.01.01.01.01.01.01.01.01.02.02.02.02.01." +
    "00.00.01.01.01.02.02.02.01.01.01.01.01.01.01.01." +
    "01.00.00.02.02.02.02.02.02.02.00.00.01.01.01.01." +
    "01.01.01.00.02.02.02.02.02.00.00.00.00.01.01.01." +
    "01.00.00.02.02.02.02.02.02.02.02.00.00.00.00.01." +
    "01.01.00.00.02.02.02.02.02.00.00.01.01.01.02.02." +
    "01.01.01.02.02.02.02.02.00.00.01.01.02.02.02.02." +
    "01.01.01.01.01.02.02.02.02.01.02.02.02.02.02.02." +
    "01.01.01.01.01.01.01.01.01.01.01.02.02.02.02.01.";

function drawSheet(index, pos, sc, tileSize) {
    if (typeof tileSize == "undefined") tileSize = vec2(64, 64);
    var cols = Math.floor(gameSheet.imageObject.image.width / tileSize.x);
    var rows = Math.floor(gameSheet.imageObject.image.height / tileSize.y);

    gameSheet.transform.position = pos;
    gameSheet.transform.scale = sc;

    if (index == 120) {
        console.log(Math.floor(index / cols));
    }

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
                this.indexes.push(parseInt(tindexes[x + (y * this.rows)]));
            }
        }

        this.cursorTile = vec2(0, 0);
    }

    getTileTypeFromPosition(pos) {
        return this.indexes[pos.x + (pos.y * this.rows)];
    }

    draw(offset) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                var index = this.getTileTypeFromPosition(vec2(x, y));

                var pos = vec2(Math.floor(offset.x + (x * (gameWidth / maxDisplayTilesPerRow))),
                    Math.floor(offset.y + (y * (gameWidth / maxDisplayTilesPerRow))));
                var sc = vec2(((gameWidth / maxDisplayTilesPerRow) / 64) + gridBlackLinesFixFactor,
                    ((gameWidth / maxDisplayTilesPerRow) / 64) + gridBlackLinesFixFactor);
                drawSheet(index, pos, sc);
            }
        }

        this.cursorTile = vec2((touchPos[0].x - offset.x - ((gameWidth / maxDisplayTilesPerRow) / 2)) / (gameWidth / maxDisplayTilesPerRow),
            (touchPos[0].y - offset.y - ((gameWidth / maxDisplayTilesPerRow) / 2)) / (gameWidth / maxDisplayTilesPerRow));
        this.cursorTile.x = Math.floor(this.cursorTile.x + 1);
        this.cursorTile.y = Math.floor(this.cursorTile.y + 1);

        /*drawRect(spritesRenderer, vec2(Math.floor((offset.x + (this.cursorTile.x * (gameWidth / maxDisplayTilesPerRow)) - ((gameWidth / maxDisplayTilesPerRow) / 2))),
            Math.floor((offset.y + (this.cursorTile.y * (gameWidth / maxDisplayTilesPerRow)) - ((gameWidth / maxDisplayTilesPerRow) / 2)))),
            vec2(gameWidth / maxDisplayTilesPerRow, gameWidth / maxDisplayTilesPerRow), true, "#FFFFFF44");*/
    }

    drawUnitMovement(offset, mapUnit) {
        for (let y = -mapUnit.unit.movement; y <= mapUnit.unit.movement; y++) {
            for (let x = -mapUnit.unit.movement; x <= mapUnit.unit.movement; x++) {

                if (Math.abs(x) + Math.abs(y) > mapUnit.unit.movement
                    || (x == 0 && y == 0)
                    || manager.getPlayerAndUnitIndexOnTile(vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y))[0] != -1
                    || this.getTileTypeFromPosition(vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y)) == SEA_TILE)
                    continue;

                var posi = vec2(Math.floor(offset.x + ((mapUnit.mapPosition.x + x) * (gameWidth / maxDisplayTilesPerRow))),
                    Math.floor(offset.y + ((mapUnit.mapPosition.y + y) * (gameWidth / maxDisplayTilesPerRow))));

                drawRect(spritesRenderer, posi.subtract(vec2(gameWidth / maxDisplayTilesPerRow, gameWidth / maxDisplayTilesPerRow).divide(vec2(2, 2))),
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
                        && this.getTileTypeFromPosition(vec2(mapUnit.mapPosition.x + x, mapUnit.mapPosition.y + y)) != SEA_TILE) {
                        mapUnit.mapPosition = mapUnit.mapPosition.add(vec2(x, y));
                        mapUnit.up = -1;
                        return true;
                    }
                }
            }
        }
        return false;
    }
}