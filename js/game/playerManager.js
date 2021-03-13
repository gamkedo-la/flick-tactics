
class PlayerManager {
    constructor(map = 0, forceAllPlayers = 0) {
        this.players = []
        if(map != 0) {
            if(map.redData.length > 0) this.players.push(new Player(RED_TEAM, map.redData));
            else if(forceAllPlayers > 0) this.players.push(new Player(RED_TEAM, []));
            if(map.blueData.length > 0) this.players.push(new Player(BLUE_TEAM, map.blueData));
            else if(forceAllPlayers > 0) this.players.push(new Player(BLUE_TEAM, []));
            if(map.greenData.length > 0) this.players.push(new Player(GREEN_TEAM, map.greenData));
            else if(forceAllPlayers > 0) this.players.push(new Player(GREEN_TEAM, []));
            if(map.blackData.length > 0) this.players.push(new Player(BLACK_TEAM, map.blackData));
            else if(forceAllPlayers > 0) this.players.push(new Player(BLACK_TEAM, []));
        }
        this.index = typeof index == "undefined" ? 0 : index;

        this.turnCount = 0;
        this.endTurnCounter = 0;
        this.actionPointsPerTurn = 3;
    }

    copy(manager) {
        this.players = [];
        for(let i = 0; i < manager.players.length; i++) {
            var pl = new Player(manager.players[i].unitGroup.teamID, []);
            pl.copy(manager.players[i]);
            this.players.push(pl);
        }
        this.index = manager.index;
        this.turnCount = manager.turnCount;
        this.endTurnCounter = manager.endTurnCounter;
    }

    getPlayerOfTeamID(teamID) {
        for(let i = 0; i < this.players.length; i++)
            if(this.players[i].unitGroup.teamID == teamID && this.players[i].selectedIndex != -1)
                return this.players[i];
        return -1;
    }

    getActivePlayer() {
        return this.players[this.index];
    }

    getPlayerAndUnitIndexOnTile(tilePos) {
        for (let i = 0; i < this.players.length; i++) {
            var tIndex = this.players[i].getUnitIndexOnTile(tilePos);
            if (tIndex > -1) return [i, tIndex];
        }
        return [-1, -1];
    }

    saveState() {
        this.managerBeforeTurn = null;
        this.managerBeforeTurn = new PlayerManager();
        this.managerBeforeTurn.copy(this);
        this.particlesBeforeTurn = [];
        for(let i = 0; i < particles.length; i++) {
            var tp = new TileParticle(particles[i].position, particles[i].sequence, particles[i].endFunction, false);
            tp.copy(particles[i]);
            this.particlesBeforeTurn.push(tp);
        }
    }

    restoreState() {
        this.copy(this.managerBeforeTurn);
        particles = [];
        for(let i = 0; i < this.particlesBeforeTurn.length; i++) {
            var tp = new TileParticle(this.particlesBeforeTurn[i].position, this.particlesBeforeTurn[i].sequence, this.particlesBeforeTurn[i].endFunction, false);
            tp.copy(this.particlesBeforeTurn[i]);
            particles.push(tp);
        }
    }

    endTurn(destroyed = false) {
        if(!destroyed) {
            this.getActivePlayer().clearDisabledActions();

            this.getActivePlayer().powered = false;

            //Player AP replenishes
            this.getActivePlayer().actionPoints += this.actionPointsPerTurn;

            this.getActivePlayer().applyToAllMapUnits( (mUnit) => {

                //Money Increases (receives city building income)
                if(mUnit.unit.isBuilding && typeof mUnit.unit.incomePerHp != "undefined") {
                    this.getActivePlayer().focus.push({ mUnit: mUnit, atFocus: function(player) {
                        new TileParticle(tilePositionToPixelPosition(mUnit.mapPosition), incomeSequence);
                        player.money += (Math.ceil(mUnit.hp) * (mUnit.unit.incomePerHp + (mUnit.unit.incomePerHp * mUnit.unit.incomeRankMultiplier * mUnit.unit.rank))) * (mUnit.unit.boost == 1 ? 2 : 1);
                    }});
                }

                //Deploy Time Decreases
                if(typeof mUnit.unit.deployTime != "undefined"
                    && mUnit.unit.deployTime > 0) {
                    mUnit.unit.deployTime--;
                }

                //Clearing Disabled Actions
                mUnit.clearDisabledActions();

                //Cannon Mech Boost Regulation
                if(mUnit.unit.type == CANNON_MECH) {
                    if(mUnit.unit.boost == 1) {
                        mUnit.unit.movement -= mUnit.unit.boostMovement;
                        mUnit.unit.boost = -(mUnit.unit.boostCooldown - (mUnit.unit.boostCooldownDecreasePerRank * mUnit.unit.rank));
                    }
                    else if(mUnit.unit.boost < 0) mUnit.unit.boost++;
                }

                //Buildings Boost Regulation
                if(mUnit.unit.isBuilding && typeof mUnit.unit.boost != "undefined") {
                    if(mUnit.unit.boost == 1) mUnit.unit.boost = -(mUnit.unit.boostCooldown - (mUnit.unit.boostCooldownDecreasePerRank * mUnit.unit.rank));
                    else if(mUnit.unit.boost < 0) mUnit.unit.boost++;
                }

                //Fire and Toxic Tile Damage
                //Teleport Mech won't receive Damage from Toxic Tile as they hover in air.
                if((map.getTileTypeFromPosition(mUnit.mapPosition) == TOXIC_TILE && mUnit.unit.type != TELEPORT_MECH)
                || isTileOnFire(mUnit.mapPosition)) {
                    this.getActivePlayer().focus.push({ mUnit: mUnit, atFocus: function(player) {
                        if(mUnit.unit.rank >= 3 || mUnit.unit.type == CANNON_MECH || mUnit.unit.type == SUPPORT_MECH) mUnit.hp -= 1.0;
                        else mUnit.hp -= 2.0;
                        if(mUnit.hp > 0.0) new TileParticle(tilePositionToPixelPosition(mUnit.mapPosition), damageSequence);
                    }});
                }
            });
        }

        //All Players HQ are reselected
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].selectedIndex = this.players[i].getHQUnitIndex();
            if(this.players[i].selectedIndex == -1) this.players[i].selectedIndex = 0;
        }

        //Turn Count
        this.endTurnCounter++;
        if(this.endTurnCounter >= this.players.length) {
            this.turnCount++;
            this.endTurnCounter = 0;

            //Tile Particle Turn Process
            decrementTileParticlesTurns();
        }

        //Next Player's Turn!!!
        this.index++;
        if (this.index >= this.players.length) this.index = 0;
        playSFX(SFX_ENDTURN);

        //Skipping nullified players
        while ((this.players[this.index].selectedIndex == -1 || this.players[this.index].control == -1)
            && this.index < this.players.length) this.index++;
        if (this.index >= this.players.length) this.index = 0;

        buildingPanelCOSelection = this.index;

        updateUnitActionButtons();

        //Saving Manager's State Before the Start of a new Turn
        //in order for Reset button to restore it
        this.saveState();
    }

    draw(offset, index) {
        if (typeof index == "undefined") {
            if(ui.stateIndex == GAMEPLAY) this.getActivePlayer().getSelectedMapUnit().drawSelected(cam);
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].draw(offset);
            }
        }
    }

    drawInRect(pos, size, index) {
        if (typeof index == "undefined") {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].drawInRect(pos, size);
            }
        }
    }

    isPlayable() {
        var count = 0;
        for(let i = 0; i < this.players.length; i++) {
            if(this.players[i].selectedIndex != -1 && this.players[i].control != -1) count++;
        }
        return count >= 2;
    }

    getClosestPlayerIndex() {
        var hqPos = this.players[this.index].unitGroup.mapUnits[this.players[this.index].getHQUnitIndex()].mapPosition;
        var dist = 99999.0;
        var targetPlayer = -1;
        for(let p = 0; p < this.players.length; p++) {
            if(p != this.index) {
                var newDist = hqPos.distance(this.players[p].unitGroup.mapUnits[this.players[p].getHQUnitIndex()].mapPosition);
                if(newDist < dist) {
                    dist = newDist;
                    targetPlayer = p;
                }
            }
        }
        var hqPos = this.players[this.index].unitGroup.mapUnits[this.players[this.index].getHQUnitIndex()].mapPosition;
        var closestMechIndex = -1;
        for(let p = 0; p < this.players.length; p++) {
            if(p != this.index) {
                for(let m = 0; m < this.players[p].unitGroup.mapUnits.length; m++) {
                    if(this.players[p].unitGroup.mapUnits[m].unit.isBuilding == false) {
                        var newDist = hqPos.distance(this.players[p].unitGroup.mapUnits[m].mapPosition);
                        if(newDist < dist) {
                            dist = newDist;
                            closestMechIndex = m;
                            targetPlayer = p;
                        }
                    }
                }
            }
        }
        return [targetPlayer, closestMechIndex];
    }
}