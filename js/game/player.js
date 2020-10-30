
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

    draw(cam) {
        this.unitGroup.draw(cam);
    }
}