
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

const RANK_ATTACK_BONUS = 5;
const RANK_DEFENSE_BONUS = 5;

function getMechIndexFromType(type, teamNo, animDelayMax = 1200, animDelayMin = 600) {
    if(animDelayMax == -1) return 100 + (4 * type) + teamNo;
    return (gameTime % animDelayMax < animDelayMin ? 20 : 0) + 100 + (4 * type) + teamNo;
}

function getBuildingIndexFromType(type) {
    return 60 + (4 * type);
}

function getTeamIndex(index, teamNo) {
    return (gameTime % 1200 < 600 ? 20 : 0) + index + teamNo;
}

function hMirrorVec2(v2) {
    return vec2(gameWidth - v2.x, v2.y);
}

class Unit {
    constructor(type, pos) {
        this.type = type;
        this.position = typeof pos == "undefined" ? vec2(0, 0) : pos;
        this.setupUnitProperties();
    }

    copy(unit) {
        this.type = unit.type;
        this.position = unit.position;
        this.copyProperties(unit);
    }

    setupUnitProperties() {
        this.isBuilding = false;
        this.rank = 0;
        switch (this.type) {
            case RIFLE_MECH:
                this.movement = 3;
                this.movementObstacles = [SEA_TILE];
                this.movementReducers = [MOUNTAIN_TILE];

                this.attack = [6.0, 2.0, 5.0, 4.0, 9.0, 2.0];
                this.ammoCapacity = 12;
                this.ammo = this.ammoCapacity;
                this.deployTime = 0;
                this.smokeAmmoCapacity = 1;
                this.smokeAmmo = this.smokeAmmoCapacity;
                break;

            case CANNON_MECH:
                this.movement = 2;
                this.boostMovement = 2;
                this.movementObstacles = [SEA_TILE, MOUNTAIN_TILE];
                this.movementReducers = [FOREST_TILE];

                this.attack = [10.0, 5.0, 12.0, 7.0, 14.0, 7.0];
                this.ammoCapacity = 3;
                this.ammo = this.ammoCapacity;
                this.deployTime = 0;
                this.boost = 0;
                this.boostCooldown = 5;
                this.boostCooldownDecreasePerRank = 1;
                break;

            case ARTILLERY_MECH:
                this.movement = 2;
                this.movementObstacles = [SEA_TILE, MOUNTAIN_TILE];
                this.movementReducers = [FOREST_TILE, SAND_TILE];

                this.attack = [12.0, 8.0, 16.0, 8.0, 7.5, 8.0];
                this.ammoCapacity = 3;
                this.ammo = this.ammoCapacity;
                this.deployTime = 0;
                this.smokeAmmoCapacity = 1;
                this.smokeAmmo = this.smokeAmmoCapacity;
                break;

            case SUPPORT_MECH:
                this.movement = 5;
                this.movementObstacles = [SEA_TILE, MOUNTAIN_TILE];
                this.movementReducers = [FOREST_TILE];

                this.repair = [2.5, 1.0, 1.0, 2.0, 4.0, 2.0];
                this.ammo = -1;
                this.deployTime = 0;
                break;

            case TELEPORT_MECH:
                this.movement = 3;
                this.movementObstacles = [MOUNTAIN_TILE];
                this.movementReducers = [];

                this.attack = [5.0, 2.0, 3.0, 2.5, 7.5, 2.5];
                this.ammoCapacity = 5;
                this.ammo = this.ammoCapacity;
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
                this.rankUpgradeCost = 25000;
                this.rankUpgradeCostMultiplier = 2.0;
                this.mechDeployOffset = vec2(0, 1);
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

    copyProperties(unit) {
        this.isBuilding = unit.isBuilding;
        this.rank = unit.rank;
        if(typeof this.ammo != "undefined") this.ammo = unit.ammo;
        if(typeof this.deployTime != "undefined") this.deployTime = unit.deployTime;
        if(typeof this.smokeAmmo != "undefined") this.smokeAmmo = unit.smokeAmmo;
        if(typeof this.boost != "undefined") this.boost = unit.boost;
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
                drawSheet(getMechIndexFromType(this.type, teamID) + 80, offset.add(this.position), scale);
                renderer.globalAlpha = 1.0;
            }
        }
        else if (this.isBuilding) {
            drawSheet(getTeamIndex(this.type, teamID), offset.add(this.position), scale);
        }
    }

    drawIndicators(offset, scale) {
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
        this.destroyTime = gameTime;

        this.flip = false;

        this.actionPointsUsed = 0;

        this.clearDisabledActions();
    }

    copy(mUnit) {
        this.mapPosition = mUnit.mapPosition;

        this.mapPathIndex = -1;
        this.mapPath = [];

        this.unit = new Unit(mUnit.unit.type, mUnit.unit.position);
        this.unit.copy(mUnit.unit);

        this.hp = mUnit.hp;
        this.destroyTime = gameTime;

        this.flip = mUnit.flip;

        this.clearDisabledActions();
    }

    clearDisabledActions() {
        this.up = this.left = this.right = 1;
        if(this.unit.ammo == 0) this.right = -1;
    }

    getCameraPosition() {
        return vec2(-this.unit.position.x + (gameWidth / 2), -this.unit.position.y + (gameHeight / 2));
    }

    push(offset) {
        if(!this.unit.isBuilding) {
            var pushedOverToMUnit = getMUnitI(getIndexPair(this.mapPosition.add(offset)));
            if(map.getTileTypeFromPosition(this.mapPosition.add(offset)) == MOUNTAIN_TILE) {
                this.hp -= 1.0;

                //unpushed animation
                var munit = this;
                var v2 = vec2(this.mapPosition.x, this.mapPosition.y);
                this.mapPosition = this.mapPosition.add(offset.multiply(toVec2(0.5)));
                new TileParticle(tilePositionToPixelPosition(this.mapPosition), damageSequence, function() {
                    munit.mapPosition = v2;
                });

            } else if(pushedOverToMUnit != -1) {
                var prevHp = pushedOverToMUnit.hp;
                pushedOverToMUnit.hp -= (this.hp / 10.0);
                this.hp -= (prevHp / 10.0);
                if(pushedOverToMUnit.hp <= 0.0) pushedOverToMUnit.destroyTime = gameTime + 250;

                //unpushed animation
                var munit = this;
                var v2 = vec2(this.mapPosition.x, this.mapPosition.y);
                this.mapPosition = this.mapPosition.add(offset.multiply(toVec2(0.5)));
                new TileParticle(tilePositionToPixelPosition(this.mapPosition), damageSequence, function() {
                    munit.mapPosition = v2;
                });

                new TileParticle(tilePositionToPixelPosition(pushedOverToMUnit.mapPosition), damageSequence);
            } else {
                this.mapPosition = this.mapPosition.add(offset);
            }
        }
        if(this.hp <= 0.0) this.destroyTime = gameTime + 250;
    }

    drawSelected(offset) {
        if(this.mapPathIndex <= -1)
            drawRect(renderer, tilePositionToPixelPosition(this.mapPosition.subtract(toVec2(0.5))).add(toVec2(tileGap/2)).add(offset),
                toVec2(tileSize), true, "#FFFFFF88", 0);

        if(this.unit.type == WAR_BUILDING) {
            var set = false;
            var off = [vec2(0, 1), vec2(1, 0), vec2(0, -1), vec2(-1, 0)];
            for(let i = 0; i < off.length; i++) {
                if(getIndexPair(this.mapPosition.add(off[i]))[0] == -1
                && map.getTileTypeFromPosition(this.mapPosition.add(off[i])) != SEA_TILE
                && map.getTileTypeFromPosition(this.mapPosition.add(off[i])) != MOUNTAIN_TILE)
                {
                    this.unit.mechDeployOffset = off[i];
                    set = true;
                    break;
                }
            }
            if(!set) {
                this.unit.mechDeployOffset = -1;
            } else {
                renderer.globalAlpha = (gameTime % 600) / 600;
                drawRect(renderer, tilePositionToPixelPosition(this.mapPosition.add(this.unit.mechDeployOffset).subtract(toVec2(0.5))).add(toVec2(tileGap/2)).add(offset),
                    toVec2(tileSize), true, "#FFFF0088", 0);
                renderer.globalAlpha = 1.0;
            }
        }
    }

    draw(teamID, offset) {
        if(this.actionPointsUsed >= 9 && this.unit.rank <= 0) {
            this.unit.rank = 1;
            new TileParticle(tilePositionToPixelPosition(this.mapPosition), rankUpSequence);
        } else if(this.actionPointsUsed >= 18 && this.unit.rank <= 1) {
            this.unit.rank = 2;
            new TileParticle(tilePositionToPixelPosition(this.mapPosition), rankUpSequence);
        } else if(this.actionPointsUsed >= 36 && this.unit.rank <= 2) {
            this.unit.rank = 3;
            new TileParticle(tilePositionToPixelPosition(this.mapPosition), rankUpSequence);
        }

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
        
        //Unit Draw
        if(this.mapPathIndex > -1) {
            this.unit.draw(teamID, offset, sc, this.flip, ANIM_MECH_WALK);

            if(getPlayer().powered && getPlayerI(getIndexPair(this.mapPosition)).powered) {
                renderer.globalAlpha = ((Math.sin(gameTime/100.0) + 1.0) / 4.0);
                renderer.globalCompositeOperation = "lighter";
                this.unit.draw(teamID, offset, sc, this.flip, ANIM_MECH_WALK);
                renderer.globalAlpha = 1.0;
                renderer.globalCompositeOperation = "source-over";
            }
        } else {
            //Darken(multiply draw) the unit if they have moved or they can't move anymore.
            //OR Brighten(overlay draw) the unit if they are boosted!
            if(ui.stateIndex == GAMEPLAY) {
                var darken = this.up == -1 || (getPlayer().actionPoints <= 0 && !this.unit.isBuilding && getPlayer().checkMapUnit(this));
                if(darken) {
                    renderer.globalAlpha = 1.0;
                    renderer.globalCompositeOperation = "multiply";
                }
                else if(gameTime % 600 < 300 && typeof this.unit.boost != "undefined" && this.unit.boost >= 1) {
                    renderer.globalAlpha = 1.0;
                    renderer.globalCompositeOperation = "overlay";
                }

                this.unit.draw(teamID, offset, sc, this.flip);

                if(getPlayer().powered && getPlayerI(getIndexPair(this.mapPosition)).powered) {
                    renderer.globalAlpha = ((Math.sin(gameTime/100.0) + 1.0) / 4.0);
                    renderer.globalCompositeOperation = "lighter";
                    this.unit.draw(teamID, offset, sc, this.flip);
                    renderer.globalAlpha = 1.0;
                    renderer.globalCompositeOperation = "source-over";
                }

                if(darken) {
                    renderer.globalAlpha = 1.0;
                    renderer.globalCompositeOperation = "source-over";
                }
                else if(gameTime % 600 < 300 && typeof this.unit.boost != "undefined" && this.unit.boost >= 1) {
                    renderer.globalAlpha = 1.0;
                    renderer.globalCompositeOperation = "source-over";
                }
            } else {
                this.unit.draw(teamID, offset, sc, false);
            }
        }
        this.unit.drawIndicators(offset, sc);

        //Destroy Units if they are on sea (exception: teleport mech)
        if(ui.stateIndex == GAMEPLAY && map.getTileTypeFromPosition(this.mapPosition) == SEA_TILE && this.hp > 0) {
            if(this.unit.type == CANNON_MECH || this.unit.type == ARTILLERY_MECH
            || this.unit.type == RIFLE_MECH || this.unit.type == SUPPORT_MECH)
            {
                this.hp = 0;
                this.destroyTime = gameTime + 500;
            }
        }

        //Unit Status
        if (this.hp > 0 && this.unit.type != RUIN_BUILDING) {
            if (Math.ceil(this.hp) < 10 && ui.stateIndex != BATTLESCREEN && maxDisplayTilesPerRow == defaultTilesPerRow) {
                spritesRenderer.font = (24 * pixelSize).toString() + "px OrangeKid";
                drawText(spritesRenderer, Math.ceil(this.hp).toString(), offset.add(this.unit.position.add(vec2(-29.6 * pixelSize, -14.6 * pixelSize))), "black");
                drawText(spritesRenderer, Math.ceil(this.hp).toString(), offset.add(this.unit.position.add(vec2(-28 * pixelSize, -16 * pixelSize))), "white");
            }
        } else if (this.hp <= 0 && ui.stateIndex != BATTLESCREEN && this.destroyTime < gameTime) {
            if(this.unit.isBuilding) {
                if(this.unit.type == HQ_BUILDING) {
                    getPlayerI(getIndexPair(this.mapPosition)).nullify();
                }
                if(this.unit.type != RUIN_BUILDING) {
                    new TileParticle(this.unit.position, unitDestroySequence);
                    this.unit.type = RUIN_BUILDING;
                    return;
                } else if(this.unit.type == RUIN_BUILDING) return;
            }

            //Destroying/Removing a Unit
            var indexPair = getIndexPair(this.mapPosition);
            if(indexPair[0] != -1)
            for(var i = 0; i < getPlayerI(indexPair).unitGroup.mapUnits.length; i++) { 
                if (getMUnitI([indexPair[0], i]) === this) {            
                    new TileParticle(this.unit.position, unitDestroySequence);

                    //Game crash edge case: when active player destroys its own unit
                    if(manager.index == indexPair[0]) {
                        if(getPlayer().selectedIndex > i) getPlayer().selectedIndex--;
                        else if(getPlayer().selectedIndex == i) getPlayer().selectedIndex = getPlayer().getHQUnitIndex();
                        if(getPlayer().selectedIndex <= -1) {
                            lose(getPlayer().CO);
                            getPlayer().control = -1;
                            getPlayer().selectedIndex = -1;
                            manager.endTurn(true);
                        }
                    }

                    getPlayerI(indexPair).unitGroup.mapUnits.splice(i, 1);

                    if(!getPlayer().powered) getPlayerI(indexPair).powerMeter += 0.04;
                    if(getPlayerI(indexPair).powerMeter > 1.0) getPlayerI(indexPair).powerMeter = 1.0;
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
}

class MapUnitGroup {
    constructor(mapUnits) {
        this.mapUnits = mapUnits;
        this.teamID = RED_TEAM;
    }

    copy(unitGroup) {
        this.mapUnits = [];
        this.teamID = unitGroup.teamID;
        for(let i = 0; i < unitGroup.mapUnits.length; i++) {
            var mUnit = new MapUnit(unitGroup.mapUnits[i].unit.type, unitGroup.mapUnits[i].mapPosition);
            mUnit.copy(unitGroup.mapUnits[i]);
            this.mapUnits.push(mUnit);
        }
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