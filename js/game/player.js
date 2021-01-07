
const RED_TEAM = 0;
const BLUE_TEAM = 1;
const GREEN_TEAM = 2;
const BLACK_TEAM = 3;

class Player {
    constructor(teamID, mapUnits, co = -1) {
        this.unitGroup = new MapUnitGroup(mapUnits);
        this.unitGroup.teamID = teamID;
        this.selectedIndex = this.getHQUnitIndex();
        if(this.selectedIndex == -1) this.selectedIndex = 0;
        
        if(co <= -1) {
            switch(teamID) {
                case RED_TEAM: this.CO = ZAREEM; break;
                case BLUE_TEAM: this.CO = TAJA; break;
                case GREEN_TEAM: this.CO = GURU; break;
                case BLACK_TEAM: this.CO = Math.random() < 0.6 ? this.HULU : this.JONAH; break;
            }
        }

        this.powerMeter = 0.0;
        this.powered = false;
        this.actionPoints = 3;
        this.money = 0;
    }

    getSelectedMapUnit() {
        return this.unitGroup.mapUnits[this.selectedIndex];
    }

    getHQUnitIndex() {
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            if(this.unitGroup.mapUnits[i].unit.isBuilding
            && this.unitGroup.mapUnits[i].unit.type == HQ_BUILDING)
                return i;
        return -1;
    }

    applyToAllMapUnits( toMapUnit ) {
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            toMapUnit(this.unitGroup.mapUnits[i]);
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