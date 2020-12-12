
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
        this.getActivePlayer().actionPoints += actionPointsPerTurn;

        this.index++;
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
}