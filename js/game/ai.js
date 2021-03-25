
// = AI Priority List
// - Attack Opponent Buildings
// - Attack or Move to Opponent Units that is closest to YOUR Buildings
// - Attack Reachable Units
// - Retreat Units with Less HP
// - Repair/Supply Units
// - Move closer to Opponent Buildings

// = Building Priority -> HQ > War > City

var aiTaskTimer = 0;
var aiDelayPerTask = 500;

var aiUnitSelected = false;
var aiMechMove = false;
var aiMechAdjacentOpponentUnit = null;
var aiMechOpponentUnitPlacement = null;

//TEMP
var aiNoMechMoveLeft = false;

function aiUpdate(deltaTime)
{
    if(getPlayer().control == 1) {
        if(aiTaskTimer <= 0)
        {
            //MECH CONTROL
            if(getPlayer().actionPoints > 0 && getPlayer().getTotalNumberOfMechs() > 0
            && !aiNoMechMoveLeft /*TEMP*/) {

                //c("mech control");
                //c(getMUnit().right);
                //c(updateOpponentUnitAdjacent());

                //Selecting unmoved Mech
                if(!aiUnitSelected) {
                    var unmovedIndex = getPlayer().setSelectedIndexToAnyUnmovedMech();
                    aiUnitSelected = true;
                    if(unmovedIndex == -1) { aiUnitSelected = false; aiNoMechMoveLeft = true; }

                //Selecting Mech's Attack if opponent is adjacent (DIRECT ATTACK ONLY)
                } else if (updateOpponentUnitAdjacent() && getMUnit().right == 1) {
                    getMUnit().right = 0;

                //Selecting Mech's Move command
                } else if (getMUnit().up == 1) {
                    getMUnit().up = 0;

                //Attack Mech's target (direct attack on adjacent opponent)
                } else if (getMUnit().right == 0) {
                    map.attack(getMUnit(), aiMechAdjacentOpponentUnit, aiMechOpponentUnitPlacement);
                    getPlayer().actionPoints--;
                    aiUnitSelected = false;

                //Selecting a tile to move to
                } else /*if (getMUnit().up == 0)*/ {

                    //Selecting Player to attack
                    var indexPair = manager.getClosestPlayerIndex();
                    if(indexPair != -1) {

                        //Move to building if reachable for attack (2 AP required)
                        var toBuilding = false;
                        if(getPlayer().actionPoints >= 2) {
                            for(let b = 0; b < getPlayerI(indexPair).unitGroup.mapUnits.length; b++) {
                                mUnit = getMUnitI([indexPair[0], b])
                                if(mUnit != -1 && mUnit.unit.isBuilding) {
                                    var path = map.canUnitReachAdjacentTile(getMUnit(), mUnit.mapPosition);
                                    if(path != -1) {
                                        getMUnit().mapPath = path;
                                        getMUnit().mapPathIndex = 0;
                                        getMUnit().up = -1;
                                        toBuilding = true;
                                    }
                                }
                            }
                        }

                        if(!toBuilding) map.eventAIUnitMovement(getMUnit());
                        getPlayer().actionPoints--;
                    }

                    //Is there any opponent mech adjacent to the selected mech for attack?
                    //If yes, keep the unit selected in order for the unit to attack.
                    aiUnitSelected = updateOpponentUnitAdjacent(getMUnit().mapPath[getMUnit().mapPath.length - 1]);
                }


            //BUILDING CONTROL
            } else if (getPlayer().money >= MECHCOST[0] && getPlayer().hasWarBuilding() && Math.random() < 0.8) {

                //Selecting War Building
                if(!aiUnitSelected) {
                    getPlayer().setSelectedIndexToAnyWarBuilding();
                    aiUnitSelected = true;

                //Deploy a Rifle Mech
                } else {
                    if(getPlayer().money >= MECHCOST[2])
                        deployMechFromBuilding(getMUnit(), 2);
                    else if(getPlayer().money >= MECHCOST[1])
                        deployMechFromBuilding(getMUnit(), 1);
                    else if(getPlayer().money >= MECHCOST[3])
                        deployMechFromBuilding(getMUnit(), 3);
                    else if(getPlayer().money >= MECHCOST[4])
                        deployMechFromBuilding(getMUnit(), 4);
                    else if(getPlayer().money >= MECHCOST[0])
                        deployMechFromBuilding(getMUnit(), 0);
                    aiUnitSelected = false;
                }

            
            // END TURN IF NOTHING LEFT TO DO
            } else {
                manager.endTurn();
                aiUnitSelected = false;

                aiNoMechMoveLeft = false; //TEMP
            }

            aiTaskTimer = aiDelayPerTask;
        } else {
            aiTaskTimer -= deltaTime;
        }
    } else {
        aiTaskTimer = aiDelayPerTask;
    }
}

function isAnySpaceFreeAroundBuilding(buildingMapUnit) {
    var pos = buildingMapUnit.mapPosition;
    return getIndexPair(pos.add(vec2(0, 1)))[0] == -1
        || getIndexPair(pos.add(vec2(1, 0)))[0] == -1
        || getIndexPair(pos.add(vec2(0, -1)))[0] == -1
        || getIndexPair(pos.add(vec2(0, 1)))[0] == -1;
}

function deployMechFromBuilding(buildingMapUnit, type) {
    var pos = buildingMapUnit.mapPosition;
    if(getIndexPair(pos.add(vec2(0, 1)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(0, 1)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
    else if(getIndexPair(pos.add(vec2(1, 0)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(1, 0)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
    else if(getIndexPair(pos.add(vec2(0, -1)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(0, -1)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
    else if(getIndexPair(pos.add(vec2(-1, 0)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(-1, 0)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
}

function updateOpponentUnitAdjacent(mpos) {
    var munit = getMUnit();
    if(typeof mpos == "undefined") mpos = munit.mapPosition;
    /*if(munit.right == -1) {
        aiMechAdjacentOpponentUnit = aiMechOpponentUnitPlacement = null;
        return false;
    }*/
    var pos = [vec2(0, 1), vec2(1, 0), vec2(0, -1), vec2(-1, 0)]; var done = false;
    for(let i = 0; i < pos.length; i++) {
        var indexPair = getIndexPair(mpos.add(pos[i]));
        if(indexPair[0] != -1 && indexPair[0] != manager.index) {
            aiMechAdjacentOpponentUnit = getMUnitI(indexPair);
            aiMechOpponentUnitPlacement = pos[i];
            done = true;
            break;
        } 
    }
    if(!done) {
        aiMechAdjacentOpponentUnit = aiMechOpponentUnitPlacement = null;
        return false;
    }
    return true;
}