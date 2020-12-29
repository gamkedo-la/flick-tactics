
const RED_TEAM = 0;
const BLUE_TEAM = 1;
const GREEN_TEAM = 2;
const BLACK_TEAM = 3;

class Player {
    constructor(teamID, mapUnits) {
        this.unitGroup = new MapUnitGroup(mapUnits);
        this.unitGroup.teamID = teamID;
        this.selectedIndex = 0;
        
        this.actionPoints = 3;
        this.money = 0;
    }

    getSelectedMapUnit() {
        return this.unitGroup.mapUnits[this.selectedIndex];
    }

    getTotalNumberOfMechs() {
        var no = 0;
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            if(!this.unitGroup.mapUnits[i].unit.isBuilding) no++;
        return no;
    }

    getTotalNumberOfBuildings() {
        var no = 0;
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            if(this.unitGroup.mapUnits[i].unit.isBuilding) no++;
        return no;
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

    drawInRect(pos, size) {
        this.unitGroup.drawInRect(pos, size);
    }
}