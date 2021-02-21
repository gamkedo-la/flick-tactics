
//Unit class represents the base unit and not the one that is to be rendered on the map
//Map Unit class consists of Unit and its purpose is to deploy and render units on the map
//Map Unit Group class is a group of Map Units

const RIFLE_MECH = 0;
const CANNON_MECH = 1;
const ARTILLERY_MECH = 2;
const SUPPORT_MECH = 3;
const TELEPORT_MECH = 4;

const ANIM_MECH_WALK = 40;

//buildings acts as units
const HQ_BUILDING = 60;
const CITY_BUILDING = 64;
const WAR_BUILDING = 68;
const RUIN_BUILDING = 72;

function getMechIndexFromType(type, teamNo, animDelayMax = 1200, animDelayMin = 600) {
    return (gameTime % animDelayMax < animDelayMin ? 20 : 0) + 100 + (4 * type) + teamNo;
}

function getBuildingIndexFromType(type) {
    return 60 + (4 * type);
}

function getTeamIndex(index, teamNo) {
    return (gameTime % 1200 < 600 ? 20 : 0) + index + teamNo;
}

function hMirrorVec2(v2)
{
    return vec2(gameWidth - v2.x, v2.y);
}

class Unit {
    constructor(type, pos) {
        this.type = type;
        this.position = typeof pos == "undefined" ? vec2(0, 0) : pos;
        this.setupUnitProperties();
    }

    setupUnitProperties() {
        this.isBuilding = false;
        this.rank = 0;
        switch (this.type) {
            case RIFLE_MECH:
                this.movement = 3;
                this.movementObstacles = [SEA_TILE];
                this.movementReducers = [MOUNTAIN_TILE];
                this.ammo = -1;
                this.deployTime = 0;
                break;

            case CANNON_MECH:
                this.movement = 2; //+2 on boost
                this.movementObstacles = [SEA_TILE, MOUNTAIN_TILE];
                this.movementReducers = [FOREST_TILE];
                this.ammo = -1;
                this.deployTime = 0;
                break;

            case ARTILLERY_MECH:
                this.movement = 2;
                this.movementObstacles = [SEA_TILE, MOUNTAIN_TILE];
                this.movementReducers = [FOREST_TILE];
                this.ammo = -1;
                this.deployTime = 0;
                break;

            case SUPPORT_MECH:
                this.movement = 5;
                this.movementObstacles = [SEA_TILE, MOUNTAIN_TILE];
                this.movementReducers = [FOREST_TILE];
                this.ammo = -1;
                this.deployTime = 0;
                break;

            case TELEPORT_MECH:
                this.movement = 5;
                this.movementObstacles = [MOUNTAIN_TILE];
                this.movementReducers = [];
                this.ammo = -1;
                this.deployTime = 0;
                break;

            case HQ_BUILDING:
                this.isBuilding = true;
                break;

            case CITY_BUILDING:
                this.isBuilding = true;
                this.boost = 0;
                this.boostCooldown = 5;
                this.boostCooldownDecreasePerRank = 1;
                this.incomePerHp = 100;
                this.incomeRankMultiplier = 1.0;
                this.rankUpgradeCost = 10000;
                this.rankUpgradeCostMultiplier = 2.0;
                break;

            case WAR_BUILDING:
                this.isBuilding = true;
                this.boost = 0;
                this.boostCooldown = 5;
                this.boostCooldownDecreasePerRank = 1;
                this.rankUpgradeCost = 50000;
                this.rankUpgradeCostMultiplier = 1.5;
                this.mechDeployDelay = [
                    [1, 4, 4, 2, 2],
                    [1, 3, 3, 1, 1],
                    [0, 2, 2, 1, 0],
                ];
                break;

            case RUIN_BUILDING:
                this.isBuilding = true;
                break;
        }
    }

    draw(teamID, offset, scale, flip = false, animIndexOffset = 0) {
        if (typeof scale == "undefined") scale = vec2(1, 1);

        if (!this.isBuilding) {
            if(this.deployTime <= 0)
            {
                if(flip) {
                    renderer.setTransform(-1, 0, 0, 1, gameWidth, 0);
                    drawSheet(getMechIndexFromType(this.type, teamID, animIndexOffset == 0 ? 1200 : 300, animIndexOffset == 0 ? 600 : 150)
                        + animIndexOffset, hMirrorVec2(offset.add(this.position)), scale);
                    renderer.setTransform(1, 0, 0, 1, 0, 0);
                } else {
                    drawSheet(getMechIndexFromType(this.type, teamID, animIndexOffset == 0 ? 1200 : 300, animIndexOffset == 0 ? 600 : 150)
                        + animIndexOffset, offset.add(this.position), scale);
                }
            }
            else
            {
                
                renderer.globalAlpha = 0.8;
                drawSheet(getMechIndexFromType(this.type, teamID) + 180, offset.add(this.position), scale);
                renderer.globalAlpha = 1.0;
            }
        }
        else if (this.isBuilding) {
            drawSheet(getTeamIndex(this.type, teamID), offset.add(this.position), scale);
        }

        if(this.rank > 0) {
            drawSheet(56 + ((this.rank - 1) * 20), offset.add(this.position), scale);
        }

        if(this.ammo != -1 && this.ammo <= 1) {
            if (gameTime % 600 < 300) drawSheet(36, offset.add(this.position), scale);
        }
    }
}

class MapUnit {
    constructor(type, mapPos) {
        this.mapPosition = mapPos;

        this.mapPathIndex = -1;
        this.mapPath = [];

        var pos = tilePositionToPixelPosition(this.mapPosition);
        this.unit = new Unit(type, pos);

        this.hp = 10.0;

        this.flip = false;

        this.clearDisabledActions();
    }

    clearDisabledActions() {
        this.up = this.left = this.right = 1;
    }

    getCameraPosition() {
        return vec2(-this.unit.position.x + (gameWidth / 2), -this.unit.position.y + (gameHeight / 2));
    }

    draw(teamID, offset) {
        var sc = vec2((tileSize / 64) + gridBlackLinesFixFactor,
            (tileSize / 64) + gridBlackLinesFixFactor);

        var pixelPosition = tilePositionToPixelPosition(this.mapPosition);

        if(Math.abs(pixelPosition.x - this.unit.position.x) > 0.5) this.flip = pixelPosition.x < this.unit.position.x;

        if (maxDisplayTilesPerRow != defaultTilesPerRow) this.unit.position = pixelPosition;
        else this.unit.position = lerpVec2(this.unit.position, pixelPosition, 0.3);

        //Unit Movement
        if (this.mapPathIndex > -1) {
            if (this.mapPosition.distance(this.mapPath[this.mapPathIndex]) < 0.01) {
                this.mapPathIndex++;

                if (this.mapPathIndex >= this.mapPath.length) {
                    this.mapPosition = this.mapPath[this.mapPath.length - 1];
                    this.mapPathIndex = -1;
                }
            } else {
                this.mapPosition = lerpVec2(this.mapPosition, this.mapPath[this.mapPathIndex], 0.3);
            }
        }
        
        if(this.mapPathIndex > -1) this.unit.draw(teamID, offset, sc, this.flip, ANIM_MECH_WALK);
        else {
            if(this.up == -1 || this.right == -1 || this.left == -1) {
                renderer.globalAlpha = 1.0;
                renderer.globalCompositeOperation = "multiply";
            }
            this.unit.draw(teamID, offset, sc, this.flip);
            if(this.up == -1 || this.right == -1 || this.left == -1) {
                renderer.globalAlpha = 1.0;
                renderer.globalCompositeOperation = "source-over";
            }
        }

        if (this.hp > 0 && this.unit.type != RUIN_BUILDING) {
            if (ui.stateIndex != BATTLESCREEN && maxDisplayTilesPerRow == defaultTilesPerRow) {
                spritesRenderer.font = (24 * pixelSize).toString() + "px OrangeKid";
                drawText(spritesRenderer, this.hp.toString(), offset.add(this.unit.position.add(vec2(-29.6 * pixelSize, -14.6 * pixelSize))), "black");
                drawText(spritesRenderer, this.hp.toString(), offset.add(this.unit.position.add(vec2(-28 * pixelSize, -16 * pixelSize))), "white");
            }
        } else if (this.hp <= 0 && ui.stateIndex != BATTLESCREEN) {
            //Destroying/Removing a Unit
            var indexPair = manager.getPlayerAndUnitIndexOnTile(this.mapPosition);
            for(var i = 0; i < manager.players[indexPair[0]].unitGroup.mapUnits.length; i++) { 
                if (manager.players[indexPair[0]].unitGroup.mapUnits[i] === manager.players[indexPair[0]].unitGroup.mapUnits[indexPair[1]]) {            
                    new TileParticle(this.unit.position, unitDestroySequence);
                    manager.players[indexPair[0]].unitGroup.mapUnits.splice(i, 1);
                }            
            }
        }
    }

    drawInRect(teamID, pos, size) {
        tileSize = size.x / MAP_SIZE.x;
        tileGap = 0;

        var sc = vec2((tileSize / 64) + gridBlackLinesFixFactor,
            (tileSize / 64) + gridBlackLinesFixFactor);

        this.unit.position = vec2(Math.floor(this.mapPosition.x * tileSize) + (this.mapPosition.x * tileGap),
            Math.floor(this.mapPosition.y * tileSize) + (this.mapPosition.y * tileGap));
        this.unit.position = this.unit.position.add(pos);

        this.unit.draw(teamID, vec2(), sc, this.flip);
    }

    //Destroy Map Unit on Mountain/River/Toxic/etc.
    //getTileTypeFromPosition(pos)
}

class MapUnitGroup {
    constructor(mapUnits) {
        this.mapUnits = mapUnits;
        this.teamID = RED_TEAM;
    }

    clearDisabledActions() {
        for (let i = 0; i < this.mapUnits.length; i++) {
            this.mapUnits[i].clearDisabledActions();
        }
    }

    draw(offset) {
        for (let i = 0; i < this.mapUnits.length; i++) {
            this.mapUnits[i].draw(this.teamID, offset);
        }
    }

    drawInRect(pos, size) {
        for (let i = 0; i < this.mapUnits.length; i++) {
            this.mapUnits[i].drawInRect(this.teamID, pos, size);
        }
    }
}