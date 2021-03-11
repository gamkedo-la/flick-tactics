
var GURU = 0;
var ZAREEM = 1;
var TAJA = 2;
var HULU = 3;
var JONAH = 4;

const RED_TEAM = 0;
const BLUE_TEAM = 1;
const GREEN_TEAM = 2;
const BLACK_TEAM = 3;

const COSPECIFICS = [
    { name: "Guru",     powerName: "Extra Action",      powerDesc: "Receives 3 Action Points." },
    { name: "Zareem",   powerName: "Rifle Boomer",      powerDesc: "All your buildings deploys a Rifle Mech." },
    { name: "Taja",     powerName: "Distant Chaos",     powerDesc: "Increased Artillery Range and Fire Power." },
    { name: "Hulu",     powerName: "Terror Infliction", powerDesc: "-1 to all Opponent Mechs HP." },
    { name: "Jonah",    powerName: "Me My Mine",        powerDesc: "Strongest Opponent Mech(s) becomes his Mech(s)." }
];

class Player {
    constructor(teamID, mapUnits, co = -1) {
        this.unitGroup = new MapUnitGroup(mapUnits);
        this.unitGroup.teamID = teamID;

        this.selectedIndex = this.getHQUnitIndex();
        //Without HQ, the player is unplayable and all its units will be destroyed!
        if(this.selectedIndex == -1 && typeof ui != "undefined" && ui.stateIndex != EDITOR) {
            this.nullify();
        }
        
        if(co <= -1) {
            switch(teamID) {
                case RED_TEAM: this.CO = ZAREEM; break;
                case BLUE_TEAM: this.CO = TAJA; break;
                case GREEN_TEAM: this.CO = GURU; break;
                case BLACK_TEAM: this.CO = Math.random() < 0.6 ? HULU : JONAH; break;
            }
        } else {
            this.CO = co;
        }

        this.control = 0; //-1 = nullify, 0 = user, 1 = AI
        this.powerMeter = 0.0;
        this.powered = false;
        this.actionPoints = 0;
        this.money = 0;
        this.deployDelay = true;
    }

    copy(player) {
        this.unitGroup = new MapUnitGroup([]);
        this.unitGroup.copy(player.unitGroup);

        this.selectedIndex = this.getHQUnitIndex();
        //Without HQ, the player is unplayable and all its units will be destroyed!
        if(this.selectedIndex == -1 && typeof ui != "undefined" && ui.stateIndex != EDITOR) {
            this.nullify();
        }

        this.CO = player.CO;
        this.control = player.control;
        this.powerMeter = player.powerMeter;
        this.powered = player.powered;
        this.actionPoints = player.actionPoints;
        this.money = player.money;
        this.deployDelay = player.deployDelay;
    }

    nullify() {
        this.selectedIndex = -1;
        this.control = -1;
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++) this.unitGroup.mapUnits[i].hp = 0.0;
    }

    getSelectedMapUnit() {
        return this.unitGroup.mapUnits[this.selectedIndex];
    }

    checkMapUnit(mUnit) {
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            if(mUnit == this.unitGroup.mapUnits[i])
                return true;
        return false;
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

    getTotalNumberOfMechs(type = -1) {
        var no = 0;
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            if(this.unitGroup.mapUnits[i].unit.isBuilding == false
                && this.unitGroup.mapUnits[i].unit.deployTime <= 0
                && (this.unitGroup.mapUnits[i].unit.type == type || type == -1)) no++;
        return no;
    }

    getTotalNumberOfBuildings(type = -1) {
        var no = 0;
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            if(this.unitGroup.mapUnits[i].unit.isBuilding
            && (this.unitGroup.mapUnits[i].unit.type == type || type == -1)) no++;
        return no;
    }

    isAnyBuildingDamaged() {
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            if(this.unitGroup.mapUnits[i].unit.isBuilding
            && Math.ceil(this.unitGroup.mapUnits[i].hp) < 10) return true;
        return false;
    }

    getTotalIncome(afterRepair = false) {
        var income = 0;
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            if(this.unitGroup.mapUnits[i].unit.isBuilding
            && typeof this.unitGroup.mapUnits[i].unit.incomePerHp != "undefined")
                income += ((afterRepair ? 10 : Math.ceil(this.unitGroup.mapUnits[i].hp)) * (this.unitGroup.mapUnits[i].unit.incomePerHp + (this.unitGroup.mapUnits[i].unit.incomePerHp * this.unitGroup.mapUnits[i].unit.incomeRankMultiplier * this.unitGroup.mapUnits[i].unit.rank))) * (this.unitGroup.mapUnits[i].unit.boost == 1 ? 2 : 1);
        return income;
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

    //AI Assist Functions START
    setSelectedIndexToAnyUnmovedMech()
    {
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++) {
            if (this.unitGroup.mapUnits[i].unit.isBuilding == false
                && this.unitGroup.mapUnits[i].up == 1
                && this.unitGroup.mapUnits[i].unit.deployTime <= 0) {
                this.selectedIndex = i;
                return i;
            }
        }
        return -1;
    }

    hasWarBuilding()
    {
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++) {
            if (this.unitGroup.mapUnits[i].unit.isBuilding == true
                && this.unitGroup.mapUnits[i].unit.type == WAR_BUILDING
                && isAnySpaceFreeAroundBuilding(this.unitGroup.mapUnits[i])) {
                return true;
            }
        }
        return false;
    }

    setSelectedIndexToAnyWarBuilding()
    {
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++) {
            if (this.unitGroup.mapUnits[i].unit.isBuilding == true
                && this.unitGroup.mapUnits[i].unit.type == WAR_BUILDING
                && isAnySpaceFreeAroundBuilding(this.unitGroup.mapUnits[i])) {
                this.selectedIndex = i;
                return i;
            }
        }
        return -1;
    }
    //AI Assist Functions END
}