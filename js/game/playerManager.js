
var actionPointsPerTurn = 3;

class PlayerManager {
    constructor(players, index) {
        this.players = players;
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
    }

    draw(offset, index) {
        if (typeof index == "undefined") {
            for (let i = 0; i < this.players.length; i++) {
                this.players[i].draw(offset);
            }
        }
    }
}