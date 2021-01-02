
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
        return false;
    }

    isTileMovementReducerToMapUnit(mapUnit, tilePosition) {
        var tileType = this.getTileTypeFromPosition(tilePosition);
        for(let i = 0; i < mapUnit.unit.movementReducers.length; i++)
            if(mapUnit.unit.movementReducers[i] == tileType)
                return true;
        return false;
    }

    calculateUnitMovement(mapUnit, destinationTile = vec2(this.cursorTile.x, this.cursorTile.y)) {
        if(this.isTileMovementObstacleToMapUnit(mapUnit, destinationTile)
        || manager.getPlayerAndUnitIndexOnTile(destinationTile)[0] != -1
        || destinationTile.x < 0
        || destinationTile.y < 0
        || destinationTile.x >= MAP_SIZE.x
        || destinationTile.x >= MAP_SIZE.y)
            return -1;

        var path = [mapUnit.mapPosition];
        var totalMovement = mapUnit.unit.movement;
        do {
            var adjacentTiles = [];

            var adjaTile1 = path[path.length - 1].add(vec2(-1, 0));
            var isObstacle1 = this.isTileMovementObstacleToMapUnit(mapUnit, adjaTile1);
            var isReducer1 = this.isTileMovementReducerToMapUnit(mapUnit, adjaTile1);
            if(!isObstacle1) adjacentTiles.push(adjaTile1);

            var adjaTile2 = path[path.length - 1].add(vec2(0, -1));
            var isObstacle2 = this.isTileMovementObstacleToMapUnit(mapUnit, adjaTile2);
            var isReducer2 = this.isTileMovementReducerToMapUnit(mapUnit, adjaTile2);
            if(!isObstacle2) adjacentTiles.push(adjaTile2);

            var adjaTile3 = path[path.length - 1].add(vec2(1, 0));
            var isObstacle3 = this.isTileMovementObstacleToMapUnit(mapUnit, adjaTile3);
            var isReducer3 = this.isTileMovementReducerToMapUnit(mapUnit, adjaTile3);
            if(!isObstacle3) adjacentTiles.push(adjaTile3);

            var adjaTile4 = path[path.length - 1].add(vec2(0, 1));
            var isObstacle4 = this.isTileMovementObstacleToMapUnit(mapUnit, adjaTile4);
            var isReducer4 = this.isTileMovementReducerToMapUnit(mapUnit, adjaTile4);
            if(!isObstacle4) adjacentTiles.push(adjaTile4);

            var shortestDist = 99999.0;
            var shortestDistTileIndex = -1;
            for (let i = 0; i < adjacentTiles.length; i++) {
                var dist = adjacentTiles[i].distance(destinationTile);
                if (dist < shortestDist) {
                    shortestDist = dist;
                    shortestDistTileIndex = i;
                }
            }
            path.push(adjacentTiles[shortestDistTileIndex]);

            var prevTotalMovement = totalMovement;
            if(adjacentTiles[shortestDistTileIndex].isEqual(adjaTile1) && isReducer1) totalMovement--;
            else if(adjacentTiles[shortestDistTileIndex].isEqual(adjaTile2) && isReducer2) totalMovement--;
            else if(adjacentTiles[shortestDistTileIndex].isEqual(adjaTile3) && isReducer3) totalMovement--;
            else if(adjacentTiles[shortestDistTileIndex].isEqual(adjaTile4) && isReducer4) totalMovement--;

            //Rifle Mech movement is double reduced by mountains
            if(mapUnit.unit.type == RIFLE_MECH && prevTotalMovement != totalMovement) totalMovement--;

            totalMovement--;

        } while (!path[path.length - 1].isEqual(destinationTile) && totalMovement > 0);

        if(!path[path.length - 1].isEqual(destinationTile)) return -1;

        return path;
    }

    canUnitReachTile(mapUnit, tilePosition) {
        var path = this.calculateUnitMovement(mapUnit, tilePosition);
        if(path == -1) return false;
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
            var path = this.calculateUnitMovement(mapUnit);
            if(path == -1) return false;

            mapUnit.mapPath = path;
            mapUnit.mapPathIndex = 0;
            mapUnit.up = -1;

            return true;

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

        if (munit2.hp <= 0)
        {
            // Get player and unit index for player owning munit2
            var munit2PlayerAndUnit = manager.getPlayerAndUnitIndexOnTile(munit2.mapPosition);
            
            // Array of units for player owning munit2
            var munit2PlayerUnits = manager.players[munit2PlayerAndUnit[0]].unitGroup.mapUnits;

            // Unit to remove from array
            var unitIndexToRemove = munit2PlayerAndUnit[1];

            // Remove unit from array
            for(var i = 0; i < munit2PlayerUnits.length; i++) { 
    
                if (munit2PlayerUnits[i] === munit2PlayerUnits[unitIndexToRemove]) {            
                    munit2PlayerUnits.splice(i, 1); 
                }            
            }

            // Get player owning munit2 units and set array to modified value
            manager.players[munit2PlayerAndUnit[0]].unitGroup.mapUnits = munit2PlayerUnits;
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