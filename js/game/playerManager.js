
var actionPointsPerTurn = 3;

class PlayerManager {
    constructor(map, forceAllPlayers = 0) {
        this.players = []
        if(map.redData.length > 0) this.players.push(new Player(RED_TEAM, map.redData));
        else if(forceAllPlayers > 0) this.players.push(new Player(RED_TEAM, []));
        if(map.blueData.length > 0) this.players.push(new Player(BLUE_TEAM, map.blueData));
        else if(forceAllPlayers > 0) this.players.push(new Player(BLUE_TEAM, []));
        if(map.greenData.length > 0) this.players.push(new Player(GREEN_TEAM, map.greenData));
        else if(forceAllPlayers > 0) this.players.push(new Player(GREEN_TEAM, []));
        if(map.blackData.length > 0) this.players.push(new Player(BLACK_TEAM, map.blackData));
        else if(forceAllPlayers > 0) this.players.push(new Player(BLACK_TEAM, []));
        this.index = typeof index == "undefined" ? 0 : index;
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

    endTurn() {
        this.getActivePlayer().clearDisabledActions();

        //TEMP: Power Meter increases a bit
        this.getActivePlayer().powerMeter += 0.1;

        //Player AP replenishes
        this.getActivePlayer().actionPoints += actionPointsPerTurn;

        this.getActivePlayer().applyToAllMapUnits( (mapUnit) => {

            //Money Increases (receives city building income)
            if(mapUnit.unit.isBuilding && typeof mapUnit.unit.incomePerHp != "undefined") {
                this.getActivePlayer().money += (mapUnit.hp * (mapUnit.unit.incomePerHp + (mapUnit.unit.incomePerHp * mapUnit.unit.incomeRankMultiplier * mapUnit.unit.rank)));
            }

            //Deploy Time Decreases
            if(typeof mapUnit.unit.deployTime != "undefined"
                && mapUnit.unit.deployTime > 0) {
                mapUnit.unit.deployTime--;
            }
        });

        //All Players HQ are reselected
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].selectedIndex = this.players[i].getHQUnitIndex();
            if(this.players[i].selectedIndex == -1) this.players[i].selectedIndex = 0;
        }

        //Next Player's Turn!!!
        this.index++;
        if (this.index >= this.players.length) this.index = 0;

        //Skipping nullified players
        while ((this.players[this.index].selectedIndex == -1 || this.players[this.index].control == -1)
            && this.index < this.players.length) this.index++;
        if (this.index >= this.players.length) this.index = 0;

        updateUnitActionButtons();
    }

    draw(offset, index) {
        if (typeof index == "undefined") {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].draw(offset);
            }
        }
    }

    drawInRect(pos, size, index) {
        if (typeof index == "undefined")
        {
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
}