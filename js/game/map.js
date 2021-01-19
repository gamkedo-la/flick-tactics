
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

//Map Tile Unit = 0_0_0
//1st digit -> Terrain
//2nd digit -> Unit (Builidng/Mech)
//3rd digit -> Team ID

const MAP_SIZE = {x: 28, y: 16};
var maps = [
    "1_0_0.1_1_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "1_0_0.3_0_0.1_5_0.0_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "1_0_0.3_0_0.3_7_0.0_0_0.0_0_0.5_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "1_0_0.0_6_0.0_0_0.0_0_0.0_0_0.0_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.3_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "1_0_0.1_0_0.0_0_0.0_0_0.0_0_0.0_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.1_0_0.1_0_0.3_0_0.3_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "4_0_0.1_0_0.1_0_0.0_0_0.0_0_0.0_0_0.0_0_0.2_0_0.0_0_0.0_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "4_0_0.4_0_0.1_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.2_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "0_0_0.4_0_0.5_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_7_3.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.2_0_0.2_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "0_0_0.3_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_8_3.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "1_0_0.0_0_0.3_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_3_3.2_0_0.2_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0." +
    "1_0_0.1_0_0.3_0_0.0_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.1_0_0." +
    "1_0_0.0_0_0.0_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "1_0_0.1_0_0.0_0_0.0_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.1_0_0.1_0_0.1_0_0.3_0_0.3_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.0_0_0.0_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.1_0_0.1_0_0.3_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.3_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0." +
    "1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0",
    
    "3_0_0.3_0_0.3_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.4_0_0.4_0_0.0_0_0.0_0_0.0_0_0.0_0_0."+
    "3_0_0.3_0_0.3_0_0.3_0_0.1_0_0.3_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.1_0_0.4_0_0.4_0_0.0_0_0.0_0_0.0_0_0.0_0_0."+
    "3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.1_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.1_0_0.1_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0."+
    "3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.0_0_0.0_0_0.1_0_0.1_0_0.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.1_0_0.1_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0."+
    "3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.1_0_0.2_0_0.2_0_0.1_0_0.1_0_0.3_0_0.3_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.4_0_0.4_0_0.0_0_0.0_0_0.4_0_0.4_0_0."+
    "3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.1_0_0.1_0_0.2_0_0.2_0_0.0_0_0.0_0_0.3_0_0.4_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.4_0_0.0_0_0.0_0_0.4_0_0.4_0_0."+
    "3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.3_0_0.1_0_0.1_0_0.0_0_0.0_0_0.0_0_0.1_0_0.4_0_0.3_0_0.3_0_0.3_0_0.3_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0."+
    "3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.4_0_0.0_0_0.0_0_0.0_0_0.2_0_0.1_0_0.1_0_0.3_0_0.4_0_0.3_0_0.3_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0."+
    "3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.1_0_0.1_0_0.0_0_0.4_0_0.3_0_0.1_0_0.1_0_0.2_0_0.2_0_0.1_0_0.1_0_0.4_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0."+
    "0_0_0.4_0_0.4_0_0.0_0_0.0_0_0.4_0_0.4_0_0.0_0_0.1_0_0.1_0_0.0_0_0.4_0_0.4_0_0.4_0_0.1_0_0.1_0_0.2_0_0.2_0_0.4_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0."+
    "0_0_0.4_0_0.4_0_0.0_0_0.0_0_0.4_0_0.4_0_0.0_0_0.0_0_0.0_0_0.0_0_0.4_0_0.4_0_0.4_0_0.1_0_0.1_0_0.2_0_0.2_0_0.4_0_0.4_0_0.4_0_0.4_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0."+
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.4_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.4_0_0.1_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0."+
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.4_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.0_0_0.0_0_0.4_0_0.1_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0."+
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.4_0_0.4_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.4_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.3_0_0.3_0_0.3_0_0.3_0_0.3_0_0."+
    "0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.4_0_0.4_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.0_0_0.1_0_0.1_0_0.1_0_0.1_0_0.2_0_0.2_0_0.2_0_0.1_0_0.1_0_0.3_0_0.3_0_0.3_0_0.3_0_0"
];

var currentMapIndex = 0;

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

function pixelPositionToTilePosition(pixelPos) {
    return vec2(Math.floor((pixelPos.x / (tileSize + tileGap))+0.01),
        Math.floor((pixelPos.y / (tileSize + tileGap))+0.01));
}

function tilePositionToPixelPosition(tilePos) {
    return vec2(Math.floor((tilePos.x * tileSize) + (tilePos.x * tileGap)),
        Math.floor((tilePos.y * tileSize) + (tilePos.y * tileGap)));
}

class GameMap {
    constructor(mapString) {
        this.indexes = [];

        this.redData = [];
        this.blueData = [];
        this.greenData = [];
        this.blackData = [];

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

    getMapString(manager) {
        var mapString = "";

        if(typeof manager != "undefined") {
            for (let y = 0; y < MAP_SIZE.y; y++) {
                for (let x = 0; x < MAP_SIZE.x; x++) {
                    var unitTeamString = "";
                    var PU = manager.getPlayerAndUnitIndexOnTile(vec2(x, y));

                    if(PU[0] <= -1)
                    {
                        unitTeamString = "_0_0";
                    }
                    else
                    {
                        var team = manager.players[PU[0]].unitGroup.teamID;
                        var unit = manager.players[PU[0]].unitGroup.mapUnits[PU[1]].unit.type + 1;

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
        else
        {
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

        //Tile Position Debug Draw
        drawText(spritesRenderer, this.cursorTile.x.toString() + ", " + this.cursorTile.y.toString(), vec2(Math.floor((offset.x + (this.cursorTile.x * tileSize) + (this.cursorTile.x * tileGap) - (tileSize / 2))),
            Math.floor((offset.y + (this.cursorTile.y * tileSize) + (this.cursorTile.y * tileGap) - (tileSize / 2)))).add(toVec2(pixelSize)), "black");
        drawText(spritesRenderer, this.cursorTile.x.toString() + ", " + this.cursorTile.y.toString(), vec2(Math.floor((offset.x + (this.cursorTile.x * tileSize) + (this.cursorTile.x * tileGap) - (tileSize / 2))),
            Math.floor((offset.y + (this.cursorTile.y * tileSize) + (this.cursorTile.y * tileGap) - (tileSize / 2)))), "white");
    }

    drawUnitExtras()
    {
        if (getPlayer().getSelectedMapUnit().up == 0) {
            map.drawUnitMovement(cam, getPlayer().getSelectedMapUnit());
        }
        else if (getPlayer().getSelectedMapUnit().right == 0) {
            map.drawUnitAttack(cam, getPlayer().getSelectedMapUnit());
        }
    }

    //UNIT MOVEMENT START // //

    //

    //

    isTileMovementObstacleToMapUnit(mapUnit, tilePosition) {
        var tileType = this.getTileTypeFromPosition(tilePosition);
        for(let i = 0; i < mapUnit.unit.movementObstacles.length; i++)
            if(mapUnit.unit.movementObstacles[i] == tileType)
                return true;

        //Other Player Units are Obstacles
        var plAndUnitInd = manager.getPlayerAndUnitIndexOnTile(tilePosition);
        if(plAndUnitInd[0] != -1 && manager.index != plAndUnitInd[0]) return true;

        return false;
    }

    isTileMovementReducerToMapUnit(mapUnit, tilePosition) {
        var tileType = this.getTileTypeFromPosition(tilePosition);
        for(let i = 0; i < mapUnit.unit.movementReducers.length; i++)
            if(mapUnit.unit.movementReducers[i] == tileType)
                return true;
        return false;
    }

    calculateUnitMovement(mapUnit, destinationTile = vec2(this.cursorTile.x, this.cursorTile.y), limited = true) {
        if(mapUnit.unit.isBuilding == true
        || this.isTileMovementObstacleToMapUnit(mapUnit, destinationTile)
        || manager.getPlayerAndUnitIndexOnTile(destinationTile)[0] != -1
        || destinationTile.x < 0
        || destinationTile.y < 0
        || destinationTile.x >= MAP_SIZE.x
        || destinationTile.y >= MAP_SIZE.y)
            return -1;

        var method = 0;
        var path = [];
        do {
            path = [mapUnit.mapPosition];
            var totalMovement = limited ? mapUnit.unit.movement : 200;
            do {
                var adjacentTiles = [];

                var adjaTile1 = path[path.length - 1];
                var adjaTile2 = path[path.length - 1];
                var adjaTile3 = path[path.length - 1];
                var adjaTile4 = path[path.length - 1];

                adjaTile1 = adjaTile1.add(vec2(-1, 0));
                adjaTile2 = adjaTile2.add(vec2(0, -1));
                adjaTile3 = adjaTile3.add(vec2(1, 0));
                adjaTile4 = adjaTile4.add(vec2(0, 1));

                if(!this.isTileMovementObstacleToMapUnit(mapUnit, adjaTile1)
                && !isVec2InArr(path, adjaTile1))
                    adjacentTiles.push(adjaTile1);
                if(!this.isTileMovementObstacleToMapUnit(mapUnit, adjaTile2)
                && !isVec2InArr(path, adjaTile2))
                    adjacentTiles.push(adjaTile2);
                if(!this.isTileMovementObstacleToMapUnit(mapUnit, adjaTile3)
                && !isVec2InArr(path, adjaTile3))
                    adjacentTiles.push(adjaTile3);
                if(!this.isTileMovementObstacleToMapUnit(mapUnit, adjaTile4)
                && !isVec2InArr(path, adjaTile4))
                    adjacentTiles.push(adjaTile4);

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
        var down = this.calculateUnitMovement(mapUnit, tilePosition.add(vec2(1,0)));
        var right = this.calculateUnitMovement(mapUnit, tilePosition.add(vec2(0,1)));
        var up = this.calculateUnitMovement(mapUnit, tilePosition.add(vec2(-1,0)));
        var left = this.calculateUnitMovement(mapUnit, tilePosition.add(vec2(0,-1)));

        if(down != -1
        && ((right != -1 && down.length <= right.length) || (right == -1))
        && ((up != -1 && down.length <= up.length) || (up == -1))
        && ((left != -1 && down.length <= left.length) || (left == -1)))
            return down;

        if(right != -1
        && ((down != -1 && right.length <= down.length) || (down == -1))
        && ((up != -1 && right.length <= up.length) || (up == -1))
        && ((left != -1 && right.length <= left.length) || (left == -1)))
            return right;

        if(up != -1
        && ((right != -1 && up.length <= right.length) || (right == -1))
        && ((down != -1 && up.length <= down.length) || (down == -1))
        && ((left != -1 && up.length <= left.length) || (left == -1)))
            return up;

        if(left != -1
        && ((right != -1 && left.length <= right.length) || (right == -1))
        && ((up != -1 && left.length <= up.length) || (up == -1))
        && ((down != -1 && left.length <= down.length) || (down == -1)))
            return left;

        return -1;
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

                    drawRect(spritesRenderer, posi.subtract(vec2(tileSize - (16 * pixelSize), tileSize - (16 * pixelSize)).divide(vec2(2, 2))),
                        vec2(tileSize - (16 * pixelSize), tileSize - (16 * pixelSize)), true, "#FFFFFF88");
                }
            }
        }

        var path = this.calculateUnitMovement(mapUnit);
        for (let i = 0; i < path.length; i++) {
            var posi = vec2(Math.floor(offset.x + (path[i].x * tileSize) + (path[i].x * tileGap)),
                Math.floor(offset.y + (path[i].y * tileSize) + (path[i].y * tileGap)));
            drawRect(spritesRenderer, posi.subtract(vec2(tileSize - (32 * pixelSize), tileSize - (32 * pixelSize)).divide(vec2(2, 2))),
                vec2(tileSize - (32 * pixelSize), tileSize - (32 * pixelSize)), true,
                (this.cursorTile.x == path[i].x && this.cursorTile.y == path[i].y) ? "#000000FF" : "#000000BB");
        }
    }

    eventUnitMovement(mapUnit) {
        if (isTouched) {
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
        while(path == -1) path = this.calculateUnitMovement(mapUnit, mapUnit.mapPosition.add( vec2(
            Math.floor(-mapUnit.unit.movement + (Math.random() * (mapUnit.unit.movement * 2))),
            Math.floor(-mapUnit.unit.movement + (Math.random() * (mapUnit.unit.movement * 2))))
        ));

        mapUnit.mapPath = path;
        mapUnit.mapPathIndex = 0;
        mapUnit.up = -1;
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
                } else if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == FOREST_TILE && !isTileOnFire(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
                } else if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == SAND_TILE && !isTileOnSmoke(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), smokeSequence).forTurns(SAND_SMOKE_TURNS);
                }
                break;

            case CANNON_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit2.hp -= Math.floor((munit1.hp / 10.0) * 6);
                } else if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == FOREST_TILE && !isTileOnFire(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
                } else if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == SAND_TILE && !isTileOnSmoke(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), smokeSequence).forTurns(SAND_SMOKE_TURNS);
                }
                break;

            case ARTILLERY_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit2.hp -= Math.floor((munit1.hp / 10.0) * 8);
                } else if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == FOREST_TILE && !isTileOnFire(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), fireSequence, fireSequenceEndFunction).forTurns(FOREST_FIRE_TURNS);
                } else if(map.getTileTypeFromPosition(munit1.mapPosition.add(placement)) == SAND_TILE && !isTileOnSmoke(munit1.mapPosition.add(placement))) {
                    new TileParticle(tilePositionToPixelPosition(munit1.mapPosition.add(placement)), smokeSequence).forTurns(SAND_SMOKE_TURNS);
                }

                //Artillery Range Attack and pushes all units around the attack point
                var pu1 = manager.getPlayerAndUnitIndexOnTile(munit1.mapPosition.add(placement).add(vec2(1, 0)));
                if (pu1[0] != -1 && pu1[1] != -1 && !manager.players[pu[0]].unitGroup.mapUnits[pu[1]].unit.isBuilding)
                    manager.players[pu1[0]].unitGroup.mapUnits[pu1[1]].mapPosition
                        = manager.players[pu1[0]].unitGroup.mapUnits[pu1[1]].mapPosition.add(vec2(1, 0));

                var pu2 = manager.getPlayerAndUnitIndexOnTile(munit1.mapPosition.add(placement).add(vec2(-1, 0)));
                if (pu2[0] != -1 && pu2[1] != -1 && !manager.players[pu[0]].unitGroup.mapUnits[pu[1]].unit.isBuilding)
                    manager.players[pu2[0]].unitGroup.mapUnits[pu2[1]].mapPosition
                        = manager.players[pu2[0]].unitGroup.mapUnits[pu2[1]].mapPosition.add(vec2(-1, 0));

                var pu3 = manager.getPlayerAndUnitIndexOnTile(munit1.mapPosition.add(placement).add(vec2(0, 1)));
                if (pu3[0] != -1 && pu3[1] != -1 && !manager.players[pu[0]].unitGroup.mapUnits[pu[1]].unit.isBuilding)
                    manager.players[pu3[0]].unitGroup.mapUnits[pu3[1]].mapPosition
                        = manager.players[pu3[0]].unitGroup.mapUnits[pu3[1]].mapPosition.add(vec2(0, 1));

                var pu4 = manager.getPlayerAndUnitIndexOnTile(munit1.mapPosition.add(placement).add(vec2(0, -1)));
                if (pu4[0] != -1 && pu4[1] != -1 && !manager.players[pu[0]].unitGroup.mapUnits[pu[1]].unit.isBuilding)
                    manager.players[pu4[0]].unitGroup.mapUnits[pu4[1]].mapPosition
                        = manager.players[pu4[0]].unitGroup.mapUnits[pu4[1]].mapPosition.add(vec2(0, -1));
                break;

            case SUPPORT_MECH:
                if (munit2 != -1) {
                    this.battlescreenTransition(munit1, munit2);
                    munit1.hp -= Math.floor((((munit1.hp + munit2.hp) / 2) / 10.0) * 2);
                    munit2.hp -= Math.floor((munit1.hp / 10.0) * 4);

                    //Support Mech's tackle pushes the mech
                    if(!munit2.unit.isBuilding) munit2.mapPosition = munit2.mapPosition.add(placement);
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
        if (getPlayer().getSelectedMapUnit().up == 0) { //Move
            if (this.eventUnitMovement(getPlayer().getSelectedMapUnit())) {
                getPlayer().actionPoints--;
            }
        }
        else if (getPlayer().getSelectedMapUnit().right == 0) { //Attack
            if (this.eventUnitAttack(getPlayer().getSelectedMapUnit())) {
                getPlayer().actionPoints--;
            }
        }

        //Select unit on click/touch
        if (isTouched && !isTouchInsideBPanel()) {
            var playerAndUnit = manager.getPlayerAndUnitIndexOnTile(this.cursorTile);
            if (playerAndUnit[0] != -1
                && manager.players[playerAndUnit[0]].unitGroup.teamID == getPlayer().unitGroup.teamID
                && manager.players[playerAndUnit[0]].unitGroup.mapUnits[playerAndUnit[1]].unit.type != RUIN_BUILDING) {
                getPlayer().selectedIndex = playerAndUnit[1];
                updateUnitActionButtons();
                zoomLock = false;
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