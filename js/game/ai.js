
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

                c("mech control");
                c(getPlayer().getSelectedMapUnit().right);
                c(updateOpponentUnitAdjacent());

                //Selecting unmoved Mech
                if(!aiUnitSelected) {
                    var unmovedIndex = getPlayer().setSelectedIndexToAnyUnmovedMech();
                    aiUnitSelected = true;
                    if(unmovedIndex == -1) { aiUnitSelected = false; aiNoMechMoveLeft = true; }

                //Selecting Mech's Attack if opponent is adjacent (DIRECT ATTACK ONLY)
                } else if (updateOpponentUnitAdjacent()
                && getPlayer().getSelectedMapUnit().right == 1) {
                    getPlayer().getSelectedMapUnit().right = 0;

                //Selecting Mech's Move command
                } else if (getPlayer().getSelectedMapUnit().up == 1) {
                    getPlayer().getSelectedMapUnit().up = 0;

                } else if (getPlayer().getSelectedMapUnit().right == 0) {
                    map.attack(getPlayer().getSelectedMapUnit(), aiMechAdjacentOpponentUnit, aiMechOpponentUnitPlacement);
                    getPlayer().actionPoints--;
                    aiUnitSelected = false;

                //Selecting a tile to move to
                } else /*if (getPlayer().getSelectedMapUnit().up == 0)*/ {

                    //Selecting Player to attack
                    var indexPair = manager.getClosestPlayerIndex();//Math.floor(Math.random() * manager.players.length);
                    if(indexPair != -1) {

                        //Move to building if reachable for attack (2 AP required)
                        var toBuilding = false;
                        if(getPlayer().actionPoints >= 2) {
                            for(let b = 0; b < manager.players[indexPair[0]].unitGroup.mapUnits.length; b++) {
                                if(manager.players[indexPair[0]].unitGroup.mapUnits[b].unit.isBuilding) {
                                    var path = map.canUnitReachAdjacentTile(getPlayer().getSelectedMapUnit(), manager.players[indexPair[0]].unitGroup.mapUnits[b].mapPosition);
                                    if(path != -1) {
                                        getPlayer().getSelectedMapUnit().mapPath = path;
                                        getPlayer().getSelectedMapUnit().mapPathIndex = 0;
                                        getPlayer().getSelectedMapUnit().up = -1;
                                        toBuilding = true;
                                    }
                                }
                            }
                        }

                        if(!toBuilding) map.eventAIUnitMovement(getPlayer().getSelectedMapUnit());
                        getPlayer().actionPoints--;
                    }

                    //Is there any opponent mech adjacent to the selected mech for attack?
                    aiUnitSelected = updateOpponentUnitAdjacent();
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
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 2);
                    else if(getPlayer().money >= MECHCOST[1])
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 1);
                    else if(getPlayer().money >= MECHCOST[3])
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 3);
                    else if(getPlayer().money >= MECHCOST[4])
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 4);
                    else if(getPlayer().money >= MECHCOST[0])
                        deployMechFromBuilding(getPlayer().getSelectedMapUnit(), 0);
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
    return manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, 1)))[0] == -1
        || manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(1, 0)))[0] == -1
        || manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, -1)))[0] == -1
        || manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, 1)))[0] == -1;
}

function deployMechFromBuilding(buildingMapUnit, type) {
    var pos = buildingMapUnit.mapPosition;
    if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, 1)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(0, 1)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
    else if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(1, 0)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(1, 0)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
    else if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(0, -1)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(0, -1)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
    else if(manager.getPlayerAndUnitIndexOnTile(pos.add(vec2(-1, 0)))[0] == -1)
    {
        getPlayer().money -= MECHCOST[type];
        var newMapUnit = new MapUnit(type, pos.add(vec2(-1, 0)));
        if(getPlayer().deployDelay) newMapUnit.unit.deployTime = buildingMapUnit.unit.mechDeployDelay[buildingMapUnit.unit.rank][type];
        getPlayer().unitGroup.mapUnits.push(newMapUnit);
    }
}

function updateOpponentUnitAdjacent() {
    var munit = getPlayer().getSelectedMapUnit();
    var mpos = munit.mapPosition;

    /*if(munit.right == -1) {
        aiMechAdjacentOpponentUnit = aiMechOpponentUnitPlacement = null;
        return false;
    }*/

    var downPair = manager.getPlayerAndUnitIndexOnTile(mpos.add(vec2(0,1)));
    var rightPair = manager.getPlayerAndUnitIndexOnTile(mpos.add(vec2(1,0)));
    var upPair = manager.getPlayerAndUnitIndexOnTile(mpos.add(vec2(0,-1)));
    var leftPair = manager.getPlayerAndUnitIndexOnTile(mpos.add(vec2(-1,0)));

    if(downPair[0] != -1 && downPair[0] != manager.index) {
        aiMechAdjacentOpponentUnit = manager.players[downPair[0]].unitGroup.mapUnits[downPair[1]];
        aiMechOpponentUnitPlacement = vec2(0,1);
    } else if(rightPair[0] != -1 && rightPair[0] != manager.index) {
        aiMechAdjacentOpponentUnit = manager.players[rightPair[0]].unitGroup.mapUnits[rightPair[1]];
        aiMechOpponentUnitPlacement = vec2(1,0);
    } else if(upPair[0] != -1 && upPair[0] != manager.index) {
        aiMechAdjacentOpponentUnit = manager.players[upPair[0]].unitGroup.mapUnits[upPair[1]];
        aiMechOpponentUnitPlacement = vec2(0,-1);
    } else if(leftPair[0] != -1 && leftPair[0] != manager.index) {
        aiMechAdjacentOpponentUnit = manager.players[leftPair[0]].unitGroup.mapUnits[leftPair[1]];
        aiMechOpponentUnitPlacement = vec2(-1,0);
    } else {
        aiMechAdjacentOpponentUnit = aiMechOpponentUnitPlacement = null;
        return false;
    }
    return true;
}