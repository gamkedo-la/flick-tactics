
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
    { name: "Guru",     powerName: "Double-Action",     powerDesc: "Doubles the Action Points." },
    { name: "Zareem",   powerName: "Rifle Boomer",      powerDesc: "Increased Rifle Mech's Rank and Movement. City Buildings deploys a Rifle Mech." },
    { name: "Taja",     powerName: "Distant Chaos",     powerDesc: "Increased Artillery Mech Rank, Range and Attack." },
    { name: "Hulu",     powerName: "Terror Infliction", powerDesc: "Opponents' Units HP will decrement at the start of their turn." },
    { name: "Jonah",    powerName: "Me My Mine",        powerDesc: "Opponent Mech(s) becomes HIS Mech(s)." }
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
                case BLACK_TEAM: this.CO = Math.random() <= 0.8 ? HULU : JONAH; break;
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

        this.focus = []; //mUnit, atFocus
        this.focusTimer = -1;
        this.focusDelay = 200;
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

        for(let i = 0; i < player.focus.length; i++) {
            var f = { mUnit: player.focus[i].mUnit, atFocus: player.focus[i].atFocus };
            this.focus.push(f);
        }
        this.focusTimer = player.focusTimer;
        this.focusDelay = player.focusDelay;
    }

    nullify(blast = false) {
        this.selectedIndex = -1;
        this.control = -1;
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++) {
            if(blast) {
                this.unitGroup.mapUnits[i].hp = 0;
            } else {
                if(this.unitGroup.mapUnits[i].unit.isBuilding) {
                    this.unitGroup.mapUnits[i].unit.type = RUIN_BUILDING;
                } else {
                    this.unitGroup.mapUnits.splice(i, 1);
                    i--;
                }
            }
        }
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
            && this.unitGroup.mapUnits[i].unit.type == HQ_BUILDING
            && this.unitGroup.mapUnits[i].hp > 0.0)
                return i;
        return -1;
    }

    applyToAllMapUnits( toMapUnit ) {
        for(let i = 0; i < this.unitGroup.mapUnits.length; i++)
            toMapUnit(this.unitGroup.mapUnits[i]);
    }

    focusMUnit( deltaTime, camPos ) {
        if(this.focus.length > 0) {
            if(this.focusTimer == -1) this.focusTimer = this.focusDelay;
            if(this.focusTimer > 0) {
                if(camPos.distance(this.focus[0].mUnit.getCameraPosition()) < 2.5 * pixelSize) {
                    this.focus[0].atFocus(this, this.focus[0].mUnit);
                    this.focus[0].atFocus = function(player, mUnit) {};
                    this.focusTimer -= deltaTime;
                    if(this.focus[0].mUnit.unit.type == CITY_BUILDING) {
                        drawText(renderer, "+" + (Math.floor(this.focus[0].mUnit.hp) + this.focus[0].mUnit.incomePerHp).toString(), this.focus[0].mUnit.unit.position.add(camPos).subtract(toVec2(pixelSize)), "black");
                        drawText(renderer, "+" + (Math.floor(this.focus[0].mUnit.hp) + this.focus[0].mUnit.incomePerHp).toString(), this.focus[0].mUnit.unit.position.add(camPos), "white");
                    }
                    if(this.focusTimer <= -1) this.focusTimer = 0;
                }
            } else {
                this.focus.splice(0, 1);
                if(this.focus.length <= 0) {
                    this.focusTimer = -1;
                    this.selectedIndex = this.getHQUnitIndex();
                    return false;
                } else {
                    this.focusTimer = this.focusDelay;
                }
            }
            return true;
        } else
            this.focus = [];
        return false;
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
                income += (afterRepair ? 10 : Math.ceil(this.unitGroup.mapUnits[i].hp)) * this.unitGroup.mapUnits[i].unit.incomePerHp;
        return income;
    }

    getCameraPosition() {
        return this.getSelectedMapUnit().getCameraPosition();
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