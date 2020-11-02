
class Player {
    constructor(teamID) {
        this.unitGroup = new MapUnitGroup([], typeof teamID == "undefined" ? 0 : teamID);
        this.selectedIndex = 0;
        this.actionPoints = 3;
    }

    getSelectedMapUnit() {
        return this.unitGroup.mapUnits[this.selectedIndex];
    }

    getCameraPosition() {
        return this.unitGroup.mapUnits[this.selectedIndex].getCameraPosition();
    }

    clearDisabledActions() {
        this.unitGroup.clearDisabledActions();
    }

    getUnitIndexOnTile(tilePos) {
        for (let i = 0; i < this.unitGroup.mapUnits.length; i++) {
            if (this.unitGroup.mapUnits[i].mapPosition.x == tilePos.x
                && this.unitGroup.mapUnits[i].mapPosition.y == tilePos.y)
                return i;
        }
        return -1;
    }

    draw(cam) {
        this.unitGroup.draw(cam);
    }
}